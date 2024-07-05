"use strict";

// 誤字あり：すべての内部ソッドに対するトラップがあります
// このラップをすると、sahHi 呼び出しは 3秒間遅延します

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


// "deleteProperty"およびほかのトラップで保護されたプロパティ
// アンダースコアから始まる変数はアクセスされるべきではないが技術的には可能
{
    let user = {
        name: "John",
        _password: "secret"
    };

    alert(user._password);
}

// プロキシを使用して_で始まるプロパティへのアクセスを制限する
{
    let user = {
        name: "John",
        _password: "***"
    };

    user = new Proxy(user, {
        get(target, prop) {
            if (prop.startsWith("_")) {
                throw new Error("Access denied");
            }
            let value = target[prop];
            return (typeof value === "function") ? value.bind(target) : value;
        },
        set(target, prop, val) {
            if (prop.startsWith("_")) {
                throw new Error("Access deined");
            } else {
                target[prop] = val;
                return true;
            }
        },
        deleteProperty(target, prop) { // プロパティの削除をインターセプト
            if (prop.startsWith("_")) {
                throw new Error("Access denied");
            } else {
                delete target[prop];
                return true;
            }
        },
        ownKeys(target) { // プロパティのリストをインターセプト
            return Object.keys(target).filter(key => !key.startsWith("_"));
        }
    });

    try {
        alert(user._password);
    } catch(e) {
        alert(e.message);
    }

    try {
        user._password = "test";
    } catch(e) {
        alert(e.message);
    }

    try {
        delete user._password;
    } catch(e) {
        alert(e.message);
    }

    // "ownKeys"は_passwordを無視する
    for (let key in user) alert(key);
}

// getトラップの重要な点に注意
{
    /*get(target, prop) {
        let value = target[prop];
        return (typeof value === "function") ? value.bind(target) : value;
    }*/
}

// なぜ関数にvalue.bind(target)を呼び出す必要があるのか
// 理由はuser.checkPassword()のようなオブジェクトメソッドは_passwordへアクセスできる必要があるから
{
    user = {
        checkPassword(value) {
            // オブジェクトメソッドは_passwordへアクセスできなければならない
            return value === this._password;
        }
    }
    // user.checkPassword()の呼び出しはプロキシされたuserをthisのとして取得するため
    // this._passwordへのアクセスを試みるとgetトラップが機能し、エラーをスローする
}

// "has"トラップを使用した"範囲内"
{
    let range = {
        start: 1,
        end: 10
    };
}
// hasトラップはin呼び出しをインターセプトする
{
    let range = {
        start: 1,
        end: 10
    };

    range = new Proxy(range, {
        has(target, prop) {
            return prop >= target.start && prop <= target.end
        }
    });

    alert(5 in range); // true
    alert(50 in range); // false
}

// Wrapping functions: "apply"
// 関数の周りに対しても同様にproxyをラップすることができる
// apply(target, thisArg, args)トラップはプロキシを関数として呼び出すよう処理する
{
    function delay(f, ms) {
        // タイムアウト後にfへの呼び出しを渡すラッパー関数を返す
        return function() {
            setTimeout(() => f.apply(this, arguments), ms);
        };
    }

    function sayHi(user) {
        alert(`Hello, ${user}!`);
    }

    // このラップをすると、sayHi呼び出しは3秒間遅延する
    sayHi = delay(sayHi, 3000);

    sayHi("John");
}

// ラッパー関数はプロパティの読み書き操作などは転送しない
// ラップ後、nameやlengthなどの元の関数のプロパティへのアクセスは失われる
{
    function delay(f, ms) {
        return function() {
            setTimeout(() => f.apply(this, arguments), ms);
        };
    }

    function sayHi(user) {
        alert(`Hello, ${user}!`);
    }

    alert(sayHi.length); // 1(function.lengthは宣言された関数の引数の数を返す)

    sayHi = delay(sayHi, 3000);

    alert(sayHi.length); // 0(ラッパー後は引数0)
}

// Proxyは全てをターゲットオブジェクトに転送するのではるかに強力
{
    function delay(f, ms) {
        return new Proxy(f, {
            apply(target, thisArg, args) {
                setTimeout(() => target.apply(thisArg, args), ms);
            }
        });
    }

    function sayHi(user) {
        alert(`Hello, ${user}!`);
    }

    sayHi = delay(sayHi, 3000);

    alert(sayHi.length); // 1 プロキシはlength操作はターゲットに転送する

    sayHi("John");
}

// Reflect
// Reflectはproxyの作成を簡単にする組み込みオブジェクト
// [[Get]], [[Set]]やその他の内部メソッドを直接呼び出すことをいくらか可能にする
{
    let user = {};

    Reflect.set(user, "name", "John");

    alert(user.name);
}

