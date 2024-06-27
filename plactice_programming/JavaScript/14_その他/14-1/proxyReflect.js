"use strict";

// 誤字あり：すべての内部ソッドに対するトラップがあります

// proxyオブジェクトが別のオブジェクトをラップし、
// プロパティやその他の読み書きなどの操作をインターセプトする
{
    // トラップなしのプロキシを作ってみる
    let target = {};
    let proxy = new Proxy(target, {}); // 空のハンドラ

    proxy.test = 5; // プロキシへの書き込み
    alert(target.test); // 5, プロパティがtargetで現れた

    alert(proxy.test); // 5, proxyから読み取ることもできる

    for (let key in proxy) alert(key); // test, イテレーションも機能する
}

// Proxyは特別な"エキゾチックオブジェクト"
// Proxyは独自のプロパティは持っていない
// 空のhandlerの場合は透過的にtargetへ操作を転送する


// "get"トラップでのデフォルト値
// もっとも一般的なトラップはプロパティの読み書き
// 数値配列をラップして通常、存在しない値を取得しない場合に0を返すプロキシでラップする
{
    let numbers = [0, 1, 2];

    numbers = new Proxy(numbers, {
        get(target, prop) {
            if (prop in target) {
                return target[prop];
            } else {
                return 0; // デフォルト値
            }
        }
    });

    alert(number[1]); // 1
    alert(number[123]); // 0（このような項目はない）
}

// Proxyを利用すると任意のデフォルト値用のロジックを組むことができる
{
    let dictionary = {
        "Hello": "Hola",
        "Bye": "Adiós"
    };

    alert(dictionary["Hello"]); // Hola
    alert(dictionary["Welcome"]); // undefined
}

// 現状dictionaryは該当する値がない場合はundefinedを返却する
// しかし、そのままのフレーズを残す方がよいためproxyでラップしてデフォルト値を設定する
{
    let dictionary = {
        "Hello": "Hola",
        "Bye": "Adiós"
    };

    dictionary = new Proxy(dictionary, {
        get(target, phrase) { // 辞書(dictionary)からのプロパティ読み取りをインターセプト
            if(phrase in target) { // 辞書の中にある場合
                return target[phrase]; // 翻訳を返す
            } else {
                // 辞書の中にない場合はそのままフレーズを返す
                return phrase;
            }
        }
    });

    // 辞書で任意のフレーズを検索する
    // 辞書にない場合は翻訳されない
    alert(dictionary["Hello"]); // Hola
    alert(dictionary["Welcome to Proxy"]); // Welcome to Proxy
}

// 注意：プロキシはどこでもターゲットオブジェクトを完全に置き換える必要がある
// 他から参照しないように

// "set"トラップでのバリデーション
// 今回は数値専用の配列を作成する
// 数値以外の型が追加された場合にエラーを出す必要がある
{
    let numbers = [];

    numbers = new Proxy(numbers, {
        set(target, prop, val) { // プロパティの書き込みをインターセプト
            if (typeof val == "number") {
                target[prop] = val;
                return true;
            } else {
                return false;
            }
        }
    });

    number.push(1); // 追加成功
    numbers.push(2); // 追加成功
    alert("Length is: " + numbers.length); // 2

    numbers.push("test"); // TypeError(プロキシの"set"がfalseを返却)

    alert("This line is never reached (error in the line above)");
    // pushやunshiftなどは組み込みのSetを使うので、proxyを使うことは破壊的ではない
}

// "ownKeys"と"getOwnPropertyDescriptor"によるイテレーション
// 以下の例ではownKeysトラップを使用してuserに対するfor...inループを行う
{
    let user = {
        name: "John",
        age: 30,
        _password: "***"
    }

    user = new Proxy(user, {
        ownKeys(target) {
            return Object.keys(target).filter(key => !key.startsWith("_"));
        }
    });

    // "ownKeys"は_passwordを除外する
    for (let key in user) alert(key); // name, then: age

    // これらのメソッドへも同じ影響がある
    alert(Object.keys(user));
    alert(Object.values(user));
}

// 上記のコードではもしオブジェクトに存在しないキーを返した場合、Object.keysはそれをリストしない
{
    user = {};

    user = new Proxy(user, {
        ownKeys(target) {
            return ["a", "b", "c"];
        }
    });

    alert(Object.keys(user));
}

// Object.keysがプロパティを返すにはenumerable月でオブジェクトに存在するか
// [[GetOwnProperty]]の呼び出しをインターセプトし、enumerable: trueを持つディスクリプタを返す
{
    let user = {};

    user = new Proxy(user, {
        ownKeys(target) {
            return ["a", "b", "c"];
        },

        getOwnPropertyDescriptor(target, prop) {
            return {
                enumerable: true,
                configurable: true
            };
        }
    });

    alert(Object.keys(user));
}