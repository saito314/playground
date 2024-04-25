"use strict";

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};
  
alert( sumSalaries(salaries) ); // 650

function sumSalaries(obj) {
    let sum = Object.entries(obj).reduce((sum, [key, value]) => sum + value, 0);

    return sum;
}