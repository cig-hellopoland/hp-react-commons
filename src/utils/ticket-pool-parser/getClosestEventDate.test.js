import getClosestEventDate from './getClosestEventDate';
import format from './format';
import constants from './constants';

const singlePoolDefinition = {
  endDate: (new Date(2001, 8, 18)).toISOString(),
  name: 'Example pool',
  startDate: (new Date(2001, 8, 13)).toISOString(),
};

describe('Ticket Pool Parser', () => {
  describe('getClosestEventDate', () => {
    it('should throw if invalid number of arguments was provided', () => {
      expect(() => getClosestEventDate()).toThrow();
    });

    it('should return null if no date was found', () => {
      const data = [];
      const expectedValue = null;

      expect(getClosestEventDate(data)).toEqual(expectedValue);

      data.push({
        name: 'Exotic event',
        startDate: (new Date(2102, 3, 5)).toISOString(),
        endDate: (new Date(2102, 3, 8)).toISOString(),
      });

      expect(getClosestEventDate(data)).toEqual(expectedValue);
    });

    it('should return single date', () => {
      const data = [
        {
          ...singlePoolDefinition,
          frequencyData: {
            frequency: 1,
            frequencyType: 'DAILY',
          },
        },
      ];
      const expectedValue = format(new Date(), constants.DAY_FORMAT);

      expect(getClosestEventDate(data)).toEqual(expectedValue);

      data.push({
        name: 'Exotic event',
        startDate: (new Date(2102, 3, 5)).toISOString(),
        endDate: (new Date(2102, 3, 8)).toISOString(),
      });

      expect(getClosestEventDate(data)).toEqual(expectedValue);
    });
  });
});
