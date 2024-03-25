"use strict";

// アロー関数 -> 関数式を簡潔に記載できる
let sum = (a, b) => a + b;
/* 下記の記載と同じ内容になる
let sum = function(a, b) {
    return a + b;
};
*/

// 引数が1つだけの場合は括弧を省略可能
let double = n => n * 2;

alert(double(3))

// 引数がない場合は括弧だけを記載
let sayHi = () => alert("Hello");

sayHi();

// アロー関数は関数式として同じ方法で使用できる。
let age = prompt("What is your age?", 18);

let welcome = (age < 18) ?
    () => alert("Hello!") :
    () => alert("Greetings!");

welcome();

// アロー関数は波括弧を使用することで複数行記載できるようになる。
let sum_1 = (a, b) => {
    let result = a + b;
    return result; // 波括弧を使った場合は明示的にreturnを使わなければならない
}

alert(sum(1, 2));

