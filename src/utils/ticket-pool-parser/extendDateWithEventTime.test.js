import extendDateWithEventTime from './extendDateWithEventTime';

describe('Ticket Pool Parser', () => {
  describe('extendDateWithEventTime', () => {
    it('should throw if invalid number of arguments was provided', () => {
      expect(() => extendDateWithEventTime(1)).toThrow();
    });

    it('should throw if arguments are not strings', () => {
      expect(() => extendDateWithEventTime(1, 1)).toThrow();
      expect(() => extendDateWithEventTime(undefined, undefined)).toThrow();
    });

    it('should return date string', () => {
      const dateString = '2019-01-01';
      const eventStartDate = '2019-01-01T14:00';
      const expectedValue = '2019-01-01T14:00';

      expect(extendDateWithEventTime(dateString, eventStartDate)).toEqual(expectedValue);
    });

    it('should ignore the time zone', () => {
      expect(extendDateWithEventTime('2019-01-01', '2019-01-01T23:59')).toEqual('2019-01-01T23:59');
      expect(extendDateWithEventTime('2019-01-01', '2019-01-01T00:00')).toEqual('2019-01-01T00:00');
    });
  });
});
