"use strict";

let arr = [5, 3, 8, 1];

filterRangeInPlace(arr, 1, 4); // 1 から 4 までの値以外を削除

alert( arr ); // [3, 1]

function filterRangeInPlace(arr, a, b) {
    
    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];

        if (a <= item && item <= b) {
            continue;
        } else {
            arr.splice(i--, 1);
        }
    }
}