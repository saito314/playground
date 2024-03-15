"use strict";

// 論理演算子 
// 例えばresult = a || b
alert(true || true);
alert(false || true);
alert(true || false);
alert(false || false);

if (1 || 0) {
    alert("truethy!");
}

let hour = 9;

if (hour < 10 || hour > 18) {
    alert("The office is closed.");
}

hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
    alert("The office is closed.") // 週末です
}

