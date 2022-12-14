import { CellState } from '../../../../constants/cell-state-enum';
import { LineValueState } from '../../line-analyzer';
import { TableAnalysis } from '../../table-analyzer';

interface TableValuesDefinition {
  columns: number[][];
  rows: number[][];
}

export const dataset: Record<
  string,
  { table: TableValuesDefinition; answer: TableAnalysis }
> = {
  snake: {
    table: {
      columns: [
        [3, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 3],
      ],
      rows: [[5], [1], [5], [1], [5]],
    },
    answer: {
      cells: [
        [
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
        ],
        [
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
        ],
        [
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
        ],
        [
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
        ],
        [
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([2]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([2]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([2]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            valid: true,
          },
        ],
      ],
      colValues: [
        [LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY],
      ],
      rowValues: [
        [LineValueState.EMPTY],
        [LineValueState.EMPTY],
        [LineValueState.EMPTY],
        [LineValueState.EMPTY],
        [LineValueState.EMPTY],
      ],
    },
  },
  sharp: {
    table: {
      columns: [[1, 1], [5], [1, 1], [5], [1, 1]],
      rows: [[1, 1], [5], [1, 1], [5], [1, 1]],
    },
    answer: {
      colValues: [
        [LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY],
      ],
      rowValues: [
        [LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY],
      ],
      cells: [
        [
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0, 1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
        [
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
        [
          {
            colValIndexes: new Set([0, 1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0, 1]),
            rowValIndexes: new Set([0, 1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0, 1]),
            rowValIndexes: new Set([1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
        [
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
        [
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0, 1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
      ],
    },
  },
  zorro: {
    table: {
      columns: [
        [1, 1],
        [1, 2],
        [1, 1, 1],
        [2, 1],
        [1, 1],
      ],
      rows: [[5], [1], [1], [1], [5]],
    },
    answer: {
      colValues: [
        [LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY],
      ],
      rowValues: [
        [LineValueState.EMPTY],
        [LineValueState.EMPTY],
        [LineValueState.EMPTY],
        [LineValueState.EMPTY],
        [LineValueState.EMPTY],
      ],
      cells: [
        [
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
        [
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
        [
          {
            colValIndexes: new Set([0, 1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0, 1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
        [
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
        [
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([2]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
      ],
    },
  },
  cross: {
    table: {
      columns: [[3], [2, 2], [1, 1], [2, 2], [3]],
      rows: [[3], [2, 2], [1, 1], [2, 2], [3]],
    },
    answer: {
      colValues: [
        [LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY],
      ],
      rowValues: [
        [LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY, LineValueState.EMPTY],
        [LineValueState.EMPTY],
      ],
      cells: [
        [
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
        [
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
        [
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1, 0]),
            rowValIndexes: new Set([1, 0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([]),
            rowValIndexes: new Set([1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
        [
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([1]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
        [
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([1]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
          {
            colValIndexes: new Set([0]),
            rowValIndexes: new Set([0]),
            state: CellState.UNKNOWN,
            valid: true,
          },
        ],
      ],
    },
  },
};
