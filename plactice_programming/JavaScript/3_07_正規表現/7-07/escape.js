"use strict";


// エスケープ, 特殊文字


// エスケープ
// 特殊文字を通常の文字として使用するにはバックスラッシュを追加する
{
    alert( "Chapter 5.1".match(/\d\.\d/) );
    alert( "Chapter 511".match(/\d\.\d/) );
}


// カッコも特殊文字なので、それらを探したい場合にはバックスラッシュを使う必要がある
{
    alert("function g()".match(/g\(\)/));
}

// バックススラッシュを探す場合には2つにする
{
    alert("1\\2".match(/\\/));
}


// スラッシュ
// スラッシュ記号は特殊文字ではありませんが、JavaScriptでは正規表現の開始と終了で使われるのでこれもエスケープが必要
{
    alert("/".match(/\//));
}

// new RegExp構文を利用する場合、エスケープする必要はない
{
    alert("/".match("/"));
}


// new RegExp
// new RegExpで正規表現を作成している場合、/はエスケープする必要はありませなんが、エスケープが必要なものもいくつかある
{
    let reg = new RegExp("\d\.\d");

    alert("Chapter 5.1".match(reg));
}

// \d\.\dが受け取られるか
{
    alert("\d\.\d");
}

// new RegExpの呼び出しは、バックスラッシュのない文字列を取得する
// これを直すには引用符で\\を\にするためにバックスラッシュを二重にする必要がある
{
    let regStr = "\\d\\.\\d";
    alert(regStr);

    let reg = new RegExp(regStr);

    alert("Chapter 5.1".match(reg));
}