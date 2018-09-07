import formatFn from 'date-fns/format';
import constants from './constants';

export default function format(date, formatStr = constants.DATE_FORMAT) {
  return formatFn(date, formatStr);
}
