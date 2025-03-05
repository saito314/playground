"use strict";


// 単語境界
// 正規表現のエンジンが\bに出くわすと文字列内の位置が単語協会であるかを確認する
{
    alert("Hello, Java!".match(/\bJava\b/));
    alert("Hello, JavaScript!".match(/\bJava\b/));
}


// パターン \bJava\b もマッチするが、\bHell\b はマッチしない
{
    alert("Hello, Java!".match(/\bHello\b/)); // Hello
    alert("Hello, Java!".match(/\bJava\b/));  // Java
    alert("Hello, Java!".match(/\bHell\b/));  // null
    alert("Hello, Java!".match(/\bJava!\b/)); // null
}