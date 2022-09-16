interface DrawOptions {
  drawTop: boolean;
  drawRight: boolean;
  doubleLeft: boolean;
  doubleBottom: boolean;
}

export interface DrawableCell {
  draw: (options?: DrawOptions) => string[];
}

export function buildFullCell(character: string): DrawableCell {
  return {
    draw: () => [
      character + character + '|',
      character + character + '|',
      '-- ',
    ],
  };
}

export function buildXCell(): DrawableCell {
  return {
    draw: () => ['\\/|', '/\\|', '-- '],
  };
}

export function buildNumberCell(value: number): DrawableCell {
  return {
    draw: () => [
      (value < 10 ? ' ' + value.toString() : value.toString()) + '|',
      '  |',
      '-- ',
    ],
  };
}
