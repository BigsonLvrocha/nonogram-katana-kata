import { CellState } from '../../../../constants/cell-state-enum';
import {
  tables,
  TableDefinition,
} from '../../../../constants/table-definitions';

interface TableFinishedCase {
  state: CellState[][];
  finished: boolean;
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
    table: tables.snake,
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
  cross: {
    table: tables.cross,
    cases: [
      {
        finished: true,
        state: [
          [x, o, o, o, x],
          [o, o, x, o, o],
          [o, x, x, x, o],
          [o, o, x, o, o],
          [x, o, o, o, x],
        ],
      },
      {
        finished: false,
        state: [
          [x, o, o, o, x],
          [o, o, x, o, o],
          [o, x, o, x, o],
          [o, o, x, o, o],
          [x, o, o, o, x],
        ],
      },
    ],
  },
};
