"use strict";

let visitor = prompt("Who's there?", "");

if (visitor == "Admin") {
    let password = prompt("Password?");

    if (password == "TheMaster") {
        alert("Welcome!");
    } else if (password == "") {
        alert("canceled");
    } else {
        alert("Wrong password");
    }
} else if (password == "") {
    alert("canceled");
} else {
    alert("I don't know you");
}