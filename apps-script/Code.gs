/**
 * Google Apps Script — бэкенд VK Mini App «КАФ'26».
 *
 * Данные хранятся в Google Таблице с листами:
 *   - «площадки»  (id, name, subtitle, location, time_start, time_end, speaker, speaker_title, description, avatar_url)
 *   - «вопросы»   (id, platform_id, vk_user_id, name, text, rating, created_at)
 *   - «отзывы»    (id, platform_id, vk_user_id, name, text, rating, created_at)
 *   - служебный лист «версия кеша» (ячейка A1 — строка версии)
 *
 * Время в таблице — ISO 8601 UTC без смещения. Нормализуется в UTC epoch ms.
 */

var SHEET_PLATFORMS = 'площадки';
var SHEET_QUESTIONS = 'вопросы';
var SHEET_REVIEWS = 'отзывы';
var SHEET_CACHE = 'версия кеша';

var CACHE_VERSION_CELL = 'A1';

/** TTL серверного кэша расписания (сек). */
var SCHEDULE_CACHE_TTL_SECONDS = 10 * 60; // 10 минут
/** Ключ серверного кэша расписания. */
var SCHEDULE_CACHE_KEY = 'schedule';

/** Получить активную таблицу. */
function getSpreadsheet_() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/** Получить лист по имени или создать, если отсутствует. */
function getSheet_(name) {
  var ss = getSpreadsheet_();
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

/** Прочитать все строки листа как массив объектов по заголовкам. */
function readRows_(sheet) {
  var values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  var headers = values[0];
  var rows = [];
  for (var i = 1; i < values.length; i++) {
    var row = values[i];
    var obj = {};
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = row[j];
    }
    rows.push(obj);
  }
  return rows;
}

/** Нормализовать ISO-строку UTC в epoch ms. Возвращает null при невалидном значении. */
function normalizeTimeMs_(value) {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value === 'number') return value;
  var ms = Date.parse(String(value));
  return isNaN(ms) ? null : ms;
}

/** Прочитать версию кеша из служебного листа. */
function readCacheVersion_() {
  try {
    var sheet = getSpreadsheet_().getSheetByName(SHEET_CACHE);
    if (!sheet) return '';
    var value = sheet.getRange(CACHE_VERSION_CELL).getValue();
    return value === null || value === undefined ? '' : String(value);
  } catch (err) {
    console.error('readCacheVersion_ error', err);
    return '';
  }
}

/** Текущее время сервера в UTC epoch ms. */
function serverTimeMs_() {
  return Date.now();
}

/** Прочитать площадки и нормализовать время. */
function readPlatforms_() {
  var sheet = getSheet_(SHEET_PLATFORMS);
  var rows = readRows_(sheet);
  return rows.map(function (r) {
    return {
      id: String(r['id'] || ''),
      name: String(r['name'] || ''),
      subtitle: r['subtitle'] ? String(r['subtitle']) : undefined,
      location: r['location'] ? String(r['location']) : undefined,
      time_start: normalizeTimeMs_(r['time_start']),
      time_end: normalizeTimeMs_(r['time_end']),
      speaker: r['speaker'] ? String(r['speaker']) : undefined,
      speaker_title: r['speaker_title'] ? String(r['speaker_title']) : undefined,
      description: r['description'] ? String(r['description']) : undefined,
      avatar_url: r['avatar_url'] ? String(r['avatar_url']) : undefined,
      card_avatar_url: r['card_avatar_url'] ? String(r['card_avatar_url']) : undefined,
    };
  });
}

/** Прочитать вопросы пользователя по площадке. */
function readQuestions_(platformId, vkUserId) {
  var sheet = getSheet_(SHEET_QUESTIONS);
  var rows = readRows_(sheet);
  return rows
    .filter(function (r) {
      var matchPlatform = !platformId || String(r['platform_id']) === String(platformId);
      var matchUser = !vkUserId || String(r['vk_user_id']) === String(vkUserId);
      return matchPlatform && matchUser;
    })
    .map(function (r) {
      return {
        id: String(r['id'] || ''),
        platform_id: String(r['platform_id'] || ''),
        vk_user_id: String(r['vk_user_id'] || ''),
        name: String(r['name'] || ''),
        text: String(r['text'] || ''),
        rating: r['rating'] === '' || r['rating'] === null || r['rating'] === undefined
          ? undefined
          : Number(r['rating']),
        created_at: normalizeTimeMs_(r['created_at']),
      };
    });
}

