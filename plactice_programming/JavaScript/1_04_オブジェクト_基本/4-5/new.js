"use strict";

// コンストラクタ関数
// 技術的には通常の関数
// 例：
function User(name) {
    this.name = name;
    this.isAdmin = false;
}

let user = new User("齊藤");

alert(user.name);
alert(user.isAdmin);

// 実質下記のようにコンストラクタ関数は定義されている
function User(name) {
    // this = {}; <- 暗黙

    // thisへのプロパティを追加
    this.name = name;
    this.isAdmin = false;

    // return this;
}
/* したがってlet user = new User("齊藤")は以下と同じ結果になる
let user = {
    name: "齊藤",
    isAdmin = false,
};
*/

// 再利用可能なオブジェクト生成のコードを実装することがコンストラクタの主な目的


// new.target
// コンストラクタモードで実行されたかを確認できる
// ただし、めったに使われることはない
function User() {
    alert(new.target);
};

// newなし
User(); // undefined
// newあり
new User(); // function User {...}

// 構文をより柔軟にするため使われる場合がある
function User(name) {
    if (!new.target) {
        return new User(name);
    }

    this.name = name;
}

let john = User("John");
alert(john.name);

function BigUser() {
    this.name = "John";

    return { name: "Godzilla" };
}

alert(new BigUser().name); // Godzilla

function SmallUser() {
    this.name = "John";

    return; // <-- returns this
}

alert(new SmallUser().name); // John

function User(name) {
    this.name = name;

    this.sayHi = function () {
        alert(`My name is: ${this.name}`);
    }
}

let jack = new User("Jack");

jack.sayHi()