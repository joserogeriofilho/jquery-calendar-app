var months = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"];

var currentDate = new Date();

var currentYear = currentDate.getFullYear();
var currentMonth = currentDate.getMonth();
var currentDay = currentDate.getDate();

var firstDayMonth = new Date(currentYear, currentMonth, 1);
var lastDayMonth = new Date(currentYear, currentMonth+1, 0);
var startingWeekDay = firstDayMonth.getDay();

var selectedIndex;
var selectedDay;

var days = [];
var appointments = [];

class Appointment {
    constructor(title, description) {
      this.title = title;
      this.description = description;
    }
  
    sayHi() {
      alert(this.title);
    } 
}

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

    for(i=1, j = startingWeekDay; j < lastDayMonth.getDate()+startingWeekDay; i++, j++){
        days[j].innerHTML = "<h6>"+i+"</h6><i id='day-icon' class='material-icons hover-icon'>add_circle</i>";
    }

    let currentDayMark = document.createElement("div");
    currentDayMark.className = "current-day-mark";

    days[startingWeekDay+currentDay-1].appendChild(currentDayMark);
    days[startingWeekDay+currentDay-1].firstChild.className ="current-day";

    $(".calendar-body").append(days);
}

function closeDialog(){
    $(".scrim").removeClass("visible");
}

$(function(){    
    fillMonth();

    fillDays();

    // Forms
    $(".form-group").on("focusin", function(){
        $(this).addClass("has-focus");
    });

    $(".form-group").on("focusout", function(){
        $(this).removeClass("has-focus");
    });


    $(".calendar-day").click(function(){
        selectedIndex = $(this).index();
        selectedDay = selectedIndex-startingWeekDay+1;

        $(".dialog-appointment-header").html("<h6>"+selectedDay+" of "+months[currentMonth]+"</h6>");
        $(".scrim").addClass("visible");

        let a = appointments[selectedIndex];

        if(a != null){
            $("#title").val(a.title);
            $("#description").val(a.description);
        }else{
            $("#title").val("");
            $("#description").val("");
        }
    });

    $("#btn-delete").click(function(){
        appointments[selectedIndex] = null;

        let eventiIcon = $(".calendar-day:nth-child("+(selectedIndex+1)+") #day-icon");

        eventiIcon.html("add_circle");
        eventiIcon.removeClass("fixed-icon");
        eventiIcon.addClass("hover-icon");

        closeDialog();
    });

    $("#btn-cancel").click(function(){
        closeDialog();
    });

    $("#btn-save").click(function(){
        appointments[selectedIndex] = new Appointment($("#title").val(), $("#description").val());

        let eventiIcon = $(".calendar-day:nth-child("+(selectedIndex+1)+") #day-icon");

        eventiIcon.html("event");
        eventiIcon.removeClass("hover-icon");
        eventiIcon.addClass("fixed-icon");

        closeDialog();
    });
  
  });