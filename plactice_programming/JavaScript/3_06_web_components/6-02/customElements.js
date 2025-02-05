"use strict";


// Custom elements
// 独自のメソッドやプロパティ、イベントを持つ独自のクラスで記述されたカスタムHTML要素を作成することができる
// 一度カスタム要素を定義されると、組み込みのHTML要素と同じようにそれを使用できる。
// Custom elementsには2種類ある
// ・自立型カスタム要素
// ・カスタマイズされた組み込み要素
{
    class MyElements extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            // ブラウザが要素がdocumentに追加された時にこれを呼ぶ
        }

        disconnectedCallback() {
            // ブラウザは要素がdocumentから削除された時にこれを呼ぶ
        }

        static get observedAttributes() {
            return {/* 変更を監視する属性名の配列 */}
        }

        attributeChangedVallback(name, oldValue, newValue) {
            // 上で上げたいずれかの属性が変更されたときに呼ばれる
        }

        adoptedCallback() {
            // 要素が新しいdocumentに移動されたときに呼ばれる
        }
    }
}

// この後に要素を登録する必要がある
{
    customElements.define("my-element", MyElement);
}


// 例: "time-formatted"
// 例えば日付/時刻に関して、HTMLにはすでに<item>が存在する
// ですが、それ自体では何もフォーマットは行わない
// 言語を意識したフォーマットで時刻を表示する<time-formatted>要素を作成する
/*
    <script>
        class TimeFormatted extends HTMLElement {

            connectedCallback() {
                let date = new Date(this.getAttribute("datetime") || Date.now());

                this.innerHTML = new Intl.DateTimeFormat("default", {
                    year: this.getAttribute("year") || undefined,
                    month: this.getAttribute("month") || undefined,
                    day: this.getAttribute("day") || undefined,
                    hour: this.getAttribute("hour") || undefined,
                    minute: this.getAttribute("minute") || undefined,
                    second: this.getAttribute("second") || undefined,
                    timeZoneName: this.getAttribute("time-zone-name") || undefined,
                }).format(date);
            }
        }

        cunstomElements.define("time-formatted", TimeFormatted);
    </script>


    <time-formatted datetime="2019-12-01"
        year="numeric" month="long" day="numeric"
        hour="numeric" minute="numeric" second="numeric"
        time-zone-name="short"
    ></time-formatted>
*/


// 属性を監視する
// <time-formatted>の現在の実装では要素のレンダリング後、それ以上属性変更しても影響を与えない
// observedAttributes()の性的なgetterに属性のリストを指定することで、属性を監視することができる
/*
    <script>
        class TimeFormatted extends HTMLElement {

            render() {
                let date = new Date(this.getAttribute("datetime") || Date.now());

                this.innerHTML = new Intl.DateTimeFormat("default", {
                    year: this.getAttribute('year') || undefined,
                    month: this.getAttribute('month') || undefined,
                    day: this.getAttribute('day') || undefined,
                    hour: this.getAttribute('hour') || undefined,
                    minute: this.getAttribute('minute') || undefined,
                    second: this.getAttribute('second') || undefined,
                    timeZoneName: this.getAttribute('time-zone-name') || undefined,
                }).format(date);
            }

            connectedCallback() {
                if (!this.rendered) {
                    this.render();
                    this.rendered = true;
                }
            }

            static get observedAttributes() {
                return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
            }

            attributeChangedCallback(name, oldValue, newValue) {
                this.render();
            }
        }

        customElements.define("time-formatted", TimeFormatted);
    </script>

    <time-formatted id="elem" hour="numeric" minute="numeric" second="numeric"></time-formatted>

    <script>
        setInterval(() => elem.setAttribute('datetime', new Date()), 1000); // (5)
    </script>
*/


// レンダリング順
// HTMLパーサーがDOMを構築するとき、要素は次々に処理される
// これはカスタム要素に対して重要な結果をもたらす
// 例えば、カスタム要素がconnectedCallbackの中でinnerHTMLにアクセス仕様としても何も得られない
/*
    <script>
        customElements.define("user-info", class extends HTMLElement{
        
            connectedCallback() {
                alert(this.innerHTML);
            }
        });
    </script>

    <user-info>John</user-info>
*/