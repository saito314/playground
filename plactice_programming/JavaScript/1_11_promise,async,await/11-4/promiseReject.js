"use strict";

// promiseのエラーハンドリング
// promiseチェーンはエラーハンドリングに優れている
// 例えば、存在しないサイトへのリクエストでエラーハンドリングしてみる
{
    fetch("https://no-such-server.blabla") // rejects
        .then(response => response.json())
        .catch(err => alert(err)) // TypeError: failed to fetch
}

// promiseのエラーハンドリングをするときはfetchの直前である必要はない
// すべてのエラーをキャッチするためにチェーンの末尾に.catchを使用するのが有効
{
    fetch('/article/promise-chaining/user.json')
        .then(response => response.json())
        .then(user => fetch(`https://api.github.com/users/${user.name}`))
        .then(response => response.json())
        .then(githubUser => new Promise((resolve, reject) => {
            let img = document.createElement("img");
            img.src = githubUser.avater_url;
            img.className = "prmise-avatar-example";
            document.body.append(img);

            setTimeout(() => {
                img.remove();
                resolve(githubUser);
            }, 3000);
        }))
        .catch(error => alert(error.message));
}

// 暗黙のtry…catch
// executorとpromiseのハンドラのコードは見えないtry…catchを持っている
{
    new Promise(function(resolve, reject) {
        throw new Error("Whoops!");
    }).catch(alert); // Error: Whoops!
}
// これは次と同じように動作する
{
    new Promise(function(resolve, reject) {
        reject(new Error("Whoops!"));
    }).catch(alert);
}

// .thenハンドラの中で例外をthrowした場合、promiseのrejectを意味するため
// コントロールは最も近いエラーハンドラにジャンプする
{
    new Promise(function(resolve, reject) {
        resolve("ok");
    }).then(function(result) {
        throw new Error("Whoops!"); // promiseをrejects
    }).catch(alert); // Error: Whoops!
}
// また、これはthrowだけでなく同様にプログラムエラーを含む任意のエラーに対して起こる
{
    new Promise(function(resolve, reject) {
        resolve("ok");
    }).then(function(result) {
        blabla(); // このような関数はない
    }).catch(alert); // ReferenceError: blabla is not defined
    // catchは明示的なrejectだけでなく、上記のハンドラのような偶発的なエラーもキャッチする
}

// 再スロー
// 複数の.thenをもち最後に単一の.catchをもつのが通常
// .catchの中でthrowする場合は次の最も近いエラーハンドラに移る
// エラー処理が正常終了すると最も近い.thenハンドラに続く
{
    // 実行:catch -> then
    new Promise(function(resolve, reject) {
        throw new Error("Whoops!");
    }).catch(function(error) {
        alert("The error is handled, continue normaly");
    }).then(() => alert("Next successful handler runs"));
}

// .catch正常に終了したため、.thenハンドラが呼ばれる
{
    // 実行: catch -> catch -> then
    new Promise(function(resolve, reject) {
        throw new Error("Whoops!");
    }).catch(function(error) {
        if (error instanceof URIError) {
            // エラー処理
        } else {
            alert("Can't handle such error");

            throw error; // ここで投げられたエラーは次のcatchにいく
        }
    }).then(function() {
        // 実行されない
    }).catch(error => {
        alert(`The unknown error has occurred: ${error}`)
        // 何も返さず、実行は通常通りに進む
    });
}

// 未処理のreject
// .catchをつけ忘れている場合はどうなるのか
{
    new Promise(function() {
        noSuchFunction(); // このような関数はない
    })
    .then(() => {
        // 1つ以上の成功したpromiseハンドラ
    })
}

// 上記の場合エラーはスタックする
// この場合のエラーはイベントunhandlerejectionを使ってキャッチできる
{
    window.addEventListener('unhandledrejection', function(event) {
        // イベントオブジェクトは2つの特別なプロパティを持っている:
        alert(event.promise); // [object Promise]
        alert(event.reason); // Error: Whoops!
    });

    new Promise(function() {
        throw new Error("Whoops!");
    }); // エラーを処理するcatchがない
}