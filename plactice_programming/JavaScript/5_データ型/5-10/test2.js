"use strict";

let salaries = {
    "John": 100,
    "Pete": 300,
    "Mary": 250
};

function topSalary(obj) {
    let max = -Infinity;
    let topName = null;

    for (let [name, salarie] of Object.entries(obj)) {
        if (max < salarie) {
            max = salarie;
            topName = name;
        }
    }

    return topName;
}