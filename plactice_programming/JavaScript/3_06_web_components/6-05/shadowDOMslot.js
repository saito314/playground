"use strict";

// 脱字：Shadow DOM 内の、名前を持たない最初の <slot> が “デフォルト” スロットです。Light DOM でどこにもスロットされていなすべてのノードを取得します。
// 誤植：どの要素がスロットに割り当てられているか、また逆にどのスロットに要素が割り当てられているのかを把握することができます。:


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


// ShadowDOMでは、<slot name="X">で"挿入位置"を定義する
// 次にブラウザは"コンポジション"を実行する
// LightDOMから要素を取得し、ShadowDOMの対応するスロットにレンダリングしていく。
/*
    <user-card>
        #shadow-root
            <div>Name:
                <slot name="username"></slot>
            </div>
            <div>Birthday:
                <slot name="birthday"></slot>
            </div>
        <span slot="username">John Smith</span>
        <span slot="birthdat">01.01.2001</span>
    </user-card>
*/

// ShadowDOMを作成したので、#shadow-rootの下にそれがあり、要素にはLightDOMとShadowDOM両方がある
// ブラウザがLightDOMに同じ名前を持つslot="..."を探し、レンダリングする
// これをflattenedDOMと呼ぶ
/*
    <user-card>
        #shadow-root
            <div>Name:
                <slot name="username">
                    <!-- スロット対象の要素はスロット内に挿入される -->
                    <span slot="username">John Smith</span>
                </slot>
            </div>
            <div>
                <slot name="birthday">
                    <span slot="birthday">01.01.2001</span>
                </slot>
            </div>
    </user-card>
*/


// フラット化されたDOMはレンダリングとイベント処理の目的でのみ存在する
// 一種の仮想であり、querySelectorを実行することで簡単に確認ができる
{
    // `<user-card>`の下にあるlightDOM<span>ノードはまた同じ場所にいる
    alert(document.querySelector("user-card span").length);
}


// 最上位の子だけがslot="..."属性を持つことができる
// slot="..."属性がシャドウホストの直接の子に対してのみ有効。ネストされた要素に対しては無視される
// ここでは2つ目の<span>は無視される
/*
    <user-card>
        <span slot="username">John Smith</span>
        <div>
            <!-- 無効なスロット、user-cardの直接の子である必要がある -->
            <span slot="birthday">01.01.2001</span>
        </div>
    </user-card>
*/


// LightDOMに同じスロット名を持つ複数の要素がある場合、それらは順々にスロットに追加される
/*
    <user-card>
        <span slot="username">John</span>
        <span slot="username">Smith</span>
    </user-card>
*/


// <slot name="username">に2つの要素を持つフラット化されたDOMになる
/*
    <user-card>
        #shadow-root
            <div>Name:
                <slot name="username">
                    <span slot="username">John</span>
                    <span slot="username">Smith</span>
                </slot>
            </div>
            <div>Birthday:
                <slot name="birthday"></slot>
            </div>
    </user-card>
*/


// スロットフォールバックコンテンツ
// <slot>の中に何かを置くとそれがフォールバックとなり、デフォルトのコンテンツになる
// ブラウザがLightDOMに対応するものがない場合にはこれを表示する
// このShadowDOMではLightDOMにslot="username"がなければAnonymousをレンダリングする
/*
    <div>Name:
        <slot name="username">Anonymous</slot>
    </div>
*/


// デフォルトスロット: 最初の名前のないスロット
// ShadowDOM内の名前を持たない最初の<slot>がデフォルトスロット
// LightDOMでどこにもすろっとされていないすべてのノードを取得する
// 例えば、ユーザに関するすべてのスロットなし情報を表示するデフォルトスロットを<user-card>に追加する
/*
    <script>
        customElements.define("user-card", class extends HTMLElement {
            connectedCallback() {
                this.attchShadow({mode: "open"});
                this.shadowRoot.innerHTML = `
                <div>Name:
                    <slot name="username"></slot>
                </div>
                <div>Birthday:
                    <slot name="birthday"></slot>
                </div>
                <fieldset>
                    <legend>Other information</legend>
                    <slot></slot>
                </fieldset>
                `;
            }
        });
    </script>

    <user-card>
        <div>I like to swim.</div>
        <span slot="username">John Smith</span>
        <span slot="birthday">01.01.2001</span>
        <div>...And play volleyball too!</div>
    </user-card>
*/


