"use strict";

// カリー化は関数を扱う際の上級テクニック
// JavaScriptだけでなくほかの言語にも使用される
// カリー化はf(a, b, c)として呼び出せる関数をf(a)(b)(c)のようにして呼び出せるようにする
{
    function curry(f) {
        return function(a) {
            return function(b) {
                return f(a, b);
            };
        };
    }

    // 使用法
    function sum(a, b) {
        return a + b;
    }
    let curriedSum = curry(sum);
    alert(curriedSum(1)(2)); // 3
}

// loadashライブラリの_.curryのような高度なカリー化の実装では
// 関数を通常通り呼んだり部分的に呼んだりすることが認められるようなラッパが返される
{
    function sum(a, b) {
        return a + b;
    }

    let curriedSum = _.curry(sum); // loadashライブラリを使用する
    alert(curriedSum(1, 2)); // 通常通り呼び出す
    alert(curriedSum(1)(2)); // 部分的に呼び出す
}

// カリー化は何のため？
{
    function log(date, importance, message) {
        alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
    }

    // 上記をカリー化
    log = _.curry(log);

    // logは通常通り機能する
    log(new Date(), "DEBUG", "some debug");

    // カリー化の形式でも機能する
    log(new Date())("DEBUG")("some debug");

    // ログ用の便利な関数を簡単に作成できる
    let logNow = log(new Date());

    // それを使用する
    logNow("INFO", "message");

    // さらに進んで現在デバッグログ用の便利な関数を作成できる
    let debugNow = logNow("DEBUG");
    debugNow("message");
}

// 高度なカリー化の実装
{
    function curry(func) {
        return function curried(...args) {
            if (args.length >= func.length) {
                return func.apply(this, args);
            } else {
                return function(...args2) {
                    return curried.apply(this, args.concat(args2));
                }
            }
        };
    }
}

{
    // 使用例
    function sum(a, b, c) {
        return a + b + c;
    }

    let curriedSum = curry(sum);
    alert(curriedSum(1, 2, 3));
    alert(curriedSum(1)(2, 3));
    alert(curriedSum(1)(2)(3));
}

// curry(func)呼び出しの結果はラップされた以下のようなcurried関数
{
    // funcは変形対象の関数
    function curried(...args) {
        if (args.length >= func.length) {
            return func.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            }
        }
    };
}