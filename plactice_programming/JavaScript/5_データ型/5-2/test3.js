"use strict";

function readNumber() {
    let isNotNumber = true;

    while(isNotNumber) {
        let num = +prompt("Please input number", 0);

        if (isFinite(num)) {
            isNotNumber = false
        }
    }

    return num
}

alert(readNumber());