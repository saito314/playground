"use strict";

// async/awaitはより快適にpromise１を利用する特別な構文
// Async関数
// Async関数は常にpromiseを返す
{
    async function f() {
        return 1;
    }

    f().then(alert);
}

// 明示的にpromiseを返すこともできる
{
    async function f() {
        return Promise.resolve(1);
    }

    f().then(alert);
}

// await
// awaitはpromiseが確定しその結果を返すまでJavaScriptを待機させる
{
    async function f() {

        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("done!"), 1000);
        });

        let result = await promise; // promiseが解決するまで待機する

        alert(result); // "done!"
    }

    f();
}

/*
非async関数でawaitを使うことはできない
function f() {
    let promise = Promise.resolve(1);
    let result = await promise; // Syntax error
}
*/

// チャプターPromiseチェーンをasync/awaitを使って書き直す
{
    async function showAcatar() {

        // JSONを読み込む
        let response = await fetch("/article/promise-chaining/user.json");
        let user = await response.json();

        // githubユーザを読み込む
        let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
        let githubUser = await githubResponse.json();

        // アバターを表示する
        let img = document.createElement("img");
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        // 3秒待つ
        await new Promise((resolve, reject) => setTimeout(resolve, 3000));

        img.remove();

        return githubUser;
    }

    showAvatar();
}

// awaitはトップレベルのコードでは動作しない
{
    // モジュールのトップレベルでコードが実行される想定
    let response = await fetch('/article/promise-chaining/user.json');
    let user = await response.json();

    console.log(user);
}

// モジュール未使用、あるいは古いブラウザでサポートが必要な場合
// 無名のasync関数でラップする方法がある
{
    (async () => {
        let response = await fetch('/article/promise-chaining/user.json');
        let user = await response.json();
        // ...
    })();
}

// awaitはthenableを許容する
// promise.thenのように、awaitはthenableオブジェクトを使うことができる
{
    class Thenable {
        constructor(num) {
            this.num = num;
        }
        then(resolve, reject) {
            alert(resolve); // function() { native code }
            // 1000ms後にthis.num*2で解決する
            setTimeout(() => resolve(this.num * 2), 1000);
        }
    };

    async function f() {
        // 1秒待って、結果は2になる
        let result = await new Thenable(1);
        alert(result);
    }

    f();
}

// クラスのasyncメソッド
{
    class Waiter {
        async wait() {
            return await Promise.resolve(1);
        }
    }

    new Waiter()
        .wait()
        .then(alert); // 1
}

// エラー処理
// promiseが正常に解決するとawait promiseは結果を返す
// しかし、拒否の場合はエラーをスローする
{
    async function f() {
        await Promise.reject(new Error("Whoops!"));
    }

}
// 上記のコードと同じ
{
    async function f() {
        throw new Error("Whoops!");
    }
}

// 実際にはpromiseが拒否するまでに時間がかかるため、awaitは待ったあとにエラーをスローする
// try...catchでエラーをキャッチできる
{
    async function f() {

        try {
            let response = await fetch('http://no-such-url');
        } catch(err) {
            alert(err); // TypeError: failed to fetch
        }
    }

    f();
}

// エラーの場合、コントロールはcatchブロックにジャンプする
{
    async function f() {

        try {
            let response = await fetch('/no-user-here');
            let user = await response.json();
        } catch(err) {
            // fetchとresponse.json両方エラーをキャッチ
            alert(err);
        }
    }

    f();
}

// try...catchがない場合にはasync関数f()の呼び出しによって生成されたpromiseは拒否される
// それを処理する場合には.catchを追加する
{
    async function f() {
        let response = await fetch('http://no-such-url');
    }

    // f()は拒否されたpromiseになる
    f().catch(alert); // TypeError: failed to fetch
}

// async/awaitはPromise.allとうまく動作する
// 複数のpromiseをもつ必要がある時はpromise.allでラップしてからawaitできる
{
    // 結果の配列を待つ
    let results = await Promise.all([
        fetch(url1),
        fetch(url2),
        // ...
    ]);
}