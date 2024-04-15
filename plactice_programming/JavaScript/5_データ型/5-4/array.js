"use strict";

// 配列
// 順序付けされたコレクションを格納するための特別なデータ構造
let arr = new Array();
// または
arr = [];
// ほぼ全てで2つ目の構文が使われる

// 最初に値を指定して初期化することも可能
let fruits = ["Apple", "Orange", "Plum"];

// 角括弧にその番号を指定することで該当する要素を取得することができる
alert(fruits[0]);
alert(fruits[1]);
alert(fruits[2]);

// 要素の置き換えも可能
fruits[2] = "Pear";

// 配列に新しい値を追加することもできる
fruits[3] = "Lemon";

// 配列の要素の総数はlengthで取得可能
alert(fruits.length); // 4

// alertを使用して全ての配列を表示することもできる
alert(fruits);

// 配列がどんな型の要素も格納することができる
// 値の混在
arr = ["Apple", {name: "John"}, true, function() {alert("Hello");}];
// インデックス1のオブジェクトを取得し名前を表示
alert(arr[1].name);
// インデックス3の関数を取得し実行
arr[3]();

// pop/push shift/unshiftメソッド
// pop: 配列の最後の要素を抽出して返す
fruits = ["Apple", "Orange", "Pear"];

alert(fruits.pop()); // "Pear"

alert(fruits); // Apple, Orange

// push: 配列の末尾に要素を追加する
fruits.push("Pear");

alert(fruits); // Apple, Orange, Pear

// shift: 配列の先頭の要素を抽出して返す
alert(fruits.shift()); // Apple

alert(fruits); // Orange, Pear

// unshift: 配列の先頭に要素を追加する
fruits = ["Apple"];

fruits.push("Orange", "Peach");
fruits.unshift("Pineapple", "Lemon");

alert(fruits); // "Pineapple", "Lemon", "Apple", "Orange", "Peach"

// 内部詳細
fruits = ["Banana"];

arr = fruits; // 参照によるコピー

alert(arr === fruits); // true

arr.push("Pear"); // 参照から配列を変更する

alert(fruits); // Banana, Pearの2つになっている

// 順序付けられたコレクションとしての配列をやめて普通のオブジェクトのように扱い始めると壊れる
fruits = [];

fruits[99999] = 5; // そのlengthよりも非常に大きなインデックスでプロパティを割り当てる

fruits.age = 25; // 任意の名前でプロパティを作成する

// 上記の使い方をすると配列固有の最適化は失われる
// インデックスの振り直しがあるのでshiftとunshiftは動作が遅い

// ループ
arr = ["Apple", "Orange", "Pear"];

for (let i = 0; i < arr.length; i++) {
    alert(arr[i]);
};

// 配列のためにfor...ofがある
for (let fruit of fruits) {
    alert(fruit);
};

// 配列はオブジェクトなのでfor...inを使うこともできる
for (let key in fruits) {
    alert(fruits[key]);
};

// 配列に対してfor...inを使うべきでない理由
// 1. 配列に隠されているプロパティまで列挙してしまうから
// 2. 汎用オブジェクトに対して最適化されているためfor...ofより遅い

// lengthについて
// これは配列の最後のインデックスに+1した数値である
// 例えば大きなインデックスの1つの要素は大きなlengthを返す
fruits = [];
fruits[123] = "Apple";

alert(fruits.length); // 124
// ただし、このような配列は通常使われない

// lengthは書き込み可能で、減らした場合は配列は切り捨てられる
// これは不可逆の操作になる
arr = [1, 2, 3, 4, 5];

arr.length = 2; // 2つの要素を切り捨てる
alert(arr);

arr.length = 5; // 元に戻す
alert(arr[3]); // undefined

// new Array()
// 与えられた長さを持った配列を作ることができる
arr = new Array(2);
alert(arr[0]); // undefined
alert(arr.length); // 2

// 多次元配列
// 配列は配列を持つこともできる
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
];

alert(matrix[1][1]); // 中央の要素

// toString
// 配列は要素のカンマ区切りのリストを返す独自のtoStringメソッドが実装されている
arr = [1, 2, 3];

alert(arr); // 1,2,3
alert(String(arr) === "1,2,3");

alert([] + 1); // "1"
alert([1] + 1); // "11"
alert([1,2] + 1); // "1,21"

// 配列は==で比較してはいけない
alert([] == []); // false
alert([0] == [0]); // false

// プリミティブとの比較は奇妙な結果になる
alert(0 == []); // true
alert("0" == []); // false
// []は空文字列に変換されるため0と比較された場合には0に"0"と比較された場合には""となるため

