import { Interface } from 'readline';
import { describe, it, expect, jest } from '@jest/globals';
import { ConsolePrompter } from '../console-prompter';

describe('ConsolePrompter', () => {
  it('calls the question function of interface', async () => {
    const inter = {
      question: jest.fn((query: string, cb: (answer: string) => void): void =>
        // eslint-disable-next-line n/no-callback-literal
        cb('more data'),
      ),
    };

    const prompter = new ConsolePrompter({
      inter: inter as unknown as Interface,
    });

    const answer = await prompter.query('what do we want?\n');

    expect(answer).toBe('more data');
    expect(inter.question).toHaveBeenCalledTimes(1);
    expect(inter.question.mock.calls[0][0]).toBe('what do we want?\n');
  });
});
