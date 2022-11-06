import { CellState } from '../../constants/cell-state-enum';

export const enum LineValueState {
  EMPTY = 0,
  VALID = 1,
  INVALID = 2,
}

export function analizeLine(
  cellLine: CellState[],
  valueGroupValues: number[],
): {
  valuesState: LineValueState[];
  cellIndexes: Array<Set<number>>;
  valid: boolean[];
} {
  let valueGroupIndexCandidates = Array.from(
    { length: cellLine.length },
    () => new Set<number>(),
  );

  const startingIndexes = Array.from(
    { length: valueGroupValues.length },
    () => 0,
  );

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
        valueGroupIndexCandidates = registerCellIndexesImutable(
          state,
          valueGroupIndexCandidates,
          valueGroupValues,
        );
      }
    }
  };

  iterateIndexes(startingIndexes, 0);

  return {
    valuesState: valueGroupValues.map(() => LineValueState.EMPTY),
    cellIndexes: valueGroupIndexCandidates,
    valid: cellLine.map(() => true),
  };
}

function registerCellIndexesImutable(
  valueGroupStartingCellIndexes: number[],
  cellValueGroupIndexCandidates: Array<Set<number>>,
  valueGroupValues: number[],
): Array<Set<number>> {
  return valueGroupStartingCellIndexes.reduce(
    (acc, valueGroupStart, valueGroupIndex) => {
      const valueGroupValue = valueGroupValues[valueGroupIndex];

      const cellIndexToRegister = Array.from(
        { length: valueGroupValue },
        (_i, i) => i + valueGroupStart,
      );

      return cellIndexToRegister.reduce((acc2, cellIndexToRegister) => {
        acc2[cellIndexToRegister].add(valueGroupIndex);
        return acc2;
      }, acc);
    },
    cellValueGroupIndexCandidates,
  );
}
