export function validateRangeValues(
  linesValues: number[][],
  max: number,
): void {
  linesValues.forEach((lineValues) =>
    validateRangeInLineValues(lineValues, max),
  );
}

function validateRangeInLineValues(lineValues: number[], max: number): void {
  const total =
    lineValues.reduce((acc, curr) => acc + curr, 0) + lineValues.length - 1;
  if (total > max) {
    throw new Error('Too many values in the line');
  }
}

export function validateNegativeValues(linesValues: number[][]): void {
  linesValues.forEach((lineValues) =>
    lineValues.forEach((value) => {
      if (value < 0 || !Number.isInteger(value)) {
        throw new Error('Invalid value for table');
      }
    }),
  );
}
