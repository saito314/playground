"use strict";

// ドキュメントの変更
// DOMの変更は動的なページ
// 例：メッセージを表示
// alertよりも見栄えの良いメッセージをページに追加する方法を考える
/*
    <style>
        .alert {
            padding: 15px;
            border: 1px solid #d6e9c6
            border-radius: 4px;
            color: #3c763d;
            background-color: #dff0d8;
        }
    </style>

    <div class="alert">
        <strong>Hi there!</strong> You've read an important message.
    </div>
*/

// 要素の作成
// DOMノードを作成するメソッドが2つある
// document.createElement(tag)
// 指定されたタグの新しい要素ノードを作成する
{
    let div = document.createElement("div");
}

// document.createTextNode(text)
// 指定されたテキストの新しいテキストノードを作成する
{
    let textNode = document.createTextNode("Here I am");
}

// メッセージの作成
// メッセージのdivの作成は次の3つのステップになる
{
    // 1. <div>要素の作成
    let div = document.createElement("div");

    // 2. クラスに"alert"をセット
    div.className = "alert";

    // 3. コンテンツをセットする
    div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";
}
// 要素は作成されたが、divという変数があるだけでページにはまだ挿入されていない


// 挿入メソッド
// divを表示するためにはdocumentのどこかに挿入する必要がある
// 例えば、document.bodyで参照できる<body>要素の中
// document.body.appendChild(div)
/*
    <style>
    .alert {
        padding: 15px;
        border: 1px solid #d6e9c6;
        border-radius: 4px;
        color: #3c763d;
        background-color: #dff0d8;
    }
    </style>

    <script>
        let div = document.createElement("div");
        div.className = "alert alert-success";
        div.innerHTML = "<strong>Hi there!</strong> You've read an important message."

        document.body.appendChild(div);
    </script>
*/
// ここではdocument.bodyに対してappendを呼び出したが、他の要素の場合でもappendでその中に要素を置くことができる
/*
    <ol id="ol">
        <li>0</li>
        <li>1</li>
        <li>2</li>
    </ol>

    <script>
        ol.before("before"); // <ol>の前に文字列"before"を挿入する
        ol.after("after"); // <ol>の後に文字列"after"を挿入する

        let liFirst = document.createElement("li");
        liFirst.innerHTML = "append";
        ol.append(liFirst); // <ol>の先頭にliFirstを挿入する

        let liLast = document.createElement("li");
        liLast.innerHTML = "append";
        ol.append(liLast); // <ol>の末に文字列liLastを挿入する
*/

// 最終的に次のようなリストになる
/*
    before
    <ol id="ol">
        <li>prepend</li>
        <li>0</li>
        <li>1</li>
        <li>2</li>
        <li>append</li>
    </ol>
    after
*/

// これらのメソッドを1回呼び出しで複数のノードやテキストのリストを挿入できる
/*
    <div id="div"></div>
    <script>
        div.before("<p>Hello</p>", document.createElement("hr"));
    </script>
*/

// すべてのテキストはテキストとして挿入される
// そのため、最終的なHTMLは次のようになる
/*
    &lt;p&gt;Hello&lt;/p&gt;
    <hr>
    <div id="div"></div>
*/


// insertAdjacentHTML/Text/Element
// elem.insertAdjacentHTML(where, html)
// 最初のパラメータは文字列で、elemを基準にした挿入場所を指定する
// 2つ目のパラメータは"そのまま"挿入されるHTML文字列
/*
    <div id="div"></div>
    <script>
        div.insertAdjacentHTML("beforebegin", "<p>Hello</p>");
        div.insertAdjacentHTML("afterend", "<p>Bye</p>");
    </script>
*/
// insertAdjacentHTMLだけが使われる

/*
    メッセージを表示する別の方法
    <style>
    .alert {
        padding: 15px;
        border: 1px solid #d6e9c6;
        border-radius: 4px;
        color: #3c763d;
        background-color: #dff0d8;
    }
    </style>

    <script>
        document.body.insertAdjacentHTML("afterbegin", `<div class="alert alert-success">
        <strong>Hi there!</strong> You've read an important message.
        </div>`);
    </script>
*/


