"use strict";

let arr = [5, 3, 8, 1];

let filtered = filterRange(arr, 1, 4);

alert(filtered);

alert(arr);

function filterRange(arr, start, end) {
    /* 解答: filterを使うともっと良くなる
    return arr.filter(item => (start <= item && item <= end));
    */

    let resultArray = [];

    for (let item of arr) {
        if ((start <= item) && (item <= end)) {
            resultArray.push(item);
        }
    }

    return resultArray;
}