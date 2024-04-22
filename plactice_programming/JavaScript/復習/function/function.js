"use strict";

// ネストされた関数
// グローバル関数内にローカル関数を宣言することで、外部からローカル関数を隠蔽することができる
function outerFunction() {
    function innerFunction() {
        alert("Hello from the inner function!");
    };

    innerFunction();
}

outerFunction(); // "Hello from the inner function!"が出力される
// innerFunction(); // エラー: innerFunction()は宣言されていない

// また、特定のタスクをローカルに処理するためのヘルパー関数として内部関数は役に立つ
function calculateArea(radius) {
    // 円の面積を計算するヘルパー関数
    function circleArea(r) {
        return Math.PI * r * r; 
    }

    // 円周を計算するヘルパー関数
    function circumference(r) {
        return 2 * Math.PI * r;
    }

    alert(`The area of the circle is: ${circleArea(radius)}`);
    alert(`The circumference of the circle: ${circumference(radius)}`);
}

calculateArea(5);

// 変数に関数を代入できる方法をいくつか
// 1. 既存の関数を変数に代入する
// 関数bは他でも参照可能のため再利用が容易
function b() {
    alert();
}

let a = b;

// 2. 名前付き関数式を使う
// スタックトレースに関数名が表示されるためデバッグが容易になる
a = function b() {
    alert();
};

// 3. アロー関数を使用する
// アロー関数は自身のthisを持たず生成されたコンテキストのthis値をキャプチャする
// 例えば今回であればthis値はグローバル
a = () => {alert();};

// 4. コンストラクタを使用する
// 文字列から関数を生成できるため動的であるが、実行時のエラーを起こしやすい
// 実行時までコンパイルされないため、パフォーマンスに影響を与える可能性がある
a = new Function("alert();")