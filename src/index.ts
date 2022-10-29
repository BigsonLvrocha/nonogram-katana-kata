import { createInterface } from 'readline';
import { tables } from './contants/table-definitions';
import { ConsoleGame } from './interfaces/console/console-game';
import { ConsoleMenu } from './interfaces/console/components/console-menu/console-menu';
import { ConsolePrompter } from './interfaces/console/components/console-menu/console-prompter';

const inter = createInterface({
  input: process.stdin,
  output: process.stdout,
});

process.stdin.setEncoding('utf8');

process.stdin.on('data', (data) => {
  console.log({ data });
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
  clear: console.clear,
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
