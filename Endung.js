window.onload = function () {
    main();
};
function main (){
    // alert('Hallo');
    checkHoliday();
    const date = new Date();
    // let date = new Date();
    console.log(new Date().toLocaleString('de', {  weekday: 'long' }));
    console.log('year:' + date.getFullYear());
    console.log(new Date().toLocaleString('de', {  month: 'long' }));
        let dateFormat =date.getDate() 
    + "-" + (date.getMonth()+1) + "-" + date.getFullYear()
    console.log(dateFormat);
    
        let Day = date.getDate();
    document.getElementById("day").innerHTML = dateFormat;
    
         let dateD=date.getDay();
    document.getElementById("fulldate").innerHTML=dateFormat;

    const month = 
    ["Januar","Februar","März","April","Mai","Juni","Juli","August",
    "September","Oktober","November","Dezember"];
    
    const d = new Date();
    let name = month[d.getMonth()];
     document.getElementById("month").innerHTML = name;
     const weekday = 
     ["Sonntag","Montag","Dienstag","Mittwoch",
     "Donnerstag","Freitag","Samstag"];
     let day = weekday[d.getDay()];
     document.getElementById("weekday").innerHTML = day;
     document.getElementById("weekday1").innerHTML = day;
     
     document.getElementById("year").innerHTML = new Date().getFullYear();
     document.getElementById("weekinmonth").innerHTML =(getWeekOfMonth(date));
     function getWeekOfMonth(date) {
       let adjustedDate = date.getDate()+ date.getDay();
       let prefixes = ['0', '1', '2', '3', '4', '5'];
       return (parseInt(prefixes[0 | adjustedDate / 7])+1);
      }
      document.getElementById("dayhistory").innerHTML=Day;
      document.getElementById("monhistory").innerHTML= name;
      document.getElementById("tablemonth").innerHTML= name;
      
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
          holidayDiv.textContent ="";
        } 
        else {
          console.log("no");
          holidayDiv.textContent ="nicht";
        }
      } 
      else {
        console.log("Error: Unable to calculate holidays.");
      }
    }
    














    
      // function calculateEaster(year) {
      //   const a = year % 19;
      //   const b = Math.floor(year / 100);
      //   const c = year % 100;
      //   const d = Math.floor(b / 4);
      //   const e = b % 4;
      //   const f = Math.floor((b + 8) / 25);
      //   const g = Math.floor((b - f + 1) / 3);
      //   const h = (19 * a + b - d - g + 15) % 30;
      //   const i = Math.floor(c / 4);
      //   const k = c % 4;
      //   const l = (32 + 2 * e + 2 * i - h - k) % 7;
      //   const m = Math.floor((a + 11 * h + 22 * l) / 451);
      //   const month = Math.floor((h + l - 7 * m + 114) / 31);
      //   const day = ((h + l - 7 * m + 114) % 31) + 1;
      //   return new Date(year, month - 1, day);
      // }
      // function calculateHolidays(year) {
      //   const holidays = [];
      //   // Fixed holidays
      //   holidays.push(new Date(year, 0, 1));
      //   holidays.push(new Date(year, 4, 1));
      //   holidays.push(new Date(year, 9, 3)); 
      //   holidays.push(new Date(year, 11, 25));
      //   holidays.push(new Date(year, 11, 26));
      //   // Easter holidays
      //   const easterSunday = calculateEaster(year);
      //   holidays.push(easterSunday);
      //   holidays.push(addDays(easterSunday, -2));
      //   holidays.push(addDays(easterSunday, 1));
      //   // Ascension Day (40 days after Easter)
      //   holidays.push(addDays(easterSunday, 39));
  
      //   // Pentecost holidays (50 days after Easter)
      //   holidays.push(addDays(easterSunday, 49));
      //   holidays.push(addDays(easterSunday, 50));
  
      //   return holidays;
      // }
      // // Function to add days to a given date
      // function addDays(date, days) {
      //   return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
      // }
      // // Function to check if a date is a holiday
      // function isHoliday(date, holidays) {
      //   return holidays.some(holiday => date.toDateString() === holiday.toDateString());
      // }
      // // Main function to check if today is a holiday and update the HTML element
      //   function checkHoliday() {
      //     const today = new Date();
      //     console.log(today)
      //     const nextYear = today.getFullYear() + 1;
      //     const holidays = calculateHolidays(nextYear);
      //     const holidayDiv = document.getElementById("holiday");

      
      //    if (isHoliday(today, holidays)) {
      //     holidayDiv.textContent ="";
      //     console.log("it is")
      //     } 
      //    else {
      //     console.log("noo")
      //     holidayDiv.textContent = "nicht";
      //     }
      //   }
        
      