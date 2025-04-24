"use strict";


// 破壊的なバックトラック
// 一部の正規表現は一見すると単純に見えますが、実行時間が非常に長くJavaScriptエンジンを"ハング"させることがある
// 文字列があり、それぞれの文字の後に任意のスペース\s?をもつ文字\w+から構成されるかを確認したいとする
{
    let regexp = /^(\w+\s?)*$/;

    alert(regexp.test("A test string"));
    alert(regexp.test("Bad characters: $@#"));
}

// 以下の例を実行した場合、JavaScriptが"ハング"しおそらくなにも表示されない
{
    let regexp = /^(\w*\s?)*$/;
    let str = "An input string that takes a long time or even makes this regexp to hang!";

    alert(regexp.test(str));
}

// わかりやすい例
// なぜ正規表現がハングするのか
{
    let regexp = /^(\d+)*$/;

    let str = "012345678901234567890123456789z";

    alert(regexp.test(str));
}


// 修正方法
// 1つめ可能な組み合わせ数を減らすこと
{
    let regexp = /^(\w+\s)*\w*$/;
    let str = "An input string that takes a long time or even makes this regex to hang!";

    alert(regexp.test(str));
}

// 最初の例をバックトラックを防止するために先読みを利用して書き直す
{
    let regexp = /^((?=(\w+))\2\s?)*$/;

    alert(regexp.test("A good string"));

    let str = "An input string that takes a long time or even makes this regex to hang!";

    alert(regexp.test(str));
}


// 追加の外部の括弧があるため、\2の代わりに\1を用いる
// 数字を間違えることを避けるために、括弧に名前をつけることもできる
{
    let regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/;

    let str = "An input string that takes a long time or even makes this regex to hang!";

    alert(regexp.test(str)); // false

    alert(regexp.test("A correct string")); // true
}


// まとめ
// catastrophic baxktracking（破壊的なバックトラック）を防ぐ手法2つ
// ・できるだけ組み合わせの数をへらすよう正規表現を書き直す
// ・バックトラックを防止する