var months = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"];

var currentDate = new Date();

var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth();
var currentDay = currentDate.getDate();

var firstDay = new Date(currentYear, currentMonth, 1);
var lastDay = new Date(currentYear, currentMonth+1, 0);
var startingWeekDay = firstDay.getDay();

var days = [];
var appointments = [];

/*class User {

    constructor(name) {
      this.name = name;
    }
  
    sayHi() {
      alert(this.name);
    }
  
}*/


function fillMonth(){
    $(".calendar-header").append("<h6>"+months[currentMonth]+"</h6>");
}

function fillDays(){
    let i,j;

    for(i = 0; i < 35; i++){
        let d = document.createElement("div");
        d.className = "calendar-day";
        days.push(d);
    }

    for(i=1, j = startingWeekDay; j < lastDay.getDate()+startingWeekDay; i++, j++){
        days[j].innerHTML = "<h6>"+i+"</h6>";
    }

    let currentDayMark = document.createElement("div");
    currentDayMark.className = "current-day-mark";

    days[startingWeekDay+currentDay-1].appendChild(currentDayMark);
    days[startingWeekDay+currentDay-1].firstChild.className ="current-day";

    $(".calendar-body").append(days);
}

$(function(){
    
    fillMonth();

    fillDays();

    $(".calendar-day").click(function(){
        let selectedDay = $(this).index()-startingWeekDay+1;
        
        $(".dialog-appointment-header").html("<h6>" + selectedDay + " of " + months[currentMonth] + "</h6>");
        $(".scrim").addClass("visible");
    });

    $("#btn-cancel-dialog").click(function(){
        $(".scrim").toggleClass("visible");
    });
  
  });