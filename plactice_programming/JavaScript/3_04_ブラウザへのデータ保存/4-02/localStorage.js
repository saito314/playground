"use strict";

// localstorageのデモ
// 主な特徴は
// ・同じオリジンからのすべてのタブとウィンドウ間で共有される
// ・データは期限切れにならない
{
    localStorage.setItem("test", 1);
}

// その後ブラウザを閉じる/開く、あるいは別のウィンドウで同じページを開いた後、次のようにしてその値を取得できる
{
    alert(localStorage.getItem("test"));
}