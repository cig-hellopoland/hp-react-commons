import isValid from 'date-fns/is_valid';
import setDay from 'date-fns/set_day';
import constants from './constants';
import eachDayOfInterval from './eachDayOfInterval';
import format from './format';
import frequencyTypes from './frequencyTypes';
import getCyclicPoolDefinitions from './getCyclicPoolDefinitions';
import isAfter from './isAfter';
import isBefore from './isBefore';
import parse from './parse';
import _uniq from 'lodash/uniq';

function getIntervalDate(date, dateToCompare, compareFn) {
  let value;

  if (!date) {
    value = dateToCompare;
  } else if (!dateToCompare) {
    value = date;
  } else {
    value = compareFn(date, dateToCompare) ? date : dateToCompare;
  }

  return parse(value);
}

export default function getCyclicPoolDefinitionsAsDates(poolDefinitions, options = {}) {
  const { start, end } = options;

  const result = getCyclicPoolDefinitions(poolDefinitions, options)
    .reduce((acc, poolDefinition) => {
      const { frequencyData, startDate } = poolDefinition;
      const { endDate, frequency, frequencyType } = frequencyData;
      const intervalStartDate = getIntervalDate(start, startDate, isAfter);
      const intervalEndDate = getIntervalDate(end, endDate, isBefore);

      if (!intervalEndDate || !isValid(intervalEndDate)) {
        throw new RangeError('Ending date must be defined');
      }

      let dates;
      const interval = { start: intervalStartDate, end: intervalEndDate };
      const intervalOptions = { step: frequency };

      if (frequencyType === frequencyTypes.WEEKLY) {
        intervalOptions.unit = 'week';
        const { daysOfWeek } = frequencyData;

        dates = daysOfWeek.reduce((bcc, dayOfWeek) => {
          interval.start = setDay(intervalStartDate, dayOfWeek === 7 ? 0 : dayOfWeek);

          return [
            ...bcc,
            ...eachDayOfInterval(interval, intervalOptions),
          ];
        }, []);
      } else {
        if (frequencyType === frequencyTypes.MONTHLY) {
          intervalOptions.unit = 'month';
        }

        dates = eachDayOfInterval(interval, intervalOptions);
      }

      return [
        ...acc,
        ...dates,
      ];
    }, [])
    .map(date => format(date, constants.DAY_FORMAT))
    .sort();

  return _uniq(result);

}
