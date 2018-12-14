import getDate from 'date-fns/get_date';
import getMonth from 'date-fns/get_month';
import differenceInCalendarWeeks from 'date-fns/difference_in_calendar_weeks';
import differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import differenceInCalendarMonths from 'date-fns/difference_in_calendar_months';
import startOfDay from 'date-fns/start_of_day';
import frequencyTypes from './frequencyTypes';
import getDay from './getDay';
import isAfter from './isAfter';
import isBefore from './isBefore';


export default function isDateAvailableInPool(date, poolDefinition) {
  const { frequencyData, startDate: poolStartDate } = poolDefinition;
  const { endDate, frequency, frequencyType } = frequencyData;
  const startDate = startOfDay(poolStartDate);

  if (isBefore(date, startDate) || isAfter(date, endDate)) {
    return false;
  }

  if (frequencyType === frequencyTypes.DAILY) {
    return differenceInCalendarDays(startDate, date) % frequency === 0;
  }

  if (frequencyType === frequencyTypes.WEEKLY) {
    const { daysOfWeek } = frequencyData;
    const allowedDaysOfWeek = daysOfWeek || [getDay(startDate)];
    const providedDay = getDay(date);
    if (allowedDaysOfWeek.includes(providedDay)) {
      return differenceInCalendarWeeks(startDate, date) % frequency === 0;
    }

    return false;
  }

  if (frequencyType === frequencyTypes.MONTHLY) {
    const { monthsOfYear } = frequencyData;
    const allowedDaysOfMonth = [getDate(startDate)];
    if (allowedDaysOfMonth.includes(getDate(date))) {
      if (differenceInCalendarMonths(startDate, date) % frequency === 0) {
        if (monthsOfYear && monthsOfYear.length) {
          return monthsOfYear.includes(getMonth(date) + 1);
        }
        return true;
      }
      return false;
    }
    return false;
  }

  return false;
}