// ノードの削除
// ノードを削除するためのnode.remove()メソッドがある
/*
    <style>
    .alert {
        padding: 15px;
        border: 1px solid #d6e9c6;
        border-radius: 4px;
        color: #3c763d;
        background-color: #dff0d8;
    }
    </style>

    <script>
        let div = document.createElement("div");
        div.className = "alert";
        div.innerHTML = "<strong>Hi there!</strong> You've read an important message.";

        document.body.append(div);
        setTimeout(() => div.remove(), 1000);
    </script>
*/

// すべての挿入メソッドは自動的に前の場所からノードを削除する
/*
    <div id="first">First</div>
    <div id="second">Second</div>
    <script>
        // 削除呼び出しは不要
        second.after(first); // #secondを取り、そのあとに#firstを挿入する
    </script>
*/


// ノードのクローン: cloneNode
// 似たようなメッセージを複数挿入したい場合がある
/*
    メッセージをコピーする例
    <style>
    .alert {
        padding: 15px;
        border: 1px solid #d6e9c6;
        border-radius: 4px;
        color: #3c763d;
        background-color: #dff0d8;
    }
    </style>

    <div class="alert" id="div">
        <strong>Hi there!</strong> You've read an important message.
    </div>

    <script>
        let div2 = div.cloneNode(true); // メッセージをクローン
        div2.querySelector("strong").innerHTML = "Bye there!"; // クローンを変更

        div.after(div2); // 既存のdivの後にdiv2を表示
    </script>
*/


// DocumentFragment
// DocumentFragmentはノードにリストを渡すためのラッパーとして機能する特別なDOMノード
// DocumentFragmentへ他のノードに追加することができる
/*
    getListContentは<li>のアイテムのフラグメントを生成し、後で<ul>に挿入される
    <ul id="ul"></ul>

    <script>
        function getListContent() {
            let fragment = new DocumentFragment();

            for (let i = 1; i <= 3; i++) {
                let li = document.createElement("li");
                li.append(i);
                fragment.append(li);
            }

            return fragment;
        }

        ul.append(getListContent());
    </script>
*/

/*
    DocumentFragmentはめったに使用されず、代わりにノードの配列を返すことができる
    <ul id="ul"></ul>

    <script>
        function getListContent() {
            let result = [];

            for (let i = 1; i <= 3; i++) {
                let li = document.createElement("li");
                li.append(i);
                result.push(li);
            }

            return result;
        }

        ul.append(...getListContent()); // append + "..." oparator = friends!
    </script>
*/

// 古典的な挿入/削除メソッド
// 古典的なDOMメソッドもある

// parentElem.appendChild(node)
/*
    <ol id="list">
        <li>0</li>
        <li>1</li>
        <li>2</li>
    </ol>

    <script>
        let newLi = document.createElement("li");
        newLi.innerHTML = "Hello, world!";

        list.appendChild(newLi);
    </script>
*/

// parentElem.insertBefore(node, nextSibling)
/*
    <ol id="list">
        <li>0</li>
        <li>1</li>
        <li>2</li>
    </ol>

    <script>
        let newLi = document.createElement("li");
        newLi.innerHTML = "Hello, world!";

        list.insertBefore(newLi, list.Children[1]);
    </script>
*/

// parentElem.replaceChild(node, oldChild)
/*
    <ol id="list">
        <li>0</li>
        <li>1</li>
        <li>2</li>
    </ol>

    <script>
        let li = list.firstElementChild;
        list.removeChild(li);
    </script>
*/

// "document.write"について
// webページに何かを追加する非常に古い方法がある
/*
    <p>Somewhere in the page...</p>
    <script>
        document.write("<b>Hello from JS</b>");
    </script>
    <p>The end</p>
*/

// document.writeの呼び出しはページがロードされている間だけ動作する
/*
    <p>After one second the contents of this page will be replace...</p>
    <script>
        // 1秒後にdocument.writeをする
        // それはページがロードされた後のため既存コンテンツを削除する
        setTimeout(() => document.write("<b>...By this.</b>"), 1000);
    </script>
*/