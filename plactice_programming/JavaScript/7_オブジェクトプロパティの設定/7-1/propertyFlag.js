"use strict";

// プロパティフラグとディスクリプタ

// プロパティフラグ
// writable: trueの場合は変更可能。それ以外は読み取り専用
// enumerable: trueの場合はループで列挙される。それ以外は列挙できない
// configurable: trueの場合はプロパティを削除したり属性の変更ができる
// 通常の方法でプロパティを作成する場合はこれらすべてがtrueの状態

// プロパティを確認できるObject.getOwnPropertyDescriptorを使ってみる
let user = {
    name: "Jhon",
};

let descriptor = Object.getOwnPropertyDescriptor(user, "name");

alert(JSON.stringify(descriptor, null, 2));
/* プロパティディスクリプタ:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/

// Object.definePropertyでフラグの変更ができる
user = {};

Object.defineProperty(user, "name", {
    value: "John"
});

descriptor = Object.getOwnPropertyDescriptor(user, "name");

alert(JSON.stringify(descriptor, null, 2));
/*
{
  "value": "John",
  "writable": false,
  "enumerable": false,
  "configurable": false
}
 */

// writableフラグを変更してuser.nameを書き込み不可能にする
user = {
    name: "John",
};

Object.defineProperty(user, "name", {
    writable: false,
});

user.name = "Pete"; // Error: Cannot assign to read only property "name"...

// スクラッチでプロパティを作成する
user = {};

Object.defineProperty(user, "name", {
    value: "John",
    // 新しいプロパティに対して、trueのものは明示的に列挙する必要がある
    enumerable: true,
    configurable: true,
})

alert(user.name); // Pete
user.name = "Alice"; // Error

// 列挙可能でない(Non-enumerable)
// オブジェクトがもつ組み込みのtuStringは列挙可能でない
// しかし独自にtoStringを追加した場合はfor...inに表示される
user = {
    name: "John",
    toString() {
        return this.name;
    }
};

// デフォルトでは両方のプロパティは列挙される
for (let key in user) alert(key); // name, toString

// 列挙されたくない場合はenumerableをfalseに設定する
user = {
    name: "John",
    toString() {
        return this.name;
    }
};

Object.defineProperty(user, "toString", {
    enumerable: false,
});

// これでtoStringは消えた
for (let key in user) alert(key); // name

// 列挙可能でないプロパティはObject.keysからも除外される
alert(Object.keys(user)); // name

// 変更できない(Non-configutable)
// 例えばMath.PIが書き込み負荷で列挙不可であり変更不可
descriptor = Object.getOwnPropertyDescriptor(Math, "PI");

alert(JSON.stringify(descriptor, null, 2));
/*
{
  "value": 3.141592653589793,
  "writable": false,
  "enumerable": false,
  "configurable": false
}
*/

// したがってプログラマはPIの値を書き換えることができない
Math.PI = 3; // Error

// Math.PIを再度writableにもできない
Object.defineProperty(Math, "PI", {writable: true}); // Error

// 注意:configuracleがfalseの場合はプロパティフラグの変更や削除を禁止するが値の変更は可能
user = {
    name: "John",
};

Object.defineProperty(user, "name", {
    configurable: false,
})

user.name = "Pete"; // 動作する
delete user.name; // Error

// Math.PIのように永遠に封印された定数にできる
user = {
    name: "John",
};

Object.defineProperty(user, "name", {
    writable: false,
    configurable: false,
});

// 以下は全て動作しない
user.name = "Pete";
delete user.name;
Object.defineProperty(user, "name", {value: "Pete"});


// Object.defineProperties
// 一度に多くのプロパティが定義できるメソッドがある
Object.defineProperties(user, {
    name: {value: "John", writable: false},
    surname: {value: "Smith", writable: false, configurable: false},
    // ...
});

// Object.getOwnPropertyDescriptors
// Object.definePropertiesと合わせて"フラグも加味した"オブジェクトのクローンを行える


// オブジェクト全体へのアクセスを制限するメソッドもある
let obj = {};

// オブジェクトにプロパティを追加するのを禁止する
Object.preventExtensions(obj);

// プロパティの追加・削除を禁止し、既存の全てのプロパティにconfigurable:falseをセットする
Object.seal(obj);

// プロパティの追加・削除・変更を禁止し、既存の全てのプロパティにconfigurable: falseをセットする
Object.freeze(obj);

// また、それらを確認する方法は下記の通り
// プロパティの追加が禁止されている場合にfalseを返す
Object.isExtensible(obj);

// プロパティの追加・削除が禁止されており、すべての既存のプロパティがconfigurable: falseを持っている場合にtrueを返す
Object.isSealed(obj);

// プロパティの追加・削除・変更が禁止されており、全ての現在のプロパティがconfigurable: false, writable: falseの場合にtrueを返す
Object.isFrozen(obj);

// これらのメソッドは実際にはめったに使われない