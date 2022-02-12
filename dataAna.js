/* eslint-disable no-labels */
/**
 * @param {number} daysInWeek (constant) number of days in a week
 * @param {number} daysInFourWeeks (constant) number of days in four weeks
 */
const daysInWeek = 7;
const daysInFourWeeks = 4 * daysInWeek;

/**
 *  Computes the last day of the next month
 *
 * @param {Date} d - The absolute date the calculation is performed
 * @return {Date} The last day of the month after the input
 */
export const getNextMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 2, 0);
/**
 *  Computes the last day of the previous month
 *
 * @param {Date} d - The absolute date the calculation is performed
 * @return {Date} The last day of the month prior of the input
 */
export const getPrevMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 0);

/**
 *  Computes the number of days in the month
 *
 * @param {Date} d - The absolute date the calculation is performed
 * @return {number} The number of days in the month
 */
const daysInMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();

/**
 *  Computes the first weekday of a month
 *
 * @param {Date} d - The absolute date the calculation is performed
 * @return {number} The last day of the month prior of the input
 */
const weekdayFirstDay = (d) => new Date(d.getFullYear(), d.getMonth(), 1).getDay();

/**
 * @param {string[]} nameOfMonths (English) names for the months
 * @param {string[]} nameOfWeekdays (English) names for the weekdays, starting with monday
 */
export const nameOfMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const nameOfWeekdays = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

/**
 * @param {number} i Number to be shifted
 * @return {number} Shifted by 1, mod 7
 */
const fromSundayToMondayStart = (i) => (i + 6) % daysInWeek;
/**
 * @param  {Date} d The date specifying the month
 * @return {number} The (minimal) number of rows to display the month
 */
const numberOfRows = (d) => {
  const numberOfDays = daysInMonth(d);
  const rem = numberOfDays - daysInFourWeeks;

  const firstWeekday = weekdayFirstDay(d);

  //  februar starting on monday (and no leap year)
  if (rem === 0 && firstWeekday === 1) return 4;
  // spill over to sixth week
  if (rem + fromSundayToMondayStart(weekdayFirstDay(d)) > daysInWeek) return 6;

  return 5;
};
/**
 * @param {Date} d The date with the relevant month
 * @return {{week: number, day: number}} Position of the 1st in the month
 */
const positionFirst = (d) => {
  const row = numberOfRows(d);
  const day = fromSundayToMondayStart(weekdayFirstDay(d));

  if (row === 6) return { week: 0, day };
  return { week: 1, day };
};

/**
 * @param {Date} d The date with the relevant month
 * @return {{currentMonth: boolean, day: number}[][]} Position of the 1st in the month
 */
export function month(d) {
/**
 * @param {{currentMonth: boolean, day: number}[][]} montharray
 */
  const montharray = [];

  let weekLoop;
  let dayLoop;

  for (weekLoop = 0; weekLoop < 6; ++weekLoop) montharray.push([]);

  let dayCounter = 1;
  const startPos = positionFirst(d);

  // eslint-disable-next-line no-restricted-syntax
  weekLoopLabel:
  for (weekLoop = startPos.week; weekLoop < 6; ++weekLoop) {
    for (dayLoop = weekLoop === startPos.week ? startPos.day : 0; dayLoop < 7; ++dayLoop) {
      montharray[weekLoop][dayLoop] = { currentMonth: true, day: dayCounter };
      if (dayCounter === daysInMonth(d)) break weekLoopLabel;
      dayCounter += 1;
    }
  }
  const finalWeekLoop = weekLoop;
  const finalDayLoop = dayLoop;

  dayCounter = 1;
  for (weekLoop = finalWeekLoop; weekLoop < 6; ++weekLoop) {
    for (dayLoop = weekLoop === finalWeekLoop ? finalDayLoop + 1 : 0; dayLoop < 7; ++dayLoop) {
      montharray[weekLoop][dayLoop] = { currentMonth: false, day: dayCounter };
      dayCounter += 1;
    }
  }

  dayCounter = daysInMonth(getPrevMonth(d));
  for (weekLoop = startPos.week; weekLoop >= 0; --weekLoop) {
    for (dayLoop = weekLoop === startPos.week ? startPos.day - 1 : 6; dayLoop >= 0; --dayLoop) {
      montharray[weekLoop][dayLoop] = { currentMonth: false, day: dayCounter };
      dayCounter -= 1;
    }
  }

  return montharray;
}
