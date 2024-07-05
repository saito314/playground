"use strict";

function camelize(str) {
    let splitStrArray = str.split("-");

    splitStrArray = splitStrArray.map((item, index) => index == 0 ? item : (item[0].toUpperCase() + item.slice(1)));

    let result = splitStrArray.join("");

    return result;
}

alert(camelize("background-color"));
alert(camelize("list-style-image"));
alert(camelize("-webkit-transition"));