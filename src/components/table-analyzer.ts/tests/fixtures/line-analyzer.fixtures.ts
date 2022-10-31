import { CellState } from '../../../../constants/cell-state-enum';
import { LineValueState } from '../../line-analyzer';

const u = CellState.UNKNOWN;

interface DatasetEntry {
  line: {
    valueGroupsValues: number[];
    cells: CellState[];
  };
  answer: {
    cells: Array<Set<number>>;
    valueGroupsState: LineValueState[];
    valid: boolean[];
  };
}

interface Dataset {
  [key: string]: DatasetEntry;
}

export const dataset: Dataset = {
  'Empty case [1]': {
    line: {
      valueGroupsValues: [1],
      cells: [u, u, u, u, u],
    },
    answer: {
      cells: [
        new Set([0]),
        new Set([0]),
        new Set([0]),
        new Set([0]),
        new Set([0]),
      ],
      valueGroupsState: [LineValueState.EMPTY],
      valid: [true, true, true, true, true],
    },
  },
  'Empty case [2]': {
    line: {
      valueGroupsValues: [2],
      cells: [u, u, u, u, u],
    },
    answer: {
      cells: [
        new Set([0]),
        new Set([0]),
        new Set([0]),
        new Set([0]),
        new Set([0]),
      ],
      valueGroupsState: [LineValueState.EMPTY],
      valid: [true, true, true, true, true],
    },
  },
};
