import { DateRange } from '.';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(quarterOfYear);

export const formatLoginTime = (date: string = '') => {
  if (!date) return '-';
  return dayjs(date).format('h:mm A, Do MMM YYYY');
};

export const validateNoFutureTime = (selectedDate: dayjs.Dayjs | null, tz: string) => {
  return (_: any, value: dayjs.Dayjs) => {
    if (!value || !selectedDate) return Promise.resolve();

    // Merge selected date with time from value, and apply timezone
    const selectedDateTime = dayjs
      .tz(selectedDate.format('YYYY-MM-DD'), tz)
      .hour(value.hour())
      .minute(value.minute());

    const now = dayjs().tz(tz);

    if (selectedDateTime.isAfter(now)) {
      return Promise.reject(new Error('Future time is not allowed for today.'));
    }

    return Promise.resolve();
  };
};

export const getStartEndDates = (range: DateRange) => {
  const today = dayjs();
  let startDate = today;
  let endDate = today;

  switch (range) {
    case DateRange['This Week']:
      // Last 7 days from today
      startDate = today.subtract(6, 'day');
      endDate = today;
      break;

    case DateRange['This Month']:
      // Last 30 days from today
      startDate = today.subtract(1, 'month');
      endDate = today;
      break;

    case DateRange['Quarter']:
      // Last 3 months from today
      startDate = today.subtract(3, 'month');
      endDate = today;
      break;

    case DateRange['6 Months']:
      // Last 6 months from today
      startDate = today.subtract(6, 'month');
      endDate = today;
      break;

    case DateRange['This Year']:
      startDate = today.startOf('year');
      endDate = today;
      break;

    case DateRange['Last Year']:
      // Whole last year
      startDate = dayjs().subtract(1, 'year').startOf('year');
      endDate = dayjs().subtract(1, 'year').endOf('year');
      break;

    case DateRange['Last 2 Years']:
      // Whole last 2 years
      startDate = dayjs().subtract(2, 'year').startOf('year');
      endDate = dayjs().subtract(1, 'year').endOf('year');
      break;

    case DateRange['Last 5 Years']:
      // Whole last 5 years
      startDate = dayjs().subtract(5, 'year').startOf('year');
      endDate = dayjs().subtract(1, 'year').endOf('year');
      break;

    case DateRange['Custom Range']:
      return null;
  }

  return {
    startDate: startDate.startOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    endDate: endDate.endOf('day').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
  };
};
