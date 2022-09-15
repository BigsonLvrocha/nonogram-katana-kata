import { describe, expect, it } from '@jest/globals';
import { buildFullCell, buildXCell } from '../drawable-cell';

describe('Drawable Cell', () => {
  describe('buildFullCell', () => {
    it('build a cell with @', () => {
      const cell = buildFullCell('@');
      expect(cell.draw()).toEqual(['@@', '@@']);
    });
  });

  describe('buildXCell', () => {
    it('builds a cell with x', () => {
      const cell = buildXCell();
      expect(cell.draw()).toEqual(['\\/', '/\\']);
    });
  });
});
