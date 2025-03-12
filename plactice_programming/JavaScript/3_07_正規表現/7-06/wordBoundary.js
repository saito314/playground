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


// 単語だけでなく数字に対しても同様に\bを利用できる
// パターン\b\d\d\bは単独の2桁の数値を探す
{
    alert("1 23 456 78".match(/\b\d\d\b/g)); // 23,78
    alert("12,34,56".match(/\b\d\d\b/g)); // 12,34,56
}