import addDays from 'date-fns/add_days';
import addMonths from 'date-fns/add_months';
import addYears from 'date-fns/add_years';
import differenceInMilliseconds from 'date-fns/difference_in_milliseconds';
import eachDay from 'date-fns/each_day';
import endOfDay from 'date-fns/end_of_day';
import endOfMonth from 'date-fns/end_of_month';
import endOfWeek from 'date-fns/end_of_week';
import endOfYear from 'date-fns/end_of_year';
import format from 'date-fns/format';
import getHours from 'date-fns/get_hours';
import getSeconds from 'date-fns/get_seconds';
import getYear from 'date-fns/get_year';
import isAfter from 'date-fns/is_after';
import isBefore from 'date-fns/is_before';
import isEqual from 'date-fns/is_equal';
import isSameDay from 'date-fns/is_same_day';
import isValid from 'date-fns/is_valid';
import dateFnsParse from 'date-fns/parse';
import setHours from 'date-fns/set_hours';
import setMinutes from 'date-fns/set_minutes';
import setSeconds from 'date-fns/set_seconds';
import setYear from 'date-fns/set_year';
import startOfDay from 'date-fns/start_of_day';
import startOfMonth from 'date-fns/start_of_month';
import startOfWeek from 'date-fns/start_of_week';
import startOfYear from 'date-fns/start_of_year';

export default class MuiPickersDateFnsUtils {
  constructor({ locale } = {}) {
    this.locale = locale;
  }

  date = (value) => {
    if (typeof value === 'undefined') {
      return new Date();
    }

    if (value === null) {
      return null;
    }

    return new Date(value);
  };

  parse = (value, formatString) => {
    if (value === '') {
      return null;
    }

    return dateFnsParse(value, formatString, new Date());
  };

  format = (date, formatString) => format(date, formatString, { locale: this.locale });

  isEqual = (date, comparing) => {
    if (date === null && comparing === null) {
      return true;
    }

    return isEqual(date, comparing);
  };

  addDays = addDays;

  isValid = isValid;

  getDiff = differenceInMilliseconds;

  isNull = date => date === null;

  isAfter = isAfter;

  isBefore = isBefore;

  isAfterDay = (date, value) => isAfter(date, endOfDay(value));

  isBeforeDay = (date, value) => isBefore(date, startOfDay(value));

  isBeforeYear = (date, value) => isBefore(date, startOfYear(value));

  isAfterYear = (date, value) => isAfter(date, endOfYear(value));

  startOfDay = startOfDay;

  endOfDay = endOfDay;

  formatNumber = num => num;

  getHours = getHours;

  setHours = setHours;

  getMinutes = date => date.getMinutes();

  setMinutes = setMinutes;

  getSeconds = getSeconds;

  setSeconds = setSeconds;

  getMonth = date => date.getMonth();

  isSameDay = isSameDay;

  getMeridiemText = ampm => (ampm === 'am' ? 'AM' : 'PM');

  getStartOfMonth = startOfMonth;

  getNextMonth = date => addMonths(date, 1);

  getPreviousMonth = date => addMonths(date, -1);

  getYear = getYear;

  setYear = setYear;

  mergeDateAndTime = (date, time) => (
    this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time))
  );

  getWeekdays() {
    const now = new Date();
    // TODO: weekStartsOn should depend on locale, AFAIK not possible in date-fns v1
    // TODO: mograte to date-fns v2
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });

    const each = eachDay(
      start,
      end,
    );

    return each.map(day => format(day, 'dd', { locale: this.locale }));
  }

  getWeekArray = (date) => {
    // TODO: weekStartsOn should depend on locale, AFAIK not possible in date-fns v1
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: 1 });
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: 1 });

    const nestedWeeks = [];
    let count = 0;
    let current = start;
    while (isBefore(current, end)) {
      const weekNumber = Math.floor(count / 7);
      nestedWeeks[weekNumber] = nestedWeeks[weekNumber] || [];
      nestedWeeks[weekNumber].push(current);
      current = addDays(current, 1);
      count += 1;
    }

    return nestedWeeks;
  };

  getYearRange = (start, end) => {
    const startDate = startOfYear(new Date(start));
    const endDate = endOfYear(new Date(end));
    const years = [];

    let current = startDate;
    while (isBefore(current, endDate)) {
      years.push(current);
      current = addYears(current, 1);
    }

    return years;
  };

  // displaying methpds
  getCalendarHeaderText(date) {
    return format(date, 'MMMM YYYY', { locale: this.locale });
  }

  getYearText(date) {
    return format(date, 'YYYY', { locale: this.locale });
  }

  getDatePickerHeaderText(date) {
    return format(date, 'ddd, MMM D', { locale: this.locale });
  }

  getDateTimePickerHeaderText(date) {
    return format(date, 'MMM D', { locale: this.locale });
  }

  getDayText(date) {
    return format(date, 'D', { locale: this.locale });
  }

  getHourText(date, ampm) {
    return format(date, ampm ? 'hh' : 'HH', { locale: this.locale });
  }

  getMinuteText(date) {
    return format(date, 'mm', { locale: this.locale });
  }

  getSecondText(date) {
    return format(date, 'ss', { locale: this.locale });
  }

  dateTime12hFormat = 'MMMM Do hh:mm a';

  dateTime24hFormat = 'MMMM Do HH:mm';

  time12hFormat = 'hh:mm A';

  time24hFormat = 'HH:mm';

  dateFormat = 'MMMM Do';
}
