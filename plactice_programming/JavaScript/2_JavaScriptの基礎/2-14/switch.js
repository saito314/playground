"use strict";

let a = 2 + 2;

switch (a) {
    case 3:
        alert("Too small");
        break;
    case 4:
        alert("Exactly!");
        break;
    case 5:
        alert("Too large");
        break;
    default:
        alert("I don't know such values");
}

// caseのグルーピング
switch (a) {
    case 4:
        alert("Right!");
        break;

    case 3:
    case 5:
        alert("Wrong!");
        alert("Why don't you take a math class?");
        break;

    default:
        alert("The result is strange. Really.");
}

// 型の問題
let arg = prompt("Enter a value?");
switch (arg) {
    case "0":
    case "1":
        alert("One or zero");
        break;
    case "2":
        alert("Two");
        break;
    case 3: // デッドコード
        alert("Never executes!");
        break;
    default:
        alert("An unknown value");
}