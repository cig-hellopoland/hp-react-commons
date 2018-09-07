import isPoolDefinitionList from './isPoolDefinitionList';

describe('Ticket Pool Parser', () => {
  describe('isPoolDefinition', () => {
    it('should throw if no arguments were provided', () => {
      expect(() => isPoolDefinitionList()).toThrow();
    });

    it('should return boolean to indicate if pool list is valid', () => {
      const data = {
        endDate: 'Invalid Date',
        name: 'Example pool',
        startDate: 'Invalid Date',
      };

      expect(isPoolDefinitionList({})).toEqual(false);
      expect(isPoolDefinitionList([])).toEqual(false);
      expect(isPoolDefinitionList('')).toEqual(false);
      expect(isPoolDefinitionList(1)).toEqual(false);
      expect(isPoolDefinitionList([data, data])).toEqual(true);
    });
  });
});
