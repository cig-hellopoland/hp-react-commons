import isInPoolScope from './isInPoolScope';
import format from './format';

const singlePoolDefinition = {
  endDate: format(new Date(2001, 8, 13, 3)),
  name: 'Example pool',
  startDate: format(new Date(2001, 8, 13, 4)),
};

describe('Ticket Pool Parser', () => {
  describe('isInPoolScope', () => {
    it('should throw if invalid number of arguments was provided', () => {
      expect(() => isInPoolScope(1)).toThrow();
    });

    it('should return false if passed date is not in scope', () => {
      const expectedValue = false;
      const data = [
        singlePoolDefinition,
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
      const date = format(new Date(2001, 3, 10, 3));

      expect(isInPoolScope([], date)).toEqual(expectedValue);
      expect(isInPoolScope(data, date)).toEqual(expectedValue);

      // TODO: cyclic pools
    });

    it('should return true if passed date is in scope', () => {
      const expectedValue = true;
      const data = [
        singlePoolDefinition,
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
      let date = format(new Date(2001, 7, 15, 3));

      expect(isInPoolScope(data, date)).toEqual(expectedValue);

      // TODO: cyclic pools

      data.push({
        ...singlePoolDefinition,
        frequencyData: {
          endDate: format(new Date(2003, 7, 15)),
        },
      });

      date = format(new Date(2002, 7, 15));

      expect(isInPoolScope(data, date)).toEqual(expectedValue);
    });
  });
});
