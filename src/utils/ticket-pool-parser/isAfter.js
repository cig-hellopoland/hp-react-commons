import isAfterFn from 'date-fns/is_after';
import validateFnArguments from './validateFnArguments';

export default function isAfter(date, dateToCompare) {
  validateFnArguments(arguments.length, 2);

  return isAfterFn(date, dateToCompare);
}
