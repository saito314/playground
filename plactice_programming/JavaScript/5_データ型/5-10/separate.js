"use strict";

// JavaScriptで最も使われる2つのデータ構造はObjectとArray
// これらを関数に渡すとき、オブジェクト/配列全体を必要としない場合がある
// 分割代入は配列またはオブジェクトの中身を複数の変数にアンパックできるようにする特別な構文

// Arrayの非構造化
// 姓・名の配列がある
let arr = ["John", "Smith"];

// 分割代入
// sets firstName = arr[0];
// and surname = arr[1];
let [firstName, surname] = arr;

alert(firstName);
alert(surname);

// これにより、配列要素ではなく変数を扱うことができる
// splitと組み合わせると便利
[firstName, surname] = "John Smith".split(" ");
alert(firstName);
alert(surname);

// "分割"は"破壊的"を意味しない => 配列自体に変更を加える処理ではない
firstName = arr[0];
surname = arr[1];

// 最初の要素を無視する
// 1番目、2番目の要素が不要の場合
let [, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(title); // Cousul

// 分割代入の右辺は任意の反復可能に対して動作する
let [a, b, c] = "abc"; // ["a", "b", "c"]
let [one, two, three] = new Set([1, 2, 3]);

// 分割代入の左辺では任意のものに代入可能
let user = {};
[user.name, user.surname] = "John Smith".split(" ");

alert(user.name); // John
alert(user.surname); // Smith

// .entries()を使ったループ
// オブジェクトのkey-valueループをするのに、分割代入を一緒に使うことも可能
user = {
    name: "John",
    age: 30
};

// key-valueのループ
for (let [key, value] of Object.entries(user)) {
    alert(`${key}: ${value}`); // name: John, age: 30
};
// Mapを使った同様のコードの方がシンプル
user = new Map();
user.set("name", "John");
user.set("age", "30");

// Mapは[key, value]のペアで反復する
for (let [key, value] of user) {
    alert(`${key}: ${value}`);
}

// 変数を入れ替えるトリック
let guest = "Jane";
let admin = "Pete";

// 値を入れ替える
[guest, admin] = [admin, guest];

alert(`${guest} ${admin}`);

// 残り"..."
// 通常代入する変数の数より配列の要素数の方が多い場合、余分な項目は省略される
let [name1, name2] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

alert(name1); // Julius
alert(name2); // Caesar
// その以降の項目はどこにも代入されていない

let [name3, name4, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// restは3つ目の項目からの配列
alert(rest[0]); // "Consul"
alert(rest[1]); // "of the Roman Republic"
alert(rest.length); // 2

// 変数名はrestでなくてもok
let [name5, name6, ...title1] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];

// デフォルト値
// 右辺の配列の要素数が代入する変数の数よりも少ない場合はエラーにはならず、undefinedになる
let [firstName1, surname1] = [];

alert(firstName1); // undefined
alert(surname1); // undefined

// 値がなかった場合に"デフォルト"値を使いたければ=を使ってデフォルト値を設定できる
let [name = "Guest", sur = "Anonymous"] = ["Julius"];

alert(name); // Julius（配列から）
alert(sur); // Anonymous（デフォルト値から）

// デフォルト値はより複雑な式や関数呼び出しにすることもできる
// 姓のプロンプトのみが実行される
let [name7 = prompt("name?"), sur1 = prompt("surname?")] = ["Julius"];

alert(name7);
alert(sur1);

// オブジェクトの非構造化
// 分割代入はオブジェクトでも動作する
// let {var1, var2} = {var1:…, var2:…};
// 右辺には変数を分割したい既存のオブジェクトがある
let options = {
    t: "Menu",
    w: 100,
    h: 200
}

let {t, w, h} = options;

alert(t); // Menu
alert(w); // 100
alert(h); // 200

// 順序は関係ないため下記でも実行可
// let {h, w, t} = options;

// プロパティを別の名前の変数に代入したい場合はコロンを使用してセットする
// {元のプロパティ: 代入したい変数名}
let {w: wi, h: he, t: ti} = options;

alert(ti);
alert(wi);
alert(he);

// 値がない可能性のあるプロパティに対しては=を使用してデフォルト値を設定できる
options = {
    tit: "Menu",
}

let {wid = 100, hei = 200, tit} = options;

alert(tit);
alert(wid);
alert(hei);

// デフォルト値を任意の関数呼び出しにすることも可能
options = {
    titl: "Menu",
}

let {widt = prompt("width?"), titl = prompt("title?")} = options;

alert(titl); // Menu
alert(widt); // promptの結果

// コロンと等号の両方を組み合わせることもできる
options = {
    title2: "Menu",
};

let {width: width1 = 100, height: height1 = 200, title2} = options;

alert(title2);
alert(width1);
alert(height1);

// 多くのプロパティをもつ複雑なオブジェクトがあったとしても、必要なものだけを抽出できる
options = {
    title3: "Menu",
    width: 100,
    height: 200,
};

// title3だけ変数として抽出
let {title3} = options;

alert(title3);

// 残りのパターン"..."
options = {
    title4: "Menu",
    width: 100,
    height: 200
};

// title4 = title4と名づけられたプロパティ
// range = オブジェクトのプロパティの残り
let {title4, ...range} = options;

alert(range.width);
alert(range.height);

// Gotcha, without
// letなしで既存の変数に分割代入することもできるが、下記は動作しないことに注意
/*
    let title, width, height;

    // この行はエラー
    {title, width, height} = {title: "Menu", width: 200, height: 100};

問題となるのはJavaScriptが{}をコードブロックとして扱ってしまうこと
例えば下記のようにコードをくくる役割をもつ
    {
        // a code block
        let message = "Hello";
        // ...
        alert(message);
    }

コードブロックではないとJavaScriptに示すには代入全体を括弧で囲む必要がある
    let title, width, height;

    // これでOK
    ({title, width, height} = {title: "Menu", width: 200, height: 100});

    alert(title); // Menu

*/

// スマートな関数パラメータ
// デフォルト値が使われた良くない関数の書き方
function showMenu(title = "Untitled", width = 200, height = 100, items = []) {
    // ...
}

// これらのほとんどがデフォルトでOKな場合の関数の呼び方は？
showMenu("My menu", undefined, undefined, ["Item1", "Item2"]);
// 多くのパラメータを持つ場合可読性を下げてしまう

// オブジェクトとしてパラメータを渡し、関数がそれらを変数に分解する
// オブジェクトを関数に渡す
options = {
    title: "My menu",
    items: ["Item1", "Item2"],
};

// 変数に展開する
function showMenu({title = "Untitled", width = 200, height = 100, items = []}) {
    // title, items - optionsから取得
    // width, height - デフォルト値から利用
    alert(`${title} ${width} ${height}`);
    alert(items);
}

showMenu(options);

// 入れ子のオブジェクトやコロンのマッピングを使った複雑な非構造化を使うこともできる
function showMenu({
    title = "Untitled",
    width: w = 100,
    height: h = 200,
    items: [item1, item2]
}) {
    alert(`${title} ${w} ${h}`);
    alert(item1);
    alert(item2);
}

showMenu(options);

// もしすべての値をデフォルトにしたい場合は空のオブジェクトを指定する必要がある
showMenu({});

showMenu(); // これはエラー

// 上記の場合については非構造化対象全体のデフォルト値を設定することで対応できる
function showMenu({title = "Menu", width = 100, height = 200} = {}) {
    alert(`${title} ${width} ${height}`);
};

showMenu();