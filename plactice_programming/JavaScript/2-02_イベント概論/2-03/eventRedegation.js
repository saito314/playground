"use strict";

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