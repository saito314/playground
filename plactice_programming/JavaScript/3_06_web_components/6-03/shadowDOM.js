"use strict";


// Shadow DOM
// ShadowDOMはカプセル化に役立つ
// コンポーネントは独自のshadowDOMツリーをもつことができる


// 組み込みのShadowDOM
// ブラウザはそれらを描画するために内部的にDOM/CSSを使う。
// そのDOM構造は通常隠されているが、開発者ツールで見ることができる
// 通常のJavaScript呼び出しやセレクタでは組み込みのshadowDOM要素を取得することはできない
// 便利な属性pseudoが確認できる
/*
    <style>
        input::-webkit-slider-runnable-track {
            background: red;
        }
    </style>

    <input type="range">
*/


// Shadow tree
// DOM要素には2種類のDOMのサブツリーがある
// 1. Light tree - HTMLの子からなる
// 2. Shadow tree - 隠されたDOMサブツリー
// 要素が両方含んでいる場合、ブラウザはshadowtreeのみをレンダリングする
// 例えばこの<show-hello>要素は自身の内部DOMをshadow treeを隠す
/*
    <script>
        customElements.define("show-hello", class extends HTMLElement {
            connectedCallback() {
                const shadow = this.attachShadow({mode: "open"});
                shadow.innerHTML = `<p>
                    Hello, ${this.getAttribute("name")}
                    </p>`
            }
        });
    </script>

    <show-hello name="John"></show-hello>
*/


// attachShadowで返却されるShadow rootは要素のようなもので、innerHTMLやappendといったDOMメソッドを使うことができる
// shadow rootをもつ要素は"Shadow tree host"とよばれ、shadow rootのhostプロパティとして利用できる
{
    alert(elem.shadowRoot.host === elem);
}