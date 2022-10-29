import {
  TableDefinition,
  TableDefinitions,
} from '../../contants/table-definitions';
import {
  ConsoleMenu,
  MenuEntryDefinition,
} from '../../interfaces/console/components/console-menu/console-menu';
import { Prompter } from '../../interfaces/console/components/console-menu/prompter';
import { TableGame } from './table-game';

interface ConsoleGameDependencies {
  log: (text: string) => void;
  prompter: Prompter;
  consoleMenu: ConsoleMenu;
  clear: () => void;
}

export class ConsoleGame {
  constructor(private readonly deps: ConsoleGameDependencies) {}

  async run(tablesDefinitions: TableDefinitions): Promise<void> {
    this.deps.log('Welcome to nonogram katana console game');

    while (true) {
      const table = await this.pickTable(tablesDefinitions);

      if (table === null) {
        this.deps.log('Bye');
        return;
      }

      this.deps.clear();

      await new TableGame(table.rows, table.columns, {
        consoleMenu: this.deps.consoleMenu,
        log: this.deps.log,
        promt: this.deps.prompter,
        clear: this.deps.clear,
      }).runGame();
    }
  }

  private async pickTable(
    tablesDefinitions: TableDefinitions,
  ): Promise<TableDefinition | null> {
    const menu = Object.entries(tablesDefinitions)
      .map(
        ([
          tableName,
          tableDef,
        ]): MenuEntryDefinition<TableDefinition | null> => ({
          text: `${tableName} (${tableDef.rows.length}x${tableDef.columns.length})`,
          onSelected: () => tableDef,
        }),
      )
      .concat({
        text: "I don't want to play anymore",
        onSelected: () => null,
        confirm: true,
        confirmText: 'Are you sure you want to quit?',
      });
    return await this.deps.consoleMenu.prompt(menu, 'Pick a table to play');
  }
}
