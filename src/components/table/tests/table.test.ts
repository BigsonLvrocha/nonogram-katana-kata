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

    it('sets a cell state', () => {
      const rowValues = [[], [], [], [], []];
      const collumnValues = [[], [], [], [], []];
      const table = new Table(rowValues, collumnValues);

      table.setCell(0, 0, CellState.FILLED);
      expect(table.state[0][0]).toBe(CellState.FILLED);
    });

    it('throws error when setting out of bounds', () => {
      const rowValues = [[], [], [], [], []];
      const collumnValues = [[], [], [], [], []];
      const table = new Table(rowValues, collumnValues);

      expect(() => table.setCell(-1, 0, CellState.FILLED)).toThrow();
      expect(() => table.setCell(1.1, 0, CellState.FILLED)).toThrow();
      expect(() => table.setCell(5, 0, CellState.FILLED)).toThrow();
      expect(() => table.setCell(0, 5, CellState.FILLED)).toThrow();
    });

    it('prints the table', () => {
      const rowValues = [[], [], [], [], []];
      const collumnValues = [[], [], [], [], []];
      const table = new Table(rowValues, collumnValues);

      table
        .setCell(0, 0, CellState.FILLED)
        .setCell(1, 1, CellState.EMPTY)
        .setCell(2, 2, CellState.FILLED)
        .setCell(3, 3, CellState.EMPTY)
        .setCell(4, 4, CellState.FILLED);
      expect(table.toString()).toBe(
        '/-----\\\n' +
          '|*????|\n' +
          '|?X???|\n' +
          '|??*??|\n' +
          '|???X?|\n' +
          '|????*|\n' +
          '\\-----/\n',
      );
    });

    it('prints the table with numbers in collumn', () => {
      const rowValues = [[], [], [], [], []];
      const collumnValues = [[1], [2], [3], [1], [2]];
      const table = new Table(rowValues, collumnValues);

      expect(table.toString()).toBe(
        ' 12312 \n' +
          '/-----\\\n' +
          '|?????|\n' +
          '|?????|\n' +
          '|?????|\n' +
          '|?????|\n' +
          '|?????|\n' +
          '\\-----/\n',
      );
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
