"use strict";

/*
新しいコードを記述する方法ではなく
古いスクリプトを理解するための回
*/

// var宣言はletと同じようなふるまいをする
// varからletに移行するときにエラーを避けるため違いを理解する


// varはコードブロックをもたない
if (true) {
    // letの代わりにvarを使用する
    var test = true;
}

alert(test); // true, ifの後も変数が生きている

// letはコードブロックを無視しない
if (true) {
    // use "let"
    let test = true;
}

alert(test); // ReferenceError: true is not defined.

// ループでも同様
for (var i; i < 10; i++) {
    var one = 1;
}

alert(i); // 10, "i"はループ後も見え、グローバル変数
alert(one); // 1, "one"はループ後も見え、グローバル変数

// ただし、コードブロックが関数の内側にある場合はvarは関数レベルの変数になる
function sayHi() {
    if (true) {
        var phrase = "Hello";
    }

    alert(phrase); // works
}

sayHi();
alert(phrase); // Error, phrase is not defined.

// "var"は再宣言を許容する
// 同じスコープ内で2回letで同じ変数を宣言するとエラーになる
/*
{
    let user;
    let user; // SyntaxError: 'user' has already been declared
}
*/
{
    var user = "Pete";
    var user = "John"; // "var"は何もしない（宣言済み）

    alert(user); // John
}

// "var"は、使用後に宣言できる
function sayHi() {
    phrase = "Hello";

    alert(phrase);

    var phrase;
}

sayHi();
// これは技術的に下記と同じ
function sayHi() {
    var phrase;

    phrase = "Hello";

    alert(phrase);
}
sayHi();

// もしくは下記と同じ
function sayHi() {
    phrase = "Hello";

    if (false) {
        var phrase;
    }

    alert(phrase);
}
sayHi();

// すべてのvarが関数の先頭に巻き上げられているため、このようなふるまいを「巻き上げ」と呼ぶ
// 宣言は巻き上げられるが代入は巻き上げられない
function sayHi() {
    alert(phrase);

    var phrase = "Hello";
}
sayHi();

// 上記のコードは本質的に下記のコードのように動作する
function sayHi() {
    var phrase;

    alert(phrase);

    phrase = "Hello";
}
sayHi();

// ただし、alertの時点でphraseは代入が行われておらず未初期化状態なのでundefined


// IIFE（即時実行関数）
// 昔はvarしかなかったため、ブロックレベルの可視性がなかった
// プログラマはそれをエミュレートする方法を考案した
// これは最近使うものではないが、古いスクリプトでは使用する
(function() {
    let message = "Hello";

    alert(message); // Hello
})();

// ここでは関数式が作成された後すぐ呼ばれる
// 宣言を行いすぐに関数を実行してみる
/*
function() { // SyntacError
    let message = "Hello";

    alert(message); // Hello
}();
*/
// 関数宣言にして名前をつければ動くと思うかもしれないが、宣言時は呼ぶことはできない
/*
function go() {

}(); // <-- 関数宣言は即時呼び出しができない
*/

// 関数式であることをJavaScriptに示すためには括弧が必要で名前は付けられない

// IIFEの作成方法
(function() {
    alert("関数を括弧で囲みます");
})();

(function() {
    alert("全体を括弧で囲みます");
}());

!function() {
    alert("NOT 演算子は式を開始します");
}();

+function() {
    alert("単項プラスは式を開始します");
}();

/*
IIFEについてユースケースがわからなかったので調査

1.変数のスコープの隔離
IIFEを使う主な理由の一つは、グローバルスコープを汚染しないように、
変数や関数をローカルスコープに限定することです。これは特にライブラリやフレームワークを作成する際に重要です。

(function() {
  var privateVar = "秘密の情報";
  console.log(privateVar);  // 秘密の情報
})();
console.log(typeof privateVar);  // undefined (外部からはアクセスできない)

2. コードの初期化
ウェブページやアプリケーションがロードされた際に、初期化コードを実行するためにIIFEを使用することがあります。
この方法で、初期設定をプライベートに保つことができます。

(function() {
  var settings = { volume: 70, brightness: 100 };
  console.log("設定を初期化しました。");
})();

3. 非同期処理の管理
IIFEを利用して非同期処理を即座に開始することができます。
これは特にデータの取得やファイルの読み込みに役立ちます。

(function() {
  fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data));
})();
*/