"use strict";

// 関数式 -> 関数を変数に格納して使用すること
let sayHi = function() {
    alert("Hello");
}; // 関数式の場合はセミコロンを忘れずに

sayHi();

// 下記も同じ動作をする
function sayHi01() {
    alert("Hello");
}

let func = sayHi;

func();

// コールバック関数
function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no();
}

function showOk() {
    alert("You agreed.");
}

function showCancel() {
    alert("You canceled the execution.");
}

ask("Do you agree?", showOk, showCancel);

// 短く書くために関数式を利用してもよい
ask(
    "Do you agree?",
    function() { alert("You agreed."); },
    function() { alert("You canceled the execution."); }
);

// 関数宣言
function sum(a, b) {
    return a + b;
}

// 関数式
let sum_b = function() {
    return a + b;
};

// 関数宣言をして実行できる場合
sayHi02("John");

function sayHi(name) {
    alert(`Hello, ${name}`);
}

// 関数式で実行エラーの場合
/*
sayHi("John");

let sayHi = function(name) {
    alert(`Hello, $(name)`);
};
*/

// 関数宣言ではスコープ内にあればいつでも実行可能
// 関数式は実行前に呼び出されても定義されていないのでエラー

// コードブロック内で関数を宣言したい場合には関数式は便利
let age = prompt("What is your age?", 18);

let welcome;

if (age < 18) {

    welcome = function() {
        alert("Hello");
    };
} else {

    welcome = function() {
        alert("Greetings!");
    };
}

welcome();

// 疑問符演算子を使うことでさらにシンプルにできる
let newAge = prompt("What is your age?", 18);

let newWelcome = (age < 18) ?
    function() { alert("Hello!"); } :
    function() { alert("Greetings!"); };

newWelcome();