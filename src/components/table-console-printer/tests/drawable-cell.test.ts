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

    it('builds a cells with a double bottom', () => {
      const cell = buildFullCell(' ');
      expect(cell.draw({ doubleBottom: true })).toEqual(['  |', '  |', '== ']);
    });

    it('build a cell with a top and double bottom', () => {
      const cell = buildFullCell(' ');
      expect(cell.draw({ drawTop: true, doubleBottom: true })).toEqual([
        '-- ',
        '  |',
        '  |',
        '== ',
      ]);
    });

    it('builds a cell with a left border', () => {
      const cell = buildFullCell(' ');
      expect(cell.draw({ drawLeft: true })).toEqual(['|  |', '|  |', ' -- ']);
    });

    it('build a cell with a top and left border', () => {
      const cell = buildFullCell(' ');
      expect(cell.draw({ drawTop: true, drawLeft: true })).toEqual([
        ' -- ',
        '|  |',
        '|  |',
        ' -- ',
      ]);
    });

    it('build a cell with a double bottom and left border', () => {
      const cell = buildFullCell(' ');
      expect(cell.draw({ doubleBottom: true, drawLeft: true })).toEqual([
        '|  |',
        '|  |',
        ' == ',
      ]);
    });

    it('build a cell with a double bottom, left and top border', () => {
      const cell = buildFullCell(' ');
      expect(
        cell.draw({ doubleBottom: true, drawLeft: true, drawTop: true }),
      ).toEqual([' -- ', '|  |', '|  |', ' == ']);
    });

    it('builds a cell with double right', () => {
      const cell = buildFullCell(' ');
      expect(cell.draw({ doubleRight: true })).toEqual([
        '  ||',
        '  ||',
        '--  ',
      ]);
    });

    it('builds a cell with double right and top', () => {
      const cell = buildFullCell(' ');
      expect(cell.draw({ doubleRight: true, drawTop: true })).toEqual([
        '--  ',
        '  ||',
        '  ||',
        '--  ',
      ]);
    });

    it('builds a cell with double right and left', () => {
      const cell = buildFullCell(' ');
      expect(cell.draw({ doubleRight: true, drawLeft: true })).toEqual([
        '|  ||',
        '|  ||',
        ' --  ',
      ]);
    });

    it('builds a cell with double right and double bottom', () => {
      const cell = buildFullCell(' ');
      expect(cell.draw({ doubleRight: true, doubleBottom: true })).toEqual([
        '  ||',
        '  ||',
        '==  ',
      ]);
    });

    it('builds a cell with double right, top and left border', () => {
      const cell = buildFullCell(' ');
      expect(
        cell.draw({ doubleRight: true, drawTop: true, drawLeft: true }),
      ).toEqual([' --  ', '|  ||', '|  ||', ' --  ']);
    });

    it('builds a cell with double right, top and double bottom border', () => {
      const cell = buildFullCell(' ');
      expect(
        cell.draw({ doubleRight: true, drawTop: true, doubleBottom: true }),
      ).toEqual(['--  ', '  ||', '  ||', '==  ']);
    });

    it('builds a cell with double right, left and double bottom border', () => {
      const cell = buildFullCell(' ');
      expect(
        cell.draw({ doubleRight: true, drawLeft: true, doubleBottom: true }),
      ).toEqual(['|  ||', '|  ||', ' ==  ']);
    });

    it('builds a cell with double right, left, double bottom and top border', () => {
      const cell = buildFullCell(' ');
      expect(
        cell.draw({
          doubleRight: true,
          drawLeft: true,
          doubleBottom: true,
          drawTop: true,
        }),
      ).toEqual([' --  ', '|  ||', '|  ||', ' ==  ']);
    });

    it('build a selected cell', () => {
      const cell = buildFullCell('@');
      expect(cell.draw({ selected: true })).toEqual(['@@|', '@*|', '-- ']);
    });
  });

  describe('buildXCell', () => {
    it('builds a cell with x', () => {
      const cell = buildXCell();
      expect(cell.draw()).toEqual(['\\/|', '/\\|', '-- ']);
    });

    it('builds a selected cell with x', () => {
      const cell = buildXCell();
      expect(cell.draw({ selected: true })).toEqual(['\\/|', '/*|', '-- ']);
    });
  });

  describe('buildNumberCell', () => {
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
