"use strict";

// グローバルオブジェクトはどこでも利用な変数と関数を提供する
// デフォルトで言語や環境に組み込まれている
// すべての環境でサポートされるべきグローバルオブジェクトとしてglobalThisがある

// グローバルオブジェクトの全てのプロパティへは直接アクセスできる
alert("Hello");
// 同じ
window.alert("Hello");

// ブラウザではvarで宣言されたグローバル関数や変数はグローバルオブジェクトのプロパティになる
var gVar = 5;

alert(window.gVar); // 5(become a property of the global object)

// 関数宣言（関数式ではなく、メインコードフローの中でfunctionキーワードをもつ文）も同じ効果がある
// この動作は互換性のため存在している
// 最近のスクリプトはJavaScriptモジュールを使用するためletを使用すると良い
let gLet = 5;

alert(window.gLet); // undefined(グローバルオブジェクトのプロパティにならない)

// let宣言でグローバルで見えるようにしたい場合にはプロパティとして記述する
window.currentUser = {
    name: "John"
};

// コードのどこかで
alert(currentUser.name); // John

// あるいはローカル変数にcurrentUserがある場合には
// 明示的にwindowから取得することも可能
alert(window.currentUser.name); // John

// とはいえグローバル変数は一般的には推奨されていない
// ↑これはどの言語でもシステムでも共通の認識

// Polyfillのための使用
// グローバルオブジェクトを使って最近の言語機能をテストする
// たとえば組み込みのPromiseオブジェクトが存在するかテストする
if (!window.Promise) {
    alert("Yout brouser is really old!");
}
// 存在しない場合、"Polyfill"を作成できる
// （その環境でサポートされていないが、最近の標準としては存在する機能を追加）
if (!window.Promise) {
    // window.Promise = ... 新しい言語機能のカスタム実装
}