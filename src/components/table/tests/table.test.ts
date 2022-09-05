import { describe, expect, it, beforeEach } from '@jest/globals';
import { CellState } from '../../../contants/cell-state-enum';
import { Table } from '../table';

describe('table', () => {
  describe('empty table', () => {
    it('creates an empty table', () => {
      const table = new Table([], []);
      expect(table.length).toBe(0);
      expect(table.width).toBe(0);
    });
  });

  describe('5x5 snake table', () => {
    let table: Table;

    beforeEach(() => {
      const rowValues = [[5], [1], [5], [1], [5]];
      const collumnValues = [
        [3, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 3],
      ];
      table = new Table(rowValues, collumnValues);
    });

    it('has 5 of length', () => {
      expect(table.length).toBe(5);
    });

    it('has 5 of width', () => {
      expect(table.length).toBe(5);
    });

    it('is empty initially', () => {
      expect(table.state).toHaveLength(5);
      table.state.forEach((row) => {
        expect(row).toHaveLength(5);
        row.map((val) => expect(val).toBe(CellState.UNKNOWN));
      });
    });
  });
});
