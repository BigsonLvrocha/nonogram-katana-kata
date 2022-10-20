import { Prompter } from './prompter';

interface ConsoleMenuDependencies {
  prompter: Prompter;
}

export interface MenuEntryDefinition<T = any> {
  text: string;
  onSelected: (choice: number) => Promise<T> | T;
  confirm?: boolean;
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

    return await menu[answer].onSelected(answer);
  }

  private async promptWithRetry<T = any>(
    question: string,
    menu: Array<MenuEntryDefinition<T>>,
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

    return await this.confirmMenuEntry(menu, answerNumber);
  }

  private async confirmMenuEntry<T = any>(
    menu: Array<MenuEntryDefinition<T>>,
    answer: number,
  ): Promise<number> {
    if (menu[answer].confirm === true) {
      const result = await this.deps.prompter.query('Are you sure? (y/n): ');

      if (result !== 'y') {
        return await this.promptWithRetry('Select an option: ', menu);
      }
    }

    return answer;
  }
}
