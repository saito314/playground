"use strict";

// XMLHttpRequestはjavascriptでHTTPリクエストを行うための組み込みのブラウザオブジェクト
// 名前にXMLが含まれているが、XML形式だけでなくあらゆるデータを扱うことができる
// XMLHttpRequestは若干非推奨


// 基本
// XMLHttpRequestには2つの操作モードがある：同期と非同期
// ほとんどは非同期で使われる
// 1.XMLHttpRequestを作成する
{
    let xhr = new XMLHttpRequest();
}
// 2.初期化する
{
    xhr.open(method, URL, [async, user, password]);
}
// 3.それを送る
{
    xhr.send([send]);
}
// 4.応答に対するイベントをリッスンする
{
    xhr.onload = function() {
        alert(`Loaded: ${xhr.status} ${xhr.response}`);
    };

    xhr.onerror = function() { // リクエストがまったく送信できなかった時にだけトリガーされる
        alert(`Network Error`);
    }

    xhr.onprogress = function(event) { // 定期的にトリガーされる
        alert(`Received ${event.loaded} of ${event.total}`)
    }
}

// 下のサーバから/article/xmlhttprequest/example/loadのURLをロードし、進行状況を表示する
{
    let xhr = new XMLHttpRequest();

    xhr.open("GET", '/article/xmlhttprequest/example/load');

    xhr.send();

    xhr.onload = function() {
        if (xhr.status != 200) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            alert(`Done, got ${xhr.response.length} bytes`);
        }
    };

    xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            alert(`Received ${event.onload} of ${event.total} bytes`);
        } else {
            alert(`Received ${event.loaded} bytes`);
        }
    };

    xhr.onerror = function() {
        alert("Requested failed");
    };
}