/** Прочитать отзывы по площадке. */
function readReviews_(platformId) {
  var sheet = getSheet_(SHEET_REVIEWS);
  var rows = readRows_(sheet);
  return rows
    .filter(function (r) {
      return !platformId || String(r['platform_id']) === String(platformId);
    })
    .map(function (r) {
      return {
        id: String(r['id'] || ''),
        platform_id: String(r['platform_id'] || ''),
        vk_user_id: String(r['vk_user_id'] || ''),
        name: String(r['name'] || ''),
        text: String(r['text'] || ''),
        rating: Number(r['rating']),
        created_at: normalizeTimeMs_(r['created_at']),
      };
    });
}

/** Сгенерировать уникальный id. */
function generateId_() {
  return Utilities.getUuid();
}

/** Найти строку вопроса по id. Возвращает индекс строки (1-based) или -1. */
function findQuestionRow_(sheet, questionId) {
  var values = sheet.getDataRange().getValues();
  for (var i = 1; i < values.length; i++) {
    if (String(values[i][0]) === String(questionId)) {
      return i + 1; // +1: заголовок
    }
  }
  return -1;
}

/** Добавить строку в лист. */
function appendRow_(sheet, obj) {
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var row = headers.map(function (h) {
    return obj[h] === undefined ? '' : obj[h];
  });
  sheet.appendRow(row);
}

/** Обновить строку листа по объекту. */
function updateRow_(sheet, rowIndex, obj) {
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  for (var j = 0; j < headers.length; j++) {
    var h = headers[j];
    if (obj[h] !== undefined) {
      sheet.getRange(rowIndex, j + 1).setValue(obj[h]);
    }
  }
}

/** Вернуть JSON-ответ. */
function jsonResponse_(data, status) {
  var payload = JSON.stringify(data);
  return ContentService.createTextOutput(payload)
    .setMimeType(ContentService.MimeType.JSON);
}

/** Вернуть ошибку. */
function errorResponse_(message) {
  console.error('errorResponse_', message);
  return jsonResponse_({ ok: false, error: message });
}

/** Обработчик GET-запросов. */
function doGet(e) {
  console.log('doGet params', e && e.parameter);
  var params = (e && e.parameter) || {};
  var action = params.action || '';

  try {
    if (action === 'schedule') {
      var cache = CacheService.getScriptCache();
      var cacheVersion = readCacheVersion_();
      var cached = cache.get(SCHEDULE_CACHE_KEY);
      if (cached) {
        var cachedData = JSON.parse(cached);
        // Если версия кеша не изменилась — отдаём кэш с актуальным serverTime.
        if (cachedData.cacheVersion === cacheVersion) {
          cachedData.serverTime = serverTimeMs_();
          console.log('doGet schedule (cache hit) platforms', cachedData.platforms.length);
          return jsonResponse_({ ok: true, data: cachedData });
        }
      }
      var platforms = readPlatforms_();
      var data = {
        platforms: platforms,
        cacheVersion: cacheVersion,
      };
      cache.put(SCHEDULE_CACHE_KEY, JSON.stringify(data), SCHEDULE_CACHE_TTL_SECONDS);
      var result = {
        ok: true,
        data: {
          platforms: platforms,
          cacheVersion: cacheVersion,
          serverTime: serverTimeMs_(),
        },
      };
      console.log('doGet schedule platforms', platforms.length, 'cacheVersion', cacheVersion);
      return jsonResponse_(result);
    }

    if (action === 'platform') {
      var id = params.id || '';
      var vkUserId = params.vk_user_id || '';
      var all = readPlatforms_();
      var platform = null;
      for (var i = 0; i < all.length; i++) {
        if (String(all[i].id) === String(id)) {
          platform = all[i];
          break;
        }
      }
      if (!platform) {
        return errorResponse_('Площадка не найдена');
      }
      var questions = readQuestions_(id, vkUserId);
      var result2 = {
        ok: true,
        data: {
          platform: platform,
          questions: questions,
          serverTime: serverTimeMs_(),
        },
      };
      console.log('doGet platform', id, 'questions', questions.length);
      return jsonResponse_(result2);
    }

    if (action === 'questions') {
      var pId = params.platform_id || '';
      var uId = params.vk_user_id || '';
      var qs = readQuestions_(pId, uId);
      var result3 = { ok: true, data: { questions: qs } };
      console.log('doGet questions platform', pId, 'user', uId, 'count', qs.length);
      return jsonResponse_(result3);
    }

    return errorResponse_('Неизвестное действие: ' + action);
  } catch (err) {
    console.error('doGet error', err);
    return errorResponse_('Внутренняя ошибка сервера');
  }
}

