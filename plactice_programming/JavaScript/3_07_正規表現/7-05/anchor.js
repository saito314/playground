"use strict";


// アンカーの複数行モード、フラグ
// 行の開始の検索
{
    let str = `1st place: Winnie
    2nd plave: Piglet
    3rd place: Eeyore`;

    alert(str.match(/^\d+/gm))
}
// mフラグがない場合は、最初の数値だけがマッチする
{
    let str = `1st place: Winnie
        2nd place: Piglet
        3rd place: Eeyore`;

    alert(str.match(/^\d+/g));
}

// 行の終わり$の検索
{
    let str = `Winnie: 1
        Piglet: 2
        Eeyore: 3`;

    alert(str.match(/\d$/gm));
}
// ^$の代わりに\nを検索する
{
    let str = `Winnie: 1
        Piglet: 2
        Eeyore: 3`;

    alert(str.match(/\d\n/gm));
}