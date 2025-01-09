"use strict";

// WebSocket
// 説足の切断や追加のHTTPリクエストをすることなく、データを"パケット"として双方向に渡すことができる
// WebSocketは継続的にデータ交換を必要とするようなサービスに特に適している


// 簡単な例
// websocketの接続を開くにはurlの特別なプロトコルwsを使用したnew WebSocketを作る必要がある
{
    let socket = new WebSocket("ws://javascript.info");
}
// 暗号化されたwss:// プロトコルもある

// 例：
{
    let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

    socket.onopen = function(e) {
        alert("[open] Connection established");
        alert("Sending to server");
        socket.send("My name is John");
    };

    socket.onmessage = function(event) {
        alert(`[message] Data received from server: ${event.data}`);
    };

    socket.onclose = function(event) {
        if (event.wasClean) {
            alert(`[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`);
        } else {
            alert('[close] Connection died');
        }
    };

    socket.onerror = function(error) {
        alert(`[error] ${error.message}`);
    };
}

// websocketのオープン
// サーバがWebSocketに切り替えることに同意するとコード101の応答を返す必要がある
// ここでSec-WebSocket-Acceptは特別なアルゴリズムを使用して産出されたSec-WebSocket-Key
// ブラウザはこれを使って、リクエストに対応するレスポンスであることを確認する


// 拡張とサブプロトコル
// 拡張やサブプロトコルを記述する追加のヘッダSec-WebSocket-ExtensionsとSec-WebSocket-Protocolがある


// データ転送
// WebSocket通信はフレームで構成される
// ブラウザではテキストフレームまたはバイナリフレームのみを直接扱う
// WebSocket.send()メソッドはテキストまたはバイナリデータを送信できる
// socket.send(body)呼び出しは文字列またはBlobやArrayBufferなどを含むバイナリ形式のBodyが許可される
// 設定の必要はなく、任意のフォーマットで送信するだけでOK
// これはsocket.bufferTypeプロパティで設定される
// デフォルトはblobなので、バイナリデータはBlobオブジェクトで来る
{
    socket.bufferType = "arraybuffer";
    socket.onmessage = (event) => {
        // event.dataは文字列かarraybuffer
    }
}


// レートリミット
// 私たちのアプリが送信すべき大量のデータを生成しているとする
// ユーザは低速のネットワーク接続で、おそらく郊外のモバイルインターネットだとする
// 何度もsocket.send(data)を呼び出すことはできるが、データはメモリにバッファされ、ネットワーク速度が許可する範囲でできるだけ早く送信される
{
    setInterval(() => {
        if (socket.bufferAmount == 0) {
            socket.send(modeDat());
        }
    }, 100);
}


// 接続を閉じる
// 通常接続を閉じたいときは、数値コードとテキストによる理由と合わせてconnection close frameを送信する
{
    socket.close([code], [reason]);
}

// 次にcloseイベントハンドラの相手はそのコードと理由を取得する
{
    socket.close(1000, "work complete");

    // 相手
    socket.onclose = event => {

    };
}

