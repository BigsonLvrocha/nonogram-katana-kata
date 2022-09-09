import { describe, expect, it } from '@jest/globals';
import { CellState } from '../../../contants/cell-state-enum';
import { Table } from '../table';
import { table2String } from '../table-printer';

describe('table printer', () => {
  it('prints the table', () => {
    const rowValues = [[], [], [], [], []];
    const columnValues = [[], [], [], [], []];
    const table = new Table(rowValues, columnValues);

    table
      .setCell(0, 0, CellState.FILLED)
      .setCell(1, 1, CellState.EMPTY)
      .setCell(2, 2, CellState.FILLED)
      .setCell(3, 3, CellState.EMPTY)
      .setCell(4, 4, CellState.FILLED);
    expect(table2String(table)).toBe(
      '/-----\\\n' +
        '|*????|\n' +
        '|?X???|\n' +
        '|??*??|\n' +
        '|???X?|\n' +
        '|????*|\n' +
        '\\-----/\n',
    );
  });

  it('prints the table with numbers in column', () => {
    const rowValues = [[], [], [], [], []];
    const columnValues = [[1], [2], [3], [1], [2]];
    const table = new Table(rowValues, columnValues);

    expect(table2String(table)).toBe(
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

  it('prints the table with multiple numbers in column', () => {
    const rowValues = [[], [], [], [], []];
    const columnValues = [[1], [1, 2], [3], [1, 1, 1], [2]];
    const table = new Table(rowValues, columnValues);

    expect(table2String(table)).toBe(
      '    1  \n' +
        '  1 1  \n' +
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

  it('prints the table with multiple numbers in rows', () => {
    const columnValues = [[], [], [], [], []];
    const rowValues = [[1], [1, 2], [3], [1, 1, 1], [2]];
    const table = new Table(rowValues, columnValues);

    expect(table2String(table)).toBe(
      '   /-----\\\n' +
        '  1|?????|\n' +
        ' 12|?????|\n' +
        '  3|?????|\n' +
        '111|?????|\n' +
        '  2|?????|\n' +
        '   \\-----/\n',
    );
  });

  it('prints the snake table', () => {
    const rowValues = [[5], [1], [5], [1], [5]];
    const columnValues = [
      [3, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 1, 1],
      [1, 3],
    ];
    const table = new Table(rowValues, columnValues);

    expect(table2String(table)).toBe(
      '   111  \n' +
        '  31111 \n' +
        '  11113 \n' +
        ' /-----\\\n' +
        '5|?????|\n' +
        '1|?????|\n' +
        '5|?????|\n' +
        '1|?????|\n' +
        '5|?????|\n' +
        ' \\-----/\n',
    );
  });
});
