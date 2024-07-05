"use strict";

// アロー関数再び
// アロー関数は単に通常の関数宣言を簡略化するものではない
// アロー関数はthisを持たない
let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    
    showList() {
        this.students.forEach(
            student => alert(this.title + ":" + student)
        );
    }
};

groupList();

// forEachではアロー関数が使われているため、this.titleは外部メソッドshowListとまったく同じ
// 通常の関数を使う場合はエラーになる
group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],

    showList() {
        this.students.forEach(function(student) {
            // Error: Cannot read property "title" of undenfined
            alert(this.title + ":" + student)
        });
    }
};

group.showList();

// アロー関数は"arguments"を持たない
// 現在のthisとargumentsを使って呼び出しをフォワードする必要があるときなど
// デコレータとしてはとてもよい
function defer(f, ms) {
    return function() {
        setTimeout(() => f.apply(this, arguments), ms)
    };
}

function sayHi(who) {
    alert(`Hello, ` + who);
}

let sayHiDeferred = defer(sayHi, 2000);
sayHiDeferred("John"); // Hello, John 2秒後に

// アロー関数を使わない場合は…
function defer(f, ms) {
    return function(...args) {
        let ctx = this;
        setTimeout(function() {
            return f.apply(ctx, args);
        }, ms);
    };
}