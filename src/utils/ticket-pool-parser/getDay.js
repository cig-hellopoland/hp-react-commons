import getDayFn from 'date-fns/get_day';

export default function getDay(date) {
  const jsDay = getDayFn(date);

  return jsDay === 0 ? 7 : jsDay;
}
