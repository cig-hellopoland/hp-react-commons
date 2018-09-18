import getHours from 'date-fns/get_hours';
import getMinutes from 'date-fns/get_minutes';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';
import subMinutes from 'date-fns/sub_minutes';

export default function getDateFromCalendar(dateString, startDate) {
  const d = new Date(dateString);
  const tzOffset = d.getTimezoneOffset();
  const hours = getHours(startDate);
  const minutes = getMinutes(startDate);

  return setHours(setMinutes(subMinutes(d, tzOffset), minutes), hours);
}
