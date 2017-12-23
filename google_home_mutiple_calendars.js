function addToGoogleHome() {
  
    var calendarsWithName = {
        "work": "work_email",
        "school": "school_email",
        "podcast" : "podcast_calendar_id"
        "Roy": "Roy's_email"
    };
    var google_home_email = "personal_email/google_home_email";
    var googleHomeCalendar = CalendarApp.getCalendarById(google_home_email);
    var currentDate = new Date();
    var num_events = 0;

    for (var i in calendarsWithName) {
        var calendarToCopy = CalendarApp.getCalendarById(calendarsWithName[i]);
        var name = i + " ";
        if (Object.keys(calendarsWithName).length === 1) {
            name = "";
        }
        //loop through next 7 days
        for (var day = 1; day <= 7; day++) {
            var oldEvents = googleHomeCalendar.getEventsForDay(currentDate);
            var events = calendarToCopy.getEventsForDay(currentDate);
          
            //delete old events first
            for (var j in oldEvents) { 
                oldEvents[j].deleteEvent();
            }
            //add new events
            for (var k in events) {
                googleHomeCalendar.createEvent(name + events[k].getTitle(), events[k].getStartTime(), events[k].getEndTime(), {description: events[k].getDescription()});
            }
            num_events = num_events + events.length;
            currentDate.setDate(currentDate.getDate() + 1);
        }
    }

    GmailApp.sendEmail(google_home_email, "copied" + num_events + " events.", "");
}
