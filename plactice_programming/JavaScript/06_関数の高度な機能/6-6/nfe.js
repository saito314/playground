"use strict";

// "name"プロパティ
// 関数名は"name"プロパティとしてアクセス可能
function sayHi() {
    alert("Hi");
}

alert(sayHi.name); // sayHi

// 割り当てに使用される関数にも正しい名前を張り付ける
let sayHi = function() {
    alert("Hi");
}

alert(sayHi.name); // sayHi

// デフォルト値を通して行われた代入でも動作する
function f(sayHi = function() {}) {
    alert(sayHi.name);
}

f();

// オブジェクトメソッドも名前を持っている
let user = {

    sayHi() {

    },

    sayBye: function() {

    }
}

alert(user.sayHi.name);
alert(user.sayBye.name);

// 正しい名前がない場合は"name"プロパティは空になる
let arr = [function() {}];

alert(arr[0].name); // <empty string>

// "length"プロパティ
// 関数パラメータの数を返すプロパティ
function f1(a) {};
function f2(a, b) {};
function many(a, b, ...more) {}

alert(f1.length); // 1
alert(f2.length); // 2
// 残りのパラメータはカウントされない
alert(many.length); // 2

// ポリモーフィズムに使われる
function ask(question, ...handlers) {
    let isYes = confirm(question);

    for(let handler of handlers) {
        if (handler.length == 0) {
            if (isYes) handler();
        } else {
            handler(isYes);
        }
    }
}

// 肯定的な解答では両方のハンドラがよばれる
// 否定的な解答では2つ目だけが呼ばれる
ask("Question?", () => alert("You said yes"), result => alert(result));


// カスタムプロパティ
function sayHi() {
    alert("Hi");

    // 何度実行したかカウントする
    sayHi.counter++;
}
// 初期値
sayHi.counter = 0;

sayHi(); // Hi
sayHi(); // Hi

alert(`Called ${sayHi.counter} times`);

// カスタムプロパティでクロージャを置き換えてみる
function makeCounter() {
    // 次の代わり
    // let count = 0

    function counter() {
        return counter.count++;
    }

    counter.count = 0;

    return counter;
}

let counter = makeCounter();
alert(counter());
alert(counter());

// クロージャとカスタムプロパティのどちらを使うかは目的次第
function makeCounter() {

    function counter() {
        return counter.count++;
    };

    counter.count = 0;

    return counter;
}
counter = makeCounter()

counter.count = 10;
alert(counter());

// 名前付き関数式
let sayHi = function(who) {
    alert(`Hello, ${who}`);
}
// 名前を追加する
let sayHi = function func(who) {
    alert(`Hello, ${who}`);
}

// funcには2つの特別なことがある
// 1. 関数の内側から関数を参照できる
// 2. 関数の外側からは見えない
let sayHi = function func(who) {
    if(who) {
        alert(`Hello, ${who}`);
    } else {
        func("Guest"); // 自分を再度呼び出す
    }
};

sayHi();

func(); // Error

// 代入した変数名でも呼び出しできるが、その変数が書き換えられる可能性がある
let sayHi = function(who) {
    if (who) {
        alert(`Hello, ${who}`);
    } else {
        sayHi("Guest");
    }
};

let welcome = sayHi;
sayHi = null;

welcome(); // sayHiは書き換えられているのでエラーになる

let sayHi = function func(who) {
    if (who) {
        alert(`Hello, ${who}`);
    } else {
        func("Guest");
    }
};

welcome = sayHi;
sayHi = null;

welcome(); // 正常に動作する