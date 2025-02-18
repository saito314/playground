"use strict";


// ShadowDOMとイベント
// shadowDOM内で発生するイベントがコンポーネントの外でキャッチされると、そのイベントはターゲットとしてshadowホスト要素を持つ
/*
    <user-card></user-card>

    <script>
    customElements.define("user-card", class extends HTMLElement {
        connectedCallback() {
            this.attachShadow({mode: "open"});
            this.shadowRoot.innerHTML = `<p>
                <button>Click me</button>
            </p>;
            this.shadowRoot.firstElmentChild.onclick = 
                e = > alert("Inner target: " + e.target.tagName);
        }
    });

    document.onclick =
        e => alert("Outer target: " + e.target.tagName);
    </script>
*/

// リターゲティングは物理的にlightDOM内に存在するスロット化された要素上でイベントが起こった場合には発生しない
/*
    <user-card id="userCard">
        <span slot="username">John Smith</span>
    </user-card>

    <script>
        customElements.define("user-card", class extends HTMLElement {
            connectedCallback() {
                this.attachShadow({mode: "open"});
                this.shadowRoot.innerHTML = `<div>
                    <b>Name:</b> <slot name="username"></slot>
                </div>`;

                this.shadowRoot.firstElementChild.onclick = 
                    e => alert("Inner target" + e.target.tagName);
            }
        });

        userCard.onclick = e => alert(`Outer target: ${e.target.tagName}`);
    </script>
*/