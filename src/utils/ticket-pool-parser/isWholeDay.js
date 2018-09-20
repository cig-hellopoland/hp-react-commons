import getHours from 'date-fns/get_hours';
import getMinutes from 'date-fns/get_minutes';
import isSameDay from 'date-fns/is_same_day';

export default function isWholeDay(startDate, endDate) {
  const hasSameDay = isSameDay(startDate, endDate);

  if (!hasSameDay) {
    return hasSameDay;
  }

  const isStartOfDay = getHours(startDate) === 0 && getMinutes(startDate) === 0;
  const isEndOfDay = getHours(endDate) === 23 && getMinutes(endDate) === 59;

  return isStartOfDay && isEndOfDay;
}
