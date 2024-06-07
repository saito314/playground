"use strict";

// 残りのパラメータ"..."
// 関数の定義を確認
function sum(a, b) {
    return a + b;
};

alert(sum(1, 2, 3, 4, 5));

// 必要以上の引数を与えてもエラーにはならない
// ただし、使われない
// 任意の数のパラメータを受け取りたい場合は...を使う
function sumAll(...args) {
    let sum = 0;

    for (let arg of args) sum += arg;

    return sum;
}

alert(sumAll(1));
alert(sumAll(1, 2));
alert(sumAll(1, 2, 3));

// 最初のパラメータを変数として取得するようにし、残りだけを集めることもできる
function showName(firstName, lastName, ...titles) {
    alert(firstName + " " + lastName); // julius Caesar

    // 残りはtitles配列に入ります
    // i.e. titles = ["Consul", "Imperator"]
    alert(titles[0]);
    alert(titles[1]);
    alert(titles.length); // 2
}

showName("Julius", "Caesar", "Consul", "Imperator");
// 残りのパラメータ...は仮引数の最後である必要がある

// "arguments"変数
// インデックスによってすべての引数を含むargumentsという特別な配列ライクなオブジェクトもある
function showName() {
    alert(arguments.length);
    alert(arguments[0]);
    alert(arguments[1]);

    // 反復可能
    // for (let arg of arguments) alert(arg);
}

// 表示: 2, Julius, Ceasar
showName("Julius", "Ceasar");

// 表示: 1, Ilya, undefined
showName("Ilya")

// アロー関数は"arguments"を持たない


// スプレッド演算子
// リストから最大値を返す組み込み関数Math.max
alert(Math.max(3, 5, 1));

// これらの数値を配列で渡そうとするとうまく動作しない
let arr = [3, 5, 1];

alert(Math.max(arr));

// そこで関数呼び出しの実引数で...を使用すると引数のリストに展開できる
alert(Math.max(...arr));

// また、この方法で複数のiterablesを渡すこともできる
let arr1 = [1, -2, 3, 4];
let arr2 = [8, 3, -8, 1];

alert(Math.max(...arr1, ...arr2));

// 通常の値とスプレッド演算子を組み合わせることもできる
alert(Math.max(1, ...arr1, 2, arr2, 25));

// さらにスプレッド演算子は配列にマージするためにも使える
arr = [3, 5, 1];
arr2 = [8, 9, 15];

let merged = [0, ...arr, 2, ...arr2];
alert(merged);

// スプレッド演算子は内部的に入れテータを使用して要素を集める
let str = "Hello";

// Array.fromはiterableを配列に変換する
akert(Array.from(str));
// Array.from(obj)と[...obj]には微妙な違いがある
// Array.fromは配列ライクとiterablesの両方で動作する
// スプレッド演算子はiterablesでのみ動作する

// 配列/オブジェクトのコピー
arr = [1, 2, 3];

let arrCopy = [...arr]; // 配列をパラメータのリストに展開する
// その後、結果を新しい配列に格納する

// 配列が同じコンテンツをもっているか？
alert(JSON.stringify(arr) === JSON.stringify(arrCopy)); // true

// 配列は等価か？
alert(arr === arrCopy); // false

// 最初の配列を修正しても、コピーは修正されない
arr.push(r);
alert(arr); // 1, 2, 3, 4
alert(arrCopy); // 1, 2, 3

let obj = {a: 1, b: 2, c: 3};

let objCopy = {...obj}; // オブジェクトをパラメータのリストに展開する
// その後、結果を新しいオブジェクトに結果を返す

// オブジェクトは同じコンテンツを持っているか？
alert(JSON.stringify(obj) === JSON.stringify(objCopy)); // true

// オブジェクトは等価か？
alert(obj === objCopy); // false

// 最初のオブジェクトを修正しても、コピーは修正されない
obj.d = 4;
alert(JSON.stringify(obj));
alert(JSON.stringify(objCopy));

