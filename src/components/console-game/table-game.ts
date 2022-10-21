import { isTableFinished } from '../table/table-finished-analyzer';
import { Table } from '../table/table';
import { table2String } from '../table-console-printer/table-printer';
import { CellState } from '../../contants/cell-state-enum';
import { ConsoleMenu } from '../console-menu/console-menu';
import { Prompter } from '../console-menu/prompter';

interface TableGameDependencies {
  log: (text: string) => void;
  consoleMenu: ConsoleMenu;
  promt: Prompter;
}

export class TableGame {
  private table: Table;

  constructor(
    private readonly rows: number[][],
    private readonly columns: number[][],
    private readonly deps: TableGameDependencies,
  ) {
    this.table = new Table(rows, columns);
  }

  async runGame(): Promise<void> {
    while (!isTableFinished(this.table)) {
      this.deps.log(table2String(this.table));

      const shouldContinue = await this.deps.consoleMenu.prompt<boolean>(
        [
          {
            text: 'Mark a cell',
            onSelected: async () => await this.markCell(),
          },
          {
            text: 'Reset',
            onSelected: () => {
              this.resetTable();
              return true;
            },
            confirm: true,
          },
          {
            text: 'Exit',
            onSelected: () => false,
            confirm: true,
          },
        ],
        'What do you want to do?',
      );

      if (!shouldContinue) {
        return;
      }
    }
  }

  private resetTable(): void {
    this.table = new Table(this.rows, this.columns);
  }

  private async markCell(): Promise<boolean> {
    const rowNo = await this.getCellNumberWithRetries('row');
    const colNo = await this.getCellNumberWithRetries('collumn');
    await this.deps.consoleMenu.prompt([
      {
        text: 'Fill',
        onSelected: () => this.table.setCell(rowNo, colNo, CellState.FILLED),
      },
      {
        text: 'Cross',
        onSelected: () => this.table.setCell(rowNo, colNo, CellState.EMPTY),
      },
      {
        text: 'Clear',
        onSelected: () => this.table.setCell(rowNo, colNo, CellState.UNKNOWN),
      },
    ]);
    return true;
  }

  private async getCellNumberWithRetries(
    direction: 'row' | 'collumn',
  ): Promise<number> {
    const max = direction === 'row' ? this.rows.length : this.columns.length;

    const numberStr = await this.deps.promt.query(
      `Chose the ${direction} number (0-${max}): `,
    );
    const num = Number.parseInt(numberStr, 10);

    if (Number.isNaN(num) || num < 0 || num > max) {
      this.deps.log('invalid choice give');
      return await this.getCellNumberWithRetries(direction);
    }

    return num;
  }
}
