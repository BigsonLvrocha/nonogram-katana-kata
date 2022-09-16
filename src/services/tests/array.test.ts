import { buildArray } from '../array';
import { describe, expect, it } from '@jest/globals';

describe('Array service', () => {
  describe('buildArray', () => {
    it('builds array with repeated elements', () => {
      const arr = buildArray(2, () => '.');
      expect(arr).toEqual(['.', '.']);
    });

    it('builds array with index based elements', () => {
      const arr = buildArray(2, (i) => i);
      expect(arr).toEqual([0, 1]);
    });
  });
});
