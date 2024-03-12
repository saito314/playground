"use strict";

let a = prompt("First number?", 1);
let b = prompt("Second number?", 2);

// promptの出力は文字列となるため下記は文字列の結合になってしまう
// alert(a + b)
alert(+a + +b)