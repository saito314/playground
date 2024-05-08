"use strict";

// 関数をすぐに実行させず、ある時点で実行するようにしたいことがある
// これを呼び出しのスケジューリングと呼ぶ
// setTimeout:指定時間経過後、1度だけ関数を実行する
// setInterval:各実効の間は指定した間隔で定期的に関数を実行する

// setTimeout
function sayHi() {
    alert("Hello");
}

setTimeout(sayHi, 1000);

// 引数がある場合は下記のようになる
function sayHi(phrase, who) {
    alert(phrase + ", " + who);
}

setTimeout(sayHi, 1000, "Hello", "John");

// もしも最初の引数が文字列の場合、JavaScriptはそれから関数を作成する
setTimeout("alert('Hello')", 1000);

// しかし、文字列を使うことは推奨されていないためアロー関数を使用する
setTimeout(() => alert("Hello"), 1000);

// setTimeoutに関数を渡しますが、実行はしない
setTimeout(sayHi(), 1000); // wrong

// clearTimeoutを使ったキャンセル
// キャンセルするための構文は次の通り
let timerId = setTimeout(sayHi, 1000);
clearTimeout(timerId);

// 下記のコードは関数をスケジュールし、その後キャンセルしているため何も起きません
timerId = setTimeout(() => alert("never happens"), 1000);
alert(timerId); // timer識別子

clearTimeout(timerId);
alert(timerId); // 同じ識別子（キャンセル後nullにはならない）

// setInterval
// 2秒のインターバルで繰り返し
timerId = setInterval(() => alert("tick"), 2000);

// 5秒後に停止
setTimeout(() => {clearInterval(timerId); alert("stop");}, 5000);

// 再帰的なsetTimeout
// 定期的に何かを実行するのに2つ方法がある
// 1つはsetIntervalで、もう1つはネストされたsetTimeout
/* 次の代わり：
let timerId = setInterval(() => alert("tick"), 2000);
*/

timerId = setTimeout(function tick() {
    alert("tick");
    timerId = setTimeout(tick, 2000);
}, 2000);

// ユースケース：5秒枚にデータを確認するためにサーバへリクエストを送るサービスを書く必要があるが
// サーバが高負荷である場合には間隔を10, 20, 40と増やす必要がある
// 下記のコードはユースケースの疑似コード
let delay = 5000;

timerId = setTimeout(function request() {
    // send request

    if (false) { // request failed due to server overload 
        delay *= 2;
    }

    timerId = setTimeout(request, delay);
}, delay);

// 再帰的なsetTimeoutは実行間の遅延を保証するが、setIntervalは保証しない
// 2つのコードを比較する
{
    let i = 1;
    setInterval(function() {
        func(i++);
    }, 100);
}
{
    let i = 1;
    setTimeout(function run() {
        func(i++);
        setTimeout(run, 100)
    }, 100);
}

// 遅延なしのsetTimeout
// スケジューラは現在のコードが完了した後にそれを実行する
// 例えば下記のコードは"Hello"のあとに"World"が表示される
setTimeout(() => alert("World"), 0);

alert("Hello");
