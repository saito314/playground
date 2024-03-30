"use strict";

let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130,
}

// main
alert(calcSalaries(salaries))


function calcSalaries(obj) {
    let sumSararies = 0;

    for (let key in obj) {
        sumSararies += obj[key];
    }

    return sumSararies;
}