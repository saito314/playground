"use strict";

// Object.keys, values, entries
// obj.keysではなく、Object.keys(obj)と呼ばれることに注意
// 戻り値は配列
let user = {
    name: "John",
    age: 30
};

for (let value of Object.values(user)) {
    alert(value);
}

// オブジェクトの変換
// objectには配列に存在するメソッドがない（たとえば、filterやmapなど）
// object.entriesを使用して[key, value]の配列を受け取ることで使用できる
let prices = {
    banana: 1,
    orange: 2,
    meat: 4,
};

let doublePrices = Object.fromEntries(
    Object.entries(prices).map(([key, value]) => [key, value * 2])
);

alert(doublePrices.meat); // 8