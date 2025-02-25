"use strict";


// キャレットとドル文字は正規表現で特別な意味を持っており、アンカーと呼ばれる
{
    let str1 = "Mary had a little lamb, it's fleece was white as snow";
    let str2 = 'Everywhere Mary went, the lamp was sure to go';

    alert(/^Mary/.test(str1)); // true
    alert(/^Mary/.test(str2)); // false
}

// メールアドレスにマッチするには正規表現[-.\w]+@([\w-]+\.)+[\w-]{2,20}を使用する
{
    let reg = /[-.\w]+@([\w-]+\.)+[\w-]{2,20}$/g;

    let str1 = 'My email is mail@site.com';
    let str2 = 'Everywhere Mary went, the lamp was sure to go';

    alert(reg.test(str1)); // true
    alert(reg.test(str2)); // false
}


// 文字列全体が正確にマッチするかをチェックするには^...$を使用する
{
    let str = "#abcdef";

    alert(/^#[0-9a-f]{6}$/i.test(str)); // true
}