import { CellState } from '../../contants/cell-state-enum';
import { Table } from './table';

function isLineFinished(
  valueGroupsValues: number[],
  cells: CellState[],
): boolean {
  let currentValueGroup = -1;
  let currentValueGroupSize = 0;

  let lastCellState = CellState.UNKNOWN;

  for (const cell of cells) {
    if (cell === CellState.FILLED) {
      if (lastCellState !== CellState.FILLED) {
        currentValueGroup += 1;
        currentValueGroupSize = 0;

        if (currentValueGroup >= valueGroupsValues.length) {
          return false;
        }
      }

      currentValueGroupSize += 1;
    } else {
      if (
        lastCellState === CellState.FILLED &&
        currentValueGroupSize !== valueGroupsValues[currentValueGroup]
      ) {
        return false;
      }
    }

    lastCellState = cell;
  }

  return (
    !(currentValueGroup !== valueGroupsValues.length - 1) &&
    !(
      lastCellState === CellState.FILLED &&
      currentValueGroupSize !== valueGroupsValues[currentValueGroup]
    )
  );
}

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
