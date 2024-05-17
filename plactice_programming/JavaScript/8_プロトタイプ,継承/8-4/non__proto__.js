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
{
    let obj = {};

    let key = prompt("What's the key?", "__proto__");
    obj[key] = "some value";

    alert(obj[key]);
}

// 