import { describe, beforeEach, it, expect } from '@jest/globals';

describe('first test', () => {
  beforeEach(() => {
    expect(1).toBe(1);
  });

  it('runs correctly', () => {
    expect(3).toBe(3);
  });
});
