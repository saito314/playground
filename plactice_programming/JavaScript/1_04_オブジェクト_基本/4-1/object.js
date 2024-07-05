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

// プロパティ名の制限
let obj = {
    for: 1,
    let: 2,
    return: 3,
};
// プロパティ名を予約語にしてもエラーはでない。
// 多分使うことはない
alert(obj.for + obj.let + obj.return);

obj[0] = "test";
alert(obj[0]);
alert(obj["0"]); // 文字列でも同じプロパティにアクセスできる

// 特殊なプロパティ名
let a = {};
obj.__proto__ = 5; // 値を設定
alert(obj.__proto__); // 設定した値は無視される

// プロパティの存在チェック -> in演算子
let b = {};
alert(b.noSuchProperty === undefined) // true <- このようなプロパティはありません
// "key" in object
let c = {
    name: "John",
    age: 30,
}

alert("age" in c); // true
alert("blabla" in c); // false

// なぜundefinedとの比較ではなくてin演算子を使うのか
// undefinedの値を持つプロパティがある場合に意図していない動作になるから
let d = {test: undefined};

alert(d.test === undefined); // true <- testプロパティは存在しないのか？
alert("test" in d); // true <- 存在している

// for...inループ
// これを使用するとオブジェクトから値を取り出すことができる
let e = {
    name: "John",
    age: 30,
    isAdmin: true,
}

for (let key in e) {
    // keys
    alert(key);
    // values for the keys
    alert(d[key]);
}

// オブジェクトの順序付け
// 整数値のプロパティはソートされてしまう
let codes = {
    "49": "Germany",
    "41": "Switzerland",
    "44": "Great Britain",
    // ...
    "1": "USA",
};

for (let code in codes) {
    alert(code); // 1, 41, 44, 49
}
// このように勝手にソートされたくない場合には非整数プロパティに設定する
let newCodes = {
    "+49": "Germany",
    "+41": "Switzerland",
    "+44": "Great Britain",
    // ...
    "+1": "USA",
}

// これは想定通りに動いている
for (let code in newCodes) {
    alert(code) // 49, 41, 44, 1
}
