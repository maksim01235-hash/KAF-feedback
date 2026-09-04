import { describe, it, expect, beforeEach } from 'vitest';
import {
  parseHash,
  navigate,
  goBack,
  getHash,
  onHashChange,
} from '@/lib/router';
import { clearNavigation, peekNavigation } from '@/lib/navigationHistory';

describe('parseHash', () => {
  it('пустой хэш → schedule', () => {
    expect(parseHash('')).toEqual({ name: 'schedule' });
  });

  it('хэш без решётки → schedule', () => {
    expect(parseHash('#')).toEqual({ name: 'schedule' });
  });

  it('простой id → platform', () => {
    expect(parseHash('#abc')).toEqual({ name: 'platform', platformId: 'abc' });
  });

  it('ask/<id> → ask', () => {
    expect(parseHash('#ask/abc')).toEqual({
      name: 'ask',
      platformId: 'abc',
    });
  });

  it('review/<id> → review', () => {
    expect(parseHash('#review/abc')).toEqual({
      name: 'review',
      platformId: 'abc',
    });
  });

  it('неизвестный префикс → platform', () => {
    expect(parseHash('#unknown')).toEqual({
      name: 'platform',
      platformId: 'unknown',
    });
  });

  it('обрезка пробелов вокруг хэша', () => {
    // '  #abc  ' → trim → '#abc' → не ask/review → platform с id '#abc'
    expect(parseHash('  #abc  ')).toEqual({
      name: 'platform',
      platformId: '#abc',
    });
  });

  it('ask/ без id → platform (не ask)', () => {
    expect(parseHash('ask/')).toEqual({ name: 'platform', platformId: 'ask/' });
  });

  it('review/ без id → platform (не review)', () => {
    expect(parseHash('review/')).toEqual({
      name: 'platform',
      platformId: 'review/',
    });
  });
});

describe('navigate / goBack (история навигации)', () => {
  beforeEach(() => {
    clearNavigation();
    window.location.hash = '';
  });

  it('главная → площадка → ask → submit → площадка: «назад» → главная', () => {
    // главная (hash='') → площадка
    navigate('p1');
    expect(getHash()).toBe('p1');
    // площадка → ask (auth, не пушится)
    navigate('ask/p1');
    expect(getHash()).toBe('ask/p1');
    // ask submit → площадка (ask не пушится в историю)
    navigate('p1');
    expect(getHash()).toBe('p1');
    // «назад» с площадки → главная (предыдущий реальный маршрут)
    goBack();
    expect(getHash()).toBe('');
  });

  it('главная → площадка → review → submit → площадка: «назад» → главная', () => {
    navigate('p1');
    navigate('review/p1');
    navigate('p1');
    goBack();
    expect(getHash()).toBe('');
  });

  it('ask/review не попадают в историю (ни при входе, ни при submit)', () => {
    navigate('p1'); // stack: ['']
    navigate('ask/p1'); // не пушится
    navigate('p1'); // submit, ask не пушится
    // «назад» → главная, а не ask
    goBack();
    expect(getHash()).toBe('');
    // ещё «назад» при пустой истории → главная
    goBack();
    expect(getHash()).toBe('');
  });

  it('прямая ссылка на площадку (пустая история): «назад» → главная', () => {
    window.location.hash = 'p1';
    goBack();
    expect(getHash()).toBe('');
  });

  it('главная → площадка → «назад» → главная', () => {
    navigate('p1'); // stack: ['']
    goBack();
    expect(getHash()).toBe('');
  });

  it('главная → площадка → ask → «назад» → площадка', () => {
    navigate('p1'); // stack: ['']
    navigate('ask/p1'); // площадка сохраняется в стек
    expect(getHash()).toBe('ask/p1');
    goBack();
    expect(getHash()).toBe('p1');
  });

  it('главная → площадка → review → «назад» → площадка', () => {
    navigate('p1'); // stack: ['']
    navigate('review/p1'); // площадка сохраняется в стек
    expect(getHash()).toBe('review/p1');
    goBack();
    expect(getHash()).toBe('p1');
  });

  it('главная → площадка → ask → submit → площадка → «назад» → главная (одним нажатием)', () => {
    navigate('p1'); // stack: ['']
    navigate('ask/p1'); // stack: ['', 'p1']
    navigate('p1'); // submit: верхушка стека 'p1' совпадает → pop → stack: ['']
    expect(getHash()).toBe('p1');
    goBack(); // одним нажатием → главная
    expect(getHash()).toBe('');
  });

  it('главная → площадка → ask → «назад» → площадка → «назад» → главная', () => {
    navigate('p1'); // stack: ['']
    navigate('ask/p1'); // stack: ['', 'p1']
    goBack(); // → площадка
    expect(getHash()).toBe('p1');
    goBack(); // → главная
    expect(getHash()).toBe('');
  });
});

describe('синхронизация стека с hashchange браузера', () => {
  beforeEach(() => {
    clearNavigation();
    window.location.hash = '';
  });

  // В jsdom установка window.location.hash НЕ генерирует hashchange автоматически,
  // поэтому эмулируем его вручную. appNavigate — навигация приложением (navigate),
  // browserNavigate — навигация браузером (кнопки «назад»/«вперёд»).
  function appNavigate(hash: string) {
    navigate(hash);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  function browserNavigate(hash: string) {
    window.location.hash = hash;
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  }

  it('«назад» браузера извлекает маршрут из стека', () => {
    const off = onHashChange(() => {});
    appNavigate('p1'); // stack: ['']
    appNavigate('p2'); // stack: ['', 'p1']
    // Браузер «назад»: p2 → p1
    browserNavigate('p1');
    expect(getHash()).toBe('p1');
    expect(peekNavigation()).toBe(''); // p1 извлечён из стека
    // Приложение «назад» с p1 → главная
    goBack();
    expect(getHash()).toBe('');
    off();
  });

  it('«вперёд» браузера восстанавливает источник в стеке', () => {
    const off = onHashChange(() => {});
    appNavigate('p1'); // stack: ['']
    appNavigate('p2'); // stack: ['', 'p1']
    // Браузер «назад»: p2 → p1 (извлекаем p1)
    browserNavigate('p1');
    expect(peekNavigation()).toBe('');
    // Браузер «вперёд»: p1 → p2 (восстанавливаем источник p1)
    browserNavigate('p2');
    expect(peekNavigation()).toBe('p1');
    // Приложение «назад» с p2 → p1
    goBack();
    expect(getHash()).toBe('p1');
    off();
  });

  it('ask/review не синхронизируются со стеком при «назад» браузера', () => {
    const off = onHashChange(() => {});
    appNavigate('p1'); // stack: ['']
    appNavigate('ask/p1'); // не пушится
    // Браузер «назад»: ask/p1 → p1 (ask не в стеке, ничего не извлекаем)
    browserNavigate('p1');
    expect(peekNavigation()).toBe('');
    // Приложение «назад» с p1 → главная
    goBack();
    expect(getHash()).toBe('');
    off();
  });
});
