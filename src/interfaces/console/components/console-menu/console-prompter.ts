import { Interface } from 'readline';
import { Prompter } from './prompter';

interface ConsolePrompterDependencies {
  inter: Interface;
}

export class ConsolePrompter implements Prompter {
  constructor(private readonly deps: ConsolePrompterDependencies) {}

  async query(question: string): Promise<string> {
    return await new Promise((resolve) => {
      this.deps.inter.question(question, (answer) => resolve(answer));
    });
  }
}
