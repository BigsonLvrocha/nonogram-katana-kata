import { describe, expect, it } from '@jest/globals';
import { CellState } from '../../../contants/cell-state-enum';
import { Table } from '../table';
import { table2String } from '../table-printer';
import { empty5x5, tableWithRowNumbers } from './fixtures/tableArts';

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
    expect(table2String(table)).toBe(empty5x5);
  });

  it('prints the table with numbers in column', () => {
    const rowValues = [[], [], [], [], []];
    const columnValues = [[1], [2], [3], [1], [2]];
    const table = new Table(rowValues, columnValues);

    expect(table2String(table)).toBe(tableWithRowNumbers);
  });
  /*
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

  it('prints the boot table', () => {
    const rowValues = [
      [7],
      [1, 6],
      [2, 2],
      [7],
      [5, 1],
      [5, 1],
      [3, 1, 4, 2],
      [5, 1, 6, 1],
      [2, 5, 7, 2],
      [1, 4, 9, 1],
      [1, 16, 1],
      [17, 2],
      [19],
      [1, 2, 1, 1],
      [11, 1, 3],
    ];
    const columnValues = [
      [5],
      [2, 4],
      [2, 3, 1],
      [2, 4, 1],
      [7, 1],
      [6, 1],
      [5, 1],
      [1, 3, 1],
      [1, 3, 1],
      [1, 4, 1],
      [2, 1, 5, 1],
      [1, 4, 8],
      [1, 11],
      [2, 10],
      [2, 12],
      [2, 10],
      [2, 1, 6, 1],
      [7, 2, 1, 1],
      [2, 3, 4],
      [4],
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
*/
});
