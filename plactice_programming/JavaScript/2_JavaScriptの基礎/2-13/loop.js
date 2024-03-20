"use strict";

// whileループ
// 0, 1, 2と表示してループ終了
let i = 0;
while (i < 3) {
    alert(i);
    i++;
}

// ブラウザは無限ループに対してサーバサイドJavaScriptでプロセスを停止できる仕組みがある
i = 3;
while (i) {     // 0はfalseなので条件が偽になり、ループが止まる
    alert(i);
    i--;
}

// do…whileループ
// ループの条件判定を後ろにもってくることが可能
i = 0;
do {
    alert(i);
    i++;
} while (i < 3);

// forループ
// 個人的にはwhileよりも重要
for (i = 0; i < 3; i++) { // 開始条件, ループ条件, ステップ
    alert(i);
}

// 上記のループをifで書き換えると下記の通り
i = 0;
if (i < 3) {alert(i); i++};
if (i < 3) {alert(i); i++};
if (i < 3) {alert(i); i++};
// forの開始条件で宣言した変数のスコープはforの{}内
// forの()内は必要がなければ省略も可能
// 例えばfor(;;){}で無限ループになる

// breakキーワード
// ループを脱出する
let sum = 0;
while (true) {
    let value = +prompt("Enter a number", "");

    if (!value) break;

    sum += value;
}
alert("Sum:" + sum);

// continueキーワード
// 次のイテレーションに進む
for (i = 0; i < 10; i++) {
    if (i % 2 == 0) continue;
    alert(i); // 偶数の場合スキップされるので出力は1, 3, 5, 7, 9
}
// breakやcontinueなどの式ではない構文構造は三項演算子?の中では使えない

// breakやcontinueのラベル
// 一番下の階層のループで全てのループから脱出したい <- pythonではなさそうな概念？
outer: for (i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        let input = prompt(`Value ad coords (${i},${j})`, "");

        // 空文字またはキャンセルされた場合に2つのループから抜ける
        if (!value) break outer;

        // 値に対してsomethingする
    }
}
alert("Done!")

// ラベルはforの一行上に合ってもよい
// outer:
// for (let i = 0; i < 10; i++) {...}

