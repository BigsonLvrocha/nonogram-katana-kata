import { Prompter } from './prompter';

interface ConsoleMenuDependencies {
  prompter: Prompter;
}

export interface MenuEntryDefinition<T = any> {
  text: string;
  onSelected: () => Promise<T> | T;
}

export class ConsoleMenu {
  constructor(private readonly deps: ConsoleMenuDependencies) {}

  async prompt<T = any>(
    menu: Array<MenuEntryDefinition<T>>,
    lastQuestion: string = 'Select an option',
  ): Promise<T> {
    const question = menu
      .map((entry, index) => `${index} - ${entry.text}`)
      .join('\n')
      .concat(`\n${lastQuestion}: `);

    const answer = await this.promptWithRetry(question, menu);

    return await menu[answer].onSelected();
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
