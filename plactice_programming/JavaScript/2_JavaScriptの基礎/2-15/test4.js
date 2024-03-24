"use strict";

function pow(x, n) {
    let result = x;
    
    for (let i = 1; i < n; i++) {
        result *= x;
    }

    return result;
}

let x = prompt("x: ", 1);
let n = prompt("n: ", 1);

alert(pow(x, n));