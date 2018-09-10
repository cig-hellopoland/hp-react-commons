import isAfter from './isAfter';

describe('Ticket Pool Parser', () => {
  describe('isAfter', () => {
    it('should throw if invalid number of arguments was provided', () => {
      expect(() => isAfter(1)).toThrow();
    });

    it('returns true if the first date is after the second one', () => {
      const expectedValue = true;

      expect(isAfter(
        new Date(1989, 6 /* Jul */, 10),
        new Date(1987, 1 /* Feb */, 11),
      )).toEqual(expectedValue);
    });

    it('returns false if the first date is before the second one', () => {
      const expectedValue = false;

      expect(isAfter(
        new Date(1987, 1 /* Feb */, 11),
        new Date(1989, 6 /* Jul */, 10),
      )).toEqual(expectedValue);
    });

    it('returns false if the first date is equal to the second one', () => {
      const expectedValue = false;

      expect(isAfter(
        new Date(1989, 6 /* Jul */, 10),
        new Date(1989, 6 /* Jul */, 10),
      )).toEqual(expectedValue);
    });

    it('accepts a string', () => {
      const expectedValue = true;

      expect(isAfter(
        new Date(1989, 6 /* Jul */, 10).toISOString(),
        new Date(1987, 1 /* Feb */, 11).toISOString(),
      )).toEqual(expectedValue);
    });

    it('accepts a timestamp', () => {
      const expectedValue = true;

      expect(isAfter(
        new Date(1989, 6 /* Jul */, 10).getTime(),
        new Date(1987, 1 /* Feb */, 11).getTime(),
      )).toEqual(expectedValue);
    });
  });
});
