"use strict";

// 引用符
// シングルクォート、ダブルクォート、またはバッククォートのいずれかで囲むことができる
let single = 'single-quoted';
let double = "double-quoted";
let backticks = `backticks`;

// シングルクォート、ダブルクォートは本質的に同じ
// バッククォートは文字列の中に関数呼び出しを含む任意の式を埋め込むことができる
function sum(a, b) {
    return a + b;
}

alert(`1 + 2 = ${sum(1, 2)}.`); // 1 + 2 = 3.

// バッククォートを使う別の利点は文字列を複数の行に跨げる
let guestList = `Guest:
 * John
 * Pete
 * Mary
`;

alert(guestList);

/*
シングルクォートとダブルクォートで複数行にまたがろうとするとエラーになる
let guestList = "Guests:  // Error: Unexpected token ILLEGAL
 * John";
*/

// 特殊文字
// \nは改行文字などのように特殊文字が存在する
guestList = "Guests:\n * John\n * Pete\n * Mary";

alert(guestList);

let str1 = "Hello\nWorld"; // 改行文字を使用した2行

// バッククォートを使用した2行
let str2 = `Hello
World`;

alert(str1 == str2); // true

// ユニコードの例
alert("\u00A9");
alert("\u{20331}");
alert("\u{1F60D}");

// バックスラッシュはエスケープ文字として使われる
alert('I\'m the Walrus!');

// シングルクォートを使いたいときはダブルクォートかバッククォートを使って文字列を作る
alert(`I'm the Walrus!`);

// バックスラッシュを文字列にするのにもバックスラッシュを使う
alert(`The backslash: \\`);

// 文字列長
// lengthは文字列の長さをもつ
alert(`My\n`.length); // 3

let str = `Hello`;

alert(str[0]);
alert(str.charAt(0));

alert(str[str.length - 1]);

str = `Hello`;

alert(str[1000]);
alert(str.charAt(1000));

for (let char of "Hello") {
    alert(char);
}

// 文字列は不変
str = "Hi";

str[0] = 'h';
alert(str[0]);

// 通常の回避策は新しい文字列を持つ変数を作ること
str = "Hi";
str = "h" + str[1];

alert(str) // hi

// ケース（大文字小文字）を変更する
alert("Interface".toUpperCase()); // INTERFACE
alert("Interface".toLowerCase()); // interface

// 1文字だけ小文字にしたい場合は
alert("INTERFACE"[0].toLowerCase()); // iNTERFACE

// 部分文字列の検索
// str.indexOf
str = "Widget with id";
alert(str.indexOf("Widget")); // 0, 最初に見つかった
alert(str.indexOf("widget")); // -1, 見つからなかった

alert(str.indexOf("id")); // 1, W"id"getのid

// indexOfの2つめのパラメータは与えられた位置から探索するためのもの
str = "Widget with id";

alert(str.indexOf("id", 2));

//すべての出現個所を知りたい場合はループを併用する
str = "As sly as a fox, as strong as an ox";

let target = "as"; // 探そう

let pos = 0;
while (true) {
    let foundPos = str.indexOf(target, pos);
    if (foundPos == -1) break;

    alert(`Found at ${foundPos}`);
    pos = foundPos + 1; // 見つけた位置の次の位置から探索を続ける
}

// 同じアルゴリズムを短くすることができます
str = "As sly as a fox, as strong as an ox";
target = "as";

pos = -1;
while ((pos = str.indexOf(target, pos + 1)) != -1) {
    alert(pos);
}

// ifテストの中では少し不便
str = "Widget with id";

if (str.indexOf("Widget")) { // 文字列の位置なので0が出てしまう
    alert("We found it");
}

str = "Widget with id";

if (str.indexOf("Widget") != -1) {
    alert("We found it");
}

// The bitwise NOT trick
alert(~2); // -3
alert(~1); // -2
alert(~0); // -1
alert(~-1); // -0

