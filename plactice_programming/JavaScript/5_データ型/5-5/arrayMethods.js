"use strict";

// 前回習った配列のメソッド
// push: 末尾に追加
// pop: 末尾を取り出し
// shift: 先頭に追加
// unshift: 先頭から取り出し
// shift/unshiftはインデックスの書き換えが発生するので遅い

// splice
let arr = ["I", "go", "home"];
delete arr[1];
alert(arr[1]); // undefined
alert(arr.length); // 3

// 配列の要素をdeleteで消すことはできるが、値を削除できても配列の要素に変更はない
// 要素を詰めたい場合にはspliceを使用する
arr = ["I", "study", "JavaScript"];

arr.splice(1, 1); // インデックス1から1要素を削除
alert(arr); // ["I", "JavaScript"]

arr = ["I", "study", "JavaScript", "right", "now"];

// 最初の3要素を削除し、別のものに置換する
arr.splice(0, 3, "Let's", "dance");

alert(arr); // 今は["Let's", "dance", "right", "now"]

// spliceは削除された値を返す
arr = ["I", "study", "JavaScript", "right", "now"];

let removed = arr.splice(0, 2);

alert(removed); // "I", "study" <-- 削除された要素の配列

// spliceは削除せずに挿入のみを行うこともできる
arr = ["I", "study", "JavaScript"];

// インデックス2から0削除、その後に"complex"と"language"を挿入
arr.splice(2, 0, "complex", "language");

alert(arr); // "I", "study", "complex", "language", "JavaScript"

// slice
// "start"から"end"のすべてのアイテムをコピーした新しい配列を返す。
arr = ["t", "e", "s", "t"];

alert(arr.slice(1, 3)); // e, s

alert(arr.slice(-2)); // s, t

// concat
// 配列を他の配列またはアイテムと結合する
arr = [1, 2];

// arrと[3, 4]をマージ
alert(arr.concat([3, 4]));

// arrと[3, 4]と[5, 6]をマージ
alert(arr.concat([3, 4], [5, 6]));

// arrと[3, 4]をマージ後に5と6を追加
alert(arr.concat([3, 4], 5, 6));

// 通常は配列から要素をコピーするだけ
// オブジェクトでは配列のように見えたとしても、全体として追加する
arr = [1, 2];

let arrayLike = {
    0: "something",
    length: 1,
};

alert(arr.concat(arrayLike)); // 1,2,[Object Object]

// Symbol.isConcatSpreadableをもつオブジェクトはconcatは配列として扱う
arr = [1, 2];

arrayLike = {
    0: "something",
    1: "else",
    [Symbol.isConcatSpreadable]: true,
    length: 2,
};

alert(arr.concat(arrayLike)); // 1,2,something,else

// イテレート/反復: forEach
["Blibo", "Gandalf", "Mazgul"].forEach(alert);

// 下記の関数の結果は捨てられる
["Blibo", "Gandalf", "Mazgul"].forEach((item, index, array) =>{
    alert(`${item} is at index ${index} in ${array}`)
});

// 配列での検索
// arr.indexOf(item, from): fromからitemを探し、見つかった場所のインデックスを返す
// arr.lastIndexOf(item, from): IndexOfと同じ動作だが、右から左に見ていく
// arr.includes(item, from): fromからitemを探し、見つかった場合trueを返す
arr = [1, 0, false];

alert(arr.indexOf(0)); // 1
alert(arr.indexOf(false)); // 2
alert(arr.indexOf(null)); // -1
alert(arr.includes(1)); // true

// ===を使うことに留意する
// インデックスが不要な場合にはincludesを推奨: NaNを判定できるため
arr = [NaN];
alert(arr.indexOf(NaN)); // -1
alert(arr.includes(NaN)); // true

// findとfindINdex
let users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"},
];

let user = users.find(item => item.id == 1);
alert(user.name);

// filter
users = [
    {id: 1, name: "John"},
    {id: 2, name: "Pete"},
    {id: 3, name: "Mary"},
];

let someUsers = users.filter(item => item.id < 3);
alert(someUsers.length); // 2