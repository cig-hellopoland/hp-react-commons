import getSinglePoolDefinitions from './getSinglePoolDefinitions';

const singlePoolDefinition = {
  endDate: (new Date(2001, 8, 13, 3)).toISOString(),
  name: 'Example pool',
  startDate: (new Date(2001, 8, 13, 4)).toISOString(),
};

const cyclicPoolDefinition = {
  ...singlePoolDefinition,
  frequencyData: {},
};

describe('Ticket Pool Parser', () => {
  describe('getSinglePoolDefinitions', () => {
    it('should return empty array if TicketPoolDefinitions list is incorrect', () => {
      const expectedValue = [];
      const data = [
        { ...singlePoolDefinition, endDate: null },
      ];

      expect(getSinglePoolDefinitions()).toEqual(expectedValue);
      expect(getSinglePoolDefinitions([])).toEqual(expectedValue);
      expect(getSinglePoolDefinitions({})).toEqual(expectedValue);
      expect(getSinglePoolDefinitions('')).toEqual(expectedValue);
      expect(getSinglePoolDefinitions(1)).toEqual(expectedValue);
      expect(getSinglePoolDefinitions(data)).toEqual(expectedValue);
    });

    it('should return all non-cyclic TicketPoolDefinitions', () => {
      const expectedValue = [singlePoolDefinition];
      const data = [
        cyclicPoolDefinition,
        singlePoolDefinition,
      ];

      expect(getSinglePoolDefinitions(data)).toEqual(expectedValue);
    });

    it('should return all non-cyclic TicketPoolDefinitions from provided time range', () => {
      const expectedValue = [singlePoolDefinition];
      const data = [
        singlePoolDefinition,
        {
          ...singlePoolDefinition,
          startDate: (new Date(2001, 3, 10, 3)).toISOString(),
          endDate: (new Date(2001, 3, 10, 4)).toISOString(),
        },
        cyclicPoolDefinition,
        {
          ...singlePoolDefinition,
          startDate: (new Date(2001, 7, 15, 9)).toISOString(),
          endDate: (new Date(2001, 7, 15, 13)).toISOString(),
        },
        {
          ...singlePoolDefinition,
          startDate: (new Date(2002, 3, 5, 9)).toISOString(),
          endDate: (new Date(2002, 3, 5, 13)).toISOString(),
        },
      ];
      const start = (new Date(2001, 7, 30)).toISOString();
      const end = (new Date(2001, 9, 30)).toISOString();

      expect(getSinglePoolDefinitions(data, { start, end })).toEqual(expectedValue);
    });
  });
});
