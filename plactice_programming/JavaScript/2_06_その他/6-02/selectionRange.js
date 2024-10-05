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
// 大きな選択を作成してみる
// 開始と終了をテキストノードで相対オフセットとしてセットするだけ
/*
    <p id="p">Example: <i>italic</i> and <b>bold</b></p>

    <script>
        let range = new Range();

        range.setStart(p.firstChild, 2);
        range.setEnd(p.querySelector('b').firstChild, 3);

        alert(range); // ample: italic and bol

        // 選択にこの範囲を使用する
        window.getSelection().addRange(range);
    </script>
*/


// 範囲（range）プロパティ
// 上の例で作成した範囲（range）オブジェクトは次のプロパティをもつ
// ・startConteiner, startOffset: 開始店のノードとオフセット
// ・endContainer, endOffset: 終了点のノードとオフセット
// ・collapsed: 真偽値, rangeの開始/終了点が同じ場合はtrue
// ・commonAncestorContainer: range内のすべてのノードの最も近い共通の祖先


// 範囲（range）選択メソッド
// 判を操作するための便利なメソッドがたくさんある
// 範囲の開始を設定:
// ・setStart: node内のoffsetの位置に開始点を設定する
// ・setStartBefore: nodeの直前を開始点に設定する
// ・setStartAfter: nodeの直後を開始点に設定する
// 範囲の終了を設定:
// ・setEnd: node内のoffsetの位置に終了点を設定する
// ・setEndBefore: nodeの直前を終了点に設定する
// ・setEndAfter: nodeの直後を終了点に設定する

// 技術的にはsetStart/setEndはなんでもできるが、より多くのメソッドでさらに便利になる
// これらのメソッドはすべて、nodeはテキストあるいは要素ノード両方になれる
// テキストノードの場合offsetは文字をスキップする一方で、要素ノードは子ノードをスキップする

// 範囲（range）を作成するためのメソッドがほかにもある
// ・selectNode(node): node全体を選択するような範囲を設定する
// ・selectNodeContents(node): nodeのコンテンツ全体を選択するような範囲を設定する
// ・collapse(toStart): toStart=trueの場合end=start、そうでなければstart=endを設定する
// ・cloneRange(): 同じ開始/終了点をもつ新しい範囲を作成する


// 範囲（range）編集メソッド
// 一度範囲(range)を作成し、次のようなメソッドを使用することでコンテンツを操作することができる
// ・deleteContents(): ドキュメントから範囲のコンテンツを削除する
// ・extractContents(): ドキュメントから範囲のコンテンツを削除し、DocumentFragmentとして返却する
// ・cloneContents(): 範囲のコンテンツをクローンし、DocumentFragmentとして返却する
// ・inserNode(node): ドキュメントの範囲の先頭にnodeを挿入する
// ・surroundContents(node): nodeで範囲コンテンツをラップする

/* ボタンクリックで選択範囲に対しメソッドを実行し、"resetExample"でリセットする

    <p id="p">Example: <i>italic</i> and <b>bold</b></p>

    <p id="result"></p>
    <script>
        let range = new Range();

        // Each demonstrated method is represented here:
        let methods = {
            deleteContents() {
                range.deleteContents()
            },
            extractContents() {
                let content = range.cloneContents();
                result.innerHTML = "";
                result.append("extracted: ", content);
            },
            cloneContents() {
                let content = range.cloneContents();
                result.innerHTML = "";
                resule.append("cloned: ", content)
            },
            inserNode() {
                let newNode = document.createElement('u');
                newNode.innerHTML = "NEW NODE";
                range.insertNode(newNode);
            },
            surroundContents() {
                let newNode = document.createElement('u');
                try {
                    range,surrounedContents(newNode);
                } catch(e) { alert(e) }
            },
            resetExample() {
                p.innerHTML = `Example: <i>italic</i> and <b>bold</b>`;
                result.innerHTML = "";

                range.setStart(p.firstChild, 2);
                range.setEnd(p.querySelector('b').firstChild, 3);

                window.setSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }
        };

        for (let method in methods) {
            document.write(`<div><button onclick="methods.${method}()">${method}</button></div>`);
        }

        methods.resetExample();
    </script>
*/