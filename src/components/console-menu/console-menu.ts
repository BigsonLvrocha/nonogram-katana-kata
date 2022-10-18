import { Prompter } from './prompter';

interface ConsoleMenuDependencies {
  prompter: Prompter;
}

export interface MenuEntryDefinition {
  text: string;
  onSelected: () => Promise<void>;
}

export class ConsoleMenu {
  constructor(private readonly deps: ConsoleMenuDependencies) {}

  async prompt(menu: MenuEntryDefinition[]): Promise<number> {
    const question = menu
      .map((entry, index) => `${index} - ${entry.text}`)
      .join('\n')
      .concat('\nSelect an option: ');

    const answer = await this.deps.prompter.query(question);

    const answerNumber = Number.parseInt(answer, 10);

    await menu[answerNumber].onSelected();

    return answerNumber;
  }
}
