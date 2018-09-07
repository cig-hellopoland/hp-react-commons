import isBeforeFn from 'date-fns/is_before';
import validateFnArguments from './validateFnArguments';

export default function isBefore(date, dateToCompare) {
  validateFnArguments(arguments.length, 2);

  return isBeforeFn(date, dateToCompare);
}
