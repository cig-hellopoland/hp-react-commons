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
import isDate from 'date-fns/is_date';
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

/**
 * Utility methods for handling date operations in MaterialUI Pickers.
 * @class
 */
class MuiPickersDateFnsUtils {
  constructor({ locale } = {}) {
    this.locale = locale;
  }

  /**
   * Method used for converting provided date-like values into Date objects.
   * @method
   * @static
   * @param {date} value - parsable date
   * @return {date|null}
   */
  date = (value) => {
    if (typeof value === 'undefined') {
      return new Date();
    }

    if (value === null) {
      return null;
    }

    return new Date(value);
  };

  /**
   * Method used for parsing date strings with provided format into Date objects.
   * @method
   * @static
   * @param {string} value - string representation of date
   * @param {string} formatString - string used for date formatting
   * @return {string|null}
   */
  parse = (value, formatString) => {
    if (value === '') {
      return null;
    }

    return dateFnsParse(value, formatString, new Date());
  };

  /**
   * Method used for parsing dates into strings with provided format.
   * @method
   * @static
   * @param {date|string} date - date-like value
   * @param {string} formatString - string used for date formatting
   * @return {string|null}
   */
  format = (date, formatString) => format(date, formatString, { locale: this.locale });

  /**
   * Compares two dates and returns true if they are equal or false if they're different.
   * @method
   * @static
   * @param {date|string} date - first date to compare
   * @param {date|string} comparing - second date to compare
   * @return {boolean}
   */
  isEqual = (date, comparing) => {
    if (date === null && comparing === null) {
      return true;
    }

    return isEqual(date, comparing);
  };

  /**
   * Add the specified number of days to the given date.
   * @method
   * @static
   * @param {date|string|number} date - the date to be changed
   * @param {number} amount - the amount of days to be added
   * @param {object} options - the object with options. @see date-fns.
   * @return {date} the new date with the days added
   */
  addDays = addDays;

  /**
   * Returns false if argument is Invalid Date and true otherwise.
   * @method
   * @static
   * @param {*} date - the date to be changed
   * @param {object} options - the object with options. @see date-fns.
   * @return {boolean} the date is valid
   */
  isValid = (date, ...options) => {
    if (!isDate(date)) {
      return false;
    }

    return isValid(date, ...options);
  };

  /**
   * Get the number of milliseconds between the given dates.
   * @method
   * @static
   * @param {date|string|number} dateLeft - the later date
   * @param {date|string|number} dateRight - the earlier date
   * @param {object} options - the object with options. @see date-fns.
   * @return {number} the number of milliseconds
   */
  getDiff = differenceInMilliseconds;

  /**
   * Checks if date is null.
   * @method
   * @static
   * @param {date|string|number} date - date to check
   * @return {boolean} the date is null
   */
  isNull = date => date === null;

  /**
   * Is the first date after the second one?
   * @method
   * @static
   * @param {date|string|number} date - the date that should be after the other one to return true
   * @param {date|string|number} dateToCompare - the date to compare with
   * @param {object} options - the object with options. @see date-fns.
   * @return {boolean} the first date is after the second date
   */
  isAfter = isAfter;

  /**
   * Is the first date before the second one?
   * @method
   * @static
   * @param {date|string|number} date - the date that should be before the other one to return true
   * @param {date|string|number} dateToCompare - the date to compare with
   * @param {object} options - the object with options. @see date-fns.
   * @return {boolean} the first date is before the second date
   */
  isBefore = isBefore;

  /**
   * Is the first date after the end of day of second one?
   * @method
   * @static
   * @param {date|string|number} date - the date that should be after the other one to return true
   * @param {date|string|number} dateToCompare - the date to compare with
   * @return {boolean} the first date is after the second date
   */
  isAfterDay = (date, dateToCompare) => isAfter(date, endOfDay(dateToCompare));

  /**
   * Is the first date before the end of day of second one?
   * @method
   * @static
   * @param {date|string|number} date - the date that should be before the other one to return true
   * @param {date|string|number} dateToCompare - the date to compare with
   * @return {boolean} the first date is before the second date
   */
  isBeforeDay = (date, dateToCompare) => isBefore(date, startOfDay(dateToCompare));

  /**
   * Is the first date after the end of year of second one?
   * @method
   * @static
   * @param {date|string|number} date - the date that should be after the other one to return true
   * @param {date|string|number} dateToCompare - the date to compare with
   * @return {boolean} the first date is after the second date
   */
  isAfterYear = (date, dateToCompare) => isAfter(date, endOfYear(dateToCompare));

  /**
   * Is the first date before the end of year of second one?
   * @method
   * @static
   * @param {date|string|number} date - the date that should be before the other one to return true
   * @param {date|string|number} dateToCompare - the date to compare with
   * @return {boolean} the first date is before the second date
   */
  isBeforeYear = (date, dateToCompare) => isBefore(date, startOfYear(dateToCompare));

  /**
   * Return the start of a day for the given date. The result will be in the local timezone.
   * @method
   * @static
   * @param {date|string|number} date - the original date
   * @param {object} options - the object with options. @see date-fns.
   * @return {date} the start of a day
   */
  startOfDay = startOfDay;

  /**
   * Return the end of a day for the given date. The result will be in the local timezone.
   * @method
   * @static
   * @param {date|string|number} date - the original date
   * @param {object} options - the object with options. @see date-fns.
   * @return {date} the end of a day
   */
  endOfDay = endOfDay;

