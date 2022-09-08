import { CellState } from '../../contants/cell-state-enum';
import {
  validateNegativeValues,
  validateRangeValues,
} from './table-validation';

export class Table {
  private readonly cells: CellState[][];

  constructor(
    private readonly rowValues: number[][],
    private readonly columnValues: number[][],
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
    return (
      getColumnValuesLines(this.columnValues) +
      getHeader(this.columnValues.length) +
      getBody(this.cells) +
      getFooter(this.columnValues.length)
    );
  }
}

function getColumnValuesLines(columnsValues: readonly number[][]): string {
  const maxLines = columnsValues.reduce(
    (acc, curr) => (acc < curr.length ? curr.length : acc),
    0,
  );
  return Array.from({ length: maxLines }, (_, i) => i)
    .map((currentLine) =>
      getColumnValuesLine(columnsValues, currentLine, maxLines),
    )
    .join('');
}

function getColumnValuesLine(
  columnsValues: readonly number[][],
  currentLine: number,
  maxLines: number,
): string {
  return ` ${columnsValues
    .map((columnValues) => {
      return getColumnValuesLineCharacter(columnValues, currentLine, maxLines);
    })
    .join('')} \n`;
}

function getColumnValuesLineCharacter(
  columnValues: readonly number[],
  currentLine: number,
  maxLines: number,
): string {
  const indexToPrint = currentLine - (maxLines - columnValues.length);
  if (indexToPrint < 0) {
    return ' ';
  }
  return columnValues[indexToPrint].toString();
}

function getBody(cells: CellState[][]): string {
  return cells.map(getRow).join('');
}

function getRow(row: CellState[]): string {
  return `|${getRowCharacters(row)}|\n`;
}

function getHeader(length: number): string {
  return `/${getDashes(length)}\\\n`;
}

function getFooter(length: number): string {
  return `\\${getDashes(length)}/\n`;
}

function getDashes(length: number): string {
  return Array.from({ length }, () => '-').join('');
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
