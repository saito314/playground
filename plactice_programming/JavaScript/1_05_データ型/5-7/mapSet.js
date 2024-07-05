"use strict";

// mapとset
// Map: Objectと同じようにキー付けされたデータ項目の集まり
// 任意の型のキーを許可する
// 例:
let map = new Map();

map.set("1", "str1");
map.set(1, "num1");
map.set(true, "bool1");

// 通常のオブジェクトではキーを文字列に変換していたが、Mapは型を維持する
alert(map.get(1));
alert(map.get("1"));
alert(map.size); // 3

// map[key]のような書き方も受け付けるが、setやgetを使用することが推奨
// Objectをキーとして使用することができる
let john = {name: "John"};
let ben = {name: "Ben"};

let visitsCountObj = {};

visitsCountObj[ben] = 234;
visitsCountObj[john] = 123;

alert(visitsCountObj["[Object Object]"]); // 123
// ObjectでObjectをキーとして扱うと強制的に文字列に変換されてしまう

// Mapのチェーン
// map.setはmap自身を返すので繰り返し呼び出しすることができる

// Mapでの繰り返し / ループ
// map.keys(): キーに対するiterableを返す
// map.values(): 値に対するiterableを返す
// map.entries(): エントリ[key, value]のiterableを返す これはfor...ofでデフォルトで使用される
let recipeMap = new Map([
    ["cucumber", 500],
    ["tomatoes", 350],
    ["onion", 50]
]);

// キーの反復
for (let vegetable of recipeMap.keys()) {
    alert(vetgetable);
}

for (let amount of recipeMap.values()) {
    alert(amount);
}

for (let entry of recipeMap) { // recipeMap.entries()と同じ
    alert(entry);
}

// MapはArrayと同じように組み込みのforEachメソッドを持っている
recipeMap.forEach((value, key, map) => {
    alert(`${key}: ${value}`);
});

// Object.entries: オブジェクトからMapを生成
// [key, value]のペアの配列
map = new Map([
    ["1", "str1"],
    [1, "num1"],
    [true, "bool1"]
]);

alert(map.get("1")); // str1

// 通常のオブジェクトからMapを作りたいときにはObject.entries(obj)を使用する
let obj = {
    name: "John",
    age: 30,
};

map = new Map(Object.entries(obj));

alert(map.get("name")); // John

// Object.fromEntries: MapからObject
// [key, value]のペアの配列からObjectを作成する
let prices = Object.fromEntries([
    ["banana", 1],
    ["orange", 2],
    ["meat", 4]
]);

alert(prices.orange); // 2

// Mapにデータを保持しているが、サードパーティはオブジェクトの入力を期待している場合
map = new Map();
map.set("banana", 1);
map.set("orange", 2);
map.set("meat", 4);

obj = Object.fromEntries(map.entries());
// または obj = Object.fromEntries(map);

alert(obj.orange); // 2

// Set: 特別なタイプのコレクションで、値の集合 かつ 重複しない
// 訪問者を数えたいときなどに役に立つ
let set = new Set();

john = {name: "John"};
let pete = {name: "Pete"};
let mary = {name: "Mary"};

// 何度も訪問してくるユーザがいる
set.add(john);
set.add(pete);
set.add(mary);
set.add(john);
set.add(mary);

// setはユニークな値のみをキープする
alert(set.size); // 3

for (let user of set) {
    alert(user.name);
}

// Setの代替としてはユーザの配列とarr.findを使った挿入時の重複チェックがある
// ただし、配列全体を毎回見るのでパフォーマンスが悪い

// Setの繰り返し
set = new Set(["oranges", "apples", "bananas"]);

for (let value of set) alert(value);

// forEachと同じ
set.forEach((value, valueAgain, set) => {
    alert(value);
});