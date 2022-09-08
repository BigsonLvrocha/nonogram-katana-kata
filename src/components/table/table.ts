import { CellState } from '../../contants/cell-state-enum';
import {
  validateNegativeValues,
  validateRangeValues,
} from './table-validation';

export class Table {
  private readonly cells: CellState[][];

  constructor(
    private readonly columnValues: number[][],
    private readonly rowValues: number[][],
  ) {
    this.cells = Array.from({ length: rowValues.length }, () =>
      Array.from({ length: columnValues.length }, () => CellState.UNKNOWN),
    );
    validateNegativeValues(rowValues);
    validateNegativeValues(columnValues);
    validateRangeValues(rowValues, columnValues.length);
    validateRangeValues(columnValues, rowValues.length);
  }

  public get length(): number {
    return this.columnValues.length;
  }

  public get width(): number {
    return this.rowValues.length;
  }

  public get state(): CellState[][] {
    return this.cells.map((row) => row.slice());
  }

  public setCell(row: number, collumn: number, state: CellState): this {
    this.checkBounds(row, this.rowValues.length);
    this.checkBounds(collumn, this.columnValues.length);
    this.cells[row][collumn] = state;
    return this;
  }

  private checkBounds(index: number, lineSize: number): void {
    if (index >= lineSize) {
      throw new Error('Out of bounds');
    }
  }

  public toString(): string {
    const header = getHeader(this.columnValues.length);
    const middleRows = getBody(this.cells);
    const footer = `\\${getDashes(this.columnValues.length)}/\n`;
    return `${header}${middleRows}${footer}`;
  }
}

function getBody(cells: CellState[][]): string {
  return cells.map((row) => `|${getRowCharacters(row)}|\n`).join('');
}

function getHeader(collumns: number): string {
  return `/${getDashes(this.columnValues.length)}\\\n`;
}

function getDashes(number: number): string {
  return Array.from({ length: number }, () => '-').join('');
}

function getRowCharacters(row: CellState[]): string {
  return row.map(getCellCharacter).join('');
}

function getCellCharacter(cell: CellState): string {
  switch (cell) {
    case CellState.EMPTY:
      return 'X';
    case CellState.FILLED:
      return '*';
    default:
      return '?';
  }
}
