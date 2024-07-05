"use strict";

const week = {
    0: "SU",
    1: "MO",
    2: "TU",
    3: "WE",
    4: "TH",
    5: "FR",
    6: "SA"
}

function getWeekDay(date) {
    return week[date.getDay()];
}

let date = new Date(2012, 0, 3);  // 3 Jan 2012
alert( getWeekDay(date) );        // "TU" と表示される