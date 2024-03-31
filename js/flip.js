function handleTickInit(tick) {

    // uncomment to set labels to different language
    
    var locale = {
        YEAR_PLURAL: 'Years',
        YEAR_SINGULAR: 'Year',
        MONTH_PLURAL: 'Months',
        MONTH_SINGULAR: 'Month',
        WEEK_PLURAL: 'Weeks',
        WEEK_SINGULAR: 'Week',
        DAY_PLURAL: 'Days',
        DAY_SINGULAR: 'Day',
        HOUR_PLURAL: 'Hours',
        HOUR_SINGULAR: 'Hour',
        MINUTE_PLURAL: 'Minutes',
        MINUTE_SINGULAR: 'Minute',
        SECOND_PLURAL: 'Seconds',
        SECOND_SINGULAR: 'Second',
        MILLISECOND_PLURAL: 'Milliseconds',
        MILLISECOND_SINGULAR: 'Millisecond'
    };

    for (var key in locale) {
        if (!locale.hasOwnProperty(key)) { continue; }
        tick.setConstant(key, locale[key]);
    }
    

    // format of due date is ISO8601
    // https://en.wikipedia.org/wiki/ISO_8601

    // '2018-01-31T12:00:00'        to count down to the 31st of January 2018 at 12 o'clock
    // '2019'                       to count down to 2019
    // '2018-01-15T10:00:00+01:00'  to count down to the 15th of January 2018 at 10 o'clock in timezone GMT+1

    // create the countdown counter
    var counter = Tick.count.down('2024-07-30T18:45:00-05:00');

    counter.onupdate = function(value) {
        tick.value = value;
    };

    counter.onended = function() {
        // redirect, uncomment the next line
        // window.location = 'my-location.html'

        // hide counter, uncomment the next line
        // tick.root.style.display = 'none';

        // show message, uncomment the next line
        // document.querySelector('.tick-onended-message').style.display = '';
    };
}
