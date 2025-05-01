"use stirct";


// RegExpと文字列のメソッド
// 正規表現を扱う2つの方法
// 1. ます正規表現は組み込みのRegExpクラスのオブジェクトであり、多くのメソッドを提供する
// 2. それに加えて、文字列の中に正規表現で動作するメソッドがある


// str.search(reg)
// これは最初にマッチした位置を、見つからない場合は-1を返す
{
    let str = "A drop of ink may make a million think";

    alert(str.search(/a/i));
}

// 重要な制限: searchは常に最初のマッチを探す


// str.match(reg), "g"フラグなし
// メソッドstr.matchはgフラグに応じて振る舞いが異なる。
// str.match(reg)は最初のマッチのみを探す
{
    let str = "Fame is the thirst of youth";

    let result = str.match(/fame/i);

    alert(result[0]);
    alert(result.index);
    alert(result.input);
}

// パターンの一部が丸括弧で区切られている場合、それは配列の別の要素になる
{
    let str = "JavaScript is a programming language";

    let result = str.match(/JAVA(SCRIPT)/i);

    alert(result[0]);
    alert(result[1]);
    alert(result.index);
    alert(result.input);
}