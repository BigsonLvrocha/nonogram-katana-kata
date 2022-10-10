import { CellState } from '../../contants/cell-state-enum';
import { Table } from './table';

export const enum LineValueState {
  EMPTY = 0,
  VALID = 1,
  INVALID = 2,
}

export interface CellAnalysis {
  state: CellState;
  colValIndexes: Set<number>;
  rowValIndexes: Set<number>;
  valid: boolean;
}

export interface TableAnalysis {
  cells: CellAnalysis[][];
  colValues: LineValueState[][];
  rowValues: LineValueState[][];
}

export function analyzeTable(table: Table): TableAnalysis {
  const state = table.state;

  // primeiro faremos por linhas
  const rowAnalysis = table.rowValues.map((rowVals, index) =>
    analizeLine(state[index], rowVals),
  );

  const colsAnalysis = table.columnValues.map((colVals, index) => {
    const colCells = state.map((row) => row[index]);
    return analizeLine(colCells, colVals);
  });

  return {
    cells: state.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        return {
          colValIndexes: colsAnalysis[colIndex].cellIndexes[rowIndex],
          rowValIndexes: rowAnalysis[rowIndex].cellIndexes[colIndex],
          state: cell,
          valid: true,
        };
      }),
    ),
    colValues: colsAnalysis.map((col) => col.valuesState),
    rowValues: rowAnalysis.map((col) => col.valuesState),
  };
}

function analizeLine(
  cellLine: CellState[],
  valueGroupValues: number[],
): {
  valuesState: LineValueState[];
  cellIndexes: Array<Set<number>>;
  valid: boolean[];
} {
  const cellValueGroupIndexCandidates = Array.from(
    { length: cellLine.length },
    () => new Set<number>(),
  );
  const startingIndexes = Array.from(
    { length: valueGroupValues.length },
    () => 0,
  );

  const registerCellIndexes = (valueGroupStartCellIndexes: number[]): void => {
    for (const [
      valueGroupIndex,
      valueGroupStartCellIndex,
    ] of valueGroupStartCellIndexes.entries()) {
      for (
        let cellIndex = valueGroupStartCellIndex;
        cellIndex <
        valueGroupStartCellIndex + valueGroupValues[valueGroupIndex];
        cellIndex += 1
      ) {
        cellValueGroupIndexCandidates[cellIndex].add(valueGroupIndex);
      }
    }
  };

  const iterateIndexes = (
    valueGroupStartCellIndexes: number[],
    currValueGroupIndex: number,
  ): void => {
    const totalSize =
      valueGroupValues
        .slice(currValueGroupIndex)
        .reduce((acc, cur) => acc + cur, 0) +
      valueGroupValues.slice(currValueGroupIndex).length -
      1;

    const maxCellIndexForValGroupStart = cellLine.length - totalSize;

    for (
      let valueGroupStartingCellIndex =
        valueGroupStartCellIndexes[currValueGroupIndex];
      valueGroupStartingCellIndex <= maxCellIndexForValGroupStart;
      valueGroupStartingCellIndex += 1
    ) {
      const state = valueGroupStartCellIndexes.slice();
      state[currValueGroupIndex] = valueGroupStartingCellIndex;

      if (currValueGroupIndex < valueGroupStartCellIndexes.length - 1) {
        state[currValueGroupIndex + 1] =
          valueGroupStartingCellIndex +
          valueGroupValues[currValueGroupIndex] +
          1;
        iterateIndexes(state, currValueGroupIndex + 1);
      } else {
        registerCellIndexes(state);
      }
    }
  };

  iterateIndexes(startingIndexes, 0);

  return {
    valuesState: valueGroupValues.map(() => LineValueState.EMPTY),
    cellIndexes: cellValueGroupIndexCandidates,
    valid: cellLine.map(() => true),
  };
}
