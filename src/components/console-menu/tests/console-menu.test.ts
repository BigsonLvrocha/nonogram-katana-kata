import { expect, it, describe, jest } from '@jest/globals';
import { Prompter } from '../prompter';
import { ConsoleMenu } from '../console-menu';

describe('ConsoleMenu', () => {
  it('executes the chosen selected callback', async () => {
    const menuDefinition = [
      {
        text: 'first option',
        onSelected: jest.fn(async () => await Promise.resolve(0)),
      },
      {
        text: 'second option',
        onSelected: jest.fn(async () => await Promise.resolve(1)),
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
        onSelected: jest.fn(() => 0),
      },
      {
        text: 'second option',
        onSelected: jest.fn(() => 1),
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
    expect(mockPrompter.query.mock.calls[1][0]).toEqual(`
Invalid option!

Select a valid option: `);
    expect(mockPrompter.query.mock.calls[2][0]).toEqual(`
Invalid option!

Select a valid option: `);
  });

  it('overwrites the menu', async () => {
    const menuDefinition = [
      {
        text: 'first option',
        onSelected: jest.fn(async () => await Promise.resolve(0)),
      },
      {
        text: 'second option',
        onSelected: jest.fn(async () => await Promise.resolve(1)),
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
    expect(menuDefinition[0].onSelected).toHaveBeenCalledWith(0);
    expect(menuDefinition[1].onSelected).not.toHaveBeenCalled();

    expect(mockPrompter.query).toHaveBeenCalled();
    expect(mockPrompter.query.mock.calls[0][0])
      .toEqual(`0 - ${menuDefinition[0].text}
1 - ${menuDefinition[1].text}

Select something: `);
  });

  it('it asks for confirmation', async () => {
    const menuDefinition = [
      {
        text: 'first option',
        onSelected: jest.fn(async () => await Promise.resolve(0)),
      },
      {
        text: 'second option',
        onSelected: jest.fn(async () => await Promise.resolve(1)),
        confirm: true,
      },
    ];

    let currentCommand = 0;
    const commands = ['1', 'y'];
    const mockPrompter = {
      query: jest.fn(async (question: string) => {
        const result = commands[currentCommand];
        currentCommand += 1;
        return result;
      }),
    };

    const consoleMenu = new ConsoleMenu({
      prompter: mockPrompter as unknown as Prompter,
    });

    const promptResult = await consoleMenu.prompt(
      menuDefinition,
      'Select something',
    );

    expect(promptResult).toBe(1);
    expect(menuDefinition[0].onSelected).not.toHaveBeenCalled();
    expect(menuDefinition[1].onSelected).toHaveBeenCalledTimes(1);

    expect(mockPrompter.query).toHaveBeenCalledTimes(2);
    expect(mockPrompter.query.mock.calls[0][0])
      .toEqual(`0 - ${menuDefinition[0].text}
1 - ${menuDefinition[1].text}

Select something: `);
    expect(mockPrompter.query.mock.calls[1][0]).toEqual(
      'Are you sure? (y/n): ',
    );
  });

  it('sets the confirmation text', async () => {
    const menuDefinition = [
      {
        text: 'first option',
        onSelected: jest.fn(async () => await Promise.resolve(0)),
      },
      {
        text: 'second option',
        onSelected: jest.fn(async () => await Promise.resolve(1)),
        confirm: true,
        confirmText: 'Are you sure you want to do it?',
      },
    ];

    let currentCommand = 0;
    const commands = ['1', 'y'];
    const mockPrompter = {
      query: jest.fn(async (question: string) => {
        const result = commands[currentCommand];
        currentCommand += 1;
        return result;
      }),
    };

    const consoleMenu = new ConsoleMenu({
      prompter: mockPrompter as unknown as Prompter,
    });

    const promptResult = await consoleMenu.prompt(
      menuDefinition,
      'Select something',
    );

    expect(promptResult).toBe(1);
    expect(menuDefinition[0].onSelected).not.toHaveBeenCalled();
    expect(menuDefinition[1].onSelected).toHaveBeenCalledTimes(1);

    expect(mockPrompter.query).toHaveBeenCalledTimes(2);
    expect(mockPrompter.query.mock.calls[0][0])
      .toEqual(`0 - ${menuDefinition[0].text}
1 - ${menuDefinition[1].text}

Select something: `);
    expect(mockPrompter.query.mock.calls[1][0]).toEqual(
      'Are you sure you want to do it? (y/n): ',
    );
  });

  it('it denies then asks again', async () => {
    const menuDefinition = [
      {
        text: 'first option',
        onSelected: jest.fn(async () => await Promise.resolve(0)),
      },
      {
        text: 'second option',
        onSelected: jest.fn(async () => await Promise.resolve(1)),
        confirm: true,
      },
    ];

    let currentCommand = 0;
    const commands = ['1', 'n', '1', 'y'];
    const mockPrompter = {
      query: jest.fn(async (question: string) => {
        const result = commands[currentCommand];
        currentCommand += 1;
        return result;
      }),
    };

    const consoleMenu = new ConsoleMenu({
      prompter: mockPrompter as unknown as Prompter,
    });

    const promptResult = await consoleMenu.prompt(
      menuDefinition,
      'Select something',
    );

    expect(promptResult).toBe(1);
    expect(menuDefinition[0].onSelected).not.toHaveBeenCalled();
    expect(menuDefinition[1].onSelected).toHaveBeenCalledTimes(1);

    expect(mockPrompter.query).toHaveBeenCalledTimes(4);
    expect(mockPrompter.query.mock.calls[0][0])
      .toEqual(`0 - ${menuDefinition[0].text}
1 - ${menuDefinition[1].text}

Select something: `);
    expect(mockPrompter.query.mock.calls[1][0]).toEqual(
      'Are you sure? (y/n): ',
    );
    expect(mockPrompter.query.mock.calls[2][0]).toEqual('Select something: ');
    expect(mockPrompter.query.mock.calls[3][0]).toEqual(
      'Are you sure? (y/n): ',
    );
  });
});
