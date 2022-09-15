export interface DrawableCell {
  draw: () => [string, string];
}

export function buildFullCell(character: string): DrawableCell {
  return {
    draw: () => [character + character, character + character],
  };
}

export function buildXCell(): DrawableCell {
  return {
    draw: () => ['\\/', '/\\'],
  };
}

export function buildNumberCell(value: number): DrawableCell {
  return {
    draw: () => [value < 10 ? ' ' + value.toString() : value.toString(), '  '],
  };
}
