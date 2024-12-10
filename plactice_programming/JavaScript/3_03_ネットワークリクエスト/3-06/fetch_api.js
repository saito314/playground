"use strict";


// Fetch API
// 以下は指定可能なすべてのfetchオプションとそのデフォルト値のリスト
{
    let promise = fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "text/plain;charset=UTF-8"
        },
        body: undefined,
        referrer: "about:client",
        referrerPolicy: "no-referrer-when-downgrade",
        mode: "cors",
        credentials: "same-origin",
        cache: "default",
        redirect: "follow",
        integrity: "",
        keepalive: false,
        signal: undefined,
        window: window
    });
}

// referrer, referrerPolicy
// これらのオプションはfetchがどのようにHTTPRefererへヘッダを設定するかを管理する
// referrerオプションにより現在のオリジン内の任意のRefererを設定するか、それを無効にすることができる
{
    fetch("/page", {
        referrer: ""
    });
}

// 現在のオリジン内の別のURLを設定するには次のようにする
{
    fetch("/page", {
        // https://javascript.infoにいる想定です
        // 任意のRefererヘッダが設定できますが、現在のオリジン内のみです
        referrer: "https://javascript.info/anotherpage"
    });
}

// referrerPolicyオプションはRefererに対する一般的なルールを設定する
// referrerを完全に隠したい場合:
{
    fetch("https://another.com/page", {
        referrerPolicy: "no-referrer"
    });
}
// リモート側でリクエストがどこから来たのかを確認したい場合には、URLのオリジン部分だけを送ることができる
{
    fetch("https://another.com/page", {
        referrerPolicy: "scrict-origin"
    });
}

// mode
// modeオプションはクロスオリジンリクエストを防ぐ安全装置として機能する
// これはfetchURLがサードパーティから来たもので、クロスオリジンの機能を制限するために機能をオフにしたい場合に役立つ


// credentials
// credentialsオプションはfetchがリクエストと一緒にcookieとHTTP-Authorizationヘッダを送るべきかを指定するもの。


// cache
// デフォルトでは、fetchリクエストは標準のHTTPキャッシングを使用する。
// ExpiresやCache-Controlヘッダに従ったり、If-Modified-Sinceを送信したりする。
// cacheオプションを使うことで、HTTPキャッシュを無視あるいはその使い方を調整することができる


// redirect
// 通常、fetchは301や302などのように、HTTPリダイレクトに透過的に従う。
// redirectオプションでそれを変更することができる


// inregrity
// intergrityオプションは、レスポンスが既知のチェックサムに一致するかを確認することができる
// サポートされているハッシュ関数はSHA-256, SHA-384とSHA-512であり、ブラウザによっては他のものがあるのかもしれない
{
    fetch("http://site.com/file", {
        integrity: "sha256-abc"
    });
}


// keepalive
// keepaliveオプションはリクエストがページよりも長生きする可能性があることを意味する
// 例えば、ユーザ体験を向上させるために、現在の訪問者がどのように我々のページをい使用しているかに関する養鶏を収集するとする
// 訪問者がページを離れるとき、それをサーバ上に保存したいとする
{
    window.onunload = function() {
        fetch("/analytics", {
            method: "POST",
            body: "statistics",
            keepalive: true
        });
    };
}