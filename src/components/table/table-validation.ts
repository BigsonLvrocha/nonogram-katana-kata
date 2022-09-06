export function validateNegativeValues(linesValues: number[][]): void {
  linesValues.forEach((lineValues) =>
    lineValues.forEach((value) => {
      if (value < 0 || !Number.isInteger(value)) {
        throw new Error('Invalid value for table');
      }
    }),
  );
}
