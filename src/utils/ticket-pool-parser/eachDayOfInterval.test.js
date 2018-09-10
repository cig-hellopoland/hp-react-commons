import eachDayOfInterval from './eachDayOfInterval';
import format from './format';

describe('Ticket Pool Parser', () => {
  describe('eachDayOfInterval', () => {
    it('should throw if invalid number of arguments was provided', () => {
      expect(() => eachDayOfInterval(1)).toThrow();
    });

    it('should throw if invalid interval was provided', () => {
      const data = {
        start: (new Date(2002, 3, 5)).toISOString(),
        end: (new Date(2001, 3, 8)).toISOString(),
      };

      expect(() => eachDayOfInterval({})).toThrow();
      expect(() => eachDayOfInterval(data)).toThrow();
    });

    it('should throw if invalid interval unit was provided', () => {
      const data = {
        start: (new Date(2002, 3, 5)).toISOString(),
        end: (new Date(2002, 3, 8)).toISOString(),
      };
      const unit = 'omg';

      expect(() => eachDayOfInterval(data, { unit })).toThrow();
    });

    it('should return dates for default unit', () => {
      const data = {
        start: (new Date(2002, 3, 5)).toISOString(),
        end: (new Date(2002, 3, 8)).toISOString(),
      };
      const expectedValue = [
        format(new Date(2002, 3, 5)),
        format(new Date(2002, 3, 6)),
        format(new Date(2002, 3, 7)),
        format(new Date(2002, 3, 8)),
      ];

      expect(eachDayOfInterval(data)).toEqual(expectedValue);
    });

    it('should return values which account for different time', () => {
      let data = {
        start: (new Date(2002, 3, 5, 7)).toISOString(),
        end: (new Date(2002, 3, 8, 9)).toISOString(),
      };
      let expectedValue = [
        format(new Date(2002, 3, 5, 7)),
        format(new Date(2002, 3, 6, 7)),
        format(new Date(2002, 3, 7, 7)),
        format(new Date(2002, 3, 8, 7)),
      ];

      expect(eachDayOfInterval(data)).toEqual(expectedValue);

      data = {
        start: (new Date(2002, 3, 5, 7)).toISOString(),
        end: (new Date(2002, 3, 8, 5)).toISOString(),
      };
      expectedValue = [
        format(new Date(2002, 3, 5, 7)),
        format(new Date(2002, 3, 6, 7)),
        format(new Date(2002, 3, 7, 7)),
      ];

      expect(eachDayOfInterval(data)).toEqual(expectedValue);
    });

    it('should return dates for custom steps', () => {
      const data = {
        start: (new Date(2002, 3, 5)).toISOString(),
        end: (new Date(2002, 3, 8)).toISOString(),
      };
      const expectedValue = [
        format(new Date(2002, 3, 5)),
        format(new Date(2002, 3, 8)),
      ];
      const options = {
        step: 3,
      };

      expect(eachDayOfInterval(data, options)).toEqual(expectedValue);
    });

    it('should return dates for \'day\' unit', () => {
      const data = {
        start: (new Date(2002, 3, 5)).toISOString(),
        end: (new Date(2002, 3, 8)).toISOString(),
      };
      const expectedValue = [
        format(new Date(2002, 3, 5)),
        format(new Date(2002, 3, 6)),
        format(new Date(2002, 3, 7)),
        format(new Date(2002, 3, 8)),
      ];
      const options = {
        unit: 'day',
      };

      expect(eachDayOfInterval(data, options)).toEqual(expectedValue);
    });

    it('should return dates for \'month\' unit', () => {
      const data = {
        start: (new Date(2002, 0, 5)).toISOString(),
        end: (new Date(2002, 11, 3)).toISOString(),
      };
      let expectedValue = [
        format(new Date(2002, 0, 5)),
        format(new Date(2002, 1, 5)),
        format(new Date(2002, 2, 5)),
        format(new Date(2002, 3, 5)),
        format(new Date(2002, 4, 5)),
        format(new Date(2002, 5, 5)),
        format(new Date(2002, 6, 5)),
        format(new Date(2002, 7, 5)),
        format(new Date(2002, 8, 5)),
        format(new Date(2002, 9, 5)),
        format(new Date(2002, 10, 5)),
      ];
      const options = {
        unit: 'month',
      };

      expect(eachDayOfInterval(data, options)).toEqual(expectedValue);

      options.step = 5;
      expectedValue = [
        format(new Date(2002, 0, 5)),
        format(new Date(2002, 5, 5)),
        format(new Date(2002, 10, 5)),
      ];

      expect(eachDayOfInterval(data, options)).toEqual(expectedValue);
    });

    it('should return dates for \'week\' unit', () => {
      const data = {
        start: (new Date(2002, 3, 5)).toISOString(),
        end: (new Date(2002, 4, 3)).toISOString(),
      };
      let expectedValue = [
        format(new Date(2002, 3, 5)),
        format(new Date(2002, 3, 12)),
        format(new Date(2002, 3, 19)),
        format(new Date(2002, 3, 26)),
        format(new Date(2002, 4, 3)),
      ];
      const options = {
        unit: 'week',
      };

      expect(eachDayOfInterval(data, options)).toEqual(expectedValue);

      options.step = 4;
      expectedValue = [
        format(new Date(2002, 3, 5)),
        format(new Date(2002, 4, 3)),
      ];

      expect(eachDayOfInterval(data, options)).toEqual(expectedValue);
    });

    it('should return dates for \'year\' unit', () => {
      const data = {
        start: (new Date(2002, 3, 5)).toISOString(),
        end: (new Date(2007, 4, 3)).toISOString(),
      };
      let expectedValue = [
        format(new Date(2002, 3, 5)),
        format(new Date(2003, 3, 5)),
        format(new Date(2004, 3, 5)),
        format(new Date(2005, 3, 5)),
        format(new Date(2006, 3, 5)),
        format(new Date(2007, 3, 5)),
      ];
      const options = {
        unit: 'year',
      };

      expect(eachDayOfInterval(data, options)).toEqual(expectedValue);

      options.step = 4;
      expectedValue = [
        format(new Date(2002, 3, 5)),
        format(new Date(2006, 3, 5)),
      ];

      expect(eachDayOfInterval(data, options)).toEqual(expectedValue);
    });
  });
});
