import { CellState } from '../../contants/cell-state-enum';
import { validateTableValues } from './table-validation';
import { isTableFinished } from './table-finished-analyzer';

export class Table {
  private readonly cells: CellState[][];
  private _selectedCell: [number, number] | undefined;

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

  public get finished(): boolean {
    return isTableFinished(this.state, this.rowValues, this.columnValues);
  }

  public get selectedCell(): [number, number] | undefined {
    return this._selectedCell;
  }

  public setCell(row: number, collumn: number, state: CellState): this {
    this.checkBounds(row, this.rowValues.length);
    this.checkBounds(collumn, this.columnValues.length);
    this.cells[row][collumn] = state;
    return this;
  }

  public selectCell(row: number, col: number): this {
    this.checkBounds(row, this.rowValues.length);
    this.checkBounds(col, this.columnValues.length);
    this._selectedCell = [row, col];
    return this;
  }

  private checkBounds(index: number, lineSize: number): void {
    if (index < 0 || index >= lineSize) {
      throw new Error('Out of bounds');
    }
  }

  private buildCells(): CellState[][] {
    return Array.from({ length: this.rowValues.length }, () =>
      Array.from({ length: this.columnValues.length }, () => CellState.UNKNOWN),
    );
  }
}
