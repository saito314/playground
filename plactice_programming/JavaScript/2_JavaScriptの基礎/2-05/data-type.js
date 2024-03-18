"use strict";

let message = "hello";
// 動的型付けなので、変数は型にとらわれない
message = 123456;

let n = 123;
n = 123.45;

// Infinityがあるのでゼロ除算もエラーにならない
alert(1/0);
// Infinityは直接記載できる
alert(Infinity)
// そもそも計算にならないときはNaN（Not a Number）になる
alert("not a number" / 2);
// NaNにどの要素を加えてもNaNになる
alert("not a number" / 2 + 5);

// 末尾にnを付けるとBigIntになる
const bigInt = 1234567890123456789012345678901234567890n

// 文字列はダブルクオーテーション、シングルクォーテーションで囲む
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed $(str)`;

// `で${...}の中にラップすることで変数の値をそのまま文字列中に表現できる
let name = "John";
alert(`Hello, ${name}!`);
alert(`the result is ${1 + 2}`);

// boolean型
let nameFieldChecked = true;
let ageFieldChecked = false;

let isGreater = 4 > 1;
alert(isGreater)

// null値
let age = null;

// undefined値
let x;
alert(x);

let ageage = 100;
ageage = undefined;

alert(ageage);

// typeof演算子
typeof undefined;
typeof 0;
typeof 10n;
typeof true;
typeof "foo";
typeof Symbol("id");
typeof Math;
typeof null;
typeof alert;

let namename = "Ilya";
alert(`hello ${1}`); // hello 1
alert(`hello ${"name"}`); // hello name
alert(`hello ${namename}`); // hello Ilya
