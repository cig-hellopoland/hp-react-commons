import isCyclic from './isCyclic';

describe('Ticket Pool Parser', () => {
  describe('isCyclic', () => {
    it('should throw if no arguments were provided', () => {
      expect(() => isCyclic()).toThrow();
    });

    it('should throw if \'poolDefinition\' is not valid', () => {
      const data = {
        endDate: 'Invalid Date',
        name: 'Example pool',
        startDate: 'Invalid Date',
      };

      expect(() => isCyclic(1)).toThrow();
      expect(() => isCyclic([])).toThrow();
      expect(() => isCyclic('')).toThrow();
      expect(() => isCyclic({})).toThrow();
      expect(() => isCyclic(data)).not.toThrow();
    });

    it('should return boolean to indicate if pool is cyclic', () => {
      const data = {
        endDate: 'Invalid Date',
        name: 'Example pool',
        startDate: 'Invalid Date',
      };

      expect(isCyclic(data)).toEqual(false);

      data.frequencyData = {};

      expect(isCyclic(data)).toEqual(true);
    });
  });
});
