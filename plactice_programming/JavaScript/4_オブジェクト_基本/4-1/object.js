"use strict";

let user = new object(); // オブジェクトコンストラクタ構文
let visitor = {}; // オブジェクトリテラル構文

// リテラルとプロパティ
// プロパティを"key:value"のペア形式で{...}に置くことができる
let newUser = {
    name: "John",
    age: 30
};

// プロパティの参照
alert(newUser.name);
alert(newUser.age);

// プロパティの追加
user.isAdmin = true;

// プロパティの削除
delete user.age;

// 複数単語からなるプロパティ名も引用符で囲む必要があるが使用可能
let auther = {
    name: "John",
    age: 30,
    "likes birds": true, // 最後はカンマを付けても良い
};

// 最後にカンマをつけるとコピペで移動しやすい

// 複数単語からなるプロパティは角括弧で囲むとアクセス可能
// auther.likes birds = true <- これはエラーになります

// set
auther["likes birds"] = true;
// get
alert(auther["likes birds"]); // true
// delete
delete auther["likes birds"];

// 角括弧は任意の式の結果としてプロパティ名を取得できる
let key = "likes birds";

auther[key] = true;

// 算出プロパティ
let fruit = prompt("Which fruit to buy?", "apple");

let bag = {
    [fruit]: 5,
};

alert(bag.apple);

// 上記と同じような感じで書くと
fruit = prompt("Which fruit to buy?", "apple");
let cart = {};

cart[fruit] = 5;

// 各括弧の中では複雑な式を利用可能
cart = {
    [fruit+"Computers"]:5
};

// プロパティの短縮構文
/*
function makeUser(name, age) {
    return {
        name: name,
        age: age,
    };
}
上記のようにプロパティと変数名が一致している場合は短縮記法ができる
*/

function makeUser(name, age) {
    return {
        name,
        age,
    };
}

// 同じオブジェクトで通常プロパティと短縮構文の両方を使うこともできる
/*
let user = {
    name, // name: nameと同じ
    age: 30,
};
*/

