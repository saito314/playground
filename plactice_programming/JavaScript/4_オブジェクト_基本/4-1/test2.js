"use strict";

let schedule = {};

alert(isEmpty(schedule)); // true

schedule["8:30"] = "get up";

alert(isEmpty(schedule)); // false

// オブジェクトがプロパティを持っていない場合にtrue
// それ以外の場合にはfalseを返す関数isEmpty

function isEmpty(obj) {
    let objIsEmpty = true

    for (let key in obj) {
        if (key in obj) objIsEmpty = false;
    }

    return objIsEmpty;
}

// 上記は無駄が多すぎるためfor文でreturnする
// 書き直し
/*
function isEmpty(obj) {
    for (let key in obj) {
        return false;
    }
    return true;
}
*/