"use strict";

// 存在しないプロパティを参照してしまう問題
let user = {};
// addressはundefinedだが、user.address.streetを参照するとエラーになる
alert(user.address.street);

// Webページの要素がない場合にはnullが返され、その先へのアクセスはエラーになる
// querySelectot(...) の結果がnullならエラー
let html = document.querySelector(".my-element").innerHTML;

// ifや?を使うことでこのエラーを回避することができる
user = {};

alert(user.address ? user.address.street : undefined);

// ただし、上記の方法では深くネストされたプロパティでより多くの繰り返しが必要になる
user = {};

alert(user.address ? user.address.street ? user.address.street.name : null : null);

// &&演算子を使うことでよりよい書き方にはできる
user = {};

alert(user.address && user.address.street && user.address.street.name);

// オプショナルチェイニング
// ?.を使用してuser.address.streetに安全にアクセスする方法は次の通り
user = {};

alert(user?.address?.street); // undefined（エラーは起きない）

// たとえばuserオブジェクトが存在しなくともuser?.addressのaddress読み取りは動作する
user = null;

alert(user?.address); // undefined
alert(user?.address.street); // undefined

// ただし、オプショナルチェイニングはエラーを暗黙につぶしてしまう可能性がある点に留意する
// また、オプショナルチェイニングは定義済みの変数に対してのみ働く

// ?.は短絡評価であるため、?.の左側が存在しない場合は即座に評価を停止する
user = null;
let x = 0;

user?.sayHi(x++); // 何も起きない
alert(x); // xはインクリメントされていない

// オプショナルチェイニング関数や括弧と一緒でも機能する
let userAdmin = {
    admin() {
        alert("I am admin");
    }
};

let userGuest = {};
userAdmin?.admin(); // I am Admin
userGuest?.admin(); // なにもしない

// ()ではなく[]に対してもオプショナルチェイニングを使うことができる
let key = "firstName";

let user1 = {
    firstName: "John",
}

let user2 = null;

alert(user1?.[key]); // John
alert(user2?.[key]); // undefined

// deleteと一緒に使用することもできる
delete user?.name; // userが存在する場合 user.nameを削除する