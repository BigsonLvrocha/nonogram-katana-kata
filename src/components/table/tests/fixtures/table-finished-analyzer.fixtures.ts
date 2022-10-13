import { CellState } from '../../../../contants/cell-state-enum';

interface TableFinishedCase {
  state: CellState[][];
  finished: boolean;
}

interface TableDefinition {
  columns: number[][];
  rows: number[][];
}

interface TableFinishAnalizerFixture {
  [key: string]: {
    table: TableDefinition;
    cases: TableFinishedCase[];
  };
}

const u = CellState.UNKNOWN;
const x = CellState.EMPTY;
const o = CellState.FILLED;

export const data: TableFinishAnalizerFixture = {
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
    cases: [
      {
        finished: false,
        state: [
          [u, u, u, u, u],
          [u, u, u, u, u],
          [u, u, u, u, u],
          [u, u, u, u, u],
          [u, u, u, u, u],
        ],
      },
      {
        finished: true,
        state: [
          [o, o, o, o, o],
          [o, u, u, u, u],
          [o, o, o, o, o],
          [u, u, u, u, o],
          [o, o, o, o, o],
        ],
      },
      {
        finished: true,
        state: [
          [o, o, o, o, o],
          [o, x, x, x, x],
          [o, o, o, o, o],
          [x, x, x, x, o],
          [o, o, o, o, o],
        ],
      },
      {
        finished: false,
        state: [
          [o, o, o, o, o],
          [o, x, x, x, o],
          [o, o, o, o, o],
          [x, x, x, x, o],
          [o, o, o, o, o],
        ],
      },
      {
        finished: false,
        state: [
          [o, o, o, o, o],
          [o, x, x, x, x],
          [o, o, o, u, o],
          [x, x, x, x, o],
          [o, o, o, o, o],
        ],
      },
    ],
  },
};
