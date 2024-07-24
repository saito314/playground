"use Strict";

// promiseチェーン
{
    new Promise(function(resolve, reject) {
        setTimeout(() => resolve(1), 1000);
    }).then(function(result) {
        alert(result); // 1
        return result * 2;
    }).then(function(result) {
        alert(result); // 2
        return result * 2;
    }).then(function(result) {
        alert(result); // 4
        return result * 2;
    });
}

// 結果がハンドラのチェーンに沿って渡されるので、一連のalert呼び出しは1 -> 2 -> 4になる
// よくある初心者が行う謝り：技術的には単一のPromiseに複数の.thenを追加することができる
// これはチェーンではない
{
    let promise = new Promise(function(resolve, reject) {
        setTimeout(() => resolve(1), 1000);
    });

    promise.then(function(result) {
        alert(result); // 1
        return result * 2;
    });

    promise.then(function(result) {
        alert(result); // 1
        return result * 2;
    });

    promise.then(function(result) {
        alert(result); // 1
        return result * 2;
    })
}

// promise返却
// .then(handler)で使用されるハンドラはpromiseを作成し、返却する可能性がある
{
    new Promise(function(resolve, reject) {
        setTimeout(() => resolve(1), 1000);
    }).then(function(result) {
        alert(result); // 1
        
        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(result * 2), 1000);
        });
    }).then(function(result) {
        alert(result); // 2

        return new Promise((resolve, reject) => {
            setTimeout(() => resolve(result * 2), 1000);
        })
    }).then(function(result) {
        alert(result); // 4
    });
    // promiseを返却することで、非同期アクションのチェーンを組み立てることができる
}

// 例:loadScript
{
    loadScript("/article/promise-chaining/one.js")
        .then(function(script) {
            return loadScript("/article/promise-chaining/two.js");
        })
        .then(function(script) {
            return loadScript("/article/promise-chaining/three.js");
        })
        .then(function(script) {
            // それらがロードされていることを表示するために
            // スクリプトで宣言されている関数を使用
            one();
            two();
            three();
        });
}

// アロー関数を使用すると多少短くなる
{
    loadScript("/article/promise-chaining/one.js")
        .then(script => loadScript("/article/promise-chaining/two.js"))
        .then(script => loadScript("/article/promise-chaining/three.js"))
        .then(script => {
            // scripts are loaded, we can use functions decleared there
            one();
            two();
            three();
        });
}

// 技術的にはそれぞれをloadScriptに直接.thenを書くことも可能
{
    loadScript("/article/promise-chaining/one.js").then(function(script1) {
        loadScript("/article/promise-chaining/two.js").then(function(script2) {
            loadScript("/article/promise-chaining/three.js").then(function(script3) {
                // この関数は変数 script1, script2, script3へアクセスすることができる
                one();
                two();
                three();
            });
        });
    });
    // 一般的にはチェーンさせる方が好ましい記述
}

// thenableオブジェクト：ハンドラはpromiseではなくthenableオブジェクトを返す可能性がある
// thenableオブジェクトの例は下記の通り
{
    class Thenable {
        constructor(num) {
            this.num = num;
        }
        then(resolve, reject) {
            alert(resolve); // function() {native code}
            // 1秒後にthis.num * 2でresolveする
            setTimeout(() => resolve(this.num * 2), 1000);
        }
    }

    new Promise(resolve => resolve(1))
        .then(result => {
            return new Thenable(result);
        })
        .then(alert); // 1000ms 後に2を表示
}

// より大きな例：fetch
// リモートサーバからユーザに関する情報をロードするためにfetchメソッドを使用する
// fetchはurlへネットワークリクエストを行いpromiseを返す
// 完全なレスポンスを見るためにはresponse.textメソッドを呼ぶ必要がある
{
    fetch('/article/promise-chaining/user.json')
        // この.thenはリモートサーバが応答したときに実行される
        .then(function(response) {
            // response.text()はレスポンスのダウンロード完了した際に
            // 完全なレスポンステキストで解決される新たなpromiseを返す
            return resuponse.text();
        })
        .then(function(text) {
            // ...そして、ここではリモートファイルの中身が参照できる
            alert(text); // {"name": "iliakan", isAdmin: true}
        });
}

// fetchから返却されたresponseオブジェクトは、リモートコンテンツをJSONとしてパースする
{
    fetch('/article/promise-chaining/user.json')
        .then(response => response.json())
        .then(user => alert(user.name)); // iliakan
}

// もう一例：githubへもう一つリクエストを行い、ユーザプロフィールを読み込みアバターを表示する
{
    // user.jsonへのリクエスト
    fetch('/article/promise-chaining/user.json')
        // jsonとしてロード
        .then(response => response.json())
        // githubへのリクエスト
        .then(user => fetch(`https://api.github.com/users/${user.name}`))
        // jsonとしてロード
        .then(response => response.json())
        // 3秒間アバター画像を表示 (githubUser.avater_url)
        .then(githubUser => {
            let img = document.createElement("img");
            img.src = githubUser.avater_url;
            img.className = "promise-avater-example";
            document.body.append(img);

            setTimeout(() => img.remove(), 3000);
        });
}

// 上記のコードではアバターの表示が入寮して削除された後に何かをする場合に対応できない。
// チェーンを閣僚可能にするにはアバターの表示が終了したときにresolveを行うpromiseを返す必要がある
{
    fetch('/article/promise-chaining/user.json')
        .then(response => response.json())
        .then(user => fetch(`https://api.github.com/users/${user.name}`))
        .then(response => response.json())
        .then(githubUser => new Promise(function(resolve, reject) {
            let img = document.createElement("img");
            img.src = githubUser.avater_url;
            img.className = "promise-avatar-example";
            document.body.append(img);

            setTimeout(() => {
                img.remove();
                resolve(githubUser);
            }, 3000);
        }))

        // 3秒後にトリガーされる
        .then(githubUser => alert(`Finished showing ${githubUser.name}`));
}

// 最後に上記のコードは再利用可能な関数に分割できる
{
    function loadJson(url) {
        return fetch(url)
            .then(response => response.json());
    }

    function loadGithub(name) {
        return loadJson(`https://api.github.com/users/${name}`);
    }

    function showAvatar(githubUser) {
        return new Promise(function(resolve, reject) {
            let img = document.createElement("img");
            img.src = githubUser.avater_url;
            img.className = "promise-avatar-example";
            document.body.append(img);

            setTimeout(() => {
                img.remove();
                resolve(githubUser);
            }, 3000);
        });
    }

    loadJson('/article/promise-chaining/user.json')
        .then(user => loadGithubUser(user.name))
        .then(showAvatar)
        .then(githubUser => alert(`Finished showing ${githubUser.name}`));
        // ...
}