import isValidFn from 'date-fns/is_valid';

export default function isDateValid(date) {
  return isValidFn(date);
}
