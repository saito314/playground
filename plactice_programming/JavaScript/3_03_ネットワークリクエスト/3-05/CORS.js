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
        alert()
    }
}