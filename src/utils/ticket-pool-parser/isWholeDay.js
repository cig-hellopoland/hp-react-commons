import getHours from 'date-fns/get_hours';
import getMinutes from 'date-fns/get_minutes';
import isSameDay from 'date-fns/is_same_day';

export default function isWholeDay(date, dateToCompare) {
  const hasSameDay = isSameDay(date, dateToCompare);

  if (!hasSameDay) {
    return hasSameDay;
  }

  const isStartOfDay = getHours(date) === 0 && getMinutes(date) === 0;
  const isEndOfDay = getHours(dateToCompare) === 23 && getMinutes(dateToCompare) === 59;

  return isStartOfDay && isEndOfDay;
}
