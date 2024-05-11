"use strict";

// thisを失う
// setTimeoutを利用してどのようにthisが失われるか示す
let user = {
    firstName: "John",
    sayHi() {
        alert(`Hello, ${this.firstName}!`);
    }
};

setTimeout(user,sayHi, 1000); // Hello, undefined

// これはsetTimeoutがオブジェクトとは別に関数を持っているため
// 最後の秒は下記のように書き直せる
let f = user.sayHi;
setTimeout(f, 1000);

// 解決策1：囲む
// 最もシンプルな解決策はラップされた関数を使うこと
user = {
    firstName: "John",
    sayHi() {
        alert(`Hello, ${this.firstName}!`);
    }
};

setTimeout(function() {
    user.sayHi(); // Hello, Jhon!
}, 1000);
// これは外部レキシカル環境からuserを受け取り、メソッドを普通に呼び出せるため成功する

// 同じ記法
setTimeout(() => user.sayHi(), 1000);

// 良い解決方法に見えるがコード構造にわずかな脆弱性がある
// 仮にsetTimeoutが動く前にuserが値を変更していたら間違ったオブジェクトを呼び出す
user = {
    firstName: "John",
    sauHi() {
        alert(`Hello, ${this.firstName}!`);
    }
};

setTimeout(() => user.sayHi(), 1000);

// 1秒以内に次のコードが実行されると
user = {
    sayHi() { alert("Another user in setTimeout!");}
};

// Another user in setTimeout?!?

// 解決策2：bind
// この解決方法は上記のコード書き換えによる異常動作が起きないことを保証する
// thisを固定できる組み込みメソッドbindを提供する
let boundFunc = func.bind(context);

// funcUserはthis=userでのfunc呼び出しを渡す
user = {
    firstName: "John"
};

function func() {
    alert(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); // John

// func.bind(user)はthis=userで固定されたfuncの"バインドされたバリアント"となる
// すべての引数はオリジナルのfuncに"そのまま"渡される
user = {
    firstName: "John"
};

function func(phrase) {
    alert(phrase + ", " + this.firstName);
}

// thisをuserにバインドする
funcUser = func.bind(user);

funcUser("Hello"); // Hello, John(引数"Hello"が渡され、this=user)

// オブジェクトメソッドを試してみる
user = {
    firstName: "John",
    sayHi() {
        alert(`Hello, ${this.firstName}!`);
    }
};

let sayHi = user.sayHi.bind(user);

// オブジェクトなしで実行可能
sayHi();

setTimeout(sayHi, 1000);

// 1秒以内にuserの値が変わったっとしても
// sayHiは古いuserオブジェクトを参照しているバインド前の値を使用する
user = {
    sayHi() {alert("Another user in setTimeout!");}
}

// 引数がそのまま渡され、thisだけがbindによって固定されていることがわかる
user = {
    firstName: "John",
    say(phrase) {
        alert(`${phrase}, ${this.firstName}!`);
    }
};

let say = user.say.bind(user);

say("Hello");
say("Bye");

// 部分関数
// thisだけでなく引数をバインドすることも可能
function mul(a, b) {
    return a * b;
}

// bindを使用してdouble関数を作成する
let double = mul.bind(null, 2);

alert(double(3));
alert(double(4));
alert(double(5));

// mul.bind(null, 2)の呼び出しで新しい関数doubleを作成し、
// コンテキストをnull、最初の引数を2で固定したmulを呼び出す
// これを部分関数アプリケーションとよばれ既存のパラメータのい靴化を固定することで新しい関数を作成する
// 以下のコードの関数tripleは値を3倍する
let triple = mul.bind(null, 3);

alert(triple(3));
alert(triple(4));
alert(triple(5));

// 他のケースでは非常に一般的な関数がある状態で、便利さのために特定用途のパターンが欲しい場合に部分関数は役に立つ


// Going partial without context
// 引数だけをバインドする関数partialは簡単に実装できる
function partial(func, ...argsBound) {
    return function(...args) {
        return func.call(this, ...argsBound, ...args);
    }
}

// Usage:
user = {
    firstName: "John",
    say(time, phrase) {
        alert(`[${time}] ${this.firstName}: ${phrase}!`);
    }
};

// 固定時間で部分メソッドを追加
user.sayNow = partial(user.say, new Date().getHours() + ":" + new Date().getMinutes());

user.sayNow("Hello");

