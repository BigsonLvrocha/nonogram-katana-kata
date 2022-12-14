import { CellState } from '../../constants/cell-state-enum';

export function isTableFinished(
  state: CellState[][],
  rowValues: number[][],
  colValues: number[][],
): boolean {
  const rowsFinished = state.map((row, index) =>
    isLineFinished(rowValues[index], row),
  );

  const colsFinished = colValues.map((colVals, index) => {
    const lineCells = state.map((row) => row[index]);
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

    if (isCellStartOfValueGroup(arr, index)) {
      return acc.concat(1);
    }

    return incrementLastValue(acc);
  }, []);
}

function isCellStartOfValueGroup(cells: CellState[], index: number): boolean {
  return index === 0 || cells[index - 1] !== CellState.FILLED;
}

function incrementLastValue(acc: number[]): number[] {
  return acc.slice(0, acc.length - 1).concat(acc[acc.length - 1] + 1);
}
