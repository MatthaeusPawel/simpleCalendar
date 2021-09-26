import * as cheerio from 'cheerio';
import { month, nameOfMonths, nameOfWeekdays, getPrevMonth, getNextMonth } from './dataAna.js'

function addLeadingZero(s) {
  return s < 10 ? `0${s}` : `${s}`;
}

export default function prepareData(data, date) {
  const $ = cheerio.load(data.toString(), null, false);

  const cal = $('#myCalendar');
  const myMonth = month(date);

  for (let week = 0; week < 6; ++week) {
    for (let day = 0; day < 7; ++day) {
      let currentClass = '';
      if (myMonth[week][day].currentMonth) {
        currentClass = 'currentMonth';

        if (day >= 5) {
          currentClass += ' weekend';
        }
      }

      cal.append(`\t<div class="daybox ${currentClass}" id='cal-${week},${day}'> ${myMonth[week][day].day} </div>`);
    }
    cal.append('\n');
  }
  const headlineStr = `${nameOfMonths[date.getMonth()]} ${date.getFullYear()}`;

  $('#displayMonthYearID').text(headlineStr);

  $('#prevMonth').prop('href', `main.html?month=${addLeadingZero(getPrevMonth(date).getMonth() + 1)}&year=${getPrevMonth(date).getFullYear()}`);
  $('#nextMonth').prop('href', `main.html?month=${addLeadingZero(getNextMonth(date).getMonth() + 1)}&year=${getNextMonth(date).getFullYear()}`);

  return $.html();
}
