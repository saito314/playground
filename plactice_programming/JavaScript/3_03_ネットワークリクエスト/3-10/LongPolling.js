"use strict";


// ロングポーリング
// ロングポーリングはサーバと永続的な接続を持つための最も簡単な方法で、WebSocketやServerSideEventsなどの特定のプロトコルを使わない


// 定期的なポーリング
// サーバから新しい情報を取得するための最も簡単な方法はポーリング
// 非常に小さいサービスに関して離す場合にはこのアプローチは現実的だが、一般的には改善が必要


// ロングポーリングは定期的なポーリングより優れたポーリングの手法
// 1. リクエストがサーバに送信される
// 2. サーバはメッセージがあるまで接続を閉じない
// 3. メッセージが現れたらサーバはそのデータでリクエストに応答する
// 4. ブラウザはすぐに新しいリクエストを作る

// 長いリクエストを行うクライアント側のsubscribe関数の概要
{
    async function subscribe() {
        let response = await fetch("/subscribe");

        if (response.status == 502) {
            // 接続タイムアウトエラー
            await subscribe();
        } else if (response.status != 200) {
            // エラーを表示
            showMessage(response.statusText);
            // 1秒後に再接続する
            await new Promise(resolve => setTimeout(resolve, 1000));
            await subscribe();
        } else {
            // メッセージを取得する
            let message = await response.text();
            showMessage(message);
            await subscribe();
        }
    }

    subscribe();
}


// デモ: チャット
// browser.js
{
    function PublishForm(form, url) {

        function sendMessage(message) {
            fetch(url, {
                method: "POST",
                body: message
            });
        }

        form.onsubmit = function() {
            let message = form.message.value;
            if (message) {
                form.message.value = "";
                sendMessage(message);
            }
            return false;
        };
    }

    function SubscribePane(elem, url) {

        function showMessage(message) {
            let messageElem = document.createElement("div");
            messageElem.append(message);
            elem.append(messageElem);
        }

        async function subscribe() {
            let response = await fetch(url);

            if (response.status == 502) {
                await subscribe();
            } else if (response.status != 200) {
                showMessage(response.statusText);
                await new Promise(resolve => setTimeout(resolve, 1000));
                await subscribe();
            } else {
                let message = await response.text();
                showMessage(message);
                await subscribe();
            }
        }

        subscribe();
    }
}


// server.js
{
    let http = require("http");
    let url = require("url");
    let querystring = require("queryString");
    let static = require("node-static");

    let fileServer = new static.Server(".");

    let subscribers = Object.create(null);

    function onSubscribe(req, res) {
        let id = Math.random();

        res.setHeader("Content-Type", "text/plain;charset=utf-8");
        res.setHeader("Cahche-Control", "no-cache, must-revalidate");

        subscriber[id] = res;

        req.on("close", function() {
            delete subscribers[id];
        });
    }

    function publish(message) {

        for (let id in subscriber) {
            let res = subscribers[id];
            res.end(message);
        }

        subscribers = Object.create(null);
    }

    function accept(req, res) {
        let urlParsed = url.parse(req.url, true);

        if (urlParsed.pathname == "/subscribe") {
            onSubscribe(req, res);
            return;
        }

        if (urlParsed.pathname == "/publish" && req.method == "POST") {

            req.setEncoding("utf8");
            let message = "";
            req.on("data", function(chunk) {
                message += chunk;
            }).on("end", function() {
                publish(message);
                res.end("ok");
            });

            return;
        }

        fileServer.serve(req, res);
    }

    function close() {
        for (let id in subscribers) {
            let res = subscribers[id];
        res.end();
        }
    }

    if (!module.parent) {
        http.createServer(accept).listen(8080);
        console.log("Server running on port 8080");
    } else {
        exports.accept = accept;

        if (process.send) {
            process.on("message", (msg) => {
                if (msg === "shutdown") {
                    close();
                }
            });
        }

        process.on("SIGINT", close);
    }
}