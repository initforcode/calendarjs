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


/**
 * This function resets any previously stored data and reinitializes the
 * calendar from scratch. Accepts a single month as argument. Only constructs
 * the calendar for the current year.
 * 
 */

var calendarSetup = function (month) {

    // Explain short circuiting.
    let currentDate = new Date();
    month == null && (month = currentDate.getMonth());

    // Remove all existing rows.
    $('.week').each(function () { $(this).remove(); })


    // Set the little arrow keys.
    switch (month) {

        case 0:
            // No month before January.
            $('#prev').attr('disabled', true);
            break;

        case 11:
            // No month after December.
            $('#next').attr('disabled', true);
            break;

        default:
            $('#prev').attr('disabled', false);
            $('#next').attr('disabled', false);
            break;

    }

    let firstDayOfMonth  = new Date(2018, month, 1).getDay();
    let totalDaysInMonth = new Date(2018, month + 1, 0).getDate();


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
        calendarDate.attr('id', 'day' + i);
        calendarDate.text(i);
        calendarWeek.append(calendarDate);

        dayCount++;

        // If the week is over, add the row to calendar and reset the week.
        if (dayCount == 7) {
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
    if (currentDate.getMonth() == month) {
        // Changing the class for current date.
        $('#day' + currentDate.getDate()).addClass('current-date');
    }

    $('#month').text(monthNames[month]);

}


/**
 *  Function to move to the previous month.
 */
var prevMonth = function () {
    let month = $('#month').text();
    calendarSetup(monthNames.indexOf(month)-1);
}

/**
 *  Function to move to the next month.
 */
var nextMonth = function () {
    let month = $('#month').text();
    calendarSetup(monthNames.indexOf(month)+1);
}


$(document).ready(function () {
    calendarSetup();
});
