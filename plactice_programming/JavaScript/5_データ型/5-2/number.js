"use strict";

// JavaScriptには2つの整数型が存在する
// 倍精度とBigInt
let billion = 1000000000;
// アンダースコアを用いて区切って表示しても同じ
billion = 1_000_000_000;

// 数値に文字のeを追加し、ゼロの数を指定することで数値を短くする
billion = 1e9;

alert(7.3e9);

let ms = 0.000001;
// 小さい数に対してもeを使うことができる
ms = 1e-6;
alert(ms)

// 16進数、2進数、8進数
alert(0xff); // 255
alert(0xFF); // 255（同じです。文字の大小は関係ない）

let a = 0b11111111; // 255 の2進数表記
let b = 0o377; // 255 の8進数表記

alert(a == b) // true, 両方とも同じ数値（255）

// toString(base)
let num = 255;

alert(num.toString(16)); // ff
alert(num.toString(2)); // 11111111

// 数値に対して直接メソッドを呼び出したいとき
// 最初の.は小数点に見られるため..で問題なし
alert(123456..toString(36)); // 2n9c

// 丸め
// Math.floor: 切り捨て
// Math.ceil: 切り上げ
// Math.round: 四捨五入
// Math.trunc: 小数点以下を削除（IEでは未サポート）

// 小数点をn桁に丸めたい場合は？
// 1.乗除算
num = 1.23456;

alert(Math.floor(num * 100) / 100); // 1.23456 -> 123.456 -> 123 -> 1.23

// 2.メソッドtoFixed(n)を使用する
num = 12.34;
alert(num.toFixed(1)); // "12.3"

// これはMath.roundと同じように近い値に丸める
num = 12.36;
alert(num.toFixed(1)); // "12.4"

// toFixedは文字列であることに注意
num = 12.34;
alert(num.toFixed(5));


// 精密でない計算
// 数値が長すぎて64bitの記憶域をオーバーフローし無限大になる可能性がある
alert(1e500); // Infinity

// 計算は合っているの整合性がとれない場合
alert(0.1 + 0.2 == 0.3); // false
alert(0.1 + 0.2); // 0.30000000000000004

// toFixedを使用して誤差を確認することができる
alert(0.1.toFixed(20)); // 0.10000000000000000555

// この問題を回避するためにはtoFixedで結果を丸めることが必要
let sum = 0.1 + 0.2;
alert(sum.toFixed(2)); // 0.30

// 数値として使いたい場合には単項演算子+を使用する
sum = 0.1 + 0.2
alert(+sum.toFixed(2)); // 0.3

// 一時的に大きい数値で乗算し、計算してから除算するという方法がある
alert((0.1 * 10 + 0.2 * 10) / 10); // 0.3
// 依然として除算ではまだまだ異常がある…
alert((0.28 * 100 + 0.14 * 100) / 100); // 0.4200000000000001

// isFiniteとisNaN
// これらはnumber型に属しているが通常の数値でないため独特のチェックが必要になる
alert(isNaN(NaN)); // true
alert(isNaN("str")); // true
// ===NaNは使えないのか
alert(NaN===NaN); // false

// isFiniteは引数を数値に変換し、それはInfinity/-Infinityではなく通常の数値であればtrueを返す
alert(isFinite("15")); // true
alert(isFinite("str")); // false 特別な値: NaNなので
alert(isFinite(Infinity)); // false 特別な値: Infinityなので

// isFiniteは文字列が通常の数値化どうかをチェックするのに使われます
num = +prompt("Enter a number", "");

// Infinityを入力しなけれはtrue
alert(isFinite(num));

// parseIntとparseFloat
// プラスまたはNumberを使った数値変換は厳密
alert(+"100px");

// parseIntとparseFloatは文字列から数値を読み込む
alert(parseInt("100px")); // 100
alert(parseFloat("12.5em")); // 12.5

alert(parseInt("12.3")); // 12
alert(parseFloat("12.3.4")); // 12.3

// 数値が読み込めない場合はNaNを返す
alert(parseInt("a123"));

// 他の数学的関数
// Math.random(): 0から1まで（1を含まない）ランダムな数値を返す
alert(Math.random());
alert(Math.random());
alert(Math.random());

// Math.max(a, b, c...) / Math.min(a, b, c...): 任意の数の引数から最大/最小を返す
alert(Math.max(3, 5, -10, 0, 1)); // 5
alert(Math.min(1, 2)); // 1

// Math.pow(n power): nを与えられた数だけ累乗する
alert(Math.pow(n, power)); // 2 in power 10 = 1024

