"use strict";

// 誤字？：しかし、多くの異なるものに対する入り口としても単一のハンドラを使うことができます、
// 移譲：イベントの委譲を使用して、特別な属性やクラスを使用して、宣言的 に要素に “振る舞い” を追加することもできます。

// キャプチャリングとバブリングでイベント移譲というハンドリングを実装することができる
// 例を見てみる
/*
    <table>
        <tr>
            <th colspan="3"><em>Bagua</em> Chart: Direction, Element, Color, Meaning</th>
        </tr>
    <tr>
        <td>...<strong>Northwest</strong>...</td>
        <td>...</td>
        <td>...</td>
    </tr>
    <tr>...2 more lines of this kind...</tr>
    <tr>...2 more lines of this kind...</tr>
    </table>
*/

// 例えばクリックしたときに<td>セルを強調表示したい
// event.targetを使ってみる
{
    let selectedTd;

    table.onsclick = function(event) {
        let target = event.target; // どこがクリックされた？

        if (target.tagMame != "TD") return;

        Highlight(target); // 強調する
    };

    function highlight(td) {
        if (selectedTd) {
            selectedTd.classList.remove("highlight");
        }
        selectedTd = td;
        selectedTd.classList.add("highlight"); // 新しいIDを強調表示する
    }
}

// table.onclickハンドラでは、このようなevent.targetを取り、クリックが<td>の中で行われたか否かを知る必要がある
{
    table.onclick = function(event) {
        let td = event.target.closest("td");

        if (!td) return;

        if (!table.contains(td)) return;

        highlight(td);
    };
}

// 移譲サンプル：マークアップ内のアクション
// 多くの異なるものに対する入り口としても単一のハンドラを使うことができる
// data-action属性を追加してみる
/*
    <div>
        <button data-action="save">Save</button>
        <button data-action="load">Load</button>
        <button data-action="search">Search</button>
    </div>

    <script>
        class Menu {
            constructor(elem) {
                this._elem = elem;
                elem.onclick = this.onClick.bind(this);
            }

            save() {
                alert("saving");
            }

            load() {
                alert("loading");
            }

            search() {
                alert("searching");
            }

            onClick(event) {
                let action = event.target.dataset.action;
                if (action) {
                    this[action]();
                }
            };
        }

        new Menu(menu);
    </script>
*/

// 振る舞いのパターン
// イベントの移譲を利用して、特別な属性やクラスを使用して、宣言的に要素に振る舞いを追加することもできる
// Counter
/*
    Counter: <input type="button" value="1" data-counter>
    One more counter: <input type="button" value="2" data-counter>

    <script>
        document.addEventListener("click", function(event)) {

            if (event.taeget.dataset.counter != undefined) {
                event.target.value++;
            }
        });
    </script>
*/

// Togger
// もう1つの例。属性data-toggle-idを持つ要素をクリックすると、指定されたidの要素が表示/非表示になる
/*
    <button data-toggle-id="subscribe-mail">
        Show the subscription from
    </button>

    <from id="subscribe-mail" hidden>
        Your mail: <input type="email">
    </from>

    <script>
        document.addEventListener("click", function(event) {
            let id = event.target.dataset.toggleId;
            if (!id) return;

            let elem = document.getElementById(id);

            elem.hidden = !elem.hidden;
        });
    </script>
*/