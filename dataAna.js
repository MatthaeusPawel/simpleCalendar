const daysInWeek = 7;
const daysInFourWeeks = 28;

/**
 *  Computes the first day of the next month
 * @param {Date} d - The absolute date the calculation is performed
 * @return {date} The first day of the month after the input
 */

export const getNextMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 2, 0);
export const getPrevMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 0);

const daysInPrevMonth = (d) => new Date(getPrevMonth(d)).getDate();
const daysInCurrentMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
const weekdayFirstDay = (d) => new Date(d.getFullYear(), d.getMonth(), 1).getDay();

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

const fromSundayToMondayStart = (i) => (i + 6) % daysInWeek;
const numberOfRows = (d) => {
  const numberOfDays = daysInCurrentMonth(d);
  const rem = numberOfDays - daysInFourWeeks;

  const firstWeekday = weekdayFirstDay(d);

  //  februar starting on monday (and no leap year)
  if (rem === 0 && firstWeekday === 1) return 4;
  // spill over to sixth week
  if (rem + fromSundayToMondayStart(weekdayFirstDay(d)) > daysInWeek) return 6;

  return 5;
};

const positionFirst = (d) => {
  const row = numberOfRows(d);
  const day = fromSundayToMondayStart(weekdayFirstDay(d));

  if (row === 6) return { week: 0, day };
  return { week: 1, day };
};

export function month(d) {
  const montharray = [];

  for (let week = 0; week < 6; ++week) montharray.push([]);

  let dayCounter = 1;
  const startPos = positionFirst(d);

  let weekLoop;
  let dayLoop;
  for (weekLoop = startPos.week; weekLoop < 6; ++weekLoop) {
    for (
      dayLoop = weekLoop === startPos.week ? startPos.day : 0;
      dayLoop < 7;
      ++dayLoop
    ) {
      montharray[weekLoop][dayLoop] = { currentMonth: true, day: dayCounter };
      if (dayCounter === daysInCurrentMonth(d)) break;
      dayCounter += 1;
    }
    if (dayCounter === daysInCurrentMonth(d)) break;
  }
  const finalWeekLoop = weekLoop;
  const finalDayLoop = dayLoop;

  dayCounter = 1;
  for (weekLoop = finalWeekLoop; weekLoop < 6; ++weekLoop) {
    for (
      dayLoop = weekLoop === finalWeekLoop ? finalDayLoop + 1 : 0;
      dayLoop < 7;
      ++dayLoop
    ) {
      montharray[weekLoop][dayLoop] = { currentMonth: false, day: dayCounter };
      dayCounter += 1;
    }
  }

  dayCounter = daysInPrevMonth(d);
  for (weekLoop = startPos.week; weekLoop >= 0; --weekLoop) {
    for (
      dayLoop = weekLoop === startPos.week ? startPos.day - 1 : 6;
      dayLoop >= 0;
      --dayLoop
    ) {
      montharray[weekLoop][dayLoop] = { currentMonth: false, day: dayCounter };
      dayCounter += 1;
    }
  }

  return montharray;
}
