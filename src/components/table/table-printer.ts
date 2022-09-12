import { CellState } from '../../contants/cell-state-enum';
import { Table } from './table';

export function table2String(table: Table): string {
  const { state, columnValues, rowValues } = table;
  const headerOffet = getMaxLength(rowValues);
  const columnValueLines = getColumnValuesLines(columnValues, headerOffet);
  const body = getBody(state, rowValues);
  /*
  return (
    getColumnValuesLines(columnValues, headerOffet) +
    getHeader(columnValues.length, headerOffet) +
    getBody(state, rowValues) +
    getFooter(columnValues.length, headerOffet)
  );
  */
  return buildTableFromTuples(columnValueLines.concat(body));
}

function getColumnValuesLines(
  columnsValues: readonly number[][],
  offset: number,
): Array<Array<[string, string]>> {
  const lineLength = getMaxLength(columnsValues);
  return Array.from({ length: lineLength }, (_, i) => i).map((currentLine) =>
    getColumnValuesLine(columnsValues, currentLine, lineLength, offset),
  );
}

function getMaxLength(linesValues: readonly number[][]): number {
  return Math.max(...linesValues.map((lineValues) => lineValues.length));
}

function getColumnValuesLine(
  columnsValues: readonly number[][],
  currentLine: number,
  lineLength: number,
  offset: number,
): Array<[string, string]> {
  const offsetEmptyCells = Array.from(
    { length: offset },
    () => ['xx', 'xx'] as [string, string],
  );
  return offsetEmptyCells.concat(
    columnsValues.map((columnValues) =>
      getColumnValuesLineCharacter(columnValues, currentLine, lineLength),
    ),
  );
}

function getColumnValuesLineCharacter(
  columnValues: readonly number[],
  currentLine: number,
  lineLength: number,
): [string, string] {
  const indexToPrint = currentLine - (lineLength - columnValues.length);
  if (indexToPrint < 0) {
    return ['  ', '  '];
  }
  return getNumberCell(columnValues[indexToPrint]);
}

function getNumberCell(value: number): [string, string] {
  if (value < 10) {
    return [' ' + value.toString(), '  '];
  }
  return [value.toString(), '  '];
}

function getBody(
  cells: CellState[][],
  rowsValues: readonly number[][],
): Array<Array<[string, string]>> {
  const maxRowValueLength = getMaxLength(rowsValues);
  return cells.map((row, index) =>
    getBodyRow(row, rowsValues[index], maxRowValueLength),
  );
}

function getBodyRow(
  row: CellState[],
  rowValues: readonly number[],
  maxRowValueLength: number,
): Array<[string, string]> {
  const rowValuesPart = getBodyRowValues(rowValues, maxRowValueLength);

  return rowValuesPart.concat(getBodyCharacterLine(row));
}

function getBodyRowValues(
  rowValues: readonly number[],
  maxRowValueLength: number,
): Array<[string, string]> {
  const offset = Array.from(
    { length: maxRowValueLength - rowValues.length },
    () => ['  ', '  '] as [string, string],
  );
  const rowValuesCells = rowValues.map(getNumberCell);
  return offset.concat(rowValuesCells);
}

function getBodyCharacterLine(row: CellState[]): Array<[string, string]> {
  return row.map(getCellCharacter);
}

/*
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
*/
function getCellCharacter(cell: CellState): [string, string] {
  switch (cell) {
    case CellState.EMPTY:
      return ['\\/', '/\\'];
    case CellState.FILLED:
      return ['@@', '@@'];
    default:
      return ['  ', '  '];
  }
}

function buildTableFromTuples(
  tuplesRows: Array<Array<[string, string]>>,
): string {
  const width = tuplesRows[0].length;
  let result = buildHorizontalDivision(width);
  result += tuplesRows.map(buildTupleRow).join('');
  return result;
}

function buildTupleRow(tuples: Array<[string, string]>): string {
  let result = '|';
  result += tuples.map((tuple) => tuple[0]).join('|');
  result += '|\n|';
  result += tuples.map((tuple) => tuple[1]).join('|');
  result += '|\n';
  result += buildHorizontalDivision(tuples.length);
  return result;
}

function buildHorizontalDivision(cellLength: number): string {
  return ' --'.repeat(cellLength) + '\n';
}
