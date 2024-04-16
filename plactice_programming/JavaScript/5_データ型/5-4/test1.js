"use strict";

let fruits = ["Apples", "Pear", "Orange"];

// 新しい値を"コピー"へプッシュ
let shoppingCart = fruits;
shoppingCart.push("Banana");

// fruitsの中身は何か
alert(fruits.length); // 4

// 代入によるコピーは参照コピーとなるため、参照しているもの事態に変更を加えるとコピー元にも影響が出る
