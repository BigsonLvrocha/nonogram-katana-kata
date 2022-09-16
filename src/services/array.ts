export function buildArray<T>(
  length: number,
  itemBuilder: (index: number) => T,
): T[] {
  return Array.from({ length }, (_, i) => itemBuilder(i));
}
