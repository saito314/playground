"use strict";

// ServerSentEventsの仕様ではサーバとの接続を維持しサーバからイベントを受け取れるようにする組み込みクラスのEventSourceについて説明されている
// WebSocketと同様に接続は永続的ですが、重要な違いがいくつかある
// 単方向でテキストのみの通常のHTTP
// EventSourceはWebSocketほど協力ではないが、より簡単な方法


// メッセージの取得
// メッセージの受信を開始するにはnew EventSource(url)を作成するだけ
// ブラウザはurlに接続し、接続を開いたままにしてイベントを待つ
// サーバはステータス200とヘッダで応答し、接続を維持しつつ次のような特別な計s機でメッセージを書き込む
/*
    data: Message 1

    data: Message 2

    data: Message 3
    data: of two lines
*/

// 実際には複雑なメッセージは通常JSONエンコードされて送信される
/*
    data: {"user": "John", "message": "First line/n Second line"}
*/

// そのため、1つのdata:が1つのメッセージを持つと想定できる
{
    let eventSource = new EventSource("/events/subscribe");

    eventSource.onmessage = function(event) {
        console.log("New message", event.data);
    };
}

// クロスオリジンリクエスト
// EventSourceはfetchなど他のネットワークメソッドのように、クロスオリジンリクエストをサポートする
{
    let source = new EventSource("https://another-site.com/events");
}

// クレデンシャルを渡す場合は、次のようにwithCredentialsオプションで設定する
{
    let source = new EventSource("https://another-site.com/events", {
        withCredentials: true
    });
}


// 再接続
// 作成時にnew Credentialsはサーバに接続し、接続が切れた場合は再接続する
// サーバは応答の中でretryを使用して推奨する遅延を設定することができる
/*
    retry: 15000
    data: Hello, I set the reconnection delay to 15 seconds
*/

// サーバがブラウザが再接続するのをやめてほしい場合は、HTTPステータス204で応答する
// ブラウザが接続を閉じたい場合は、eventSource.close()を呼び出す
{
    let eventSource = new EcentSource();

    eventSource.close();
}


// Message id
// ネットワークの問題により接続が切れた場合、どちらの側もどのメッセージを受信しており、どのメッセージを受信していないのかが確認できない
// そのため、接続を正しく再開するには各メッセージにつぎのようなidフィールドが必要
/*
    data: Message 1
    id: 1

    data: Message 2
    id: 2

    data: Message 3
    data: of two lines
    id: 3
*/


// 接続ステータス: readyState
// EventSourceオブジェクトにはreadyStateプロパティがあり、次のいすれかの値を取る
{
    EventSource.CONNECTING = 0;
    EventSource.OPEN = 1;
    EventSource.CLOSED = 2;
}


// イベントタイプ
// デフォルトではEventSourceオブジェクトは3つのイベントを生成する
// カスタムイベントを扱うにはonmessageではなく、addEventListenerを値要する必要がある
{
    eventSource.addEventListener("join", event => {
        alert(`Joined ${event.data}`);
    });

    eventSource.addEventListener("message", event => {
        alert(`Said: ${event.data}`);
    });

    eventSource.addEventListener("leave", event => {
        alert(`Left ${event.data}`);
    });
}