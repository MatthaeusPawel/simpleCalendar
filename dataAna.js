
const daysInWeek = 7;
const daysInFourWeeks = 28;

export const getNextMonth = (d) =>{return new Date(d.getFullYear(), d.getMonth()+2,0)}; 
export const getPrevMonth = (d) =>{return new Date(d.getFullYear(), d.getMonth(),0)}; 

const daysInPrevMonth = (d) => {return new Date(getPrevMonth(d)).getDate();};
const daysInCurrentMonth = (d) => {return new Date(d.getFullYear(), d.getMonth()+1,0).getDate()};
const weekdayFirstDay = (d) => {return new Date(d.getFullYear(), d.getMonth(),1).getDay()};


export const nameOfMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export const nameOfWeekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const firstEntry = (d) => {
    lastDayOfPrevMonth = new Date(d.getFullYear(), d.getMonth(),0);
    //if (lastDayOfPrevMonth.getDay() === 0)
        //return 1;
    return daysInPrevMonth(d) - lastDayOfPrevMonth.getDay() +1
}
const numberOfRows = (d) => {
    const numberOfDays = daysInCurrentMonth(d)
    const rem = numberOfDays - daysInFourWeeks;

    const firstWeekday = weekdayFirstDay(d);

    //februar starting on monday (and no leap year)
    if (rem === 0 && firstWeekday === 1)
        return 4;
    // spill over to sixth week
    if (rem + fromSundayToMondayStart(weekdayFirstDay(d)) > daysInWeek)
        return 6;
    
    return 5
}

const fromSundayToMondayStart = (i) =>{
    return (i + 6) % daysInWeek ;
}

const positionFirst = (d) => {
    let _row = numberOfRows(d);
    let _day = fromSundayToMondayStart(weekdayFirstDay(d));

    if (_row==6)
        return {week: 0, day: _day};
    return {week: 1, day: _day};
}


export function month(d){
    let montharray = [];
    
    for (let week = 0; week < 6; ++week)
        montharray.push([]);

    let dayCounter = 1;
    let startPos = positionFirst(d);
    
    let weekLoop;
    let dayLoop;
    for (weekLoop = startPos.week; weekLoop < 6 ; ++weekLoop){
        for (dayLoop = weekLoop===startPos.week?startPos.day:0; dayLoop < 7; ++dayLoop){
            montharray[weekLoop][dayLoop] ={currentMonth: true, day: dayCounter};
            if (dayCounter === daysInCurrentMonth(d))
                break;
            dayCounter++;
        }
        if (dayCounter === daysInCurrentMonth(d))
            break;
    }
    let finalWeekLoop = weekLoop;
    let finalDayLoop = dayLoop;

    dayCounter = 1;
    for (weekLoop = finalWeekLoop; weekLoop < 6 ; ++weekLoop){
        for (dayLoop = weekLoop===finalWeekLoop?finalDayLoop+1:0; dayLoop < 7 ; ++dayLoop){
            montharray[weekLoop][dayLoop] ={currentMonth: false, day: dayCounter};
            dayCounter++;
        }
    }

    dayCounter = daysInPrevMonth(d);
    for (let weekLoop = startPos.week; weekLoop >= 0; --weekLoop){
        for (let dayLoop = (weekLoop===startPos.week)?startPos.day-1:6; dayLoop >= 0 ; --dayLoop){
            montharray[weekLoop][dayLoop] ={currentMonth: false, day: dayCounter};
            dayCounter--;
        }
    }

    return montharray;
}