"use strict";


// ShadowDOMスタイリング
// ShadowDOMのスタイリングには<style>と<link rel="stylesheet" href="...">の両方のタグを含める方法がある
// 一般的なルールとして、ローカルスタイルはShadowツリーの中でのみ作用する


// :host
// :hostセレクターがシャドウホスト（Shadowツリーを含む要素）を選択できる
/*
    <template id="tmpl">
    <style>
        :host {
            position: fixed;
            left: 50%;
            top: 50%;
            trasform: translate(-50%, -50%);
            display: inline-block;
            border: 1px solid red;
            padding: 10px;
        }
    </style>
    <slot></slot>
    </template>

    <script>
    customElements.define("custom-dialog", class extends HTMLElement {
        connectedCallback() {
            this.attachShadow({mode: "open"}).append(tmpl.content.cloneNode(true));
        }
    });
    </script>

    <custom-dialog>
        Hello!
    </custom-dialog>
*/


// cascading
// シャドウホストはlightDOMの中にあり、CSSルールに影響される
// :hostとドキュメントの両方にスタイルされたプロパティがある場合は、ドキュメントのスタイルが優先される
/*  例えば
    <style>
        custom-dialog {
            padding: 0;
        }
    </style>
*/
// このような場合には<custom-dialog>のパディングは無しになる


// :host(selector)
// :hostと同様に、シャドウホストがselectorにマッチする場合にのみ適用される
/*
    <template id="tmpl">
        <style>
            :host([centered]) {
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                border-color: blue;
            }
            
            :host {
                display: inline-block;
                border: 1px solid red;
                padding: 10px;
            }
        </style>
        <slot></slot>
    </template>

    <script>
    customElements.define("custom-dialog", class extends HTMLElement {
        connectedCallback() {
            this.attachShadow({mode: "open"}).append(tmpl.content.cloneNode(true));
        }
    });
    </style>

    <custom-dialog centered>
        中央ぞろえです
    </custom-dialog>

    <custom-dialog>
        中央にそろっていません
    </custom-dialog>
*/


// :host-context(selector)
// :hostと同様ですが、シャドウホストあるいはドキュメントの外側の祖先にマッチする場合のみselectorは適用できる
/*
    <body class="dark-theme">
        <custom-dialog>...</custom-dialog>
    </body>
*/


// スロットコンテンツのスタイリング
// 