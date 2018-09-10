import isPoolDefinition from './isPoolDefinition';

describe('Ticket Pool Parser', () => {
  describe('isPoolDefinition', () => {
    it('should throw if invalid number of arguments was provided', () => {
      expect(() => isPoolDefinition()).toThrow();
    });

    it('should return boolean to indicate if pool is valid', () => {
      const data = {
        endDate: 'Invalid Date',
        name: 'Example pool',
        startDate: 'Invalid Date',
      };

      expect(isPoolDefinition({})).toEqual(false);
      expect(isPoolDefinition([])).toEqual(false);
      expect(isPoolDefinition('')).toEqual(false);
      expect(isPoolDefinition(1)).toEqual(false);
      expect(isPoolDefinition(data)).toEqual(true);
    });
  });
});
