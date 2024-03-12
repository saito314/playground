"use strict";

let x = 1;
x = -x; // 単項演算子
alert(x)

let a = 1, b = 3;
alert(b - a); // 二項演算子

// 剰余 %
alert(5 % 2);
alert(8 % 3);

// べき乗 **
alert(2 ** 2);
alert(2 ** 3);
alert(2 ** 4);
// べき乗を使って平方根を表せる
alert(4 ** (1/2));
alert(8 ** (1/3));

// 文字列の連結、二項演算子 +
let s = "my" + "string";
alert(s);
// 片方が文字列だともう片方は文字列として連結される
alert("1" + 2);
alert(1 + "2");
// 優先度で演算されるため、文字列になる・ならないは順序を確認する
alert(2 + 2 + "1");
alert("1" + 2 + 2);
// +以外の演算で文字列を含める場合は通常オペランドを数値に変更する
alert(6 - "2");
alert("6" - "2");

// 数値変換、単項演算子 +
let c = 1;
alert(+c);

let d = -2;
alert(+d);
// 非数値型を数値に変換する
alert(+true);
alert(+"");
// これはNumber()を使ってキャストするよりも短く記載できる <- 可読性は高いのか？
let apples = "2";
let oranges = "3";

alert(apples + oranges);
alert(+apples + +oranges);
alert(Number(apples) + Number(oranges)); // 一行上と同じ挙動になる

// 代入 =
let e = 2 * 2 + 1;
alert(e);
// 式の途中でも使用可能だが、可読性が下がるため非推奨
let f = 1;
let g = 2;
let h = 3 - (f = g + 1);

alert(f);
alert(h);

// 代入チェーン 可読性が低いため非推奨
let i, j, k;
i = j = k = 2 + 2; // i, j, k共に4になる
alert(i);
alert(j);
alert(k);

// インプレース修正
let n = 2;
n = n + 5;
n = n * 2;
alert(n);

// 上記と同じ挙動をする
n = 2;
n += 5;
n *= 2;
alert(n);

// ただし += *= は代入と同じ優先度になることに注意
n = 2;
n *= 3 + 5;
alert(n);

// インクリメント・デクリメント
let counter = 2;
counter++;
alert(counter);

counter = 2;
counter--;
alert(counter);

counter = 1;
// 代入する前にcounter+1
let l = ++counter;
// 代入後にcounter+1
l = counter++;

// 結果を使わない場合は通常どちらのインクリメント・デクリメントでも問題なし
counter = 0;
counter++;
++counter;
alert(counter);

// 演算子として用いるカンマ
// 通常使わないがフレームワークで使用されている
let m = (1 + 2, 3 + 4);
alert(m);

