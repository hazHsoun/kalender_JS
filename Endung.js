var date = new Date();

window.onload = function () {
  main();
};

function main() {
  buildPage();
}
function buildPage() {
  const dateFormat = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  document.getElementById("day").innerHTML = dateFormat;
  document.getElementById("fulldate").innerHTML = dateFormat;


  checkHoliday(date);

  const daysTag = document.getElementById("days");
  //aktuellen Monat und Jahr
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  //den ersten Tag des aktuellen Monats berechnen
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  //den letzten Tag des aktuellen monat berechnen
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = [];
  
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    daysInMonth.push(day);
  }
  
  const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
  const daysFromPrevMonth = (firstDayOfMonth.getDay() + 6) % 7;
  
  const liTag = [];
  let dayOfWeek = (firstDayOfMonth.getDay() + 6) % 7;
  

  for (let i = prevMonthLastDay - daysFromPrevMonth + 1; i <= prevMonthLastDay; i++) {                    //für den letzten Monat
    liTag.push(`<td class="prev-month">${i}</td>`);
  }
  
 
  daysInMonth.forEach((day) => {             // für den aktuellen Monat
    if (
      day === date.getDate() &&
      currentYear === date.getFullYear() &&
      currentMonth === date.getMonth()
    ) {
      liTag.push(`<td class="today" onclick="DayClick(${day})">${day}</td>`);
    } else {
      liTag.push(`<td onclick="DayClick(${day})">${day}</td>`);
    }
  
    if ((dayOfWeek + 1) % 7 === 0) {
      liTag.push("</tr><tr>");
    }
  
    dayOfWeek = (dayOfWeek + 1) % 7;
  });
  
    
  for (let i = 1; i <= 6 - ((dayOfWeek + 6) % 7); i++) {         // für den nächsten Monat
    liTag.push(`<td class="next-month">${i}</td>`);
  }
  
  daysTag.innerHTML = liTag.join('');


  const monthNames = [
    "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August",
    "September", "Oktober", "November", "Dezember"
  ];
  const monthName = monthNames[date.getMonth()];
  document.getElementById("month").innerHTML = monthName;

  const weekdayNames = [
    "Sonntag", "Montag", "Dienstag", "Mittwoch",
    "Donnerstag", "Freitag", "Samstag"
  ];

  const dayName = weekdayNames[date.getDay()];
document.getElementById("weekday").innerHTML = dayName;
document.getElementById("weekday1").innerHTML = dayName;
document.getElementById("year").innerHTML = date.getFullYear();
document.getElementById("weekinmonth").innerHTML = getWeekOfMonth(date);

function getWeekOfMonth(date) {
  let day = date.getDate();
  let weekNumber;
  if (day <= 7) {
    weekNumber = 1;
  } else if (day <= 14) {
    weekNumber = 2;
  } else if (day<=21 ){
    weekNumber = 3;
  } else if (day <= 28 ){
    weekNumber = 4;
  } else {
    weekNumber=5;
  }
  // let weekNumber;
  // let weekNumber = Math.ceil(day / 7);
  return weekNumber;
}

  document.getElementById("dayhistory").innerHTML = date.getDate();
  document.getElementById("monhistory").innerHTML = monthName;
  console.log('TABLEMONTH');
  document.getElementById("tablemonth").innerHTML = monthName;
  console.log('TABLEYEAR');
  document.getElementById("tableyear").innerHTML = date.getFullYear();
}

function calculateEaster(year) {
            const a = year % 19;
            const b = Math.floor(year / 100);
            const c = year % 100;
            const d = Math.floor(b / 4);
            const e = b % 4;
            const f = Math.floor((b + 8) / 25);
            const g = Math.floor((b - f + 1) / 3);
            const h = (19 * a + b - d - g + 15) % 30;
            const i = Math.floor(c / 4);
            const k = c % 4;
            const l = (32 + 2 * e + 2 * i - h - k) % 7;
            const m = Math.floor((a + 11 * h + 22 * l) / 451);
            const month = Math.floor((h + l - 7 * m + 114) / 31);
            const day = ((h + l - 7 * m + 114) % 31) + 1;
            return new Date(year, month - 1, day);
}
          
function calculateHolidays(year) {
  const holidays = [];
  // Fixed holidays
  holidays.push(new Date(year, 0, 1));
  holidays.push(new Date(year, 4, 1));
  holidays.push(new Date(year, 9, 3));
  holidays.push(new Date(year, 11, 25));
  holidays.push(new Date(year, 11, 26));
  // Easter holidays
  const easterSunday = calculateEaster(year);
  holidays.push(easterSunday);
  holidays.push(addDays(easterSunday, -2));
  holidays.push(addDays(easterSunday, 1));
  // Ascension Day (40 days after Easter)
  holidays.push(addDays(easterSunday, 39));
  
  // Pentecost holidays (50 days after Easter)
  holidays.push(addDays(easterSunday, 49));
  holidays.push(addDays(easterSunday, 50));
  return holidays;
}
  
function addDays(date, days) {
  return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
}

function isHoliday(date, holidays) {
  return holidays.some(holiday => date.getTime() === holiday.getTime());
  
}

function checkHoliday(date) {
  
  const nextYear = date.getFullYear();
  const holidays = calculateHolidays(nextYear);
  const holidayDiv = document.getElementById("holiday");
  
  
  if (holidays) {
    console.log("thisyearHolidays");
    holidays.forEach(holiday => {
      console.log(holiday.getTime());
    });
    
    if (isHoliday(date, holidays)) {
      console.log("yees");
      holidayDiv.textContent = "";
    }
    else {
      console.log("no");
      holidayDiv.textContent = "nicht";
      }
  }
  
}

function nextMonth() {
  console.log('ALTES DATUM: ' + date);
  date = new Date( date.getFullYear(), date.getMonth() + 1, date.getDate());
  console.log('NEUES DATUM: ' + date); 

  if (date.getMonth() === 11) {
    date.setFullYear(date.getFullYear());
  }

  if (date.getMonth() === 0) {
    date.setFullYear(date.getFullYear());
  }
  buildPage();
}

function lastmonth(){
  date = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
  buildPage();
}

function DayClick(clickedDay) {
  date = new Date(date.getFullYear(), date.getMonth(), clickedDay);
  
  console.log(`${clickedDay}`);
  buildPage();
}