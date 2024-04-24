"use strict";

/**** オブジェクトの生成方法 ****/
// ・オブジェクトリテラルを使用する場合
let user = {
    name: "John",
    isAdmin: false,
};
// JavaScriptを書いたことがある人にはなじみ深く、理解しやすい
// パフォーマンスがよい

// ・匿名コンストラクタ関数を使用する場合
user = new function() {
    this.name = "John";
    this.isAdmin = false;
};

// コンストラクタ関数内で複雑な初期化ロジックや条件付きプロパティ設定などの
// より複雑な設定を行うことができる
// 一般的でないのでオブジェクトリテラルに比べて理解しにくい


/**** オブジェクトにメソッドを持たせる方法 ****/
// 1.オブジェクトリテラルでのメソッド定義
let person = {
    name: "John",
    greet: function() {
        alert("Hello, my name is " + this.name);
    }
};

person.greet();

// 2.ES6のメソッド定義シンタックス
person = {
    nema: "John",
    greet() {
        alert("Hello, my name is " + this.name);
    }
}

person.greet();

// 3.コンストラクタ関数を使用する
function Person(name) {
    this.name = name;
}

Person.prototype.greet = function() {
    alert("Hello, my name is " + this.name);
};

let person1 = new Person("John");
person1.greet();

// 4.クラス構文を使用する
class Person {
    constructor(name) {
        this.name = name;
    }

    greet() {
        alert("Hello, my name is " + this.name);
    }
}

person = new Person("John");
person.greet();

// 5.アロー関数をオブジェクトプロパティとして使う
person = {
    name: "John",
    greet: () => {
        // ただしthisはpersonではない
        alert("Hello, my name is " + this.name);
    }
}

