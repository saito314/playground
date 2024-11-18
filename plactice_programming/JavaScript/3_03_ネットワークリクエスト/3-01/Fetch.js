"use strict";


// Fetch
// 必要に応じていつでもサーバへリクエストを送信し、新しい情報を読み込むことができる
// ネットワークリクエストを送信し、サーバから情報を取得するための様々な方法がある
// fetch()メソッドはモダンで多目的に利用できる。
{
    let promise = fetch(url, [options]);
}


// ブラウザはすぐにリクエストを開始し、promiseを返す
// レスポンスの取得は通常2段階のプロセスになる
// promiseはサーバがヘッダを応答するとすぐに組み込みのResponseクラスのオブジェクトでresolveする
// そのため、HTTPステータスをチェックすることでリクエストの成否を確認することができる
{
    let response = await fetch(url);

    if (response.ok) { // HTTPステータスが200-299の場合
        // レスポンス本文を取得
        let json = await response.json();
    } else {
        alert("HTTP-Error: " + response.status)
    }
}

// Responseはさまざまな形式で本文にアクセスするための複数のpromiseベースのメソッドを提供している
{
    // ここではGithubから最新のコミットのJSONオブジェクトを取得する
    let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

    let commits = await response.json(); // レスポンス本文をよみ、JSONとしてパースする

    alert(commits[0].author.login);
}

// もしくは純粋なpromise構文を使用した場合は次のようになる
{
    fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
        .then(response => response.json())
        .then(commits => alert(commits[0].author.login));
}

// テキストを取得するには
{
    let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

    let text = await response.text(); // レスポンスボディをテキストとして読む

    alert(text.slice(0, 80) + "...");
}

// 画像を取得して表示してみる
{
    let response = await fetch('/article/fetch/logo-fetch.svg');

    let blob = await response.blob(); // Blobオブジェクトとしてダウンロード

    // <img>を作成
    let img = document.createElement("img");
    img.style = "position:fixed;top:10px;left:10px;width:100px";
    document.body.append(img);

    // 表示
    img.src = URL.createObjectURL(blob);

    setTimeout(() => { // 3秒後に隠す
        img.remove();
        URL.revokeObjectURL(img.src);
    }, 3000);
}

// Headers
// 個々のヘッダを取得したり、それらをイテレートすることができる
{
    let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');

    // ヘッダを1つ取得
    alert(response.headers.get("Content-Type"));

    // すべてのヘッダをイテレート
    for (let [key, value] of response.headers) {
        alert(`${key} = ${value}`);
    }
}

// ヘッダを設定するにはheadersオプションを使用する
{
    let response = fetch(protectedUrl, {
        headers: {
            Authentication: "abcdef"
        }
    });
}

// POSTリクエスト
// userオブジェクトをJSONとして送信する
{
    let user = {
        name: "John",
        surname: "Smith"
    };

    let response = await fetch('/article/fetch-basics/post/user', {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8"
        },
        body: JSON.stringify(user)
    });

    let result = await response.json();
    alert(result.message);
}


// 画像を送信する
// BlobやBufferSourceを使用して、バイナリデータを直接送信することもできる
/*
    <body style="margin:0">
        <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

        <input type="button" value="Submit" onclick="submit()">

        <script>
            canvasElem.onmousemove = function(e) {
                let ctx = canvasElem.getContect("2d");
                ctx.lineTo(e.clientX, e.clientY);
                ctx.stroke();
            };

            async function submit() {
                let blob = await new Promise(resolve => canvasElem.toBlob(resolve, "image/png"));
                let response = await fetch('/article/fetch-basics/post/image', {
                    method: "POST",
                    body: blob
                });
                let result = await response.json();
                alert(result.message);
            }
        </script>
    </body>
*/

// submit()関数はこのようにasync/awaitなしで書くこともできる
{
    function submit() {
        canvasElem.toBlob(function(blob) {
            fetch('/article/fetch-basics/post/image', {
                method: "POST",
                body: blob
            })
                .then(response => response.json())
                .then(result => alert(JSON.stringify(result, null, 2)))
        }, "image/png");
    }
}