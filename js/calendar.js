const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let currentDate = new Date();

let currentYear = currentDate.getFullYear();
let currentMonth = currentDate.getMonth();
let currentDay = currentDate.getDate();

let selectedIndex;
let selectedMonth = currentMonth;
let startingWeekDay = new Date( currentYear, selectedMonth, 1 ).getDay();

let appointments = [];

class Appointment {
    constructor (title, description) {
      this.title = title;
      this.description = description;
    }
}

function fillMonth () {
    let previousButton = $( "#previous-month" );
    let nextButton = $( "#next-month" );
    
    $( "#month-title" ).text(months[selectedMonth]);

    previousButton.removeClass("");

    selectedMonth === 0 ? previousButton.addClass( "control-hidden" ) : previousButton.removeClass( "control-hidden" );
    selectedMonth === 11 ? nextButton.addClass( "control-hidden" ) : nextButton.removeClass( "control-hidden" );
}

function fillDays () {
    let i, lastDayofMonth, days = [];

    lastDayofMonth = new Date( currentYear, selectedMonth + 1, 0 ).getDate();

    // Initial filling boxes
    for ( i=0; i < startingWeekDay; i++ ) {
        let d = document.createElement( "div" );
            d.className = "calendar-day";
        days.push( d );
    }

    // Actual days of the month
    for ( i = 1; i <= lastDayofMonth; i++ ) {
        let d = document.createElement( "div" );
        d.className = "calendar-day";

        // If the day is equal or greater than today make it an available-day
        ( selectedMonth > currentMonth || ( selectedMonth === currentMonth && i >= currentDay ) )
            && d.classList.add( "available-day" );

        let a = appointments[selectedMonth][i];
        let icon;

        if ( a != null ){
            icon = "<i id='day-icon' class='material-icons fixed-icon'>event</i>";
        } else {
            icon = "<i id='day-icon' class='material-icons hover-icon'>add_circle</i>";
        }

        d.innerHTML = "<h6>" + i + "</h6>"
            + icon;

        days.push(d);
    }    

    // Last filling boxes
    let fillingBox = days.length > 35 ? 42-days.length : 35-days.length;

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

    let calendarBody = $( ".calendar-month" );
    calendarBody.empty();
    calendarBody.append( days );
}

function initializeAppointments () {
    let i;

    for( i = 0; i < 12; i++ ) {
        appointments[i] = [];
    }
}

function getDayIcon(){
    return $( ".calendar-day:nth-child(" + ( selectedIndex + 1 ) + ") #day-icon" );
}

function closeDialog() {
    $( ".scrim" ).removeClass( "visible" );
}

$( function() {
    initializeAppointments();    
    fillMonth();
    fillDays();

    // Events

    $( "#previous-month" ).click( function() {
        if ( selectedMonth === 0)
            return;

        selectedMonth--;
        startingWeekDay = new Date( currentYear, selectedMonth, 1 ).getDay();

        fillMonth();
        fillDays();
    });

    $( "#next-month" ).click( function() {
        if ( selectedMonth === 11)
            return;

        selectedMonth++;
        startingWeekDay = new Date( currentYear, selectedMonth, 1 ).getDay();

        fillMonth();
        fillDays();
    });


    $( "body" ).on( "click", ".available-day", function() {
        selectedIndex = $( this ).index();

        let selectedDay = selectedIndex-startingWeekDay+1;
        let calendarTitle = selectedDay + " of " + months[selectedMonth] + "</h6>";

        $( ".dialog-appointment-header" ).html( calendarTitle );
        $( ".scrim" ).addClass( "visible" );

        let a = appointments[selectedMonth][selectedDay];

        if( a != null ){
            $( "#title" ).val( a.title );
            $( "#description" ).val( a.description );
            $( "#btn-delete" ).removeClass( "btn-hidden" );
        }else{
            $( "#title" ).val( "" );
            $( "#description" ).val( "" );
            $( "#btn-delete" ).addClass( "btn-hidden" );
        }
    });

    $( "#btn-cancel" ).click(function() {
        closeDialog();
    });

    $( "#btn-delete" ).click(function() {
        let selectedDay = selectedIndex-startingWeekDay+1;
        let dayIcon = getDayIcon();

        appointments[selectedMonth][selectedDay] = null;        

        dayIcon.html( "add_circle" );
        dayIcon.removeClass( "fixed-icon" );
        dayIcon.addClass( "hover-icon" );

        closeDialog();
    });

    $( "#btn-save" ).click(function() {
        let selectedDay = selectedIndex-startingWeekDay+1;
        let dayIcon = getDayIcon();

        appointments[selectedMonth][selectedDay] = new Appointment( $( "#title" ).val(), $( "#description" ).val() );

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