// すべてのスロットないのLightDOMのコンテンツはOther Imformationのフィールドセットに入る
// フラット化されたDOMは次のようになる
/*
    <user-card>
        #shadow-root
            <div>Name:
                <slot name="username">
                    <span slot="username">John Smith</span>
                </slot>
            </div>
            <div>Birthday:
                <slot name="birthday">
                    <span slot="birthday">01.01.2001</span>
                </slot>
            </div>
            <fieldset>
                <legend>About me</legend>
                <slot>
                    <div>I like to swim.</div>
                    <div>...And play volleyball too!</div>
                </slot>
            </fieldset>
    </user-card>
*/


// メニュー例
// このチャプターの冒頭で言及した<custom-menu>に戻る
// 要素を配置するのにスロットが使える
/*
    <custom-menu>
        <span slot="title">Candy menu</span>
        <li slot="item">Lollipop</li>
        <li slot="item">Fruit Toast</li>
        <li slot="item">Cup Cake</li>
    </custom-menu>
*/


// これは適切なスロットもつShadowDOMテンプレート
/*
    <template id="tmpl">
        <style></style>
        <div class="menu">
            <slot name="title"></slot>
            <ul><slot name="item"></slot></ui>
        </div>
    </template>
*/

// フラット化されたDOMは次のようになる
/*
    <custom-menu>
        #shadow-root
            <style></style>
            <div class="menu">
                <slot name="title">
                    <span slot="title">Candy menu</span>
                </slot>
                <ul>
                    <slot name="item">
                        <li slot="item">Lollipop</li>
                        <li slot="item">Fruit Toast</li>
                        <li slot="item">Cup Cake</li>
                    </slot>
                </ul>
            </div>
    </custom-menu>
*/


// オープン/クローズのためにclickハンドラの追加が必要
{
    customElements.define("custom-menu", class extends HTMLElements {
        connectedCallback() {
            this.attachShadow({mode: "open"});

            this.shadowRoot.append(tmpl.content.cloneNode(true));

            this.shadoRoot.querySelector('slot[name="title"]').onclick = () => {
                this.shadowRoot.querySelector(".menu").classList.toggle("closed");
            };
        }
    });
}


// スロットの更新
// ブラウザはスロットを監視し、スロット要素が追加/削除されるとレンダリングを更新する
// したがって、レンダリングを更新するために必要な事はないが、コンポーネントのコードがスロットの変更を知りたい場合にはslotchangeイベントを利用しないといけない
/*
    <custom-menu id="menu">
        <span slot="title">Candy menu</span>
    </custom-menu>

    <script>
    customElements.define("custom-menu", class extends HTMLElement {
        connectedCallback() {
            this.attachShadow({mode: "open"});
            this.shadowRoot.innerHTML = `<div class="menu">
                <slot name="title"></slot>
                <ul><slot name="item"></slot></ul>
            </div>`;

            // shadowRootはイベントハンドラを持たないため、最初の子を利用する
            this.shadowRoot.firstElementChild.addEventListenner("slotchange",
                e => alert("slotchange: " + e.target.name)
            );
        }
    });

    setTimeout(() => {
        menu.insertAdjacentHTML("beforeEnd", "<li slot="item">Lollipop</li>")
    }, 1000);

    setTimeout(() => {
        menu.querySelector('[slot="title"]').innerHTML = "New menu";
    }, 2000);
    </script>
*/


// Slot API
// どの要素がスロットに割り当てられているか、また逆にどのスロットに要素が割り当てられていないのかを把握することができる
// これらのメソッドは単にスロットコンテンツを表示するだけでなく、JavaScriptでそれを追跡する必要があるときに役立つ
/*
    <custom-menu id="menu">
        <span slot="title">Candy menu</span>
        <li slot="item">Lollipop</li>
        <li slot="item">Fruit Toast</li>
    </custom-menu>

    <script>
    customElements.define("custom-menu", class extends HTMLElements {
        items = []

        connectedCallback() {
            this.attachShadow({mode: "open"});
            this.shadowRoot.innerHTML = `<div class="menu">
                <slot name="title"></slot>
                <ul><slot name="item"></slot></ul>
            </div>`

            this.shadowRoot.firstElementChild.addEventListenner(`slotchange`, e => {
                let slot = e.target;
                if (slot.name == "item") {
                    this.items = slot.assignedElements().map(elem => elem.textContent);
                    alert("Items: " + this.items);
                }
            });
        }
    });

    setTimeout(() => {
        menu.insertAdjacentHTML("beforeEnd", '<li slot="item">Cup Cake</li>')    
    }, 1000);
    </script>
*/