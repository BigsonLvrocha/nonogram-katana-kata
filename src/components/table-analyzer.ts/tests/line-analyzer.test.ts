import { expect, describe, it } from '@jest/globals';
import { dataset } from './fixtures/line-analyzer.fixtures';
import { analizeLine } from '../line-analyzer';

describe('line-analyzer', () => {
  Object.entries(dataset).forEach(([caseName, data]) => {
    describe(caseName, () => {
      const result = analizeLine(data.line.cells, data.line.valueGroupsValues);

      it('results with the right number of cells', () => {
        expect(result.cellIndexes.length).toEqual(data.answer.cells.length);
        expect(result.valid.length).toEqual(data.answer.valid.length);
      });

      it('results with the right number of group value', () => {
        expect(result.valuesState.length).toEqual(
          data.answer.valueGroupsState.length,
        );
      });

      data.answer.valid.forEach((valid, index) => {
        it(`results with the right valid for index ${index}`, () => {
          expect(result.valid[index]).toEqual(valid);
        });
      });

      data.answer.cells.forEach((cells, index) => {
        it(`results with the correct value group candidates for index ${index}`, () => {
          expect(result.cellIndexes[index]).toEqual(cells);
        });
      });
    });
  });
});
