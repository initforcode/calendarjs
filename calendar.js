/**
 *  calendar.js - Clean simple calendar for the Script on JavaScript.
 * 
 *  Copyright 2018 #!nit (initforcode.org)
 * 
 *  Permission is hereby granted, free of charge, to any person obtaining a
 *  copy of this software and associated documentation files (the "Software"),
 *  to deal in the Software without restriction, including without limitation
 *  the rights to use, copy, modify, merge, publish, distribute, sublicense,
 *  and/or sell copies of the Software, and to permit persons to whom the
 *  Software is furnished to do so, subject to the following conditions:
 *
 *   The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *  DEALINGS IN THE SOFTWARE.
 * 
 **/

let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let calendarEvents = {
    // Events for February.
    'February': {
        6: {
            '12:30': 'Give the Spidey suit an upgrade.',
            '17:30': 'Shawarma Time!',
        },
        14: {
            '21:30': 'Date with Pepper.',
            '22:30': 'Time to leave for the date.',
        },
        17: {
            '10:15': 'Go fight some baddies.',
            '10:30': 'Peter\'s debate',
            '12:30': 'Rework Friday\'s internals.',
            '19:30': 'Secret meeting with bestie Cap.',
        },
        24: {
            '12:30': 'Meet the Strange man.',
            '14:30': 'Lunch with the Avengers',
            '19:30': 'Cancel the Fury appointment',
        },
    },
}



/**
 * This function resets any previously stored data and reinitializes the
 * calendar from scratch. Accepts a single month as argument. Only constructs
 * the calendar for the current year.
 * 
 */

var calendarSetup = function (month, year) {

    // Explain short circuiting.
    let currentDate = new Date();
    month == null && (month = new Date().getMonth());
    year  == null && (year  = new Date().getFullYear());

    // Remove all existing rows.
    $('.week').each(function () { $(this).remove(); })


    // Set the little arrow keys.
    switch (month) {

        case 0:
            // No month before January.
            $('#prev').attr('disabled', true);
            $('#next').attr('disabled', false);
            break;

        case 11:
            // No month after December.
            $('#monthname').text('April');
            $('#prev').attr('disabled', false);
            $('#next').attr('disabled', true);
            break;

        default:
            $('#monthname').text('March');
            $('#prev').attr('disabled', false);
            $('#next').attr('disabled', false);
            break;

    }

    let firstDayOfMonth  = new Date(year, month, 1).getDay();
    let totalDaysInMonth = new Date(year, month + 1, 0).getDate();


    // Create the first week.
    let calendarWeek = $('<tr></tr>');
    calendarWeek.addClass('week');
    
    // Add empty <td> for non existing days.
    for (let i = 0; i < firstDayOfMonth; ++i) {
        emptyDay = $('<td></td>');              // Create new data for row.
        calendarWeek.append(emptyDay);          // alt: prepend, after, before.
    }


    // Start adding all the actual days.
    let dayCount = firstDayOfMonth;
    for (let i = 1; i <= totalDaysInMonth; ++i) {

        // Create a new <td> for the current date.
        calendarDate = $('<td></td>')
        
        // If the current date has an event.
        if (i in calendarEvents[monthNames[month]]) {
            eventButton = $('<button></button>');
            eventButton.attr('id', 'day' + i);
            eventButton.addClass('event-btn');
            eventButton.text(i);
            calendarDate.append(eventButton);
        } else {
            calendarDate.text(i);
        }

        calendarWeek.append(calendarDate);

        dayCount++;
        if (dayCount == 7) {
            // If the week is over, add the row to calendar and reset the week.
            $('#calendar').append(calendarWeek);
            calendarWeek = $('<tr></tr>');
            calendarWeek.addClass('week');
            dayCount = 0;
        }
    
    }


    // Add empty <td> for non existing days.
    for (; dayCount < 7; dayCount++) {
        emptyDay = $('<td></td>');
        calendarWeek.append(emptyDay);
    }

    // Append the last week to calendar.
    $('#calendar').append(calendarWeek);

    // If the calendar shows the current month, display date.
    if (currentDate.getMonth == month) {
        // Changing the class for current date.
        $('#day' + currentDate.getDate()).addClass('current-date');
    }

    $('#month').text(monthNames[month]);

}


/* Functions used to switch calendars. */
var prevMonth = function () {
    var month = $('#month').text();
    calendarSetup(monthNames.indexOf(month));
}

var nextMonth = function () {
    var monthname = $('#monthname').text();
    if (monthname == 'February')
        calendarSetup(3);
    else if (monthname == 'March')
        calendarSetup(4);
}


// /* Function to display event information. */
// var displayInfo = function (event) {
//     var date = event.target.id.slice(3);
//     var monthname = $('#monthname').text();
//     $('#monthname').text(monthname + ' ' + date);
//     $('.daysoftheweek').hide();
//     $('.week').each(function () {
//         $(this).remove();
//     })

//     if (monthname == 'February')
//         var month = 2;
//     else if (monthname == 'March')
//         var month = 3;
//     else if (monthname == 'April')
//         var month = 4;

//     var spk = data[month][date].speakers;
//     var sem = data[month][date].semester;
//     eventinfo = '<tr class="event-info"><td colspan=7><ul>';
//     eventinfo += '<li><span class="room">' + sem + 'A' + '</span><span class="speaker">' + spk.A + '</span></li>';
//     eventinfo += '<li><span class="room">' + sem + 'B' + '</span><span class="speaker">' + spk.B + '</span></li>';
//     eventinfo += '<li><span class="room">' + sem + 'C' + '</span><span class="speaker">' + spk.C + '</span></li>';
//     eventinfo += '</ul></td></tr>';
//     $('.calendar').append(eventinfo);

//     $('#next').attr('disabled', true);
//     $('#prev').attr('disabled', false);

//     $('#prev').off('click');
//     $('#prev').click(displayCal);


//     // // If there is an event on the current date.
//     // if (i in monthData) {
//     //     let timeData = $('<td></td>').addClass('time');
//     //     let infoData = $('<td></td>').addClass('info');

//     //     // For every event on this day, add a notification.    
//     //     for (eventTime in monthData) {
//     //         timeData.text(eventTime);               // Time.
//     //         infoData.text(month[i][eventTime]);     // Details.
//     //     }

//     // }


// }

// var k = 0;
// var displayCal = function () {
//     k++;
//     var monthname = $('#monthname').text();
//     if (monthname.startsWith('February'))
//         var month = 2;
//     if (monthname.startsWith('March'))
//         var month = 3;
//     if (monthname.startsWith('April'))
//         var month = 4;
//     $('.event-info').each(function () { $(this).remove(); });
//     $('.daysoftheweek').show();
//     calendarSetup(month);
// }


$(document).ready(function () {
    calendarSetup();
});
