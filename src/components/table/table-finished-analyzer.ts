import { CellState } from '../../contants/cell-state-enum';
import { Table } from './table';

export function isTableFinished(table: Table): boolean {
  const rowsFinished = table.state.map((row, index) =>
    isLineFinished(table.rowValues[index], row),
  );

  const colsFinished = table.columnValues.map((colVals, index) => {
    const lineCells = table.state.map((row) => row[index]);
    return isLineFinished(colVals, lineCells);
  });

  return rowsFinished.every((val) => val) && colsFinished.every((val) => val);
}

function isLineFinished(
  valueGroupsValues: number[],
  cells: CellState[],
): boolean {
  const valueGroupSizes = getLineGroupValues(cells);

  return (
    valueGroupSizes.length === valueGroupsValues.length &&
    valueGroupSizes.reduce(
      (acc, curr, index) => acc && curr === valueGroupsValues[index],
      true,
    )
  );
}

function getLineGroupValues(cells: CellState[]): number[] {
  let currentValueGroup = -1;
  const valueGroupSizes = [] as number[];

  let lastCellState = CellState.UNKNOWN;

  for (const cell of cells) {
    if (cell === CellState.FILLED) {
      if (lastCellState !== CellState.FILLED) {
        currentValueGroup += 1;
        valueGroupSizes.push(0);
      }
      valueGroupSizes[currentValueGroup] += 1;
    }

    lastCellState = cell;
  }
  return valueGroupSizes;
}
