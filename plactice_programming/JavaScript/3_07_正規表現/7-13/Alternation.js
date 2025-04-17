"use strict";

// 論理和指定子
// 正規表現では|で表現される
{
    let reg = /html|php|css|java(script)?/gi;

    let str = "First HTML appeared, then CSS, then JavaScript";

    alert(str.match(reg));
}


// 時間の正規表現
// 時間を正規表現で取得するときに\d\d:\d\dのような表現は、25:99なども許容してしまう
// 論理和指定子を用いて[01]\d | 2[0-3]:[0-5]\dのように表現できる
{
    let reg = /([01]\d|2[0-3]):[0-5]\d/g;

    alert("00:00 10:10 23:59 25:99 1:2".match(reg));
}