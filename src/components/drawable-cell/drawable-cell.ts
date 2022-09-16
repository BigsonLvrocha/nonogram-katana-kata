interface DrawOptions {
  drawTop: boolean;
  drawRight: boolean;
  doubleLeft: boolean;
  doubleBottom: boolean;
}

export interface DrawableCell {
  draw: (options?: DrawOptions) => string[];
}

function addCellBorders(cell: [string, string]): string[] {
  return [cell[0] + '|', cell[1] + '|', '-- '];
}

export function buildFullCell(character: string): DrawableCell {
  return {
    draw: () => addCellBorders([character + character, character + character]),
  };
}

export function buildXCell(): DrawableCell {
  return {
    draw: () => addCellBorders(['\\/', '/\\']),
  };
}

export function buildNumberCell(value: number): DrawableCell {
  return {
    draw: () =>
      addCellBorders([
        value < 10 ? ' ' + value.toString() : value.toString(),
        '  ',
      ]),
  };
}
