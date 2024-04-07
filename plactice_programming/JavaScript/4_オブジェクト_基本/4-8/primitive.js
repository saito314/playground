"use strict";

// string
// 出力
alert(obj);

// プロパティキーとしてオブジェクトを使う
anotherObj[obj] = 123;

// number
// 明示的な変換
let num = Number(obj);

// 算術（二項演算子プラスを除く）
let n = +obj; // 単項演算子プラス
let delta = date1 - date2;

// 大なり乗なり比較
let greater = user1 > user2;

// default
// 二項演算子"default"ヒントを使用
let total = obj1 + obj2;

// obj == 数値は"default"ヒントを使用
if (user == 1) {};

// Symbol.toPrimitive
obj[Symbol.toPrimitive] = function(hint) {
    // プリミティブな値を返却
}

// Sumbol.toPrimitiveを実装したuserオブジェクト
let user = {
    name: "John",
    money: 1000,

    [Symbol.toPrimitive](hint) {
        alert(`hint: ${hint}`);
        return hint == "string" ? `name: "${this.name}"` : this.money;
    }
};

alert(user);
alert(+user);
alert(user + 500);

user = {name: "John"};

alert(user);
alert(user.valueOf() === user);

// Symbol.toPrimitiveの代わりにtoStringとvalueOfを使って上記と同じことをする
user = {
    name: "John",
    money: 1000,

    // hint="string"の場合
    toString() {
        return `{name: "${this.name}"}`;
    },

    // hint="number" or "default"の場合
    valueOf() {
        return this.money;
    }
};

alert(user);
alert(+user);
alert(user + 500);

user = {
    name: "John",

    toString() {
        return this.name;
    }
};

alert(user);
alert(user + 500);

// さらなる変換
let obj = {
    toString() {
        return "2";
    }
};

alert(obj * 2);

obj = {
    toString() {
        return "2";
    }
};

alert(obj + 2);