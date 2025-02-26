"use strict";


// アンカーの複数行モード、フラグ
// 行の開始の検索
{
    let str = `1st place: Winnie
    2nd plave: Piglet
    3rd place: Eeyore`;

    alert(str.match(/^\d+/gm))
}