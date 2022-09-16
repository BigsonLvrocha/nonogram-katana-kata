import { CellState } from '../../contants/cell-state-enum';
import { Table } from '../table/table';
import {
  buildFullCell,
  buildNumberCell,
  buildXCell,
  DrawableCell,
} from '../drawable-cell/drawable-cell';

const blankCell = buildFullCell(' ');

const cellStateToDrawableCellMap: Record<CellState, DrawableCell> = {
  [CellState.EMPTY]: buildXCell(),
  [CellState.FILLED]: buildFullCell('@'),
  [CellState.UNKNOWN]: blankCell,
};

export function table2String(table: Table): string {
  const { state, columnValues, rowValues } = table;
  const columnValueLines = getColumnValuesLines(
    columnValues,
    getMaxLength(rowValues),
  );
  return buildTableFromDrawableCells(
    columnValueLines.concat(getBody(state, rowValues)),
    getMaxLength(rowValues),
    getMaxLength(columnValues),
  );
}

function getColumnValuesLines(
  columnsValues: readonly number[][],
  offset: number,
): DrawableCell[][] {
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
): DrawableCell[] {
  const offsetEmptyCells = Array.from({ length: offset }, () =>
    buildFullCell('x'),
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
): DrawableCell {
  const indexToPrint = currentLine - (lineLength - columnValues.length);
  if (indexToPrint < 0) {
    return buildFullCell(' ');
  }
  return buildNumberCell(columnValues[indexToPrint]);
}

function getBody(
  cells: CellState[][],
  rowsValues: readonly number[][],
): DrawableCell[][] {
  const maxRowValueLength = getMaxLength(rowsValues);
  return cells.map((row, index) =>
    getBodyRow(row, rowsValues[index], maxRowValueLength),
  );
}

function getBodyRow(
  row: CellState[],
  rowValues: readonly number[],
  maxRowValueLength: number,
): DrawableCell[] {
  const rowValuesPart = getBodyRowValues(rowValues, maxRowValueLength);

  return rowValuesPart.concat(getBodyCharacterLine(row));
}

function getBodyRowValues(
  rowValues: readonly number[],
  maxRowValueLength: number,
): DrawableCell[] {
  const offset = Array.from(
    { length: maxRowValueLength - rowValues.length },
    () => blankCell,
  );
  const rowValuesCells = rowValues.map(buildNumberCell);
  return offset.concat(rowValuesCells);
}

function getBodyCharacterLine(row: CellState[]): DrawableCell[] {
  return row.map((state) => cellStateToDrawableCellMap[state]);
}

function buildTableFromDrawableCells(
  cellsRows: DrawableCell[][],
  rowLength: number,
  columnLength: number,
): string {
  return cellsRows
    .map((cellsRow, index) =>
      buildCellRow(
        cellsRow,
        rowLength,
        index === 0,
        columnLength - 1 - index === 0,
      ),
    )
    .join('\n');
}

function buildCellRow(
  cells: DrawableCell[],
  rowLength: number,
  drawTop: boolean,
  doubleBottom: boolean,
): string {
  const cellsDrawings = cells.map((cell, index) =>
    cell.draw({
      drawLeft: index === 0,
      drawTop,
      doubleBottom,
      doubleRight: rowLength - 1 - index === 0,
    }),
  );
  const joinedCells = cellsDrawings.reduce(
    (acc, cur) => acc.map((line, index) => line + cur[index]),
    Array.from({ length: cellsDrawings[0].length }, () => ''),
  );
  return joinedCells.join('\n');
}
