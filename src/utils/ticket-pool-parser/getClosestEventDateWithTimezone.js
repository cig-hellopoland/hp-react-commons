import addMonths from 'date-fns/add_months';
import addYears from 'date-fns/add_years';
import startOfToday from 'date-fns/start_of_today';

import constants from './constants';
import getCyclicPoolDefinitionsAsDates from './getCyclicPoolDefinitionsAsDates';
import getSinglePoolDefinitionsAsDates from './getSinglePoolDefinitionsAsDates';
import validateFnArguments from './validateFnArguments';
import isPoolDefinitionList from './isPoolDefinitionList';

export default function getClosestEventDateWithTimezone(poolDefinitions, dirtyOptions = {}) {
  validateFnArguments(arguments.length, 1);

  if (!isPoolDefinitionList(poolDefinitions)) {
    return null;
  }

  let start = dirtyOptions.start || startOfToday();
  let result;
  let counter = 0;

  // ignore results after 10 years of waiting
  while (!result && counter < 21) {
    let end;

    if (counter > 11) {
      end = addYears(start, 1);
    } else {
      end = addMonths(start, 1);
    }

    const dates = [
      ...getCyclicPoolDefinitionsAsDates(poolDefinitions, { start, end, dateFormat: constants.DATE_FORMAT }),
      ...getSinglePoolDefinitionsAsDates(poolDefinitions, { start, end, dateFormat: constants.DATE_FORMAT }),
    ].sort();

    result = dates[0] || null;

    if (!result) {
      start = end;
    }

    counter += 1;
  }

  return result;
}
