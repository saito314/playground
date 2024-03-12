"use strict";

let value = true;
alert(typeof value); // valueの型確認 -> boolean

value = String(value); // 文字列にキャスト
alert(typeof value); // type -> string

// 数値変換
alert("6" / "2"); // 文字列は数値に変換される

let str = "123";
alert(typeof str); // type -> string

let num = Number(str); // "123"を数値にキャスト
alert(typeof num); // type -> number

// テキストフォームで数値が入力されることを想定するときには明示的な変換が必要
// 文字列が有効な数字出ないときにはNaNに変換される
let age = Number("an arbitrary string instead of a number.");
alert(age); // NaNになり、変換失敗

alert(Number("   123   ")); // 123
alert(Number("123z")); // NaN
alert(Number(true)); // 1
alert(Number(false)); // 0

// boolean変換
// 0はfalseだけど、"0"はtrue
alert(Boolean(1));
alert(Boolean(0));
alert(Boolean("hello"));
alert(Boolean(""));
