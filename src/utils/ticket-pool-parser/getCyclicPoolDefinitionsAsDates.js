import isValid from 'date-fns/is_valid';
import setDay from 'date-fns/set_day';
import eachDayOfInterval from './eachDayOfInterval';
import format from './format';
import frequencyTypes from './frequencyTypes';
import getCyclicPoolDefinitions from './getCyclicPoolDefinitions';
import isAfter from './isAfter';
import isBefore from './isBefore';

export default function getCyclicPoolDefinitionsAsDates(poolDefinitions, options = {}) {
  const { start, end } = options;

  return getCyclicPoolDefinitions(poolDefinitions, options)
    .reduce((acc, poolDefinition) => {
      const { frequencyData, startDate } = poolDefinition;
      const {
        endDate, daysOFWeek, frequency, frequencyType,
      } = frequencyData;
      const intervalStartDate = isAfter(start, startDate) ? start : startDate;
      const intervalEndDate = isBefore(end, endDate) ? end : endDate;

      if (!isValid(intervalEndDate)) {
        throw new RangeError('Ending date must be defined');
      }

      let dates;
      const interval = { start: intervalStartDate, end: intervalEndDate };
      const intervalOptions = { step: frequency };

      if (frequencyType === frequencyTypes.WEEKLY) {
        intervalOptions.unit = 'week';

        dates = daysOFWeek.reduce((bcc, dayOFWeek) => {
          interval.start = setDay(intervalStartDate, dayOFWeek === 7 ? 0 : dayOFWeek);

          return [
            ...bcc,
            ...eachDayOfInterval(interval, options),
          ];
        }, []);
      } else {
        if (frequencyType === frequencyTypes.MONTHLY) {
          intervalOptions.unit = 'month';
        }

        dates = eachDayOfInterval(interval, options);
      }

      return [
        ...acc,
        ...dates,
      ];
    }, [])
    .map(date => format(date));
}
