import { expect, it, describe, jest } from '@jest/globals';
import { Prompter } from '../prompter';
import { ConsoleMenu } from '../console-menu';

describe('ConsoleMenu', () => {
  it('executes the chosen selected callback', async () => {
    const menuDefinition = [
      {
        text: 'first option',
        onSelected: jest.fn(async () => await Promise.resolve()),
      },
      {
        text: 'second option',
        onSelected: jest.fn(async () => await Promise.resolve()),
      },
    ];

    const mockPrompter = {
      query: jest.fn(async (question: string) => {
        return '0';
      }),
    };

    const consoleMenu = new ConsoleMenu({
      prompter: mockPrompter as unknown as Prompter,
    });

    const promptResult = await consoleMenu.prompt(menuDefinition);

    expect(promptResult).toBe(0);
    expect(menuDefinition[0].onSelected).toHaveBeenCalledTimes(1);
    expect(menuDefinition[1].onSelected).not.toHaveBeenCalled();

    expect(mockPrompter.query).toHaveBeenCalled();
    expect(mockPrompter.query.mock.calls[0][0])
      .toEqual(`0 - ${menuDefinition[0].text}
1 - ${menuDefinition[1].text}
Select an option: `);
  });

  it('retries when given invalid option', async () => {
    const menuDefinition = [
      {
        text: 'first option',
        onSelected: jest.fn(async () => await Promise.resolve()),
      },
      {
        text: 'second option',
        onSelected: jest.fn(async () => await Promise.resolve()),
      },
    ];

    let mockTries = 0;

    const mockPrompter = {
      query: jest.fn(async (question: string) => {
        if (mockTries < 3) {
          mockTries += 1;
          return 'na';
        }
        return '0';
      }),
    };

    const consoleMenu = new ConsoleMenu({
      prompter: mockPrompter as unknown as Prompter,
    });

    const promptResult = await consoleMenu.prompt(menuDefinition);

    expect(promptResult).toBe(0);
    expect(menuDefinition[0].onSelected).toHaveBeenCalledTimes(1);
    expect(menuDefinition[1].onSelected).not.toHaveBeenCalled();

    expect(mockPrompter.query).toHaveBeenCalledTimes(4);
    expect(mockPrompter.query.mock.calls[0][0])
      .toEqual(`0 - ${menuDefinition[0].text}
1 - ${menuDefinition[1].text}
Select an option: `);
    expect(mockPrompter.query.mock.calls[1][0]).toEqual(`Invalid option!
Select a valid option: `);
    expect(mockPrompter.query.mock.calls[2][0]).toEqual(`Invalid option!
Select a valid option: `);
  });

  it('overwrites the menu', async () => {
    const menuDefinition = [
      {
        text: 'first option',
        onSelected: jest.fn(async () => await Promise.resolve()),
      },
      {
        text: 'second option',
        onSelected: jest.fn(async () => await Promise.resolve()),
      },
    ];

    const mockPrompter = {
      query: jest.fn(async (question: string) => {
        return '0';
      }),
    };

    const consoleMenu = new ConsoleMenu({
      prompter: mockPrompter as unknown as Prompter,
    });

    const promptResult = await consoleMenu.prompt(
      menuDefinition,
      'Select something',
    );

    expect(promptResult).toBe(0);
    expect(menuDefinition[0].onSelected).toHaveBeenCalledTimes(1);
    expect(menuDefinition[1].onSelected).not.toHaveBeenCalled();

    expect(mockPrompter.query).toHaveBeenCalled();
    expect(mockPrompter.query.mock.calls[0][0])
      .toEqual(`0 - ${menuDefinition[0].text}
1 - ${menuDefinition[1].text}
Select something: `);
  });
});
