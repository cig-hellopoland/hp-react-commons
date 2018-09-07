import getCyclicPoolDefinitions from './getCyclicPoolDefinitions';

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

      expect(getCyclicPoolDefinitions()).toEqual(expectedValue);
      expect(getCyclicPoolDefinitions([])).toEqual(expectedValue);
      expect(getCyclicPoolDefinitions({})).toEqual(expectedValue);
      expect(getCyclicPoolDefinitions('')).toEqual(expectedValue);
      expect(getCyclicPoolDefinitions(1)).toEqual(expectedValue);
      expect(getCyclicPoolDefinitions(data)).toEqual(expectedValue);
    });

    it('should return all cyclic TicketPoolDefinitions', () => {
      const expectedValue = [cyclicPoolDefinition];
      const data = [
        cyclicPoolDefinition,
        singlePoolDefinition,
      ];

      expect(getCyclicPoolDefinitions(data)).toEqual(expectedValue);
    });

    it('should return all cyclic TicketPoolDefinitions from provided time range', () => {
      const data = [
        singlePoolDefinition,
        {
          name: 'Other example pool',
          startDate: (new Date(2001, 3, 10, 3)).toISOString(),
          endDate: (new Date(2001, 3, 10, 4)).toISOString(),
          frequencyData: {},
        },
        cyclicPoolDefinition,
        {
          ...cyclicPoolDefinition,
          startDate: (new Date(2001, 7, 15, 9)).toISOString(),
          endDate: (new Date(2001, 7, 15, 13)).toISOString(),
        },
        {
          ...cyclicPoolDefinition,
          startDate: (new Date(2002, 3, 5, 9)).toISOString(),
          endDate: (new Date(2002, 3, 5, 13)).toISOString(),
        },
      ];
      let expectedValue = [
        data[1],
        data[2],
        data[3],
      ];

      const start = (new Date(2001, 6, 30)).toISOString();
      const end = (new Date(2001, 8, 30)).toISOString();

      expect(getCyclicPoolDefinitions(data, { start, end })).toEqual(expectedValue);

      data[1].frequencyData.endDate = (new Date(2001, 4, 5, 13)).toISOString();

      expectedValue = [
        data[2],
        data[3],
      ];

      expect(getCyclicPoolDefinitions(data, { start, end })).toEqual(expectedValue);
    });
  });
});
