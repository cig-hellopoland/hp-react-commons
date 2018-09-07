import validatePoolDefinition from './validatePoolDefinition';

describe('Ticket Pool Parser', () => {
  describe('validatePoolDefinition', () => {
    it('should throw if provided argument is not valid Ticket Pool Definition', () => {
      expect(() => validatePoolDefinition([])).toThrow();
      expect(() => validatePoolDefinition({})).toThrow();
      expect(() => validatePoolDefinition('')).toThrow();
      expect(() => validatePoolDefinition(1)).toThrow();
    });

    it('should do nothing if provided argument is valid Ticket Pool Definition', () => {
      const data = {
        endDate: 'Invalid Date',
        name: 'Example pool',
        startDate: 'Invalid Date',
      };

      expect(() => validatePoolDefinition(data)).not.toThrow();
    });
  });
});
