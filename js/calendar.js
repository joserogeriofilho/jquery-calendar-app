const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let currentDate = new Date();

let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();

let selectedIndex;
let selectedMonth = currentMonth;
let startingWeekDay = new Date( currentYear, selectedMonth, 1 ).getDay();

let days = [];
let appointments = [];

class Appointment {
    constructor (title, description) {
      this.title = title;
      this.description = description;
    }
}

function fillMonth() {
    $( "#month-title" ).text(months[selectedMonth]);
}

function fillDays() {
    let i, lastDayofMonth, calendarBody;

    lastDayofMonth = new Date( currentYear, selectedMonth+1, 0 ).getDate();

    calendarBody = $( ".calendar-body" );
    calendarBody.empty();

    // Filling boxes
    for ( i=0; i < startingWeekDay; i++ ) {
        let d = document.createElement( "div" );
        d.className = "calendar-day";

        days.push(d);
    }

    // Actual days of the month
    for ( i = 1; i <= lastDayofMonth; i++ ) {
        let d = document.createElement( "div" );
        d.className = "calendar-day";

        i >= currentDay && d.classList.add( "available-day" );

        d.innerHTML = "<h6>" + i + "</h6>"
            + "<i id='day-icon' class='material-icons hover-icon'>add_circle</i>";

        days.push(d);
    }

    let fillingBox = days.length > 35 ? 42-days.length : 35-days.length;

    // Last filling boxes
    for (i = 0; i < fillingBox; i++ ) {
        let d = document.createElement( "div" );
        d.className = "calendar-day";

        days.push(d);
    }

    // Give the current day a mark
    if(selectedMonth === currentMonth){
        let currentDayMark = document.createElement( "div" );
        currentDayMark.className = "current-day-mark";
    
        days[startingWeekDay+currentDay-1].appendChild( currentDayMark );
        days[startingWeekDay+currentDay-1].firstChild.className = "current-day";
    }

    calendarBody.append( days );
}

function getDayIcon(){
    return $( ".calendar-day:nth-child(" + ( selectedIndex + 1 ) + ") #day-icon" );
}

function closeDialog() {
    $( ".scrim" ).removeClass( "visible" );
}

$( function() {    
    fillMonth();
    fillDays();

    // Events

    $( "#previous-month" ).click( function() {
        selectedMonth--;
        startingWeekDay = new Date( currentYear, selectedMonth, 1 ).getDay();

        fillMonth();
        fillDays();
    });

    $( "#next-month" ).click( function() {
        selectedMonth++;
        startingWeekDay = new Date( currentYear, selectedMonth, 1 ).getDay();

        fillMonth();
        fillDays();
    });


    $( "body" ).on( "click", ".available-day", function() {
        selectedIndex = $( this ).index();

        let selectedDay = selectedIndex-startingWeekDay+1;
        let calendaTitle = selectedDay + " of " + months[currentMonth] + "</h6>";

        $( ".dialog-appointment-header" ).html( calendaTitle );
        $( ".scrim" ).addClass( "visible" );

        let a = appointments[selectedIndex];

        if( a != null ){
            $( "#title" ).val( a.title );
            $( "#description" ).val( a.description );
        }else{
            $( "#title" ).val( "" );
            $( "#description" ).val( "" );
        }
    });

    $( "#btn-cancel" ).click(function() {
        closeDialog();
    });

    $( "#btn-delete" ).click(function() {
        appointments[selectedIndex] = null;

        let dayIcon = getDayIcon();

        dayIcon.html( "add_circle" );
        dayIcon.removeClass( "fixed-icon" );
        dayIcon.addClass( "hover-icon" );

        closeDialog();
    });

    $( "#btn-save" ).click(function() {
        appointments[selectedIndex] = new Appointment( $( "#title" ).val(), $( "#description" ).val() );

        let dayIcon = getDayIcon();

        dayIcon.html("event");
        dayIcon.removeClass("hover-icon");
        dayIcon.addClass("fixed-icon");

        closeDialog();
    });

    $( ".form-group" ).on( "focusin" , function() {
        $( this ).addClass( "has-focus" );
    });

    $( ".form-group" ).on( "focusout", function() {
        $( this ).removeClass( "has-focus" );
    });
  
  });