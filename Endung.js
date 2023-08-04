
window.onload = function () {
  main();
};

function main() {
  checkHoliday();
  const date = new Date();
  const dateFormat = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
  document.getElementById("day").innerHTML = dateFormat;
  document.getElementById("fulldate").innerHTML = dateFormat;
  const currentDate = new Date();
  const daysTag = document.getElementById("days");
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = [];
  for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
    daysInMonth.push(day);
  }
  
  let liTag = "";
  let dayOfWeek = firstDayOfMonth.getDay();
  for (let i =1; i < dayOfWeek; i++) {
  liTag += "<td></td>";
}

daysInMonth.forEach((day) => {
  liTag += `<td>${day}</td>`;
  if (new Date(currentYear, currentMonth, day).getDay() === 0) {
    liTag += "</tr><tr>";
  }
});
daysTag.innerHTML = liTag;

  const monthNames = [
    "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August",
    "September", "Oktober", "November", "Dezember"
  ];
  const d = new Date();
  const monthName = monthNames[d.getMonth()];
  document.getElementById("month").innerHTML = monthName;
  const weekdayNames = [
    "Sonntag", "Montag", "Dienstag", "Mittwoch",
    "Donnerstag", "Freitag", "Samstag"
  ];

  const dayName = weekdayNames[d.getDay()];
  document.getElementById("weekday").innerHTML = dayName;
  document.getElementById("weekday1").innerHTML = dayName;
  document.getElementById("year").innerHTML = new Date().getFullYear();
  document.getElementById("weekinmonth").innerHTML = (getWeekOfMonth(date));

  function getWeekOfMonth(date) {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const dayOfWeekFirstDay = firstDayOfMonth.getDay();
    const dayOfMonth = date.getDate();
    let weekNumber = Math.ceil((dayOfMonth + dayOfWeekFirstDay - 1) / 7);
    return weekNumber;
  }
  document.getElementById("dayhistory").innerHTML = date.getDate();
  document.getElementById("monhistory").innerHTML = monthName;
  document.getElementById("tablemonth").innerHTML = monthName;
  document.getElementById("tableyear").innerHTML = new Date().getFullYear();
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
    return holidays.some(holiday => date.toDateString() === holiday.toDateString());
  }
  
  function checkHoliday() {
    const today = new Date();
    const nextYear = today.getFullYear();
    const holidays = calculateHolidays(nextYear);
    const holidayDiv = document.getElementById("holiday");
    
    if (holidays) {
      console.log("thisyearHolidays");
      holidays.forEach(holiday => {
        console.log(holiday.toDateString());
      });
      
      if (isHoliday(today, holidays)) {
        console.log("yees");
        holidayDiv.textContent = "";
      }
      else {
        console.log("no");
        holidayDiv.textContent = "nicht";
        }
    }
    else {
        console.log("Error: Unable to calculate holidays.");
      }
    }
   
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '');
    document.getElementsByClassName("today").innerHTML=dd
    document.write(dd);
    console.log(dd)
    
    
   