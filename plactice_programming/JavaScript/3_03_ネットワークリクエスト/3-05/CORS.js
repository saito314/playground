"use strict";

// Fetch: クロスオリジンリクエスト
// もし任意のwebサイトからfetchを行った場合、そのリクエストはおそらく失敗する
{
    try {
        await fetch('http://example.com');
    } catch(err) {
        alert(err); // Failed to fetch
    }
}

// クロスオリジン製薬が悪意のあるハッカーからインターネット保護をするから失敗する
// あるサイトのスクリプトが別のサイトのコンテンツへアクセスすることはできなかった
// しかし回避策が考案された
/*
    <!-- form target -->
    <iframe name="iframe"></iframe>

    <!-- JavaScriptによりformは動的に生成されサブミットされた -->
    <form target="iframe" method="POST" action="http://another.com/…">
        ...
    </form>
*/
// これによりネットワーキングのメソッドがなくても、別のサイトへGET/POSTリクエストを送ることは可能だった
// 以下はJSONPでデータを受け取るコードの例
{
    // データを処理する関数を宣言する
    function gotWeather({ temparature, humidity }) {
        alert(`temperature: ${temperature}, humidity: ${humidity}`);
    }

    // スクリプトに対してcallbackパラメータとしてその名前を渡す
    let script = document.createElement('script');
    script.src = `https://cors.javascript.info/article/fetch-crossorigin/demo/script?callback=gotWeather`;
    document.body.append(script);
}

// 単純リクエスト
// 本質的な違いは"単純リクエスト"は、特別な方法を使うことなくformまたはscriptを使って作成することができる


// 単純リクエストに対するCORS
// リクエストがクロスオリジンである場合う、ブラウザは常にOriginヘッダを追加する


// 単純ではないリクエスト
// クロスドメインのPATCHリクエストの例でステップ毎にどのように動作するのか見ていく
{
    let response = await fetch('https://site.com/service.json', {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "API-key": "secret"
        }
    });
}

// Credentals
{
    fetch('http://another.com', {
        credentials: "include"
    });
}