  /**
   * Formats number
   * @method
   * @static
   * @param {number} num - number to be formatted
   * @return {number} formatted number
   */
  formatNumber = num => num;

  /**
   * Get the hours of the given date.
   * @method
   * @static
   * @param {date|string|number} date - the original date
   * @param {object} options - the object with options. @see date-fns.
   * @return {number} the hours
   */
  getHours = getHours;

  /**
   * Set the hours to the given date.
   * @method
   * @static
   * @param {date|string|number} date - the date to be changed
   * @param {number} hours - the hours of the new date
   * @param {object} options - the object with options. @see date-fns.
   * @return {date} the new date with the hours setted
   */
  setHours = setHours;

  /**
   * Get the minutes of the given date.
   * @method
   * @static
   * @param {Date} date - the given date
   * @return {number} the minutes
   */
  getMinutes = date => date.getMinutes();

  /**
   * Set the minutes to the given date.
   * @method
   * @static
   * @param {date|string|number} date - the date to be changed
   * @param {number} minutes - the minutes of the new date
   * @param {object} options - the object with options. @see date-fns.
   * @return {date} the new date with the minutes setted
   */
  setMinutes = setMinutes;

  /**
   * Get the seconds of the given date.
   * @method
   * @static
   * @param {date|string|number} date - the date to be changed
   * @param {object} options - the object with options. @see date-fns.
   * @return {number} the seconds
   */
  getSeconds = getSeconds;

  /**
   * Set the seconds to the given date.
   * @method
   * @static
   * @param {date|string|number} date - the date to be changed
   * @param {number} seconds - the seconds of the new date
   * @param {object} options - the object with options. @see date-fns.
   * @return {date} the new date with the seconds setted
   */
  setSeconds = setSeconds;

  /**
   * Get the month of the given date.
   * @method
   * @static
   * @param {Date} date - the given date
   * @return {number} the month
   */
  getMonth = date => date.getMonth();

  /**
   * Are the given dates in the same day?
   * @method
   * @static
   * @param {date|string|number} dateLeft - the first date to check
   * @param {date|string|number} dateRight - the second date to check
   * @param {object} options - the object with options. @see date-fns.
   * @return {boolean} the dates are in the same day
   */
  isSameDay = isSameDay;

  /**
   * Returns formatted meridiem string.
   * @method
   * @static
   * @param {string} ampm - meridiem string
   * @return {string}
   */
  getMeridiemText = ampm => (ampm === 'am' ? 'AM' : 'PM');

  /**
   * Return the start of a month for the given date. The result will be in the local timezone.
   * @method
   * @static
   * @param {date|string|number} date - the original date
   * @param {object} options - the object with options. @see date-fns.
   * @return {date} the start of a month
   */
  getStartOfMonth = startOfMonth;

  /**
   * Return the date of a next month for the given date. The result will be in the local timezone.
   * @method
   * @static
   * @param {date|string|number} date - the original date
   * @return {date} the date of the next month
   */
  getNextMonth = date => addMonths(date, 1);

  /**
   * Return the date of a prev month for the given date. The result will be in the local timezone.
   * @method
   * @static
   * @param {date|string|number} date - the original date
   * @return {date} the date of the prev month
   */
  getPreviousMonth = date => addMonths(date, -1);

  /**
   * Get the year of the given date.
   * @method
   * @static
   * @param {date|string|number} date - the given date
   * @param {object} options - the object with options. @see date-fns.
   * @return {number} the year
   */
  getYear = getYear;

  /**
   * Set the year to the given date.
   * @method
   * @static
   * @param {date|string|number} date - the date to be changed
   * @param {number} year - the year of the new date
   * @param {object} options - the object with options. @see date-fns.
   * @return {date} the new date with the year setted
   */
  setYear = setYear;

  /**
   * Merge date and time of two dates.
   * @param {date|string|number} date - the date to be changed
   * @param {date|string|number} time - the time to be used
   * @return {date} the new date with the time setted
   */
  mergeDateAndTime = (date, time) => (
    this.setMinutes(this.setHours(date, this.getHours(time)), this.getMinutes(time))
  );

  /**
   * Get list of ISO days in a week.
   * @method
   * @static
   * @return {number[]} the list of days in a week
   */
  getWeekdays() {
    const now = new Date();
    // TODO: weekStartsOn should depend on locale, AFAIK not possible in date-fns v1
    // TODO: migrate to date-fns v2
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });

    const each = eachDay(
      start,
      end,
    );

    return each.map(day => format(day, 'dd', { locale: this.locale }));
  }

  /**
   * Get list of weeks in month of the provided date.
   * @method
   * @static
   * @param {date|string|number} date - the given date
   * @return {array}
   */
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

  /**
   * Get range of years from provided dates.
   * @method
   * @static
   * @param {date|string|number} start - date from which to start
   * @param {date|string|number} end - date at which to end
   * @return {number[]} the list of years
   */
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

  /**
   * Date and time with 12h time format.
   * @type {string}
   */
  dateTime12hFormat = 'MMMM Do hh:mm a';

  /**
   * Date and time with 24h time format.
   * @type {string}
   */
  dateTime24hFormat = 'MMMM Do HH:mm';

  /**
   * Time with 12h time format.
   * @type {string}
   */
  time12hFormat = 'hh:mm A';

  /**
   * Time with 24h time format.
   * @type {string}
   */
  time24hFormat = 'HH:mm';

  /**
   * Date format.
   * @type {string}
   */
  dateFormat = 'MMMM Do';
}


export default MuiPickersDateFnsUtils;
