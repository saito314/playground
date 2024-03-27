"use strict";

// 波括弧の扱い -> エジプトスタイル
let condition = true;

if (condition) {
    // do something
}

// 波括弧が必要ない場合 アンチパターン
if (condition) {alert(`Power ${condition} is not supported`);}
// 括弧なしで別の行に分割してしまう アンチパターン
if (condition)
    alert(`Power ${condition} is not supported`);
// 括弧なしの1行 短い場合は許される
if (condition) alert(`Power ${condition} is not supported`);
// ベストな形式
if (condition) {
    alert(`Power ${condition} is not supported`);
}

// バックウォートを使うと文字列を複数行に分割することができる
let str = `
    ECMA International's TC39 is a group of JavaScript developers,
    implementers, academics, and more, collaborating with the community
    to maintain and evolve the definition of JavaScript.
`;

// if文の場合は
if (
    id === 123 &&
    moonPhase === 'Waning Gibbous' &&
    zodiacSign === "Libra"
) {
    letTheSorceryBegin();
}

// コードをネストしすぎない
for (let i = 0; i < 10; i++) {
    if (cond) {
        // ここで1つネストレベルが増える
    }
}

// 下記のようにかける
for (let i = 0; i < 10; i++) {
    if (!cond) continue;
    // 余分なネストレベルがない
}

// if/elseとreturnでもできる
function pow(x, n) {
    if (n < 0) {
        alert("Negative 'n' not supported");
    } else {
        let result = 1;

        for (let i = 0; i < n; n++) {
            result *= x;
        }

        return result;
    }
}

// 上記の内容をreturnを使ってネストレベルを深くしない書き方
function pow(x, n) {
    if (n < 0) {
        alert("Negatice 'n' not supported");
        return;
    }

    let result = 1;

    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

