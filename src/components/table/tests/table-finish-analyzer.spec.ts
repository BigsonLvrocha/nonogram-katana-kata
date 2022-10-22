import { describe, it, expect } from '@jest/globals';
import { Table } from '../table';
import { data } from './fixtures/table-finished-analyzer.fixtures';

import { isTableFinished } from '../table-finished-analyzer';

describe('TableFinishedAnalyzer', () => {
  Object.entries(data).forEach(([tableName, definition]) => {
    describe(`table ${tableName}`, () => {
      definition.cases.forEach(({ finished, state }, caseIndex) => {
        const table = new Table(
          definition.table.rows,
          definition.table.columns,
        );

        state.forEach((row, rowIndex) => {
          row.forEach((cellState, colIndex) => {
            table.setCell(rowIndex, colIndex, cellState);
          });
        });

        it(`returns as ${
          finished ? 'true' : 'false'
        } for case ${caseIndex}`, () => {
          expect(
            isTableFinished(table.state, table.rowValues, table.columnValues),
          ).toEqual(finished);
        });
      });
    });
  });
});
