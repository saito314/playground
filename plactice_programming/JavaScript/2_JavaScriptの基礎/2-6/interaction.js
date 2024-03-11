"use strict";

alert("Hello");

// テキストメッセージと訪問者のための入力フィールド -> prompt
// result = prompt(title[, default]);

let age = prompt('How old are you?', 100);

alert(`You are ${age} years old!`); // You are 100 years old!

// questionと2つのボタンをもつモーダルウィンドウを表示する -> confirm
let isBoss = confirm("Are you the boss?");

alert(isBoss);