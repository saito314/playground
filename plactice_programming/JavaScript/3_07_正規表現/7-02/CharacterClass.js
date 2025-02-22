"use strict";


// 文字クラス
// 文字クラスは数値以外を見つけて除去するなどの場合に役立つ
// 例えば/\d/は1つの数字を探す
{
    let str = "+7(903)-123-45-67";

    let reg = /\d/;

    alert(str.match(reg));
}


// すべての数字を探すためにgフラグを追加する
{
    let str = "+7(903)-123-45-67";

    let reg = /\d/g;

    alert(str.match(reg));

    // 結果から数値だけの電話番号を作る
    alert(str.match(regexp).join(""));
}


// 正規表現は通常の記号と文字クラス両方を含む場合がある
{
    let str = "CSS4 is cool";
    let reg = /CSS\d/;

    alert(str.match(reg));
}

// また文字クラスを使うこともできる
{
    alert("I love HTML5!".match(/\s\w\w\w\w\d/));
}

// 逆のクラス
{
    let str = "+7(903)-123-45-67";

    alert(str.match(/\d/g).join(""));
}

// 代わりの方法は、文字列から非数字をみつけ削除する
{
    let str = "+7(903)-123-45-67";

    alert(str.replace(/\D/g, ""));
}


// ドットは任意の文字
{
    alert("Z".match(/./));
}

// また正規表現の中にある場合
{
    let reg = /CS.4/;

    alert("CSS4".match(reg));
    alert("CS-4".match(reg));
    alert("CS 4".match(reg));
}

// ドットは任意の文字を意味するが文字の欠如ではないことに注意
{
    alert("CS4".match(/CS.4/));
}

// デフォルトではドットは改行文字にはマッチしない
{
    alert("A\nB".match(/A.B/));
}

// 開業を含めてドットを文字通り任意の文字をしたいケースがある
// この場合はフラグsを使用する
{
    alert("A\nB".match(/A.B/s));
}