/** Обработчик POST-запросов. */
function doPost(e) {
  console.log('doPost received');
  var body = {};
  try {
    if (e && e.postData && e.postData.contents) {
      body = JSON.parse(e.postData.contents);
    }
  } catch (err) {
    console.error('doPost parse error', err);
    return errorResponse_('Некорректный JSON');
  }

  var action = body.action || '';
  console.log('doPost action', action);

  try {
    if (action === 'add_question') {
      return addQuestion_(body);
    }
    if (action === 'edit_question') {
      return editQuestion_(body);
    }
    if (action === 'delete_question') {
      return deleteQuestion_(body);
    }
    if (action === 'add_review') {
      return addReview_(body);
    }
    return errorResponse_('Неизвестное действие: ' + action);
  } catch (err) {
    console.error('doPost error', err);
    return errorResponse_('Внутренняя ошибка сервера');
  }
}

/** Добавить вопрос. */
function addQuestion_(body) {
  var platformId = String(body.platform_id || '');
  var vkUserId = String(body.vk_user_id || '');
  var name = String(body.name || '');
  var text = String(body.text || '');
  var rating = body.rating === undefined || body.rating === null ? '' : Number(body.rating);

  if (!platformId || !vkUserId || !name || !text) {
    return errorResponse_('Заполните все обязательные поля');
  }

  var question = {
    id: generateId_(),
    platform_id: platformId,
    vk_user_id: vkUserId,
    name: name,
    text: text,
    rating: rating,
    created_at: new Date().toISOString(),
  };

  var sheet = getSheet_(SHEET_QUESTIONS);
  appendRow_(sheet, question);
  console.log('add_question ok', question.id);
  return jsonResponse_({ ok: true, data: { question: question } });
}

/** Редактировать вопрос (только автор). */
function editQuestion_(body) {
  var questionId = String(body.id || '');
  var vkUserId = String(body.vk_user_id || '');
  var name = String(body.name || '');
  var text = String(body.text || '');
  var rating = body.rating === undefined || body.rating === null ? '' : Number(body.rating);

  if (!questionId || !vkUserId) {
    return errorResponse_('Недостаточно данных');
  }

  var sheet = getSheet_(SHEET_QUESTIONS);
  var rowIndex = findQuestionRow_(sheet, questionId);
  if (rowIndex === -1) {
    return errorResponse_('Вопрос не найден');
  }

  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var current = {};
  var rowValues = sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0];
  for (var j = 0; j < headers.length; j++) {
    current[headers[j]] = rowValues[j];
  }

  if (String(current['vk_user_id']) !== vkUserId) {
    return errorResponse_('Нет прав на редактирование');
  }

  var updates = { name: name, text: text, rating: rating };
  updateRow_(sheet, rowIndex, updates);
  console.log('edit_question ok', questionId);
  return jsonResponse_({ ok: true, data: { id: questionId } });
}

/** Удалить вопрос (физически, только автор). */
function deleteQuestion_(body) {
  var questionId = String(body.id || '');
  var vkUserId = String(body.vk_user_id || '');

  if (!questionId || !vkUserId) {
    return errorResponse_('Недостаточно данных');
  }

  var sheet = getSheet_(SHEET_QUESTIONS);
  var rowIndex = findQuestionRow_(sheet, questionId);
  if (rowIndex === -1) {
    return errorResponse_('Вопрос не найден');
  }

  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var rowValues = sheet.getRange(rowIndex, 1, 1, headers.length).getValues()[0];
  var current = {};
  for (var j = 0; j < headers.length; j++) {
    current[headers[j]] = rowValues[j];
  }

  if (String(current['vk_user_id']) !== vkUserId) {
    return errorResponse_('Нет прав на удаление');
  }

  sheet.deleteRow(rowIndex);
  console.log('delete_question ok', questionId);
  return jsonResponse_({ ok: true, data: { id: questionId } });
}

/** Добавить отзыв. */
function addReview_(body) {
  var platformId = String(body.platform_id || '');
  var vkUserId = String(body.vk_user_id || '');
  var name = String(body.name || '');
  var text = String(body.text || '');
  var rating = Number(body.rating);

  if (!platformId || !vkUserId || !name || !text) {
    return errorResponse_('Заполните все обязательные поля');
  }
  if (!rating || rating < 1 || rating > 5) {
    return errorResponse_('Оценка должна быть от 1 до 5');
  }

  var review = {
    id: generateId_(),
    platform_id: platformId,
    vk_user_id: vkUserId,
    name: name,
    text: text,
    rating: rating,
    created_at: new Date().toISOString(),
  };

  var sheet = getSheet_(SHEET_REVIEWS);
  appendRow_(sheet, review);
  console.log('add_review ok', review.id);
  return jsonResponse_({ ok: true, data: { review: review } });
}
