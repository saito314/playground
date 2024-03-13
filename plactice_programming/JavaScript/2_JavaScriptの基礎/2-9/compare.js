"use strict";

// 比較演算子
alert(2 > 1);   // true
alert(2 == 1);  // false
alert(2 != 1);  // true

let result = 5 > 4;
alert(result);  // true

// 文字列比較
// 実際の辞書順ではなくUnicode順で比較される
alert("Z" > "A");       // true
alert("Glow" > "Glee"); // true
alert("Bee" > "Be");    // true

// 異なる型の比較
alert("2" > 1);     // true, 文字列は数値(2)になる
alert("01" > 1);    // true, 文字列は数値(1)になる
// 真偽値の場合はtrueが1, falseが0になる
alert(true == 1);   // true
alert(false == 0);  // true

// === -> 厳密等価演算子
alert(0 == false);  // true
alert("" == false); // true
alert(0 === false); // false
// nullとundefinedの比較
alert(null === undefined); // false
// 非厳密な等価演算子 nullとundefinedはスイートカップル
alert(null == undefined) // true

// nullと0
alert(null > 0);    // false
alert(null == 0);   // false
alert(null >= 0);   // true
// undefinedと0
alert(undefined > 0);   // false
alert(undefined < 0);   // false
alert(undefined == 0);  // false
