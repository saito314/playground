"use strict";

// Object.prototype
{
    let obj = {};
    alert(obj); // "[object Object]"?
}

// 文字列"[object Object]"を生成するコードがどこにあるのか？
// それは組み込みメソッドのtoStringだがどこにあるのか？
// obj = {}はobj = new Object()と同じでそのObjectは組み込みオブジェクトコンストラクタ関数
// その関数がtoStringや他の関数を持つ巨大なオブジェクトを参照するObject.prototypeを持っている

// 下記のように確認できる
{
    let obj = {};

    alert(obj.__proto__ === Object.prototype); // true

    alert(obj.toString === obj.__proto__.toString); // true
    alert(obj.toString === Object.prototype.toString); // true

    alert(Object.prototype.__proto__); // null
}

// 他の組み込みのプロトタイプ
{
    let arr = [1, 2, 3];

    // Array.prototypeから継承してる？
    alert(arr.__proto__ === Array.prototype); // true

    // 次にObject.prototypeからは継承している？
    alert(arr.__proto__.__proto__ === Object.prototype); // true

    // そしてトップのnull
    alert(arr.__proto__.__proto__.__proto__); // null
}

// プロトタイプのメソッドのいくつかは重複する可能性がある
{
    let arr = [1, 2, 3];
    alert(arr);
}

// 関数には独自のtoStringがある
{
    function f() {}

    alert(f.__proto__ == Function.prototype); // true
    alert(f.__proto__.__proto__ == Object.prototype); // true, objectからの継承
}

// プリミティブ
// 文字列、数値、ブール値でも起こる
// 組み込みのコンストラクタString, Number, Booleanを使った一時的なラッパーオブジェクトが作られる
// nullやundefinedはオブジェクトラッパーをもたない

// ネイティブプロトタイプの変更
// もしあるメソッドをString.prototypeに追加した場合、それは全ての文字列で利用可能となる
{
    String.prototype.show = function() {
        alert(this);
    };

    "BOOM!".show(); // BOOM!
}
// ptorotypeはグローバルなのでコンフリクトを起こしやすい
// 一般的にはネイティブのプロトタイプ変更は悪いアイデアとされている


// 手動で実装し、組み込みのプロトタイプにそれを取り込むことができる
{
    if (!String.prototype.repeat) { // もしこのようなメソッドがない場合
        // prototypeに追加する

        String.prototype.repeat = function(n) {
            // 文字列をn回繰り返す
            return new Array(n + 1).join(this);
        };
    }

    alert("La".repeat(3)); // LaLaLa
}

// プロトタイプからの借用
// 配列ライクなオブジェクトを作成したあとにArrayのネイティブメソッドを借用したい場合など
{
    let obj = {
        0: "Hello",
        1: "world",
        length: 2,
    }

    obj.join = Array.prototype.join;
    
    alert(obj.join(',')); // Hello,World!
}