import { expect, describe, it, jest, beforeAll } from '@jest/globals';
import { Mock } from 'jest-mock';
import { tables } from '../../../contants/table-definitions';
import { ConsoleGame } from '../console-game';
import { Prompter } from '../../console-menu/prompter';
import { ConsoleMenu } from '../../console-menu/console-menu';
import { Table } from '../../table/table';
import { table2String } from '../../table-console-printer/table-printer';
// import { CellState } from '../../../contants/cell-state-enum';

describe('Console Game', () => {
  const tableDefinitions = {
    simplest: {
      columns: [[2], [1]],
      rows: [[2], [1]],
    },
    snake: tables.snake,
  };

  /*
  const u = CellState.UNKNOWN;
  const o = CellState.FILLED;
  const x = CellState.EMPTY;
  */

  const buildMocksForAnswers = (
    answers: string[],
  ): {
    log: Mock<(text: string) => void>;
    mockPrompter: {
      query: Mock<(_text: string) => Promise<string>>;
    };
    consoleMenu: ConsoleMenu;
    game: ConsoleGame;
  } => {
    const log = jest.fn<(text: string) => void>();

    let currentAnswer = -1;

    const mockPrompter = {
      query: jest.fn(async (_text: string) => {
        currentAnswer += 1;
        if (!(currentAnswer in answers)) {
          throw new Error('should have ended');
        }
        return answers[currentAnswer];
      }),
    };

    const consoleMenu = new ConsoleMenu({
      prompter: mockPrompter as unknown as Prompter,
    });

    const game = new ConsoleGame({
      log,
      prompter: mockPrompter as unknown as Prompter,
      consoleMenu,
      clear: () => {},
    });

    return { log, mockPrompter, consoleMenu, game };
  };

  describe('Exit at the start game', () => {
    const { game, log, mockPrompter } = buildMocksForAnswers(['2', 'y']);

    beforeAll(async () => {
      await game.run(tableDefinitions);
    });

    it('prompts twice', () => {
      expect(mockPrompter.query).toHaveBeenCalledTimes(2);
    });

    it('prints only welcome and good bye', () => {
      expect(log).toHaveBeenCalledTimes(2);
    });

    it('prints an welcome page', () => {
      expect(log).nthCalledWith(1, 'Welcome to nonogram katana console game');
    });

    it('promts the player to choose a table', () => {
      const text = mockPrompter.query.mock.calls[0][0];
      expect(text).toEqual(`
0 - simplest (2x2)
1 - snake (5x5)
2 - I don't want to play anymore

Pick a table to play: `);
    });

    it('prompts the player to confirm exit', () => {
      const text = mockPrompter.query.mock.calls[1][0];
      expect(text).toEqual('Are you sure you want to quit? (y/n): ');
    });

    it('prints a bye message', () => {
      expect(log).nthCalledWith(2, 'Bye');
    });
  });

  describe('enter table then exit', () => {
    const { game, mockPrompter, log } = buildMocksForAnswers([
      '0',
      '2',
      'y',
      '2',
      'y',
    ]);

    beforeAll(async () => {
      await game.run(tableDefinitions);
    });

    it('prompts 5 times', () => {
      expect(mockPrompter.query).toHaveBeenCalledTimes(5);
    });

    it('prints welcome message', () => {
      expect(log).toHaveBeenNthCalledWith(
        1,
        'Welcome to nonogram katana console game',
      );
    });

    it('prints the first table', () => {
      const table = new Table(
        tableDefinitions.simplest.rows,
        tableDefinitions.simplest.columns,
      );
      expect(log).toHaveBeenNthCalledWith(2, table2String(table));
    });

    it('prints bye message', () => {
      expect(log).toHaveBeenNthCalledWith(3, 'Bye');
    });

    it('prompts for an action in the table', () => {
      expect(mockPrompter.query.mock.calls[1][0]).toEqual(`
0 - Mark a cell
1 - Reset
2 - Exit

What do you want to do?: `);
    });

    it('asks if he is sure he wants to quit', () => {
      expect(mockPrompter.query.mock.calls[2][0]).toEqual(
        `Are you sure? (y/n): `,
      );
    });
  });
});
