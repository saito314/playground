"use strict";

let age = prompt("あなたは何歳ですか？", "");

if (!(14 <= age && age <= 90)) {
    alert(true);
} else {
    alert(false);
}