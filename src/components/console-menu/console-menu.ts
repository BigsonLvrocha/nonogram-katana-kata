import { Prompter } from './prompter';

interface ConsoleMenuDependencies {
  prompter: Prompter;
}

export interface MenuEntryDefinition {
  text: string;
  onSelected: () => Promise<void> | void;
}

export class ConsoleMenu {
  constructor(private readonly deps: ConsoleMenuDependencies) {}

  async prompt(
    menu: MenuEntryDefinition[],
    lastQuestion: string = 'Select an option',
  ): Promise<number> {
    const question = menu
      .map((entry, index) => `${index} - ${entry.text}`)
      .join('\n')
      .concat(`\n${lastQuestion}: `);

    const answer = await this.promptWithRetry(question, menu);

    await menu[answer].onSelected();

    return answer;
  }

  private async promptWithRetry(
    question: string,
    menu: MenuEntryDefinition[],
  ): Promise<number> {
    const answer = await this.deps.prompter.query(question);

    const answerNumber = Number.parseInt(answer, 10);

    if (!(answerNumber in menu)) {
      return await this.promptWithRetry(
        `Invalid option!
Select a valid option: `,
        menu,
      );
    }

    return answerNumber;
  }
}
