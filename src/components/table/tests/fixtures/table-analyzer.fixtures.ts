import { CellState } from '../../../../contants/cell-state-enum';
import { LineValueState, TableAnalysis } from '../../table-analyzer';

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
            colValIndexes: [0],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [0],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [0],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [0],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [0],
            rowValIndexes: [0],
            valid: true,
          },
        ],
        [
          {
            state: CellState.UNKNOWN,
            colValIndexes: [0],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [],
            rowValIndexes: [0],
            valid: true,
          },
        ],
        [
          {
            state: CellState.UNKNOWN,
            colValIndexes: [0],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [1],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [1],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [1],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [1],
            rowValIndexes: [0],
            valid: true,
          },
        ],
        [
          {
            state: CellState.UNKNOWN,
            colValIndexes: [],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [1],
            rowValIndexes: [0],
            valid: true,
          },
        ],
        [
          {
            state: CellState.UNKNOWN,
            colValIndexes: [1],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [2],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [2],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [2],
            rowValIndexes: [0],
            valid: true,
          },
          {
            state: CellState.UNKNOWN,
            colValIndexes: [1],
            rowValIndexes: [0],
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
};
