"use strict";

// オブジェクトに関数を持たせる(関数式)
let user = {
    name: "John",
    age: 30,
};

user.sayHi = function() {
    alert("Hello!");
};

user.sayHi();

// 宣言済みの関数をオブジェクトのメソッドとして使うこともできる
function sayGoodBye() {
    alert("goodBye!");
};

user.sayGoodBye = sayGoodBye;

user.sayGoodBye();

// メソッドの短縮表現
user = null;
user = {
    sayHi: function() {
        alert("Hello!");
    }
};

// 上記と同じ動作をする短縮表現
user = null;
user = {
    sayHi() {
        alert("Hello!");
    }
};
// 厳密にいうと完全に同じ動作ではない

// オブジェクトのメソッドでプロパティにアクセスする -> thisキーワード
user = null;
user = {
    name: "John",
    age: 30,

    sayHi() {
        alert(this.name);
    }
};

user.sayHi();

// 外部変数を介して参照も可能だが、エラーにつながるため非推奨
user = {
    name: "John",
    age: 30,

    sayHi() {
        alert(user.name);
    }
};

let admin = user;
user = null;

admin.sayHi(); // エラー!

// JavaScriptはthisキーワードを任意の関数内で使用することができる
user = { name: "John" };
admin = { name: "Admin" };

function sayHi() {
    alert(this.name);
}

// 2つのおオブジェクトで同じ関数を使う
user.f = sayHi();
admin.f = sayHi();

user.f() // John(this == user)
admin.f() // Admin(this == admin)

admin["f"](); // Admin(ピリオドでも角括弧でも問題なくアクセスできる)

// アロー関数はthisを持たない
// アロー関数でthisを使用すると外部の通常関数から取得する
user = {
    firstname: "Ilya",
    sayHi() {
        let arrow = () => alert(this.firstname);
        arrow();
    }
};

user.sayHi();