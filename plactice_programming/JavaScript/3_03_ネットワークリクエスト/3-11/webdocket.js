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