"use strict";

// 訪問者が入力する数値
let inputNumber

do {
    inputNumber = prompt("100より大きい数字を入力してください", "");

    if (!inputNumber) break;

} while (inputNumber <= 100);