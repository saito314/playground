"use strict";

/*
let browser = prompt("Please input your using browser name", "");

switch (browser) {
    case "Edge":
        alert("You've got the Edge!");
        break;

    case "Chrome":
    case "Firefox":
    case "Safari":
    case "Opera":
        alert("Okey we support these browsers too");
        break;

    default:
        alert("We hope that thit page looks ok!");
}

これをif文で書き直す
*/

let browser = prompt("Please input your using browser name", "");

if (browser == "Edge") {
    alert("You've got the Edge!");
} else if ((browser == "Chrome") || (browser == "Firefox") || (browser == "Safari") || (browser == "Opera")) {
    alert("Okey we support these browsers too");
} else {
    alert("We hope that thit page looks ok!");
}