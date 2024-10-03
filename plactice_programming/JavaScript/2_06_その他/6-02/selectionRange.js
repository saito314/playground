"use strict";


// 選択（Selection）と範囲（Range）
// JavaScriptを利用して選択状態を取得したり、全体あるいは一部分の選択/選択解除、ドキュメントから選択した部分を削除、タグへのラップなどを行うことができる


// 範囲（Range）
// 選択の基本的な概念は範囲（Range）で基本的には境界点（範囲の開始と終了）のペア
// Rangeオブジェクトはパラメータなしで作成できる
{
    let range = new Range();
}

// range,setStart(node, offset)とrange.setEnd(node, offset)を使用して選択の境界を設定できる
// テキストを部分的に選択
// 興味深いことは両方のメソッドの最初の引数nodeはテキストノード、あるいは要素ノードで、2つ目の引数の意味はその種類による
// nodeがテキストノードの場合、offsetはそのテキストでの位置になる
/*
    <p id="p">Hello</p>
    <script>
        let range = new Range();
        range.setStart(p.firstChild, 2);
        range.setEnd(p.firstChild, 4);

        // rangeのtoStringはテキストとしてコンテンツを返す
        console.log(range); // ll
    </script>
*/

// 要素ノードの選択
// 一方、nodeが要素ノードであればoffsetは子供の番号になる
// これはテキスト内のどこかで停止するのではなく、ノード全体を含む範囲を作成する場合に便利
/*
    <p id="p">Example: <i>italic</i> and <b>hold</b></p>
*/

// "Example: <i>italic</i>"の範囲を作成する
// これはインデックス0と1をもつ<p>の先頭から2つの子
// ・開始位置は親のnodeとして<p>を、オフセットは0を持つ
// ・終了位置も親ノードとして<p>を持ちますが、オフセットとしては2になる
/*
    <p id="p">Example: <i>italic</i> and <b>hold</b></p>

    <script>
        let range = new Range();

        range.setStart(p, 0);
        range.setEnd(p, 2);

        // rangeのtoStringはそのコンテンツをテキストとして返す
        alert(range); // Example: italic

        // このrangeをドキュメントの選択に適用する
        document.getSelection().addRange(range);
    </script>
*/

// これはより柔軟な例で多くのパターンを試せる
/*
    <p id="p">Example: <i>italic</i> and <b>hold</b></p>

    From <input id="start" type="number" value=1> - To <input id="end" type="number" value=4>
    <button id="button">Click to select</button>
    <script>
        button.onclick = () => {
            let range = new Range();

            range.setStart(p, start.value);
            range.setEnd(p, end.value);

            // apply the selection, explained later
            document.getSelection().removeAllRanges();
            document.getSelection().addRange(range);
        };
    </script>
*/


// より大きなフラグメントの選択