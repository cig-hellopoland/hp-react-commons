import isBefore from './isBefore';

describe('Ticket Pool Parser', () => {
  describe('isBefore', () => {
    it('should throw if invalid number of arguments was provided', () => {
      expect(() => isBefore(1)).toThrow();
    });

    it('returns true if the first date is before the second one', () => {
      const expectedValue = true;

      expect(isBefore(
        new Date(1987, 1 /* Feb */, 11),
        new Date(1989, 6 /* Jul */, 10),
      )).toEqual(expectedValue);
    });

    it('returns false if the first date is after the second one', () => {
      const expectedValue = false;

      expect(isBefore(
        new Date(1989, 6 /* Jul */, 10),
        new Date(1987, 1 /* Feb */, 11),
      )).toEqual(expectedValue);
    });

    it('returns false if the first date is equal to the second one', () => {
      const expectedValue = false;

      expect(isBefore(
        new Date(1989, 6 /* Jul */, 10),
        new Date(1989, 6 /* Jul */, 10),
      )).toEqual(expectedValue);
    });

    it('accepts a string', () => {
      const expectedValue = true;

      expect(isBefore(
        new Date(1987, 1 /* Feb */, 11).toISOString(),
        new Date(1989, 6 /* Jul */, 10).toISOString(),
      )).toEqual(expectedValue);
    });

    it('accepts a timestamp', () => {
      const expectedValue = true;

      expect(isBefore(
        new Date(1987, 1 /* Feb */, 11).getTime(),
        new Date(1989, 6 /* Jul */, 10).getTime(),
      )).toEqual(expectedValue);
    });
  });
});
