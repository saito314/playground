"use strict";


// パターンとフラグ
// 正規表現（Regular expressions）は文字列内を検索したり置換するための強力な方法
// JavaScriptでは正規表現は組み込みのRegExpクラスのオブジェクトを使用して実装されている


// 正規表現
// 長い構文：
{
    regexp = new RegExp("pattern", "flags");
}
// 短い構文
{
    regexp = /pattern/;
    regexp = /pattern/gmi; // g, m, iのフラグあり
}

// スラッシュ/.../は正規表現を作成していることをJavaScriptに伝える
{
    let tag = prompt("What tag do you want to find?", "h2");

    let regexp = new RegExp(`<${tag}>`);
}


// フラグ
// i: 検索は大文字小文字を区別しない
// g: 検索がすべての一致を探す
// m: 複数行モード
// s: "dotail"モードを有効にする
// u: 完全なunicodeサポートする
// y: スティッキーモード（テキストの正確な位置で検索する）


// 検索: str.match
// str.matchには3つの動作モードがある
// 1. 誠意表現にフラグgがある場合、すべての一致の配列を返す
{
    let str = "We will, we will rock you";

    alert(str.match(/we/gi));
}

// 2. そのようなフラグがない場合は配列の形式で最初に一致したものだけを返す
{
    let str = "We will, we will rock you";

    let result = str.match(/we/i);

    alert(result[0]);
    alert(result.length);

    alert(result.index);
    alert(result.input);
}

// 3. 一致するものがなかった場合、nullを返す
{ // これはエラーにつながる
    let matchs = "JavaScript".match(/HTML/);

    if (!matchs.length) {
        alert("Error in the line above");
    }
}

// 結果を常に配列にしたい場合は次のようにする
{
    let matchs = "JavaScript".match(/HTML/) || [];

    if (!matchs.length) {
        alert("No matches");
    }
}


// 置換: str.replace
// メソッドstr.replaceは文字列strでregexpを使用して見つけた一致をreplacementに置き換える
{
    // gフラグ無し
    alert("We will, we will".replace(/we/i, "I"));
    // gフラグなし
    alert("We will, we will".replace(/we/ig, "I"));
}


// $&の例
{
    alert("I love HTML".replace(/HTML/, "$& and Javascript"));
}


// テスト: regexp.test
{
    let str = "I love JavaScript";
    let regexp = /Love/i;

    alert(regexp.test(str));
}

