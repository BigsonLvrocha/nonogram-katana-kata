import { describe, expect, it } from '@jest/globals';
import { buildFullCell, buildXCell, buildNumberCell } from '../drawable-cell';

describe('Drawable Cell', () => {
  describe('buildFullCell', () => {
    it('build a cell with @', () => {
      const cell = buildFullCell('@');
      expect(cell.draw()).toEqual(['@@|', '@@|', '-- ']);
    });

    it('builds a cell with a top', () => {
      const cell = buildFullCell(' ');
      expect(cell.draw({ drawTop: true })).toEqual([
        '-- ',
        '  |',
        '  |',
        '-- ',
      ]);
    });
  });

  describe('buildXCell', () => {
    it('builds a cell with x', () => {
      const cell = buildXCell();
      expect(cell.draw()).toEqual(['\\/|', '/\\|', '-- ']);
    });
  });

  describe('buildBumberCell', () => {
    it('builds a cell for integer with less than 10', () => {
      const cell = buildNumberCell(9);
      expect(cell.draw()).toEqual([' 9|', '  |', '-- ']);
    });

    it('builds a cell for integer with more than 10', () => {
      const cell = buildNumberCell(10);
      expect(cell.draw()).toEqual(['10|', '  |', '-- ']);
    });
  });
});
