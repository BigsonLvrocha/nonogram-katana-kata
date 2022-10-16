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
  return cells.reduce<number[]>((acc, cell, index, arr) => {
    if (cell !== CellState.FILLED) {
      return acc;
    }

    const isNewValueGroup = (): boolean =>
      index === 0 || arr[index - 1] !== CellState.FILLED;

    if (isNewValueGroup()) {
      return acc.concat(1);
    }

    return incrementLastArrayValue(acc);
  }, []);
}

function incrementLastArrayValue(acc: number[]): number[] {
  return acc.slice(0, acc.length - 1).concat(acc[acc.length - 1] + 1);
}
