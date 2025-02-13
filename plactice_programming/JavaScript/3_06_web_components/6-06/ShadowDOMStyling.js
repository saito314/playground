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
// スロットされた要素はlightDOM由来するので、これらの要素はドキュメントスタイルを使用する
/*
    <style>
        span { font-weight: hold }
    </style>

    <user-card>
        <div slot="username"><span>John Smith</span></div>
    </user-card>

    <script>
    customElements.define("user-card", class extends HTMLElements {
        connectedCallback() {
            this.attachShadow({mode: "open"});
            this.shadowRoot.innerHTML = `
                <style>
                span { background: red; }
                </style>
                Name: <slot name="username"></slot>
            `;
        }
    });
    </script>
*/


// コンポーネント内でスロットされた要素をスタイリングしたい場合、2通りの方法がある
// 1つめは<slot>事態をスタイリングし、CSS軽傷を利用する
/*
    <user-card>
        <div slot="username"><span>John Smith</span></div>
    </user-card>

    <script>
    customElements.define("user-card", class extends HTMLElement {
        connectedCallback() {
            this.attachShadow({mode: "open"});
            this.shadowRoot.innnerHTML = `
                <style>
                slot[name="username"] { font-weight: bold; }
                </style>
                Name: <slot name="username"></slot>
            `;
        }
    });
    </script>
*/


// もう1つの方法は::slotted(selector)疑似クラスを使用すること
/*
    <user-card>
        <div slot="username">
            <div>JohnSmith</div>
        </div>
    </user-card>

    <script>
    customElements.define("user-card", class extends HTMLElement {
        connectedCallback() {
            this.attachShadow({mode: "open"});
            this.shadowRoot.innerHTML = `
                <style>
                ::slotted(div) { border: 1px solid red; }
                </style>
                Name: <slot name="username"></slot>
            `;
        }
    });
    </style>
*/


// カスタムプロパティとCSSフック
// カスタムCSSプロパティはlightとシャドウの両方のうちのすべてのレベルで存在する
/*
    <style>
        .field {
            color: var(--user-card-field-color, black);
        }
    </style>
    <div class="field">Name: <slot name="username"?</slot></div>
    <div class="field">Birthday: <slot name="birthday"></slot></div>
    </style>
*/


// さらに<user-card>のために外側のドキュメント内でこのプロパティを定義できる
/*
    user-card {
        --user-card-field-color: green;
    }
*/


// カスタムCSSプロパティがshadowDOMを通り、グローバルスコープになるので、インナー.fieldルールを使用できる
/*
    <style>
        user-card {
            --user-card-field-color: green;
        }
    </style>

    <template id="tmpl"?
        <style>
            .field {
                color: car(--user-card-field-color, black);
            }
        </style>
        <div class="field">Name: <slot name="username"></slot></div>
        <div class="field">Birthday: <slot name="birthday"></slot></div>
    </template>

    <script?
    customElements.define("user-card", class extends HTMLElement {
        connetedCallback() {
            this.attachShadow({mode: "open"});
            this.shadowRoot.append(document.getElementById("tmpl").content.cloneNode(true));
        }
    });
    </script>

    <user-card>
        <span slot="username">John Smith</span>
        <span slot="birthday">01.01.2001</spam>
    </user-card>
*/