interface DrawOptions {
  drawTop?: boolean;
  drawRight?: boolean;
  doubleLeft?: boolean;
  doubleBottom?: boolean;
}

export interface DrawableCell {
  draw: (options?: DrawOptions) => string[];
}

function addCellBorders(
  cell: [string, string],
  options: DrawOptions = {},
): string[] {
  return [
    ...(options.drawTop === true ? ['-- '] : []),
    cell[0] + '|',
    cell[1] + '|',
    '-- ',
  ];
}

export function buildFullCell(character: string): DrawableCell {
  return {
    draw: (opts) =>
      addCellBorders([character + character, character + character], opts),
  };
}

export function buildXCell(): DrawableCell {
  return {
    draw: (opts) => addCellBorders(['\\/', '/\\'], opts),
  };
}

export function buildNumberCell(value: number): DrawableCell {
  return {
    draw: (opts) =>
      addCellBorders(
        [value < 10 ? ' ' + value.toString() : value.toString(), '  '],
        opts,
      ),
  };
}
