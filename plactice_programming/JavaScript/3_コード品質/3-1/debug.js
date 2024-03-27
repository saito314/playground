"use strict";

// debuggerコマンド
// ブラウザでのデバッグをするときにdebuggerコマンドを使用してコードを停止することができる
function hello(name) {
    let phrase = `Hello, ${name}!`;

    debugger; // <- デバッガはここで止まる

    say(phrase);
}

// 関数式の復習
let helloExec = function(name) {
    let phrase = `Hello, ${name}!`;

    debugger;

    say(phrase);
}

// アロー関数の復習
let helloAllow = (name) => {
    let phrase = `Hello, ${name}!`;

    debugger;

    say(phrase);
}