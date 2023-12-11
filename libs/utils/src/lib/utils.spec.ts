import { isNotNull } from './utils';

describe('utils', () => {
  it('should work', () => {
    expect(isNotNull(null)).toBe(false);
  });
});