// includes: 文字列に任意の文字が含まれているか Boolean
alert("Widget with id".includes("Widget")); // true

alert("Hello".includes("Bye")); // false

// str.includesの2つ目の引数は探索の開始位置
alert("Widget".includes("id")); // true
alert("Widget".includes("id", 3)); // false

// startswithは任意の単語で開始されているか
// endswithは任意の単語で終了しているか
alert("Widget".startsWith("Wid")); // true
alert("Widget".endsWith("get")); // false

// 部分文字列を取得する
str = "stringify";
alert(str.slice(0, 5)); // "strin"
alert(str.slice(0, 1)); // "s"

// 2つ目に引数がない場合は文字列の最後まで探索する
str = "stringfy";
alert(str.slice(2)); // "ringify"

// 負の値を指定可能
str = "stringify";

alert(str.slice(-4, -1));

// substringはsliceと同じですが1つ目の引数と2つ目の引数が入れ替わっていても正常に動く
str = "stringify";

alert(str.substring(2, 6)); // "ring"
alert(str.substring(6, 2)); // "ring"

alert(str.slice(2, 6)); // "ring"
alert(str.slice(6, 2)); // ""

// substrは開始位置から文字列の長さ分取得する
alert(str.substr(2, 4));
alert(str.substr(-4, 2));

// 文字列比較
alert("a" > "Z");
alert('Österreich' > 'Zealand'); // 発音区別記号付き文字は規則に反している

// str.codePointAt(pos): posの文字コードを返す
alert("z".codePointAt(0)); // 122
alert("Z".codePointAt(0)); // 90

// String.fromCodePoint(code): codeを文字で生成する
alert(String.fromCodePoint(90)); // "Z"

// \とそれに続く16進数のコードでユニコード文字を追加できる
alert("\u005a"); // Z

// 65..220の文字を作る処理
str = "";

for (let i = 65; i <= 220; i++) {
    str += String.fromCodePoint(i);
}
alert(str);

// 正しい比較
// 発音記号ってどう出力するかよくわからない…
alert('Österreich'.localeCompare('Zealand')); // -1

// サロゲートペア
// 2バイトで表現される文字 JavaScriptとしては言語として正しく処理されない
// どうやって出せばいいのかわからないのでコピペ
alert( '𝒳'.length ); // 2, MATHEMATICAL SCRIPT CAPITAL X
alert( '😂'.length ); // 2, FACE WITH TEARS OF JOY
alert( '𩷶'.length ); // 2, a rare chinese hieroglyph

alert( '𝒳'[0] ); // 見知らぬ記号...
alert( '𝒳'[1] ); // ...サロゲートペアの片割れ

// charCodeAt はサロゲートペアを認識しません、そのため一部分のコードを返します
alert( '𝒳'.charCodeAt(0).toString(16) ); // d835, 0xd800 と 0xdbff の間
alert( '𝒳'.charCodeAt(1).toString(16) ); // dcb3, 0xdc00 と 0xdfff の間

// 文音記号と正規化
// Sの後に特別な上にドット文字が続く場合表示される
alert("S\u0307");

// さらに下へのドットを追加すると上と下にドットのついた文字を表示できる
alert("S\u0307\u0323");

// 素晴らしい柔軟性を持つが順番が存在し、別々の文字として認識される
let s1 = "S\u0307\u0323";
let s2 = "S\u0323\u0307";

alert(`s1: ${s1}, s2: ${s2}`);
alert(s1 == s2); // false

// このためにユニコード正規化アルゴリズムが存在する
// str.normalize()で実装されている
alert("S\u0307\u0323".normalize() == "S\u0323\u0307".normalize()); // true

// 実際は3つの文字の並びを1つの文字\u1e68にまとめている
// ただし、必ずしも全ての文字列がこうなっているわけではない
alert("S\u0307\u0323".normalize().length); // 1

akert("S\u0307\u0323".normalize() == "\u1e68"); // true