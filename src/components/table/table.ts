import { CellState } from '../../contants/cell-state-enum';
import { validateTableValues } from './table-validation';

export class Table {
  private readonly cells: CellState[][];

  constructor(
    public readonly rowValues: number[][],
    public readonly columnValues: number[][],
  ) {
    this.cells = this.buildCells();
    validateTableValues(rowValues, columnValues);
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

  public setCell(row: number, collumn: number, state: CellState): this {
    this.checkBounds(row, this.rowValues.length);
    this.checkBounds(collumn, this.columnValues.length);
    this.cells[row][collumn] = state;
    return this;
  }

  private checkBounds(index: number, lineSize: number): void {
    if (index >= lineSize) {
      throw new Error('Out of bounds');
    }
  }

  private buildCells(): CellState[][] {
    return Array.from({ length: this.rowValues.length }, () =>
      Array.from({ length: this.columnValues.length }, () => CellState.UNKNOWN),
    );
  }
}
