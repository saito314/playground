"use strict";

// 空のオブジェクト作成
let user = {};

// オブジェクトにプロパティを追加
user["name"] = "John";
user["surname"] = "Smith";

// nameプロパティを変更
user["name"] = "Pete";

// nameプロパティを削除
delete user["name"];