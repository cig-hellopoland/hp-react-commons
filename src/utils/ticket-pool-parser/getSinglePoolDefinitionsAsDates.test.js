import constants from './constants';
import getSinglePoolDefinitionsAsDays from './getSinglePoolDefinitionsAsDates';
import format from './format';

const singlePoolDefinition = {
  endDate: format(new Date(2001, 8, 13, 3)),
  name: 'Example pool',
  startDate: format(new Date(2001, 8, 13, 4)),
};

const cyclicPoolDefinition = {
  ...singlePoolDefinition,
  frequencyData: {},
};

describe('Ticket Pool Parser', () => {
  describe('getSinglePoolDefinitionsAsDays', () => {
    it('should return empty array if TicketPoolDefinitions list is incorrect', () => {
      const expectedValue = [];
      const data = [
        { ...singlePoolDefinition, endDate: null },
      ];

      expect(getSinglePoolDefinitionsAsDays()).toEqual(expectedValue);
      expect(getSinglePoolDefinitionsAsDays([])).toEqual(expectedValue);
      expect(getSinglePoolDefinitionsAsDays({})).toEqual(expectedValue);
      expect(getSinglePoolDefinitionsAsDays('')).toEqual(expectedValue);
      expect(getSinglePoolDefinitionsAsDays(1)).toEqual(expectedValue);
      expect(getSinglePoolDefinitionsAsDays(data)).toEqual(expectedValue);
    });

    it('should return all non-cyclic entry dates', () => {
      const expectedValue = [format(singlePoolDefinition.startDate, constants.DAY_FORMAT)];
      const data = [
        cyclicPoolDefinition,
        singlePoolDefinition,
      ];

      expect(getSinglePoolDefinitionsAsDays(data)).toEqual(expectedValue);
    });

    it('should return all non-cyclic entry dates from provided time range', () => {
      const expectedValue = [format(singlePoolDefinition.startDate, constants.DAY_FORMAT)];
      const data = [
        singlePoolDefinition,
        {
          ...singlePoolDefinition,
          startDate: format(new Date(2001, 3, 10, 3)),
          endDate: format(new Date(2001, 3, 10, 4)),
        },
        cyclicPoolDefinition,
        {
          ...singlePoolDefinition,
          startDate: format(new Date(2001, 7, 15, 9)),
          endDate: format(new Date(2001, 7, 15, 13)),
        },
        {
          ...singlePoolDefinition,
          startDate: format(new Date(2002, 3, 5, 9)),
          endDate: format(new Date(2002, 3, 5, 13)),
        },
      ];
      const start = format(new Date(2001, 7, 30));
      const end = format(new Date(2001, 9, 30));

      expect(getSinglePoolDefinitionsAsDays(data, { start, end })).toEqual(expectedValue);
    });

    it('should return all non-cyclic entry dates without duplicates', () => {
      const expectedValue = [format(singlePoolDefinition.startDate, constants.DAY_FORMAT)];
      const data = [
        singlePoolDefinition,
        {
          ...singlePoolDefinition,
          startDate: format(new Date(2001, 3, 10, 3)),
          endDate: format(new Date(2001, 3, 10, 4)),
        },
        cyclicPoolDefinition,
        {
          ...singlePoolDefinition,
          startDate: format(new Date(2001, 8, 13, 4)),
          endDate: format(new Date(2001, 8, 13, 5)),
        },
      ];
      const start = format(new Date(2001, 7, 30));
      const end = format(new Date(2001, 9, 30));

      expect(getSinglePoolDefinitionsAsDays(data, { start, end })).toEqual(expectedValue);
    });
  });
});
