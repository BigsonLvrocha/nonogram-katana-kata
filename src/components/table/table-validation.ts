export function validateTableValues(
  rowValues: number[][],
  columnValues: number[][],
): void {
  validateNegativeValues(rowValues);
  validateNegativeValues(columnValues);
  validateRangeValues(rowValues, columnValues.length);
  validateRangeValues(columnValues, rowValues.length);
}

function validateRangeValues(linesValues: number[][], max: number): void {
  linesValues.forEach((lineValues) =>
    validateRangeInLineValues(lineValues, max),
  );
}

function validateRangeInLineValues(lineValues: number[], max: number): void {
  if (getTotalCells() > max) {
    throw new Error('Too many values in the line');
  }

  function getTotalCells(): number {
    return (
      lineValues.reduce((acc, curr) => acc + curr, 0) + lineValues.length - 1
    );
  }
}

function validateNegativeValues(linesValues: number[][]): void {
  linesValues.forEach((lineValues) =>
    lineValues.forEach((value) => {
      if (value < 0 || !Number.isInteger(value)) {
        throw new Error('Invalid value for table');
      }
    }),
  );
}
