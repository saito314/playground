"use strict";

// ブラウザ環境、スペック
// JavaScriptのプラットフォームはブラウザ、Webサーバ、あるいは別のホストなど
// 実行可能であれば多岐にわたる
// また、それらのプラットフォームは固有の機能を提供する
// これをJavaScriptスペックではホスト環境と呼んでいる


// 例えば、WebブラウザでJavaScriptが実行されている場合を考える
// windowと呼ばれる"ルート"オブジェクトが存在し、2つの役割をもつ
// 1. JavaScriptコードのグローバルオブジェクトである
// 2. ブラウザウィンドウを表し、ウィンドウを制御するためのメソッドを提供する
{
    // 例えばここではグローバルオブジェクトとして使う
    function sayHi() {
        alert("Hello");
    }

    // グローバル関数はwindowのプロパティとしてアクセス可能
    window.sayHi();
}

{
    // また、ここではウィンドウの高さを見るためにブラウザウィンドウとして使う
    alert(window.innerHeight); // 内部のwindowの高さ
}

// DOM(ドキュメントオブジェクトモデル)
// ページ全体のコンテンツを変更可能なオブジェクトとして表現する
// documentオブジェクトはページメインの"エントリーポイント"
{
    // 例
    // 背景色を赤に変える
    document.body.style.background = "red";

    // 1秒後に戻す
    setTimeout(() => document.body.style.background = "", 1000);
}

// BOM(HTML使用の一部)
// document以外のすべてと連携するブラウザ(ホスト環境)により提供される追加オブジェクト
// 例えば
// navigatorオブジェクトはブラウザとオペレーティングシステムのバックグラウンドの情報を提供する
// locationオブジェクトは現在のURLを読み、ブラウザを新しいURLへリダイレクトできる
{
    // locationオブジェクトを使用する例
    alert(location.href); // 現在のURLを表示
    if (confirm("Go to wikipedia?")) {
        location.href = "https://wikipedia.org"; // 別のURLへのリダイレクト
    }
}

