interface DrawOptions {
  drawTop?: boolean;
  drawLeft?: boolean;
  doubleRight?: boolean;
  doubleBottom?: boolean;
}

export interface DrawableCell {
  draw: (options?: DrawOptions) => string[];
}

function addCellBorders(
  cell: [string, string],
  options?: DrawOptions,
): string[] {
  const cellsWithTop = addTopBorder(cell, options?.drawTop);
  const cellsWithBottom = addBottomBorder(cellsWithTop, options?.doubleBottom);
  const cellsWithLeftBorder = addLeftBorder(
    cellsWithBottom,
    options?.drawLeft,
    options?.drawTop,
  );
  return addRightBorder(
    cellsWithLeftBorder,
    options?.doubleRight,
    options?.drawTop,
  );
}

function addRightBorder(
  cell: string[],
  doubleRight = false,
  drawTop = false,
): string[] {
  let borderToAdd = '||';
  if (drawTop) {
    borderToAdd = ' ' + borderToAdd;
  }
  const spacesToAdd = cell.length - borderToAdd.length;
  borderToAdd += ' '.repeat(spacesToAdd);
  return cell.map((line, index) =>
    line
      .concat(borderToAdd.charAt(index))
      .concat(doubleRight ? borderToAdd.charAt(index) : ''),
  );
}

function addLeftBorder(
  cell: string[],
  drawLeft = false,
  drawTop = false,
): string[] {
  if (!drawLeft) {
    return cell;
  }
  let borderToAdd = '||';
  if (drawTop) {
    borderToAdd = ' ' + borderToAdd;
  }
  const spacesToAdd = cell.length - borderToAdd.length;
  borderToAdd += ' '.repeat(spacesToAdd);
  return cell.map((line, index) => borderToAdd.charAt(index).concat(line));
}

function addBottomBorder(cell: string[], doubleBottom = false): string[] {
  return cell.concat(doubleBottom ? ['=='] : ['--']);
}

function addTopBorder(cell: string[], drawTop = false): string[] {
  return drawTop ? ['--'].concat(cell) : cell;
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
