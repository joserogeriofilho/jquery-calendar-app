function appendDays(){
    let i;

    for(i = 0; i < 35; i++){
        $(".calendar-row-" + (i%7 + 1)).append("<div class='calendar-day'></div>");
    }
}

$(function(){
    
    appendDays();

    $(".test").hover(function(){
        $(".test").hide();
    });
  
  });