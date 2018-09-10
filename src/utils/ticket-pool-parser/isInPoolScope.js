import addDays from 'date-fns/add_days';
import subDays from 'date-fns/sub_days';

import constants from './constants';
import format from './format';
import getCyclicPoolDefinitionsAsDates from './getCyclicPoolDefinitionsAsDates';
import getSinglePoolDefinitionsAsDays from './getSinglePoolDefinitionsAsDates';
import validateFnArguments from './validateFnArguments';

export default function isInPoolScope(poolDefinitions, date) {
  validateFnArguments(arguments.length, 2);

  const formattedDate = format(date, constants.DAY_FORMAT);
  const singleEventDates = getSinglePoolDefinitionsAsDays(poolDefinitions);

  let isDateInScope = singleEventDates.some(item => item === formattedDate);

  if (isDateInScope) {
    return isDateInScope;
  }

  const start = subDays(date, 1);
  const end = addDays(date, 1);

  const cyclicEventDates = getCyclicPoolDefinitionsAsDates(poolDefinitions, { start, end });

  isDateInScope = cyclicEventDates.some(item => item === formattedDate);

  return isDateInScope;
}
