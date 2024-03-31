"use strict";

// オブジェクトに割り当てられた変数はオブジェクト自体ではなく
// オブジェクトへの参照（メモリ上のアドレス）を格納する
let message = "Hello";
let phrase = message;
// これは"Hello"という値を格納する2つの変数がある

let user = {
    name: "John",
};

let admin = user;

admin.name = "Pete";

alert(user.name); // userの参照している値も変更される

let a = {};
let b = a;

// 同じオブジェクトを参照しているためtrueになる
alert(a == b); // true
alert(a === b); // true

a = {};
b = {};

// aとbは独立したオブジェクトのためfalseになる
// ただし正しい比較の方法とは言えない
alert(a == b);

// クローンとマージ
user = {
    name: "John",
    age: 30,
}

let clone = {};

for (let key in user) {
    clone[key] = user[key];
};

clone.name = "Pete";

alert(user.name); // cloneは独立したオブジェクトなのでuserに変更は加わらない

user = { name: "John" };

let permissions1 = { canView: true };
let permissions2 = { canEdit: true };
// userにオブジェクトをコピーする
Object.assign(user, permissions1, permissions2);

alert(user)

// 同じプロパティの場合
user = { name: "John" };

Object.assign(user, {name: "Pete"});

alert(user.name);

// 単純にクローンを生成するためにもObject.assignは使用できる
user = {
    name: "John",
    age: 30,
}

clone = Object.assign({}, user);

// ネストされたクローン
user = {
    name: "John",
    sizes: {
        height: 182,
        width: 50,
    }
};

clone = Object.assign({}, user);

alert(user.sizes === clone.sizes); // 同じオブジェクト

user.sizes.width++;
alert(clone.sizes.width); // sizesは共有されているのでcloneも+1されている

// ディープコピーしたい場合は再帰を使う
// またはJavaScriptライブラリlodashにある_.cloneDeep(obj)を利用する