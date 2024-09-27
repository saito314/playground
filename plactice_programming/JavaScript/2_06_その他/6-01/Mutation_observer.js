"use strict";


// Mutation observer
// MutationObserverはDOM要素を監視し、変更があった場合にコールバックを起動する組み込みのオブジェクト


// 構文
{
    // コールバック関数を引数にもつオブザーバを作成する
    let observer = new MutationObserver(callback);

    // DOMノードにアタッチする
    observer.observe(node, config);
}

// configはブール値のオプションをもつオブジェクトで"どの種類の変更に反応するか"を指定する
// ・childList: nodeの直接の子の変更
// ・subtree: nodeのすべての子孫に対する変更
// ・attributes: nodeの属性変更
// ・attributeFilter: 指定したものだけを監視するための属性の配列
// ・characterData: node.dataを監視するかどうか

// ・attributeOldValue: trueの場合、コールバックに属性の鍼灸療法の値を渡す。そうでなければ新しいもののみを渡す
// ・characterDataOldValue: trueの場合、コールバックにnode.dataの新旧両方の値を渡す。そうでなければ新しいもののみを渡す

// その後、任意の変更後にcallbackが実行される。
// その際、最初の引数にはMutationRecordオブジェクトのリスト、2番目の引数にはオブザーバ自体が与えられる

// MutationRecordオブジェクトは次のプロパティを持っている
// type
// ・attributes: 属性が変更された
// ・characterData: データが変更された
// ・childList: 要素が追加/削除された
// target
// ・addedNodes/removeNodes: 追加/削除されたノード
// ・previousSibling/nextSibling: 追加/削除されたノードの前後の兄弟
// ・attributeName/attributeNamespace: 変更された属性の名前/ネームスペース
// ・oldValue: 以前の値。属性あるいはテキストの変更の場合のみ

// 例: ここにはcontentEditable属性をもつ<div>がある。この属性を指定するとフォーカスしたときに編集することができる
/*
    <div contentEditable id="elem">Click and <b>edit</b>, prease</div>

    <script>
        let observer = new MutationObserver(mutationRecords => {
            console.log(mutationRecords); // console.log(the changes)    
        });

        // 属性以外のすべてを監視する
        observe(elem, {
            childList: true, // 直接の子を監視する
            subtree: true, // 子孫たちも
            characterDataOldValue: true // コールバックに古い値も渡す
        });
    </script>
*/

// <div>にフォーカスし<b>edit</b>内のテキストを変更すると、console.logにmutation(変化)が表示される
/*
    mutationRecords = [{
        type: "characterData",
        oldValue: "edit",
        target: <text node>,
        // ほかのプロパティは空です
    }];
*/

// <b>edit</b>を削除すると、mutationイベントは複数のmutation recordsを含む
/*
    mutationRecords = [{
        type: "childList",
        target: <div#elem>,
        removeNodes: [<b>],
        nextSibling: <text node>,
        previousSibling: <text node>
        // 他のプロパティは空
    }, {
        type: "characterData",
        target: <text node>
        // ...詳細は、ブラウザがどのように変更を処理するかによって異なる
        // 2つの隣接するノード"Edit "と", please"を1つのノードに合体するかもしれない。
        // あるいは、単に"Edit"の後の余分なスペースを削除する可能性もある。
    }];
*/


// 統合するための使用法
// MutationObserverを使用することで、好ましない要素がDOMに表示された場合にそれを検出し、削除することができる
// 別の状況としては3rdパーティのスクリプトが我々のドキュメントに何かを追加した際に、それを検出し動的にリサイズするなどページに適合させたい場合が考えられる。


// アーキテクチャのための使用法
// また、Mutationがアーキテクチャの観点からみていい状況もある
/*
    ...
    <pre class="language-javascript"><code>
        // ここにコード
        let hello = "world";
    </code></pre>
    ...
*/

// より読みやすくすると同時に、より美しくするためにPrism.jsのようなJavaScriptのシンタックスハイライトライブラリを使用する
// Prism.highlightElem(pre)が呼ばれ、pre要素の内容が検査され、ここのページ例と同じように色付きの構文ハイライトが追加される。
{
    // ページ上のすべてのコードスニペットをハイライト表示する
    document.querySelectorAll('pre[class*="language"]').forEach(Prism.highlightElem);
}

// 例：WebサーバからHTMLの記事を取得し、オンデマンドでそれを表示する
/*
    let article = // サーバから新しいコンテンツを取得する
    articleElem.innerHTML = article;
*/

// 次では記事をロードするコードへその呼び出しを追加することができる
/*
    let article = // サーバから新しいコンテンツを取得する
    articleElem.innerHTML = article;

    let snippets = articleElem.querySelectorAll('pre[class*="language"]');
    snippets.forEach(Prism.highlightElem);
*/

// ページに挿入されたコードスニペットを自動で検出し、それらをハイライト表示するために、MutationObserverが使える。
// それにより、私たちはハイライト機能を一か所で処理することができ、統合の必要性から解放される


// 動的なハイライト表示のデモ