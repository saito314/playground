"use strict";

// Promisificationはコールバックを受け付ける関数から、Promiseを返す関数への変換を示す
{
    function loadScript(src, callback) {
        let script = document.createElement("script");
        script.src = src;

        script.onload = () => callback(null, script);
        script.onerror = () => callback(new Error(`Script load error for ${src}`));

        document.head.append(script);
    }
}
// 上記をPromise化してみる
{
    // srcのみを渡し、戻り値でpromiseを得る
    let loadScriptPromise = function(src) {
        return new Promise((resolve, reject) => {
            loadScript(src, (err, script) => {
                if (err) reject(err)
                else resolve(script);
            });
        })
    }
    // 使用例:
    // loadScriptPromise("path/script.js").then(...)
}

// 複数の関数をpromise化する必要があるかも…
// promisify(f)はPromise化する関数fを引数にとり、ラッパー関数を返す
{
    function promisify(f) {
        return function(...args) {
            return new Promise((resolve, reject) => {
                function callback(err, result) {
                    if (err) {
                        return reject(err);
                    } else {
                        resolve(result);
                    }
                }

                args.push(callback); // 引数の末尾にカスタムコールバックを追加

                f.call(this, ...args); // 元の関数を呼び出す
            });
        };
    };

    // 使用例:
    // let loadScriptPromise = promisify(loadScript);
    // loadScriptPromise(...).then(...)
}

// 仮に元のfがより多くの引数callback(err, res1, res2)を期待してる場合に上記はうまく動かない
// 複数のコールバックの結果の配列を返すpromisifyの修正
{
    // 結果の配列を得る場合はpromisify(f, true)
    function promisify(f, manyArgs = false) {
        return function (...args) {
            return new Promise((resolve, reject) => {
                function callback(err, ...results) {
                    if (err) {
                        return reject(err);
                    } else {
                        // manyArgsが指定されている場合、すべてのコールバック結果でresolveする
                        resolve(manyArgs ? results : results[0]);
                    }
                }

                args.push(callback);

                f.call(this, ...args);
            });
        };
    };

    // 使用例:
    // f = promisify(f, true);
    // f(...).then(arrayOfResults => ...promisify, err => ...)
}