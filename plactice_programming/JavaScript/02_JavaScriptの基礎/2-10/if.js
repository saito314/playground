"use strict";

let year = prompt("In which year was ECMAScript-2015 specification published?", "");

if (year == 2015) alert("You are right!");

if (year == 2015) {
    alert("That's correct!");
    alert("You're so smart!");
}

if (0) {
    // 常に偽
}
if (1) {
    // 常に真
}

let cond = (year == 2015);

if (cond) {
    alert("変数を条件式に入れられます")
}

if (year == 2015) {
    alert("You guessed it right!");
} else {
    alert("How can you be so wrong?")
}

if (year < 2015) {
    alert("Too early...");
} else if (year > 2015) {
    alert("Too late...");
} else {
    alert("Exactly!");
}

let accessAllowed;
let age = prompt("How old are you?", "");

if (age > 18) {
    accessAllowed = true;
} else {
    accessAllowed = false;
}

alert(accessAllowed);

let result = (age > 18) ? true : false;

// 複数の'?'
let ageage = prompt("age?", 18);

let message = (age < 3) ? "Hi, baby!" : 
    (age < 18) ? "Hello!" :
    (age < 100) ? "Greetings!" :
    "What an unusual age!";

alert(message);

// 上記の処理をif文で構成する
if (age < 3) {
    message = "Hi, baby";
} else if (age < 18) {
    message = "Hello!";
} else if (age < 100) {
    message = "Greetings!";
} else {
    message = "What an unusual age!";
}

let company = prompt("Which company created JavaScript?", "");

(company == "Netscape") ?
    alert("Right!") : alert("Wrong.");

// 上の処理をif文で書き換え
let comp = prompt("Which company created JavaScript?", "");

if (comp == "Netscape") {
    alert("Right!")
} else {
    alert("Wrong.")
}
