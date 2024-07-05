"use strict";

// 関数を作る別の方法
// 代替手段がないことがたまにある

// 構文
// let func = new Function ([arg1[, arg2[, ...argN]],] functionBody)
let sum = new Function("a", "b", "return a + b");

alert(sum(1, 2));

// 引数がない場合は関数本体だけを指定する
let sayHi = new Function("alert('Hello')");

sayHi();

// ユースケース：サーバから新しい関数を受け取り、それを実行することができる
let str = "" // サーバから動的にコードを受け取る

let func = new Function(str);
func();

// クロージャ
// 通常、関数は特別なプロパティ[[Environment]]でどこで生成されたか覚えている
// new Functionを使用した場合、グローバルのレキシカル環境を参照する
function getFunc() {
    let value = "test";

    let func = new Function("alert(value)");

    return func;
}

getFunc()(); // error: valueは未定義

// 以下は通常のふるまい
function getFunc() {
    let value = "test";

    let func = function() { alert(value); };

    return func;
}

getFunc()(); // "test", getFuncのレキシカル環境から