import { CellState } from '../../contants/cell-state-enum';

export class Table {
  private readonly cells: CellState[][];

  constructor(
    private readonly columnValues: number[][],
    private readonly rowValues: number[][],
  ) {
    this.cells = Array.from({ length: rowValues.length }, () =>
      Array.from({ length: columnValues.length }, () => CellState.UNKNOWN),
    );
    this.validateNegativeValues(rowValues);
    this.validateNegativeValues(columnValues);
    this.validateRangeValues(rowValues, columnValues.length);
    this.validateRangeValues(columnValues, rowValues.length);
  }

  public get length(): number {
    return this.columnValues.length;
  }

  public get width(): number {
    return this.rowValues.length;
  }

  public get state(): CellState[][] {
    return this.cells.map((row) => row.slice());
  }

  private validateNegativeValues(linesValues: number[][]): void {
    linesValues.forEach((lineValues) =>
      lineValues.forEach((value) => {
        if (value < 0 || !Number.isInteger(value)) {
          throw new Error('Invalid value for table');
        }
      }),
    );
  }

  private validateRangeValues(linesValues: number[][], max: number): void {
    linesValues.forEach((lineValues) => {
      const total =
        lineValues.reduce((acc, curr) => acc + curr, 0) + lineValues.length - 1;
      if (total > max) {
        throw new Error('Too many values in the line');
      }
    });
  }
}
