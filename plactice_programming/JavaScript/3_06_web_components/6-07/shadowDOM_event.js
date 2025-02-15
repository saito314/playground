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