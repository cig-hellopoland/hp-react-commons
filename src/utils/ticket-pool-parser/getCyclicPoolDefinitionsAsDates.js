import addDays from 'date-fns/add_days';
import isEqual from 'date-fns/is_equal';
import _uniq from 'lodash/uniq';
import constants from './constants';
import format from './format';
import isBefore from './isBefore';
import isDateAvailableInPool from './isDateAvailableInPool';
import getCyclicPoolDefinitions from './getCyclicPoolDefinitions';

export default function getCyclicPoolDefinitionsAsDates(poolDefinitions, options = {}) {
  const { start, end } = options;
  const { dateFormat = constants.DAY_FORMAT } = options;

  const result = getCyclicPoolDefinitions(poolDefinitions, options)
    .reduce((acc, poolDefinition) => {
      const dates = [];
      let date = start || poolDefinition.startDate;

      while (isBefore(date, end) || isEqual(date, end)) {
        if (isDateAvailableInPool(date, poolDefinition)) {
          dates.push(format(date, dateFormat));
        }

        date = addDays(date, 1);
      }

      return [
        ...acc,
        ...dates,
      ];
    }, []);

  return _uniq(result);
}
