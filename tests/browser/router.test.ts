import { describe, it, expect } from 'vitest';
import { parseHash } from '@/lib/router';

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
