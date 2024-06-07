"use strict";

function sumInput() {
    let arr = [];
    while (true) {
        let num = prompt("input number:", 0);

        if (num === "" || num === null || !isFinite(num)) break;
            
        arr.push(+num);
    }

    let sum = 0;

    for (let a of arr) {
        sum += a;
    }

    return sum;
}

alert(sumInput())