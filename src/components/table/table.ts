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
    const headerOffet = getMaxLength(this.rowValues);
    return (
      getColumnValuesLines(this.columnValues, headerOffet) +
      getHeader(this.columnValues.length, headerOffet) +
      getBody(this.cells, this.rowValues) +
      getFooter(this.columnValues.length, headerOffet)
    );
  }
}

function getColumnValuesLines(
  columnsValues: readonly number[][],
  offset: number,
): string {
  const lineLength = getMaxLength(columnsValues);
  return Array.from({ length: lineLength }, (_, i) => i)
    .map((currentLine) =>
      getColumnValuesLine(columnsValues, currentLine, lineLength, offset),
    )
    .join('');
}

function getMaxLength(linesValues: readonly number[][]): number {
  return Math.max(...linesValues.map((lineValues) => lineValues.length));
}

function getColumnValuesLine(
  columnsValues: readonly number[][],
  currentLine: number,
  lineLength: number,
  offset: number,
): string {
  return (
    ' '.repeat(offset + 1) +
    columnsValues
      .map((columnValues) => {
        return getColumnValuesLineCharacter(
          columnValues,
          currentLine,
          lineLength,
        );
      })
      .join('') +
    ' \n'
  );
}

function getColumnValuesLineCharacter(
  columnValues: readonly number[],
  currentLine: number,
  lineLength: number,
): string {
  const indexToPrint = currentLine - (lineLength - columnValues.length);
  if (indexToPrint < 0) {
    return ' ';
  }
  return columnValues[indexToPrint].toString();
}

function getBody(
  cells: CellState[][],
  rowsValues: readonly number[][],
): string {
  const maxRowValueLength = getMaxLength(rowsValues);
  return cells
    .map((row, index) => getBodyRow(row, rowsValues[index], maxRowValueLength))
    .join('');
}

function getBodyRow(
  row: CellState[],
  rowValues: number[],
  maxRowValueLength: number,
): string {
  return (
    getBodyRowValues(rowValues, maxRowValueLength) + getBodyCharacterLine(row)
  );
}

function getBodyRowValues(
  rowValues: number[],
  maxRowValueLength: number,
): string {
  return ' '.repeat(maxRowValueLength - rowValues.length) + rowValues.join('');
}

function getBodyCharacterLine(row: CellState[]): string {
  return `|${getRowCharacters(row)}|\n`;
}

function getHeader(length: number, offset: number): string {
  return ' '.repeat(offset) + `/${getDashes(length)}\\\n`;
}

function getFooter(length: number, offset: number): string {
  return ' '.repeat(offset) + `\\${getDashes(length)}/\n`;
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