// Proxyでトラップ可能な全ての内部メソッドに対し、ReflectにはProxyトラップと同じ名前
// 引数を持つ対応するメソッドがある
{
    // getとsetの両方のトラップが読み書き操作をオブジェクトへ透過的に転送し、メッセージを表示する
    let user = {
        name: "John",
    };

    user = new Proxy(user, {
        get(target, prop, receiver) {
            alert(`GET ${prop}`);
            return Reflect.get(target, prop, receiver);
        },
        set(target, prop, val, receiver) {
            alert(`SET ${prop}=${val}`);
            return Reflect.set(target, prop, val, receiver);
        }
    });

    let name = user.name;
    user.name = "Pete";
}

// getterのプロキシ
{
    let user = {
        _name: "Guest",
        get name() {
            return this._name;
        }
    };

    let userProxy = new Proxy(user, {
        get(target, prop, receiver) {
            return target[prop];
        }
    });

    alert(userProxy.name);
}

// userから別のオブジェクトadminを継承すると正しくない振る舞いが起きる
{
    let user = {
        _name: "Guest",
        get name() {
            return this._name;
        }
    };

    let userProxy = new Proxy(user, {
        get(target, prop, receiver) {
            return target[prop];
        }
    });

    let admin = {
        __proto__: userProxy,
        _name: "Admin"
    };

    // 期待する値: Admin
    alert(admin.name);
}

// プロキシを削除するとすべて期待通りに動作する
// Reflectを使うとうまく動作する
{
    let user = {
        _name: "Guest",
        get name() {
            return this._name;
        }
    };

    let userProxy = new Proxy(user, {
        get(target, prop, receiver) {
            return Reflect.get(target, prop, receiver);
        }
    });

    let admin = {
        __proto__: userProxy,
        _name: "Admin"
    };

    alert(admin.name); // Admin
}

// トラップをさらに短く書くこともできる
/*
get(target, prop, receiver) {
    return Reflect.get(...arguments);
}
*/

// プロキシの制限
// 組み込みオブジェクト: 内部スロット(Internal slot)
// Map, Set, Date, Promiseなどの組み込みオブジェクトはProxyをセットできない
{
    let map = new Map();

    let Proxy = new Proxy(map, {});

    proxy.set("test", 1); // Error
}

// 修正する方法もある
{
    let map = new Map();

    let proxy = new Proxy(map, {
        get(target, prop, receiver) {
            let value = Reflect.get(...arguments);
            return typeof value == "function" ? value.bind(target) : value;
        }
    });

    proxy.set("test", 1);
    alert(proxy.get("test")); // 1
}

// プライベートフィールド
{
    // getName()メソッドはプロキシ後にプライベート#nameプロパティへアクセスすると壊れる
    class User {
        #name = "Guest";

        getName() {
            return this.#name;
        }
    }

    let user = new User();

    user = new Proxy(user, {});

    alert(user.getName()); // Error
}

// メソッドをバインドする方法で機能させることができる
{
    class User {
        #name = "Guest";

        getName() {
            return this.#name;
        }
    }

    let user = new User();

    user = new Proxy(user, {
        get(target, prop, receiver) {
            let value = Reflect.get(...arguments);
            return typeof value == "function" ? value.bind(target) : value;
        }
    });

    alert(user.getName()); // Guest
}

// Proxy != target
// 元のオブジェクトをキーとして使用し、その後プロキシするとプロキシは見つからない
{
    let allUsers = new Set();

    class User {
        constructor(name) {
            this.name = name;
            allUsers.add(this);
        }
    }

    let user = new User("John");

    alert(allUsers.has(user));

    user = new Proxy(user, {});

    alert(allUsers.has(user));
}

// 取り消し可能なプロキシ
{
    let object = {
        data: "Valuable data"
    };

    let {proxy, revoke} = Proxy.revocable(object, {});

    // オブジェクトの代わりにプロキシをどこかに渡す
    alert(proxy.data);

    // あとで次のようにする
    revoke();

    // すると、プロキシは機能しなくなる
    alert(proxy.data);
}

// revoke()飛び出しはプロキシからターゲットオブジェクトへのすべての内部参照を削除する
// 初期状態でrevokeはproxyとは別なので、現在のスコープにrevokeを残したままproxyを渡すことも可能
{
    let revokes = new WeakMap();

    let object = {
        data: "Valuable data"
    };

    let {proxy, revoke} = Proxy.revocable(object, {});

    revokes.set(proxy, revoke);

    // later in our code
    revoke = revokes.get(proxy);
    revoke();

    alert(proxy.data);
}