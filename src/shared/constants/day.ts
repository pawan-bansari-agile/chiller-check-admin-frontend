import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);

export const formatLoginTime = (date: string = '') => {
  if (!date) return '-';
  return dayjs(date).format('h:mm A, Do MMM YYYY');
};
