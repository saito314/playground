"use strict";

// プリミティブ
// 全部で7つある
// string, number, bigint, boolean, symbol, null, undefined

// オブジェクト
// {}で作ることができる
// プロパティとして複数の値を保持することができる
// 関数もオブジェクトの一つなのでオブジェクトは関数を持つこともできる
let john = {
    name: "John",
    sayHi: function() {
        alert("Hi buddy");
    },
};

john.sayHi();

/*
JavaScriptの作成者が直面するパラドックスは次の通り
・文字列や数字のようなプリミティブに対してやりたいことがたくさんある。
・上記をメソッドとして実現できることは素晴らしいこと。
・プリミティブができるだけ高速かつ軽量でなければならない。

解決策は次の通り
1. プリミティブは依然としてプリミティブであり、単一の値であること。
2. 言語は文字列、数値、真偽値そしてシンボルのメソッドやプロパティにアクセスすることができる。
3. 必要に応じて追加の機能を提供する特別なオブジェクトラッパーが作られ、そのあと破棄される。
*/

// オブジェクトラッパーはプリミティブ型毎に異なり、string, number, boolean, symbolと呼ばれる。
// たとえば大文字化された文字列を返すstr.toUpperCase()というメソッドがある
let str = "Hello";

alert(str.toUpperCase()); // HELLO

/*
何が起こっているのか
1. 文字列strはプリミティブで、プロパティへアクセスした瞬間に文字列の値を知る特別なオブジェクトが作成される。
2. そのオブジェクトはtoUpperCase()のような便利なメソッドを持っている
3. メソッドが実行され、新たな文字列を返す
4. 特別なオブジェクトは破棄され、プリミティブのstrのみが残る
*/

// 数値は自身のメソッドを持っている
let n = 1.23456;

alert(n.toFixed(2));

// Javaなどの言語はnew Number(1)またはnew Boolean(false)のような構文を使うことで
// 明示的にプリミティブのためのラッパーオブジェクトを作ることができる
// JavaScriptでも可能ではあるが強く推奨しない
alert(typeof 1); // number

alert(typeof new Number(1)); // object

// オブジェクトはifでは常にtrueなので、アラートが表示される
let zero = new Number(0);

if (zero) { // zeroはプリミティブではなくオブジェクトだからtrue
    alert("zero is truthy!?");
}
// newをつけずに同じ関数を使うことは普通で役に立つ。
let num = Number("123"); // stringからnumberへの変換

// null/undefinedはメソッドを持たない
// 特別なプリミティブnullとundefinedは例外
alert(null.test) // error!!
