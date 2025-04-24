"use strict";


// スティッキーフラグ"y", 指定位置での検索
// フラグyを使用すると、元の文字列の指定位置で検索を行うことができる
// 正規表現の一般的なタスクの1つは"字句解析"：例えばプログラミング言語があり、その構造要素を分析する
// 例：let carName = "value"という文字列があり、ここから変数名を取得する必要がある場合
// 正規表現\w+を利用して変数名を検索する。
// str.match(/\w+/)の呼び出しは行の最初の単語のみを見つける
// あるいはフラグgがある場合はすべての単語の文字
// でも、現在必要なのはインデックス4の位置の単語のみ
// 指定位置から検索するにはメソッドregexp.exec(str)を値要する
// 連続したregexp.exec(str)の呼び出しは次から次へと一致したものを返す
{ // フラグgあり
    let str = "let varName";

    let regexp = /\w+/g;
    alert(regexp.lastIndex); // 0

    let word1 = rexexp.exec(str);
    alert(word1[0]); // let
    alert(regexp.lastIndex);

    let word2 = regexp.exec(str);
    alert(word2[0]); // varName
    alert(regexp.lastIndex);

    let word3 = regexp.exec(str);
    alert(word3); // null
    alert(regexp.lastIndex);
}

// すべての一致がグループや追加のプロパティと一緒に配列として返却される
// ループですべての一致を取得することもできる。
{
    let str = "let varName";
    let regexp = /\w+/g;

    let result;

    while(result = regexp.exec(str)) {
        alert(`Found ${result[0]} at position ${result.index}`);
    }
}


// 上記のようなregexp.execの利用はメソッドstr.matchAllの代替手段
// 他のメソッドとは違い、指定位置から検索を開始するための独自のlastIndexが設定可能
{
    let str = 'let varName = "value"';

    let regexp = /\w+/g; // フラグgがないとlastIndexは無視される

    regexp.lastIndex = 4;

    let word = regexp.exec(str);
    alert(word); // carName
}


// 注意：検索がlastIndexの位置から始まる。lastIndexの位置には単語がないが、その後にあるような場合にはそれが検索される
{
    let str = 'let varName = "value"';

    let regexp = /\w+/g;

    regexp.lastIndex = 3;

    let word = rexexp.exec(str);
    alert(word[0]); // varName
    alert(word.index); // 4
}

// したがって、フラグgがある場合、lastIndexプロパティは検索の開始位置となる
// 一方でフラグyはregexp.execにその前でも後ろでもなく、正確にlastIndexの位置を見るようになる
{
    let str = 'let varName = "value"';

    let regexp = /\w+/y;

    regexp.lastIndex = 3;
    alert(regexp.exec(str)); // null

    regexp.lastIndex = 4;
    alert(regexp.exec(str)); // varName
}