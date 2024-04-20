"use strict";

let arr = ["HTML", "JavaScript", "CSS"];

let sorted = copySorted(arr);

alert( sorted ); // CSS, HTML, JavaScript
alert( arr ); // HTML, JavaScript, CSS (no changes)

function copySorted(arr) {
    // sliceを使うとより簡潔に
    
    let resultArray = [];

    for (let item of arr) {
        resultArray.push(item);
    }

    return resultArray.sort();
}