import { TableDefinitions } from '../../contants/table-definitions';
import { ConsoleMenu, MenuEntryDefinition } from '../console-menu/console-menu';
import { Prompter } from '../console-menu/prompter';
import { Table } from '../table/table';

interface ConsoleGameDependencies {
  log: (text: string) => void;
  prompter: Prompter;
  consoleMenu: ConsoleMenu;
}

export class ConsoleGame {
  constructor(private readonly deps: ConsoleGameDependencies) {}

  async run(tablesDefinitions: TableDefinitions): Promise<void> {
    this.deps.log('Welcome to nonogram katana console game');

    await this.pickTable(tablesDefinitions);

    this.deps.log('Bye');
  }

  private async pickTable(
    tablesDefinitions: TableDefinitions,
  ): Promise<Table | null> {
    const tableSelectionMenu = Object.entries(tablesDefinitions)
      .map(
        ([tableName, tableDef]): MenuEntryDefinition<Table | null> => ({
          text: `${tableName} (${tableDef.rows.length}x${tableDef.columns.length})`,
          onSelected: () => new Table(tableDef.rows, tableDef.columns),
        }),
      )
      .concat({
        text: "I don't want to play anymore",
        onSelected: () => null,
      });
    return await this.pickTableWithRetries(tableSelectionMenu);
  }

  private async pickTableWithRetries(
    menu: MenuEntryDefinition[],
  ): Promise<Table | null> {
    const table = await this.deps.consoleMenu.prompt(
      menu,
      'Pick a table to play',
    );

    if (table != null) {
      return table;
    }

    const quitConfirm = await this.confirmQuit();

    if (quitConfirm) {
      return null;
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
