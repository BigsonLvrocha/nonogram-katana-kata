import { CellState } from '../../../../constants/cell-state-enum';
import { Table } from '../../../../components/table/table';
import {
  buildFullCell,
  buildNumberCell,
  buildXCell,
  DrawableCell,
} from './drawable-cell';
import { buildArray } from '../../../../services/array';

const blankCell = buildFullCell(' ');

const cellStateToDrawableCellMap: Record<CellState, DrawableCell> = {
  [CellState.EMPTY]: buildXCell(),
  [CellState.FILLED]: buildFullCell('@'),
  [CellState.UNKNOWN]: blankCell,
};

export function table2String(table: Table): string {
  const { state, columnValues, rowValues, selectedCell } = table;
  return rawTable2String({ state, columnValues, rowValues, selectedCell });
}

export function rawTable2String({
  state,
  columnValues,
  rowValues,
  selectedCell,
}: Pick<
  Table,
  'state' | 'columnValues' | 'rowValues' | 'selectedCell'
>): string {
  return drawTableFromDrawableCells({
    cellsRows: getHeaderDrawableCells(
      columnValues,
      getMaxLength(rowValues),
    ).concat(getBodyDrawableCells(state, rowValues)),
    colValuesLength: getMaxLength(columnValues),
    rowValuesLength: getMaxLength(rowValues),
    selectedCell,
  });
}

function getHeaderDrawableCells(
  columnsValues: readonly number[][],
  offset: number,
): DrawableCell[][] {
  const columnValuesLineLength = getMaxLength(columnsValues);
  return buildArray(columnValuesLineLength, (i) => i).map((currentLine) =>
    getColumnValuesLine(
      columnsValues,
      currentLine,
      columnValuesLineLength,
      offset,
    ),
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
  const offsetEmptyCells = buildArray(offset, () => buildFullCell('x'));
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

function getBodyDrawableCells(
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
  const offset = buildArray(
    maxRowValueLength - rowValues.length,
    () => blankCell,
  );
  const rowValuesCells = rowValues.map(buildNumberCell);
  return offset.concat(rowValuesCells);
}

function getBodyCharacterLine(row: CellState[]): DrawableCell[] {
  return row.map((state) => cellStateToDrawableCellMap[state]);
}

function drawTableFromDrawableCells({
  cellsRows,
  colValuesLength,
  rowValuesLength,
  selectedCell,
}: {
  cellsRows: DrawableCell[][];
  rowValuesLength: number;
  colValuesLength: number;
  selectedCell: [number, number] | undefined;
}): string {
  return cellsRows
    .map((cellsRow, index) =>
      drawCellRow({
        cells: cellsRow,
        rowValuesLength,
        options: {
          drawTop: isStartingEdge(index),
          doubleBottom: isDivision(colValuesLength, index),
          selectedCellIndex:
            selectedCell != null && selectedCell[0] + colValuesLength === index
              ? selectedCell[1]
              : undefined,
        },
      }),
    )
    .join('\n');
}

interface DrawLineOptions {
  drawTop: boolean;
  doubleBottom: boolean;
  selectedCellIndex: number | undefined;
}

function drawCellRow({
  cells,
  options,
  rowValuesLength,
}: {
  cells: DrawableCell[];
  rowValuesLength: number;
  options: DrawLineOptions;
}): string {
  const cellsDrawings = cells.map((cell, index) =>
    drawCell({
      cell,
      index,
      rowValuesLength,
      options,
    }),
  );
  return drawLineFromStringArray(cellsDrawings);
}

function drawCell({
  cell,
  index,
  rowValuesLength,
  options,
}: {
  cell: DrawableCell;
  index: number;
  rowValuesLength: number;
  options: DrawLineOptions;
}): string[] {
  return cell.draw({
    drawLeft: isStartingEdge(index),
    doubleRight: isDivision(rowValuesLength, index),
    selected:
      options.selectedCellIndex !== undefined
        ? options.selectedCellIndex + rowValuesLength === index
        : false,
    ...options,
  });
}

function isDivision(valuesLength: number, index: number): boolean {
  return valuesLength - 1 - index === 0;
}

function isStartingEdge(index: number): boolean {
  return index === 0;
}

function drawLineFromStringArray(cellsDrawings: string[][]): string {
  return cellsDrawings
    .reduce(
      (acc, cur) => acc.map((line, index) => line + cur[index]),
      buildArray(cellsDrawings[0].length, () => ''),
    )
    .join('\n');
}
