"use strict";


// Template要素
// 組み込みの<template>要素はHTMLマークアップテンプレートの格納場所として機能する
// ブラウザがこれらのコンテンツは無視する
// JavaScriptではアクセスし、他の要素を作るのに使うことができる
// template内のコンテンツは通常適切な囲みタグを必要とする場合でも有効なHTMLになる
/*
    <template>
        <tr>
            <td>Contents</td>
        </tr>
    </template>
*/

// 通常、例えば<div>の中に<tr>を置こうとすると、ブラウザは無効なDOM構造であることを検知し
// それを修正しようとして前後に<table>タグを追加する
// <template>はそこに置いたものを正確に維持する
/*
    <template>
        <style>
            p { font-weight: bold; }
        </style>
        <script>
            alert("Hello");
        </script>
    </template>
*/

// templateの挿入
// テンプレートのコンテンツは、contentプロパティでDocumentFragmentとして利用できる
// ある特別な性質を除くと、他のDOMノードたちと同じように扱うことができる
/*
    <template id="tmpl">
        <script>
            alert("Hello");
        </script>
        <div class="message">Hello, world!</div>
    </template>

    <script>
        let elem = document.createElement("div");

        // なんども再利用するため、テンプレートのコンテンツをクローンする
        elem.append(tmpl.content.cloneNode(true));

        document.body.append(elem);
    </script>
*/

// 前のチャプターのShadowDOMの例を<template>を使って書き直す
/*
    <template id="tmpl">
        <style> p { font-weight: bold; }</style>
        <p id="message"></p>
    </template>

    <div id="elem">Click me</div>

    <script>
        elem.onclick = function() {
            elem.attachShadow({mode: "open"});

            elem.shadowRoot.append(tmpl.content.cloneNode(true));

            elem.shadoRoot.getElementById("message").innerHTML = "Hello form the shadows";
        };
    </script>
*/

/*
    <div id="elem">
        #shadow-root
            <style> p { font-weight: bold; } </style>
            <p id="message"></p>
    </div>
*/