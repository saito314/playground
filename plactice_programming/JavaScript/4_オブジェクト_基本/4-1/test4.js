"use strict";

// 呼び出し前
let menu = {
    width: 200,
    height: 300,
    title: "My menu",
};

multiplyNumeric(menu);

/* 呼び出し後
menu = {
    width: 400,
    height: 600,
    title: "My menu",
}
*/
for (let key in menu) {
    alert(`${key}: ${menu[key]}`);
}


function multiplyNumeric(obj) {
    for (let key in obj) {
        if ((typeof obj[key]) == "number") obj[key] *= 2;
    }
}