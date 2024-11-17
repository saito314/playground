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