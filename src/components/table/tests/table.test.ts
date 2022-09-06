import { describe, expect, it, beforeEach } from '@jest/globals';
import { CellState } from '../../../contants/cell-state-enum';
import { Table } from '../table';

describe('table', () => {
  describe('table creation', () => {
    it('creates an empty table', () => {
      const table = new Table([], []);
      expect(table.length).toBe(0);
      expect(table.width).toBe(0);
    });

    it('creates a 5x5 table', () => {
      const rowValues = [[], [], [], [], []];
      const collumnValues = [[], [], [], [], []];
      const table = new Table(rowValues, collumnValues);
      expect(table.length).toBe(5);
      expect(table.width).toBe(5);
    });

    it('throws error on negative values for row', () => {
      const rowValues = [[-1], [], [], [], []];
      const collumnValues = [[], [], [], [], []];
      expect(() => new Table(rowValues, collumnValues)).toThrow();
    });

    it('throws error on negative values for collumn', () => {
      const rowValues = [[], [], [], [], []];
      const collumnValues = [[-1], [], [], [], []];
      expect(() => new Table(rowValues, collumnValues)).toThrow();
    });

    it('throws error on fractional values for row', () => {
      const rowValues = [[1.1], [], [], [], []];
      const collumnValues = [[], [], [], [], []];
      expect(() => new Table(rowValues, collumnValues)).toThrow();
    });

    it('throws error on fractional values for collumn', () => {
      const rowValues = [[], [], [], [], []];
      const collumnValues = [[1.1], [], [], [], []];
      expect(() => new Table(rowValues, collumnValues)).toThrow();
    });

    it('throws error on values bigger than possible in a row', () => {
      const rowValues = [[6], [], [], [], []];
      const collumnValues = [[], [], [], [], []];
      expect(() => new Table(rowValues, collumnValues)).toThrow();
    });

    it('throws error on values bigger than possible in a collumn', () => {
      const rowValues = [[], [], [], [], []];
      const collumnValues = [[6], [], [], [], []];
      expect(() => new Table(rowValues, collumnValues)).toThrow();
    });

    it('throws error on sum of values bigger than possible in a row', () => {
      const rowValues = [[3, 2], [], [], [], []];
      const collumnValues = [[], [], [], [], []];
      expect(() => new Table(rowValues, collumnValues)).toThrow();
    });

    it('throws error on sum of values bigger than possible in a collumn', () => {
      const rowValues = [[], [], [], [], []];
      const collumnValues = [[3, 2], [], [], [], []];
      expect(() => new Table(rowValues, collumnValues)).toThrow();
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
