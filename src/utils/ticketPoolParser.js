import getISODay from 'date-fns/get_iso_day';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import setHours from 'date-fns/set_hours';
import setMilliseconds from 'date-fns/set_milliseconds';
import setMinutes from 'date-fns/set_minutes';
import setSeconds from 'date-fns/set_seconds';
import isBefore from 'date-fns/is_before';
import isEqual from 'date-fns/is_equal';
import getHours from 'date-fns/get_hours';
import getMinutes from 'date-fns/get_minutes';

const frequencyTypeDefinition = {
  CUSTOM: 'CUSTOM',
  DAILY: 'DAILY',
  MONTHLY: 'MONTHLY',
  WEEKLY: 'WEEKLY',
  WEEKDAYS: 'WEEKDAYS',
  WEEKENDS: 'WEEKENDS',
  YEARLY: 'YEARLY',
};

export const normalizeDate = date => (
  setHours(setMinutes(setSeconds(setMilliseconds(date, 0), 0), 0), 0)
);

export const hasDefinedEventTime = (date) => {
  const normalizedDate = normalizeDate(date);

  return !isEqual(normalizedDate, parse(date));
};

export const hasSameStartEndDate = (startDate, endDate) => {
  const normalizedStartDate = normalizeDate(startDate);
  const normalizedEndDate = normalizeDate(endDate);

  return isEqual(normalizedStartDate, normalizedEndDate);
};

export const getFormattedTime = date => format(date, 'HH:mm');

export const getFormattedDate = date => format(date, 'DD.MM.YYYY');

export const getFormattedPoolTime = (startDate, endDate) => {
  const formattedStartDate = getFormattedDate(startDate);

  if (startDate == null && endDate == null) {
    return '';
  }

  if (endDate == null) {
    return formattedStartDate;
  }

  const formattedEndDate = getFormattedDate(endDate);

  if (isBefore(new Date(), startDate)) {
    return `${formattedStartDate}-${formattedEndDate}`;
  }

  return `do ${formattedEndDate}`;
};

export const withFormattedPoolDate = (text, startDate, endDate) => {
  const hasSameDate = hasSameStartEndDate(startDate, endDate);

  if (!hasSameDate) {
    const formattedDate = getFormattedPoolTime(startDate, endDate);

    return `${text} (${formattedDate})`;
  }

  return text;
};

export const getFormattedListOfValues = (list, { locale }) => list.reduce((acc, item) => {
  let value = '';

  if (locale[item]) {
    value = locale[item];
  }

  if (acc.length > 0 && value.length > 0) {
    value = ` ${value}`;
  }

  return `${acc}${value}`;
}, '');

export const getFormattedEventTime = (startDate, endDate) => {
  const formattedStartTime = getFormattedTime(startDate);
  const hasSameHour = getHours(startDate) === getHours(endDate);
  const hasSameMinute = getMinutes(startDate) === getMinutes(endDate);

  if (endDate == null || (hasSameHour && hasSameMinute)) {
    return formattedStartTime;
  }

  const formattedEndTime = getFormattedTime(endDate);

  return `${formattedStartTime}-${formattedEndTime}`;
};

export const withFormattedEventTime = (text, startDate, endDate) => {
  const hasDefinedTime = hasDefinedEventTime(startDate) && hasDefinedEventTime(endDate);
  if (hasDefinedTime) {
    const formattedTime = getFormattedEventTime(startDate, endDate);

    return `${text} ${formattedTime}`;
  }

  return text;
};

export const getFormattedFrequency = ({
  frequencyType, daysOfWeek, monthsOfYear,
}, locale) => {
  let result = '';

  switch (frequencyType) {
    case frequencyTypeDefinition.CUSTOM:
      break;
    case frequencyTypeDefinition.MONTHLY:
      result = getFormattedListOfValues(monthsOfYear, { locale: locale.monthsOfYear });

      break;
    case frequencyTypeDefinition.WEEKLY:
      if (daysOfWeek && daysOfWeek.length > 0) {
        result = getFormattedListOfValues(daysOfWeek, { locale: locale.daysOfWeek });
      } else {
        result = locale[frequencyType];
      }

      break;
    default:
      result = locale[frequencyType];
  }

  if (result == null || result.length === 0) {
    return '';
  }

  return result;
};

export default function getFormattedPoolDate(
  {
    endDate, frequencyData, isCyclic, startDate,
  }, locale,
) {
  let result = '';

  if (!isCyclic) {
    const date = getFormattedDate(startDate);
    const dayOfWeek = getISODay(startDate);

    result = getFormattedListOfValues([dayOfWeek], { locale: locale.daysOfWeek });

    result = `${result}, ${date}`;

    result = withFormattedEventTime(result, startDate, endDate);

    return result;
  }

  result = getFormattedFrequency(frequencyData, locale);

  result = withFormattedEventTime(result, startDate, endDate);

  result = withFormattedPoolDate(result, startDate, endDate);

  return result;
}
