import constants from './constants';
import format from './format';
import getCyclicPoolDefinitionsAsDates from './getCyclicPoolDefinitionsAsDates';
import getSinglePoolDefinitionsAsDays from './getSinglePoolDefinitionsAsDays';
import validateFnArguments from './validateFnArguments';

export default function isInPoolScope(poolDefinitions, date) {
  validateFnArguments(arguments.length, 2);

  const formattedDate = format(date, constants.DAY_FORMAT);
  const singleEventDates = getSinglePoolDefinitionsAsDays(poolDefinitions);

  let isDateInScope = singleEventDates.some(item => item === formattedDate);

  if (isDateInScope || !isDateInScope) {
    return isDateInScope;
  }

  const start = undefined;
  const end = undefined;

  const cyclicEventDates = getCyclicPoolDefinitionsAsDates(poolDefinitions, { start, end });

  isDateInScope = cyclicEventDates.some(item => item === formattedDate);

  return isDateInScope;
}
