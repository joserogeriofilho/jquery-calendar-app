var currentDate = new Date();

var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth();
var currentDay = currentDate.getDate();

var firstDay = new Date(currentYear, currentMonth, 1);
var lastDay = new Date(currentYear, currentMonth+1, 0);
var startingWeekDay = firstDay.getDay();

var days = [];


function fillMonth(){
    let months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

    $(".calendar-title").append("<h6>"+months[currentMonth]+"</h6>");
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

    /*$(".test").hover(function(){
        $(".test").hide();
    });*/
  
  });