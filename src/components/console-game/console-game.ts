import { TableDefinitions } from '../../contants/table-definitions';
import { ConsoleMenu, MenuEntryDefinition } from '../console-menu/console-menu';
import { Prompter } from '../console-menu/prompter';
import { Table } from '../table/table';

interface ConsoleGameDependencies {
  log: (text: string) => void;
  table2String: (table: Table) => string;
  prompter: Prompter;
  consoleMenu: ConsoleMenu;
}

export class ConsoleGame {
  private table: Table | null = null;

  constructor(private readonly deps: ConsoleGameDependencies) {}

  async run(tablesDefinitions: TableDefinitions): Promise<void> {
    this.deps.log('Welcome to nonogram katana console game');

    await this.pickTable(tablesDefinitions);
  }

  private async pickTable(tablesDefinitions: TableDefinitions): Promise<void> {
    const tableSelectionMenu = Object.entries(tablesDefinitions)
      .map(
        ([tableName, tableDef]): MenuEntryDefinition => ({
          text: `${tableName} (${tableDef.rows.length}x${tableDef.columns.length})`,
          onSelected: () => {
            this.table = new Table(tableDef.rows, tableDef.columns);
          },
        }),
      )
      .concat({
        text: "I don't want to play anymore",
        onSelected: () => {},
      });
    await this.pickTableWithRetries(tableSelectionMenu);
  }

  private async pickTableWithRetries(
    menu: MenuEntryDefinition[],
  ): Promise<boolean> {
    await this.deps.consoleMenu.prompt(menu, 'Pick a table to play');

    if (this.table != null) {
      return true;
    }

    const quitConfirm = await this.confirmQuit();

    if (quitConfirm) {
      return false;
    }

    return await this.pickTableWithRetries(menu);
  }

  private async confirmQuit(): Promise<boolean> {
    const answer = await this.deps.prompter.query(
      'Are you sure you want to quit? (y/n): ',
    );
    return answer === 'y';
  }
}
