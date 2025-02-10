"use strict";


// ShadoDOMスロット、コンポジション
// タブ、メニューイメージギャラリーなど多くのコンポーネントはレンダリングをするのにコンテンツを必要とする
/*
    <custom-menu>
        <title>Candy menu</title>
        <item>Lollipop</item>
        <item>Fruit Toast</item>
        <item>Cup Cake</item>
    </custom-menu>
*/


// 名前付きスロット
// 簡単な例でslotがどのように動くか確認する
/*
    <script>
        customElements.define("user-card", class extends HTMLElement {
            connectedCallback() {
                this.attachShadow({mode: "open"});
                this.shadowRoot.innerHTML = `
                    <div>Name:
                        <slot name="username"></slot>
                    </div>
                    <div>Birthday:
                        <slot name="birthday"></slot>
                    </div>
                `;
            }
        });
    </script>

    <user-card>
        <span slot="username">John Smith</span>
        <span slot="birthday">01.01.2001</span>
    </user-card>
*/