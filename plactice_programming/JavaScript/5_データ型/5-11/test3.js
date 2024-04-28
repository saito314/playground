"use strict";



let date = new Date(2012, 0, 3);  // 3 Jan 2012
alert( getLocalDay(date) );       // tuesday, should show 2

function getLocalDay(date) {
    let week = date.getDay();

    if (week == 0) {
        week = 7;
    }

    return week;
}