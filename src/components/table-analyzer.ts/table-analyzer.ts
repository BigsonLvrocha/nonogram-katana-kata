import { CellState } from '../../constants/cell-state-enum';
import { analizeLine, LineValueState } from './line-analyzer';

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

export function analyzeTable(
  state: CellState[][],
  rowValues: number[][],
  colValues: number[][],
): TableAnalysis {
  // primeiro faremos por linhas
  const rowAnalysis = rowValues.map((rowVals, index) =>
    analizeLine(state[index], rowVals),
  );

  const colsAnalysis = colValues.map((colVals, index) => {
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
