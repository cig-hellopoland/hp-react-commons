import isDateAvailableInPool from './isDateAvailableInPool';

const singlePoolDefinition = {
  startDate: (new Date(2001, 8, 13)).toISOString(),
  name: 'Example pool',
  endDate: (new Date(2001, 8, 18)).toISOString(),
};

describe('Ticket Pool Parser', () => {
  describe('isDateAvailableInPool', () => {
    it('should return false if date is before pool startDate', () => {
      const pool = {
        ...singlePoolDefinition,
        frequencyData: {},
      };

      expect(isDateAvailableInPool(new Date(2001, 8, 12), pool)).toEqual(false);
    });

    it('should return false if date is after frequencyData.endDate', () => {
      const pool = {
        ...singlePoolDefinition,
        frequencyData: {
          endDate: new Date(2003, 2, 4),
        },
      };

      expect(isDateAvailableInPool(new Date(2003, 8, 12), pool)).toEqual(false);
    });

    it('should work for daily interval with frequency 1', () => {
      const pool = {
        ...singlePoolDefinition,
        frequencyData: {
          frequency: 1,
          frequencyType: 'DAILY',
        },
      };

      expect(isDateAvailableInPool(new Date(2001, 8, 13), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2001, 8, 14), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2001, 8, 15), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2001, 8, 18), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2002, 8, 12), pool)).toEqual(true);
    });

    it('should work for daily interval with frequency 2', () => {
      const pool = {
        ...singlePoolDefinition,
        frequencyData: {
          frequency: 2,
          frequencyType: 'DAILY',
        },
      };

      expect(isDateAvailableInPool(new Date(2001, 8, 13), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2001, 8, 14), pool)).toEqual(false);
      expect(isDateAvailableInPool(new Date(2001, 8, 15), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2001, 8, 18), pool)).toEqual(false);
      expect(isDateAvailableInPool(new Date(2002, 8, 12), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2002, 1, 12), pool)).toEqual(true);
    });

    it('should work for daily interval with frequency 13', () => {
      const pool = {
        ...singlePoolDefinition,
        frequencyData: {
          frequency: 13,
          frequencyType: 'DAILY',
        },
      };

      expect(isDateAvailableInPool(new Date(2001, 8, 13), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2001, 8, 14), pool)).toEqual(false);
      expect(isDateAvailableInPool(new Date(2001, 8, 26), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2001, 9, 9), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2001, 9, 10), pool)).toEqual(false);
    });

    it('should work for weekly interval with frequency 1', () => {
      const pool = {
        ...singlePoolDefinition,
        frequencyData: {
          frequency: 1,
          frequencyType: 'WEEKLY',
        },
      };

      expect(isDateAvailableInPool(new Date(2001, 8, 13), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2001, 8, 19), pool)).toEqual(false);
      expect(isDateAvailableInPool(new Date(2001, 8, 20), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2001, 8, 22), pool)).toEqual(false);
      expect(isDateAvailableInPool(new Date(2002, 4, 16), pool)).toEqual(true);
    });

    it('should work for weekly interval with frequency 1 and daysOfWeek set', () => {
      const pool = {
        ...singlePoolDefinition,
        frequencyData: {
          frequency: 1,
          daysOfWeek: [3, 6],
          frequencyType: 'WEEKLY',
        },
      };

      expect(isDateAvailableInPool(new Date(2001, 8, 13), pool)).toEqual(false);
      expect(isDateAvailableInPool(new Date(2001, 8, 15), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2004, 1, 11), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2012, 0, 10), pool)).toEqual(false);
    });

    it('should work for weekly interval with frequency 2', () => {
      const pool = {
        ...singlePoolDefinition,
        frequencyData: {
          frequency: 2,
          frequencyType: 'WEEKLY',
        },
      };

      expect(isDateAvailableInPool(new Date(2001, 8, 13), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2001, 8, 20), pool)).toEqual(false);
      expect(isDateAvailableInPool(new Date(2001, 8, 27), pool)).toEqual(true);
      expect(isDateAvailableInPool(new Date(2001, 9, 4), pool)).toEqual(false);
      expect(isDateAvailableInPool(new Date(2002, 10, 21), pool)).toEqual(true);
    });
  });

  it('should work for weekly interval with frequency 3 and daysOfWeek set', () => {
    const pool = {
      ...singlePoolDefinition,
      frequencyData: {
        frequency: 3,
        daysOfWeek: [1, 2],
        frequencyType: 'WEEKLY',
      },
    };

    expect(isDateAvailableInPool(new Date(2001, 8, 13), pool)).toEqual(false);
    expect(isDateAvailableInPool(new Date(2001, 8, 17), pool)).toEqual(false);
    expect(isDateAvailableInPool(new Date(2001, 9, 1), pool)).toEqual(true);
    expect(isDateAvailableInPool(new Date(2001, 9, 2), pool)).toEqual(true);
    expect(isDateAvailableInPool(new Date(2001, 9, 22), pool)).toEqual(true);
    expect(isDateAvailableInPool(new Date(2001, 9, 29), pool)).toEqual(false);
    expect(isDateAvailableInPool(new Date(2002, 0, 14), pool)).toEqual(true);
  });

  it('should work for monthly interval with frequency 1', () => {
    const pool = {
      ...singlePoolDefinition,
      frequencyData: {
        frequency: 1,
        frequencyType: 'MONTHLY',
      },
    };

    expect(isDateAvailableInPool(new Date(2001, 8, 13), pool)).toEqual(true);
    expect(isDateAvailableInPool(new Date(2001, 9, 13), pool)).toEqual(true);
    expect(isDateAvailableInPool(new Date(2001, 9, 20), pool)).toEqual(false);
    expect(isDateAvailableInPool(new Date(2001, 11, 13), pool)).toEqual(true);
    expect(isDateAvailableInPool(new Date(2004, 7, 13), pool)).toEqual(true);
  });

  it('should work for monthly interval with frequency 1 and day nr 31', () => {
    const pool = {
      ...singlePoolDefinition,
      startDate: new Date(2001, 7, 31),
      frequencyData: {
        frequency: 1,
        frequencyType: 'MONTHLY',
      },
    };

    expect(isDateAvailableInPool(new Date(2001, 7, 31), pool)).toEqual(true);
    // 31 does not exist
    expect(isDateAvailableInPool(new Date(2001, 8, 31), pool)).toEqual(false);
    expect(isDateAvailableInPool(new Date(2001, 9, 31), pool)).toEqual(true);
    // 31 does not exist
    expect(isDateAvailableInPool(new Date(2001, 10, 31), pool)).toEqual(false);
    expect(isDateAvailableInPool(new Date(2001, 11, 31), pool)).toEqual(true);
    // 30 does not exist
    expect(isDateAvailableInPool(new Date(2002, 1, 30), pool)).toEqual(false);
  });

  it('should work for monthly interval with frequency 2', () => {
    const pool = {
      ...singlePoolDefinition,
      frequencyData: {
        frequency: 2,
        frequencyType: 'MONTHLY',
      },
    };

    expect(isDateAvailableInPool(new Date(2001, 8, 13), pool)).toEqual(true);
    expect(isDateAvailableInPool(new Date(2001, 9, 13), pool)).toEqual(false);
    expect(isDateAvailableInPool(new Date(2001, 10, 13), pool)).toEqual(true);
    expect(isDateAvailableInPool(new Date(2001, 11, 13), pool)).toEqual(false);
    expect(isDateAvailableInPool(new Date(2002, 0, 13), pool)).toEqual(true);
    expect(isDateAvailableInPool(new Date(2002, 1, 13), pool)).toEqual(false);
  });

  it('should work for monthly interval with frequency 3 and monthsOfYear set', () => {
    const pool = {
      ...singlePoolDefinition,
      frequencyData: {
        frequency: 3,
        frequencyType: 'MONTHLY',
        monthsOfYear: [1, 6, 5, 3, 2],
      },
    };

    expect(isDateAvailableInPool(new Date(2001, 8, 13), pool)).toEqual(false);
    expect(isDateAvailableInPool(new Date(2001, 9, 13), pool)).toEqual(false);
    expect(isDateAvailableInPool(new Date(2001, 11, 13), pool)).toEqual(false);
    expect(isDateAvailableInPool(new Date(2002, 1, 13), pool)).toEqual(false);
    expect(isDateAvailableInPool(new Date(2002, 2, 13), pool)).toEqual(true);
    expect(isDateAvailableInPool(new Date(2002, 4, 13), pool)).toEqual(false);
    expect(isDateAvailableInPool(new Date(2002, 5, 13), pool)).toEqual(true);
    expect(isDateAvailableInPool(new Date(2002, 11, 13), pool)).toEqual(false);
    expect(isDateAvailableInPool(new Date(2015, 2, 13), pool)).toEqual(true);
  });
});
