export interface Prompter {
  query: (question: string) => Promise<string>;
}
