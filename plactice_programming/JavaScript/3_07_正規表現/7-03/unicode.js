"use strict";


// unicode: フラグ"u"とクラス\p{...}
// JavaScriptは文字列に対し、Unicodeエンコーディングを使用する

// 依然として一部の言語機能はUnicodeを正しく処理しない
{
    alert('😄'.length); // 2
    alert('𝒳'.length); // 2
}

// デフォルトでは通常の正規表現も4バイトの長い文字を2バイトの文字のペアとして扱う


// Unicodeプロパティ\p{...}
// \p{...}でプロパティで文字を検索することができる
// \p{...}を使うには正規表現にuフラグが必要
{
    let str = "A ბ ㄱ";

    alert( str.match(/\p{L}/gu) ); // A,ბ,ㄱ
    alert( str.match(/\p{L}/g) ); // null ("u" フラグがないのでマッチしない)
}

// 例：16進数
{
    let regexp = /x\p{Hex_Digit}\p{Hex_Digit}/u;

    alert("number: xAF".match(regexp)); // xAF
}

// 例: 中国の象形文字
{
    let regexp = /\p{sc=Han}/gu; // 象形文字をかえす

    let str = `Hello Привет 你好 123_456`;

    alert( str.match(regexp) ); // 你,好
}

// 例: カレンシー（通貨）
{
    let regexp = /\p{Sc}\d/gu;

    let  str = `Prices: $2, €1, ¥9`;

    alert( str.match(regexp) ); // $2,€1,¥9
}