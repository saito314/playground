"use strict";

// Promise.all
// 並列に複数のpromiseを実行し、全てが準備できるまで待ちたい
// これを叶えるのがPromise.all
// 例では下のPromise.allが3秒後に解決され、そのあと結果は配列[1, 2, 3]です。
{
    Promise.all([
        new Promise((resolve, reject) => setTimeout(() => resolve(1), 3000)),
        new Promise((resolve, reject) => setTimeout(() => resolve(2), 2000)),
        new Promise((resolve, reject) => setTimeout(() => resolve(3), 1000))
    ]).then(alert);
    // 1,2,3 promiseが準備できた時：各promiseは配列の中身に寄与する
}

// 結果の配列要素は元のpromiseの順番と同じであることに注意
// 一般的なやり方は処理データの配列をpromiseの配列にマップし、それをPromise.allにラップすることができる
{
    let urls = [
        'https://api.github.com/users/iliakan',
        'https://api.github.com/users/remy',
        'https://api.github.com/users/jeresig'
    ];

    // 各urlをpromiseのfetch(github url)へマップする
    let requests = urls.map(url => fetch(url));

    // Promise.allはすべてのジョブが解決されるまで待つ
    Promise.all(requests)
        .then(responses => responses.forEach(
            response => alert(`${response.url}: ${response.status}`)
        ));
}
{
    let names = ["iliakan", "remy", "jeresig"];

    let requests = names.map(name => fetch(`https://api.github.com/users/${name}`));

    Promise.all(requests)
        .then(responses => {
            // すべてのレスポンスが用意できたらHTTPステータスコードが見れる
            for (let response of responses) {
                alert(`${response.url}: ${response.status}`); // 各urlで200が表示される
            }

            return responses;
        })
        // それぞれ中身を読むために、レスポンスの配列をresponse.json()の配列にマッピングする
        .then(responses => Promise.all(responses.map(r => r.json())))
        // すべてのJSON応答が解析され、"user"はそれらの配列
        .then(users => users.forEach(user => alert(user.name)));
}
// いずれかのpromiseがrejectされた場合、Promise.allにより返却されたpromiseは即座にエラーと一緒にrejectする
{
    Promise.all([
        new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
        new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
    ]).catch(alert) // Error, Whoops!
}


// Promise.all(iterable)はiterableの中で非promiseの項目を許可する
{
    Promise.all([
        new Promise((resolve, reject) => {
            setTimeout(() => resolve(1), 1000)
        }),
        2, // Promise.resolve(2)
        3 // Promise.resolve(3)
        // と上記は処理される
    ]).then(alert); // 1, 2, 3
}


// Promise.allSettled
// Promise.allはいずれかのpromiseがrejectされると、全体としてrejectされる
// Promise.allSettledは結果に関わらずすべてのpromiseが解決するまで待つ
// 結果の配列は以下をもつ
// 成功：{ status: "fulfilled", value: result }
// エラー：{ status: "rejected", reason: error }
{
    let urls = [
        'https://api.github.com/users/iliakan',
        'https://api.github.com/users/remy',
        'https://no-such-url'
    ];

    Promise.allSettled(urls.map(url => fetch(url)))
        .then(results => {
            results.forEach((result, num) => {
                if (result.status == "fulfilled") {
                    alert(`${urls[num]}: ${result.value.status}`);
                }
                if (result.status == "rejected") {
                    alert(`${urls[num]}: ${result.reason}`);
                }
            });
        });
}

// Polyfill
{
    if (!Promise.allSettled) {
        const rejectHandler = reason => ({ status: "rejected", reason });
        const resolveHandler = value => ({ status: "fulfilled", value });

        Promise.allSettled = function(promise) {
            const convertedPromises = promises.map(p => Promise.resolve(p).then(resolveHandler, rejectHandler));
            return Promise.all(convertedPromises);
        };
    }
}
// これで指定されたすべてのpromiseの結果を得るPromise.allSettledが利用できる


// Promise.race
// Promise.allと同じだが、最初の結果を待つ
{
    // 例えばここでは結果は1になる
    Promise.race([
        new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)), // 最初に成功するのはここ
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 2000)),
        new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000))
    ]).then(alert); // 1
}

// Promise.any
// Promise.raceと同様だが、指定されたpromiseがすべてrejectされた場合
// 返却されるpromiseはAggregateErrorでrejectされる
{
    // 例えばここでは結果は1になる
    Promise.any([
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")), 1000)),
        new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
        new Promise((resolve, reject) => setTimeout(() => resolve(2), 3000))
    ]).then(alert); // 1
}
{
    // すべてのpromiseが失敗した例
    Promise.any([
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Ouch!")), 1000)),
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Error!")), 2000))
    ]).catch(error => {
        console.log(error.constructor.name); // AggregateError
        console.log(error.errors[0]); // Error: Ouch!
        console.log(error.errors[1]); // Error: Whoops!
    });
}

// Promise.resolve/reject
// 最近ではPromise.resolveとPromise.rejectは使用されない
{
    let cache = new Map();

    function loadCached(url) {
        if (cache.has(url)) {
            return Promise.resolve(cache.get(url));
        }

        return fetch(url)
            .then(response => response.text())
            .then(text => {
                cache.set(url, text);
                return text;
            });
    }

    let promise = new Promise((resolve, reject) => reject(error));
    // これは実際ほとんど使われない
}