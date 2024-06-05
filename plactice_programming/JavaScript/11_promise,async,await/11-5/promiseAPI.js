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
        new Promise((resolve, reject) => setTimeout(() => reject(new Error("Whoops!")))),
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