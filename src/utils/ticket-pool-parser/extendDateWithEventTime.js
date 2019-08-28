import getHours from 'date-fns/get_hours';
import getMinutes from 'date-fns/get_minutes';
import parse from 'date-fns/parse';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';
import format from './format';
import validateFnArguments from './validateFnArguments';

export default function extendDateWithEventTime(dateString, eventStartDate) {
  validateFnArguments(arguments.length, 2);

  if (typeof dateString !== 'string') {
    throw new TypeError('dateString is expected to be a string.');
  }

  if (typeof eventStartDate !== 'string') {
    throw new TypeError('eventStartDate is expected to be a string.');
  }

  const d = parse(dateString);
  const hours = getHours(eventStartDate);
  const minutes = getMinutes(eventStartDate);

  return format(setHours(setMinutes(d, minutes), hours));
}
