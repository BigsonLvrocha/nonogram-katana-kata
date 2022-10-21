import { createInterface } from 'readline';
import { tables } from './contants/table-definitions';
import { ConsoleGame } from './components/console-game/console-game';
import { ConsoleMenu } from './components/console-menu/console-menu';
import { ConsolePrompter } from './components/console-menu/console-prompter';

const inter = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompter = new ConsolePrompter({
  inter,
});

const game = new ConsoleGame({
  consoleMenu: new ConsoleMenu({
    prompter,
  }),
  log: console.log,
  prompter,
});

game
  .run(tables)
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
