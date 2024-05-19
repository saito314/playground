"use strict";

// __proto__は古く、やや非推奨となっている
{
    let animal = {
        eats: true,
    };

    // animalをプロトタイプとして新しいオブジェクトを作成する
    let rabbit = Object.create(animal);

    alert(rabbit.eats); // true

    alert(Object.getPrototypeOf(rabbit) === animal); // rabbitのプロトタイプを取得

    Object.setPrototypeOf(rabbit, {}); // rabbitのプロトタイプを{}に変更
}

{
    let animal = {
        eats: true
    };

    let rabbit = Object.create(animal, {
        jumps: {
            value: true
        }
    });

    alert(rabbit.jumps); // true
}

// 非常にシンプルなオブジェクト
// ユーザから受け取ったkeyに値を入れる場合は__proto__以外はうまくいく
{
    let obj = {};

    let key = prompt("What's the key?", "__proto__");
    obj[key] = "some value";

    alert(obj[key]); // [object, Object], "some value"ではない
}

// __proto__は[[Prototype]]にアクセスする方法であり、[[Prototype]]自身ではない
// 連想配列としてオブジェクトを使いたい場合、リテラルのトリックを使ってそれを行うことができる
{
    let obj = Object.create(null);

    let key = prompt("What's the key?", "__proto__");
    obj[key] = "some value";

    alert(obj[key]); // "some value"
}

// 上記のようなオブジェクトを純粋な辞書オブジェクトという
// ただし、組み込みのメソッドはない
{
    let obj = Object.create(null);

    alert(obj); // Error
}

// しかし、連想配列ではとくに問題はない
// ほとんどのオブジェクトに関連したメソッドObject.keys(obj)などのように機能し続ける
{
    let chineseDictionary = Object.create(null);
    chineseDictionary.hello = "hi hao";
    chineseDictionary.bye = "zai jian";

    alert(Object.keys(chineseDictionary)); // hello, bye
}