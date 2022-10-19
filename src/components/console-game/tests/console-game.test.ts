import { expect, describe, it, jest, beforeAll } from '@jest/globals';
import { tables } from '../../../contants/table-definitions';
import { ConsoleGame } from '../console-game';
import { Prompter } from '../../console-menu/prompter';
import { ConsoleMenu } from '../../console-menu/console-menu';
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

  describe('Exit at the start game', () => {
    const log = jest.fn();

    const table2String = jest.fn(() => '');

    const answers = ['2', 'y'];
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
      table2String,
      prompter: mockPrompter as unknown as Prompter,
      consoleMenu,
    });

    beforeAll(async () => {
      await game.run(tableDefinitions);
    });

    it('prompts twice', () => {
      expect(mockPrompter.query).toHaveBeenCalledTimes(2);
    });

    it('prints an welcome page', () => {
      expect(log).nthCalledWith(1, 'Welcome to nonogram katana console game');
    });

    it('promts the player to choose a table', () => {
      const text = mockPrompter.query.mock.calls[0][0];
      expect(text).toEqual(`0 - simplest (2x2)
1 - snake (5x5)
2 - I don't want to play anymore
Pick a table to play: `);
    });

    it('prompts the player to confirm exit', () => {
      const text = mockPrompter.query.mock.calls[1][0];
      expect(text).toEqual('Are you sure you want to quit? (y/n): ');
    });

    it('prints no table', () => {
      expect(table2String).not.toHaveBeenCalled();
    });
  });
});
