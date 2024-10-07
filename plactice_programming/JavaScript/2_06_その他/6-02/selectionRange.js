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


// 選択（Selection）
// Rangeは選択範囲を管理するための汎用オブジェクト
// ドキュメントの選択はSelectionオブジェクトで表現され、window.getSelection()あるいはdocument.getSelection()で取得できる


// Selectionプロパティ
// 理論上、選択には複数の範囲が含まれる場合がある。
// これらの範囲オブジェクトは次のメソッドを使用して取得できる
// getRangeAt(i): 0から始まるi番目の範囲を取得する

// 範囲（range）と同様に選択に始点と終点があり、それぞれanchor、focusとよばれる
// 主なSelectionプロパティは次のもの:
// ・anchorNode: selectionの始点のあるnode
// ・anchorOffset: selectionの始点のanchorNodeでのオフセット
// ・focusNode: selectionの終点のあるnode
// ・focusOffset: selectionの終点のfocusNodeでのオフセット
// ・isCollapsed: selectionが未選択あるいは存在しない場合trueになる
// ・rangeCount: selectionにふくまれるrangeの数


// Selectionイベント
// 選択範囲を追跡するためのイベントがある
// ・elem.onselectstart: elemで選択が開始されたとき。例えばユーザがボタンを押しながらマウスを動かし始めたとき
// ・document.onselectionchange: 選択範囲が変更されたとき


// 選択範囲の追跡デモ
// これは選択境界の変更に応じて動的に選択境界を表示する小さなデモ
/*
    <p id="p">Select me: <i>italic</i> and <b>bold</b></p>

    From <input id="from" disabled> - To <input id="to" disabled>
    <script>
        document.onselectionchange = function() {
            let selection = document.getSelection();

            let {anchorNode, anchorOffset, focusNode, focusOffset} = selection;

            // anchorNodeとfocusNodeは通常テキストノード
            from.value = `${anchorNode?.data}, offset ${anchorOffset}`;
            to.value = `${focusNode?.data}, offset ${focusOffset}`;
        };
    </script>
*/


// 選択(selection)のコピーデモ
// 選択されたコンテンツをコピーする2つのアプローチがある
// 1. document.getSelection().toString()を使用してテキストとして取得できる
// 2. DOMノードとして: 基底となる範囲を取得し、それらのcloneContents()を呼び出す
/*
    <p id="p">Select me: <i>italic</i> and <b>bold</b></p>

    Cloned: <span id="cloned"></span>
    <br>
    As text: <span id="astext"></span>

    <script>
        document.onselectionchange = function() {
            let sekection = document.getSelection();

            cloned.innerHTML = astext.innerHTML = "";

            // rangeからDOMノードをクローンする
            for (let i = 0; i < selection.rangeCount; i++) {
                cloned.append(selection.getRangeAt(i).cloneContents());
            }

            // テキストとして取得
            astext.innerHTML += selection;
        };
    </script>
*/


// selectionメソッド
// rangeの追加/削除をするためのselectionメソッド:
// ・getRangeAt(i): 0から始まるi番目のrangeを取得
// ・addRange(range): 選択範囲にrangeを追加する
// ・removeRange(range): selectionからrangeを削除する
// ・removeAllRanges(): すべてのrangeを削除する
// ・empty(): removeAllaRangesのエイリアス

// またRangeなしで選択範囲を直接操作するための便利なメソッドがある:
// ・collapse(node, offset): 選択されたrangeを指定されたnodeの位置offsetで開始および終了するrangeに置き換える
// ・setPosition(node, offset): collapseのエイリアス
// ・collapseToStart(): 選択範囲の始点に折りたたむ
// ・collapseToEnd(): 選択範囲の終点に折りたたむ
// ・extend(node, offset): 選択範囲のfocusを指定されたnodeの位置offsetに移動する
// ・setPaseAndExtent(anchorNode, anchorOffset, focusNode, focusOffset): 選択範囲のrangeを指定された始点と終点に置き換える
// ・selectAddChildren(node): nodeのすべての子を選択
// ・deleteFromDocument(): ドキュメントから選択されたコンテンツを削除する
// ・containsNode(node, allowPartialContainment = false): 選択範囲がnodeを吹くかチェックする


/*  段落<p>のコンテンツ全体を選択するには次のようにする
    <p id="p">Select me: <i>italic</i> and <b>bold</b></p>

    <script>
        // <p>の0番目の子から最後の子までを選択
        document.getSelection().setBaseAndExtent(p, 0, p, p.childNodes.length);
    </script>
*/

/*
    <p id="p">Select me: <i>italic</i> and <b>bold</b></p>

    <script>
        let range = new Range();
        range.selectNodeContents(p); // or selectNodes(p)で<p>タグも選択する

        document.getSelection().removeAllRanges(); // 存在する選択範囲をクリアする
        document.getSelection().addRange(range);
    </script>
*/


// フォームコントロール
// inputやtextareaといったフォーム要素はSelectionやRangeオブジェクトなしで、選択のための特別なAPIを提供する
/*
    <textarea id="area" style="width:80%;height:60px">
    Selecting in this text updates values below.
    </textarea>
    <br>
    From <input id="from" disabled> - To <input id="to" disabled>

    <script>
        area.onselect = function() {
            from.value = area.selectionStart;
            to.value = area.selectionEnd;
        };
    </script>
*/


// 例: カーソルの移動
// 選択範囲を設定するselectionStartとselectionEndを変更することができる
/*
    <textarea id="area" style="width:80%;height:60px">
    Focus on me, the cursor will be at position 10.
    </textarea>

    <script>
        area.onfocus = () => {
            // ブラウザの"focus"アクションが終了した後に実行させるためのゼロ遅延のsetTimeout
            setTimeout(() => {
                // 任意の選択を設定できる
                // 開始 = 終了の場合、カーソルはまさにその場所
                area.selectionStart = area.selectionEnd = 10;        
            });
        };
    </script>
*/


// 例: 選択の変更
// 選択内容を変更するには、input.setRangeText()メソッドが利用できる。
// selectionStart/Endを読み取り、選択に関する知識があればvalueの対応する部分文字列を変更することはできるが、setRangeTextはより強力で、多くの場合より便利
/*
    <input id="input" style="width:200px" value="Select here and click the button">
    <button id="button">Wrap selection in stars *...*</button>

    <script>
        button.onclick = () => {
            if (input.selectionStart == input.selectionEnd) {
                return; // なにも選択されていない
            }
            
            let selected = input.value.slice(input.selectionStart, input.selectionEnd);
            input.setRangeText(`*${selected}*`);
        };
    </script>
*/


// 引数を増やすことで、範囲のstartとendを設定することができる
/*  入力テキストから"THIS"を見つけ、それを置き換え、置換された選択範囲を維持する
    <input id="input" style="width:200px" value="Replace THIS in text">
    <button id="button">Replace THIS</button>

    <script>
        button.onclick = () => {
            let pos = input.value.indexOf("THIS");
            if (pos >= 0) {
                input.setRangeText("*THIS*", pos, pos + 4, "select");
                input.focus(); // 選択を見えるようにするためのfocus
            }
        };
    </script>
*/