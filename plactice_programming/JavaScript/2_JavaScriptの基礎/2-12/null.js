"use strict";

let user;

alert(user ?? "Anonymous");

user = "John";

alert(user ?? "Anonymous");

let firstName = null;
let lastName = null;
let nickName = "Supercoder";

alert(firstName ?? lastName ?? nickName ?? "Anonymous");

// ||との比較
alert(firstName || lastName || nickName || "Anonymous");

let height = 0;

alert(height || 100);
alert(height ?? 100);

height = null;
let width = null;

let area = (height ?? 100) * (width ?? 50);

alert(area);

// 下記のようなコードがsyntax errorになる
// let x = 1 && 2 ?? 3

let x = (1 && 2) ?? 3; // これは動作します。
alert(x);

// ??は変数にデフォルト値を代入するために使われる
height = height ?? 100;