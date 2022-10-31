import { expect, it, describe } from '@jest/globals';
import { Table } from '../../table/table';
import { dataset } from './fixtures/table-analyzer.fixtures';
import { analyzeTable } from '../table-analyzer';
import { LineValueState } from '../line-analyzer';

describe('table analyzer', () => {
  describe('empty table', () => {
    Object.entries(dataset).forEach(([tableName, definition]) => {
      describe(`${tableName} table`, () => {
        const table = new Table(
          definition.table.rows,
          definition.table.columns,
        );

        const tableAnalisis = analyzeTable(
          table.state,
          table.rowValues,
          table.columnValues,
        );

        definition.answer.cells.forEach((cellsRow, rowIndex) => {
          cellsRow.forEach((cellAnswer, columnIndex) => {
            it(`process correctly for cell (${rowIndex}, ${columnIndex})`, () => {
              const cellAnalysis = tableAnalisis.cells[rowIndex][columnIndex];
              expect(cellAnalysis).toEqual(cellAnswer);
            });
          });
        });

        tableAnalisis.cells.forEach((cellsRow, rowIndex) => {});

        it('Calculates every values state as empty', () => {
          tableAnalisis.colValues
            .concat(tableAnalisis.rowValues)
            .forEach((line) => {
              line.forEach((group) =>
                expect(group).toEqual(LineValueState.EMPTY),
              );
            });
        });
      });
    });
  });
});
