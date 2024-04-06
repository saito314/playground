"use strict";

// シンボルはユニークな識別子を使用する
let id = Symbol();

// シンボルに説明を与えることができる
id = Symbol("id");

// 同じシンボル名を与えていても、同じオブジェクトではない
let id1 = Symbol("id");
let id2 = Symbol("id");

alert(id1 == id2); // false

// オブジェクトに対してSymbolでアクセスすることができる
let user = {
    name: "John",
};

id = Symbol("id");

user[id] = 1;

alert(user[id]);

// 同じプロパティ名でもシンボルは異なるため衝突は起こらない
id = Symbol("id");

user[id] = "Their id value";

let user = {name: "John"};

user.id = "ID Value";
// シンボルを使わないと後で上書きされる可能性がある
user.id = "Their id value";

// オブジェクトリテラルの中でシンボルを使いたい場合は角括弧で囲む必要がある
user = {
    name: "John",
    [id]: 123, // 単にid: 123ではない
};

// シンボルはfor...inではスキップされる
user = {
    name: "John",
    age: 30,
    [id]: 123,
};

for (let key in user) alert(key);
// シンボルによる直アクセスは動作する
alert("Direct: " + user[id]);

// Object.assignは文字列とシンボルプロパティ両方をコピーする
let clone = Object.assign({}, user);

alert(clone[id]);

// グローバルシンボルを作成するにはグローバルレジストリにアクセスする必要がある
id = Symbol.for("id");

// 再度読み込み
let idAgain = Symbol.for("id");

// 同じシンボル
alert(id === idAgain);

// Symbol.keyFor
// 名前からシンボルを取得
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// symbolから名前を取得
alert(Symbol.keyFor(sym)); // name
alert(Symbol.keyFor(sym2)); // id

// Symbol.keyForは非グローバルのシンボルの場合は見つけられずにundefinedを返す
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert(Symbol.keyFor(globalSymbol)); // name
alert(Symbol.keyFor(localSymbol)); // undefined

alert(localSymbol.description); // name