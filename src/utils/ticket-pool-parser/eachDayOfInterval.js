import addDays from 'date-fns/add_days';
import addMonths from 'date-fns/add_months';
import addWeeks from 'date-fns/add_weeks';
import addYears from 'date-fns/add_years';
import parse from 'date-fns/parse';

import checkArguments from './validateFnArguments';
import isAfter from './isAfter';
import isBefore from './isBefore';

const addFns = {
  addDays,
  addMonths,
  addWeeks,
  addYears,
};

const UNITS = {
  day: 'day',
  month: 'month',
  week: 'week',
  year: 'year',
};

export default function eachDayOfInterval(dirtyInterval, dirtyOptions) {
  checkArguments(arguments.length, 1);

  const interval = dirtyInterval || {};
  const options = dirtyOptions || {};

  const startDate = parse(interval.start);
  const endDate = parse(interval.end);

  if (isBefore(endDate, startDate)) {
    throw new RangeError('Invalid interval');
  }

  const unit = options.unit || UNITS.day;

  const addFnName = `add${unit.charAt(0).toUpperCase()}${unit.toLowerCase()}s`;
  const addFn = addFns[addFnName];

  if (!addFn) {
    throw new TypeError('Invalid interval unit');
  }

  const step = options.step || 1;

  const days = [];
  let currentDay = startDate;

  while (!isAfter(currentDay, endDate)) {
    days.push(currentDay);
    currentDay = addFn(currentDay, step);
  }

  return days;
}
