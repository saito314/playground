"use strict";

// コードブロック
{
    // 外部には見せる必要のない、ローカル変数で処理する
    let message = "Hello"; // このコードブロックでだけ見えます。

    alert(message); // Hello
}

alert(message); // Error: message is not defined

// これを使用して、独自のタスクを実行するコード部分をそのタスクにのみ属する変数で分離できる
{
    // メッセージを表示する
    let message = "Hello";
    alert(message);
}
{
    // 別のメッセージを表示
    let message = "Goodbye";
    alert(message);
}

// ブロックがないとエラーが発生する
// 今まで苦しんでたので今回学べて助かります。

// if, for, whileなどの場合も、{...}の中で宣言された変数はその内側でだけ見える
if (true) {
    let phrase = "Hello!";

    alert(phrase); // Hello!
}

alert(phrase); // Error, そのような変数はありません。

// ここではifが終わった後で、次のalertはphraseは見えないため、エラーになる
// 同様のことがforループとwhileループにも当てはまります
for (let i = 0; i < 3; i++) {
    // 変数iはこのforの中でだけ見える
    alert(i); // 0, 1, 2
}

alert(i); // Error, no such variable

// ネストされた関数
// 別の関数の内部で作成される関数は"ネストされた"関数と呼ばれる
function sayHiBye(firstName, lastName) {

    // 下で使うネストされたヘルパー関数
    function getFullName() {
        return firstName + " " + lastName;
    }

    alert("Hellom " + getFullName());
    alert("Bye, " + getFullName());
}

// makeCounterは実行ごとに次の数を返す"Counter"関数を作成する
function makeCounter() {
    let count = 0;

    return function() {
        return count++;
    };
}

let counter = makeCounter();

alert(counter()); // 0
alert(counter()); // 1
alert(coutner()); // 2

// レキシカル/語彙環境(Lexical Environment)
// Step1:変数
// JavaScriptでは実行中の全ての関数、コードブロックおよびスクリプト全体にはレキシカル環境と呼ばれる内部の関連オブジェクトがある
// 1. 環境レコード。プロパティとして全てのローカル変数をもつオブジェクト。（thisなど）
// 2. 外部のレキシカル環境への参照。通常、直近の外部のレキシカルなコードに関連付けられている
// "変数"は単に特別な内部オブジェクトである環境レコードのプロパティである。
// "変数を取得または変更する"とは"そのオブジェクトのプロパティを取得または変更する"ことを意味する

let phrase = "Hello";
alert(phrase);
/* Lexical Environment
phrase: "Hello" -> null

これはスクリプト全体に関連付けられたグローバルレキシカル環境である
1. スクリプトを開始するとレキシカル環境には宣言された全ての変数があらかじめ用意される
    -> ただし最初は見初期化の状態
2. その後let phraseで定義したときにundefinedが格納される
3. phraseに値が割り当てられる
4. phraseの値が変更される
*/

/*
レキシカル環境は使用上のオブジェクト
言語使用の中で動作の仕組みを説明するために「理論的に」存在するもの
そのためこのオブジェクトをコード上で取得したり直接操作することはできない
*/

// step2 関数宣言
// 関数も変数のように値
// 違いとしては関数宣言は即座に完全に初期化される
// そのため、宣言自体の前でも関数宣言として宣言された関数を呼び出すことができる
// 例えば以下は関数を追加したときのグローバルレキシカル環境の初期状態である
phrase = "Hello";

function say(name) {
    alert(`${phrase}, ${name}`);
}
// 当然この動作は関数宣言にのみ適用されlet say = function(name)... のように変数に関数を割り当てる関数式にはあてはまらない

// step3 内外のレキシカル環境
// 関数の呼び出し中は2つのレキシカル環境がある: 内部（関数呼び出し用）と外部（グローバル）


// step4 関数を返す
// makeCounterの例に戻る
// makeCounter()呼び出しの最初に新しいレキシカル環境オブジェクトが作成され、このmakeCounterの実行のために変数が格納される


// ガベージコレクション
// 通常関数呼び出しが終わった後、すべての変数とともにレキシカル環境はメモリから削除される
// しかし、関数の終了後も依然として到達可能なネストされた関数がある場合、それはレキシカル環境への惨状である[[Environment]]プロパティをもつ
// この場合、レキシカル環境は関数の完了後も依然として到達可能なので存在し続ける
function f() {
    let value = 123;

    return function() {
        alert(value);
    }
}

let g = f(); // g.[[Environment]]は、対応するf()呼び出しのレキシカル環境への参照を保持する

// f()が何度も呼ばれ、結果の巻子が保持される場合、対応するレキシカル環境オブジェクトもまたメモリに残る
function f() {
    let value = Math.random();

    return function() {alert(value)};
}

// 配列に3つの関数があり、それぞれが対応するf()からの
// レキシカル環境と関連づいている
arr = [f(), f(), f()];

// レキシカル環境オブジェクトは到達不能になったときにガベージコレクトされる
// 下のコードではネストされた関数が削除された後、それを囲んでいたレキシカル環境はメモリからクリアされる
function f() {
    let value = 123;

    return function() {alert(value);}
}

g = f();

g = null;


// 現実の最適化
// 理論的には関数がクリアされない間、すべての外部変数も保持される
// しかし、実際にはJavaScriptエンジンはそれを最適化しようとする
// V8(Chrome, Edge, Opera)の重要な副作用はこのような変数はデバックでは利用できなくなる
function f() {
    let value = Math.random();

    function g() {
        debugger;
    }

    return g;
}

g = f();
g();

let value = "Surprise!";

function f() {
    let value = "the closest value";

    function g() {
        debugger;
    }

    return g;
}

g = f();
g();