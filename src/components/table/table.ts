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
    this.validateValues(rowValues);
    columnValues.forEach((vals) =>
      vals.forEach((val) => {
        if (val < 0) {
          throw new Error('Invalid value for table');
        }
      }),
    );
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

  private validateValues(values: number[][]): void {
    values.forEach((vals) =>
      vals.forEach((val) => {
        if (val < 0) {
          throw new Error('Invalid value for table');
        }
      }),
    );
  }
}
