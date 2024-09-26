"use strict";


// リソースの読み込み: onloadとonerror
// ブラウザは外部リソース - スクリプト、iframes、画像など - の読み込みを追跡することができる
// ・onload: ロードに成功した
// ・onerror: エラーが発生した


// スクリプトの読み込み
// 外部スクリプトにある関数を呼び出す必要があるとする
// 次のようにして動的にロードすることができる
{
    let script = document.createDocumentFragment("script");
    script.src = "my.js";

    document.head.append(script);
}

// スクリプトの読み込みまで待つ必要があり、そのあとに初めて呼び出すことができる


// script.onload
// 主なヘルパーはloadイベント。スクリプトがロードされ、実行された後にトリガされる
{
    let script = document.createElement("script");

    // 任意のドメインから任意のスクリプトがロードできる
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.3.0/lodash.js";
    document.head.append(script);

    script.onload = function() {
        // スクリプトはヘルパー関数 "_" を作る
        alert(_); // 関数は利用可能
    };
}

// onloadでは、スクリプト変数の利用や関数の実行などが可能


// script.onerror
// スクリプトの読み込み中に発生したエラーがerrorイベントで追跡することが可能
// 存在しないスクリプトを要求してみる
{
    let script = document.createElement("script");
    script.src = "https://example.com/404.js"; // こんなスクリプトは存在しない
    document.head.append(script);

    script.onerror = function() {
        alert("Error loading " + this.src); // Error loading https://example.com/404.js
    };
}

// ほかのリソース
// loadとerrorイベントは他のリソースに対しても機能する
// 例えば<img>, <link>
// これらはどちらもloadとerrorの両方のイベントは期待通り動作する
// <iframe>
// iframeの読み込みが完了したときのloadイベントのみ
// ロードが成功した場合とエラーが発生した場合の両方をトリガーする。