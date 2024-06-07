"use strict";

// 論理演算子 
// 例えばresult = a || b
alert(true || true);
alert(false || true);
alert(true || false);
alert(false || false);

if (1 || 0) {
    alert("truethy!");
}

let hour = 9;

if (hour < 10 || hour > 18) {
    alert("The office is closed.");
}

hour = 12;
let isWeekend = true;

if (hour < 10 || hour > 18 || isWeekend) {
    alert("The office is closed.") // 週末です
}

// OR -> ||
// JavaScriptにおける論理演算子の特殊な動作
alert(1 || 0); // 1(1は真)
alert(null || 1); // 1(1は最初の真値)
alert(null || 0 || 1); // 1(最初の真値)
alert(undefined || null || 0); // 0(すべて偽なので最後の値が返却される)

let firstName = "";
let lastName = "";
let nickName = "SuperCoder";

alert(firstName || lastName || nickName || "Anonymous"); // SuperCoder

// 短路評価
// 条件の左側がfalseになるときのみコマンドを実行するためにこの特徴を利用する人がいる
true || alert("not printed");
false || alert("printed");

// AND -> &&
hour = 12;
let minute = 30;

if (hour == 12 && minute == 30) {
    alert("Time is 12:30");
}

if (1 && 0) {
    alert("won't work, because the result is falsy");
}

// 最初のオペランドが真の場合、
// ANDは2つ目のオペランドを返す
alert(1 && 0);
alert(1 && 5);

// 最初のオペランドが偽の場合
// ANDはそれを返します。2つめのオペランドは無視されます
alert(null && 5);
alert(0 && "no matter what");

alert(1 && 2 && null && 3);
alert(1 && 2 && 3);

// NOT -> !
alert(!true);
alert(!0);

// 2つの否定!!は値を真偽値型に変換するために使われることがあります
alert(!!"non-empty string");
alert(!!null);

alert(Boolean("non-empty string"));
alert(Boolean(null));