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


// バブリング、event.composedPath()
// イベントバブリングではフラット化されたDOMが使用される
// スロット化された要素が存在し、その中のどこかでイベントが発生した場合、そのイベントは<slot>まで上方にバブリングする
/*
    <user-card id="userCard">
        #shadow-root
            <div>
                <b>Name:</b>
                <slot name="username">
                    <span slot="username">John Smith</span>
                </slot>
            </div>
    </user-card>
*/


// カスタムイベント
// カスタムイベントをディスパッチすると、コンポーネントの外にバブルさせるためにbubblesとcomposedの両方のプロパティをtrueに設定する必要がある
/*
    <div id="outer"></div>

    <script>
    outer.attachShadow({mode: "open"});

    let inner = document.createElement("div");
    outer.shadowRoot.append(inner);

    document.addEventListenner("test", event => alert(event.detail));

    inner.dispatchEvent(new CustomEvent("test", {
        bubbles: true,
        composed: true,
        detail: "composed"
    }));

    inner.dispatchEvent(new CustomEvent("test", {
        bubbles: true,
        composed: false,
        detail: "not composed"
    }));
    </script>
*/