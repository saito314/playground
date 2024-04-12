"use strict";

// 引用符
// シングルクォート、ダブルクォート、またはバッククォートのいずれかで囲むことができる
let single = 'single-quoted';
let double = "double-quoted";
let backticks = `backticks`;

// シングルクォート、ダブルクォートは本質的に同じ
// バッククォートは文字列の中に関数呼び出しを含む任意の式を埋め込むことができる
function sum(a, b) {
    return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.

// バッククォートを使う別の利点は文字列を複数の行に跨げる
let guestList = `Guest:
 * John
 * Pete
 * Mary
`;

alert(guestList);

/*
シングルクォートとダブルクォートで複数行にまたがろうとするとエラーになる
let guestList = "Guests:  // Error: Unexpected token ILLEGAL
 * John";
*/

// 特殊文字
// \nは改行文字などのように特殊文字が存在する
guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList);

let str1 = "Hello\nWorld"; // 改行文字を使用した2行

// バッククォートを使用した2行
let str2 = `Hello
World`;

alert(str1 == str2); // true

// ユニコードの例
alert("\u00A9");
alert("\u{20331}");
alert("\u{1F60D}");

// バックスラッシュはエスケープ文字として使われる
alert('I\'m the Walrus!');

// シングルクォートを使いたいときはダブルクォートかバッククォートを使って文字列を作る
alert(`I'm the Walrus!`);

// バックスラッシュを文字列にするのにもバックスラッシュを使う
alert(`The backslash: \\`);

// 文字列長
// lengthは文字列の長さをもつ
alert(`My\n`.length); // 3

let str = `Hello`;

alert(str[0]);
alert(str.charAt(0));

alert(str[str.length - 1]);

str = `Hello`;

alert(str[1000]);
alert(str.charAt(1000));

for (let char of "Hello") {
    alert(char);
}

// 文字列は不変
str = "Hi";

str[0] = 'h';
alert(str[0]);