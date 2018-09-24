import getCyclicPoolDefinitionsAsDates from './getCyclicPoolDefinitionsAsDates';
import format from './format';
import constants from './constants';

const singlePoolDefinition = {
  endDate: (new Date(2001, 8, 18)).toISOString(),
  name: 'Example pool',
  startDate: (new Date(2001, 8, 13)).toISOString(),
};

const cyclicPoolDefinition = {
  ...singlePoolDefinition,
  frequencyData: {},
};

describe('Ticket Pool Parser', () => {
  describe('getCyclicPoolDefinitionsAsDates', () => {
    it('should return empty array if TicketPoolDefinitions list is incorrect', () => {
      const expectedValue = [];
      const data = [
        { ...cyclicPoolDefinition, endDate: null },
      ];

      expect(getCyclicPoolDefinitionsAsDates()).toEqual(expectedValue);
      expect(getCyclicPoolDefinitionsAsDates([])).toEqual(expectedValue);
      expect(getCyclicPoolDefinitionsAsDates({})).toEqual(expectedValue);
      expect(getCyclicPoolDefinitionsAsDates('')).toEqual(expectedValue);
      expect(getCyclicPoolDefinitionsAsDates(1)).toEqual(expectedValue);
      expect(getCyclicPoolDefinitionsAsDates(data)).toEqual(expectedValue);
    });

    it('should return dates starting from first event occurrence if start date is not defined', () => {
      const data = [
        {
          ...singlePoolDefinition,
          frequencyData: {
            frequency: 1,
            frequencyType: 'DAILY',
          },
        },
      ];
      const expectedValue = [
        format(singlePoolDefinition.startDate, constants.DAY_FORMAT),
        format(new Date(2001, 8, 14), constants.DAY_FORMAT),
        format(new Date(2001, 8, 15), constants.DAY_FORMAT),
        format(new Date(2001, 8, 16), constants.DAY_FORMAT),

      ];
      const end = format(new Date(2001, 8, 16));

      expect(getCyclicPoolDefinitionsAsDates(data, { end })).toEqual(expectedValue);
    });

    it('should return dates starting from start till end interval date', () => {
      const data = [
        {
          ...singlePoolDefinition,
          frequencyData: {
            frequency: 1,
            frequencyType: 'DAILY',
          },
        },
      ];
      const expectedValue = [
        format(new Date(2001, 9, 16), constants.DAY_FORMAT),
        format(new Date(2001, 9, 17), constants.DAY_FORMAT),
        format(new Date(2001, 9, 18), constants.DAY_FORMAT),
        format(new Date(2001, 9, 19), constants.DAY_FORMAT),
        format(new Date(2001, 9, 20), constants.DAY_FORMAT),

      ];
      const start = format(new Date(2001, 9, 16));
      const end = format(new Date(2001, 9, 20));

      expect(getCyclicPoolDefinitionsAsDates(data, { start, end })).toEqual(expectedValue);
    });

    it('should return dates with monthly interval', () => {
      const data = [
        {
          ...singlePoolDefinition,
          frequencyData: {
            frequency: 2,
            frequencyType: 'MONTHLY',
          },
        },
      ];
      const expectedValue = [
        format(new Date(2001, 10, 13), constants.DAY_FORMAT),
        format(new Date(2002, 0, 13), constants.DAY_FORMAT),
        format(new Date(2002, 2, 13), constants.DAY_FORMAT),
        format(new Date(2002, 4, 13), constants.DAY_FORMAT),
      ];
      const start = format(new Date(2001, 9, 16));
      const end = format(new Date(2002, 4, 20));

      expect(getCyclicPoolDefinitionsAsDates(data, { start, end })).toEqual(expectedValue);
    });

    it('should return dates with monthly interval - real test case', () => {
      const data = [
        {
          ...singlePoolDefinition,
          frequencyData: {
            frequency: 1,
            frequencyType: 'MONTHLY',
          },
        },
      ];
      const expectedValue = [
        format(new Date(2001, 11, 13), constants.DAY_FORMAT),
      ];
      const start = format(new Date(2001, 11, 1));
      const end = format(new Date(2001, 11, 31));

      expect(getCyclicPoolDefinitionsAsDates(data, { start, end })).toEqual(expectedValue);
    });

    it('should return dates with weekly interval', () => {
      const data = [
        {
          ...singlePoolDefinition,
          frequencyData: {
            daysOfWeek: [2, 6],
            frequency: 2,
            frequencyType: 'WEEKLY',
          },
        },
      ];
      const expectedValue = [
        format(new Date(2001, 9, 9), constants.DAY_FORMAT),
        format(new Date(2001, 9, 13), constants.DAY_FORMAT),
        format(new Date(2001, 9, 23), constants.DAY_FORMAT),
        format(new Date(2001, 9, 27), constants.DAY_FORMAT),

      ];
      const start = format(new Date(2001, 9, 3));
      const end = format(new Date(2001, 9, 31));

      expect(getCyclicPoolDefinitionsAsDates(data, { start, end })).toEqual(expectedValue);
    });
  });
});
