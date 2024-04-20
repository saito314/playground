"use strict";

let arr = [5, 2, 1, -10, 8];

arr.sort(compareNumericReverse);

alert( arr ); // 8, 5, 2, 1, -10]

function compareNumericReverse(a, b) {
    if (a > b) return -1;
    if (a == b) return 0;
    if (a < b) return 1;
}