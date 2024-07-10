"use strict";

// DOMノードクラス
// 異なるDOMノードは異なるプロパティを持つ
// 階層ルートはEventTargetで、これはNodeにより継承されている
// EventTarget - ルートの抽象クラス。このクラスのオブジェクトは生成されない
// Node - DOMノードの基底として機能する。parentNode, nextSibling, childNodesなどの機能を提供する。
// Elements - DOM要素のベースクラス。nextElementsSibling, children, getElementsByTagName, querySelector等の検索メソッドといった要素レベルのナビゲーションを提供する。
// HTMLElement - 最終的にすべてのHTML要素のベースクラス。色々なHTML要素がこれを継承している。


// DOMノードのクラスは通常constructorプロパティを持っている
{
    alert(document.body.constructor.name);
}

// もしくはそのtoString
{
    alert(document.body);
}

// また、継承チェックにinstanceofを使うこともできる
{
    alert(document.body instanceof HTMLBodyElement); // true
    alert(document.body instanceof HTMLElement); // true
    alert(document.body instanceof Element); // true
    alert(document.body instanceof Node); // true
    alert(document.body instanceof EventTarget); // true
}

// ブラウザ、console.dir(elem)を使った要素の出力でも簡単に見ることができる
// コンソールでは、HTMLElements.prototype, Element.prototype


// "nodeType"プロパティ
// elem.nodeType == 1は要素ノード
// elem.nodeType == 3はテキストノード
// elem.nodeType == 9はドキュメントオブジェクト
/*
    例えば...
    <body>
        <script>
        let elem = document.body;

        // それが何かを調べてみる
        alert(elem.nodeType); // 1 => element

        // 最初の子は...
        alert(elem.firstChild.nodeType);

        // ドキュメントオブジェクトは、タイプ9
        alert(document.nodeType);
        </script>
    </body>
*/

// タグ: nodeNameとtagName
{
    // 与えられたDOMノードに対して、nodeNameまたはtagNameプロパティでそのタグの名前を見ることができる
    alert(document.body.nodeName);
    alert(document.body.tagName);
}

/*
    <body>
        <script>
            // for comment
            alert(document.body.firstChild.tagName);
            alert(document.body.firstChild.nodeName);

            // for document
            alert(document.tagName);
            alert(document.nodeName);
        </script>
    </body>
*/


// innerHTML: コンテンツ
// innerHTMLプロパティが要素内のHTMLを文字列として取得することができる
/*
    <body>
        <p>A paragraph</p>
        <div>A div</div>

        <script>
            alert(document.body.innerHTML); // 現在の内容を読む
            document.body.innerHTML = "The new BODY!"; // 置き換える
        </script>
    </body>
*/

/*
    無効なHTMLを挿入しようとすると、ブラウザはエラーを修正する
    <body>
        <script>
            document.body.innerHTML = "<b>test"; // タグのクローズ忘れ
            alert(document.body.innerHTML); // <b>test</b> (修正された)
        </script>
    </body>
*/


// 注意："innerHTML+="は完全な置き換えをする
// elem.innerHTML+="何か"を使って"より多くのHTML"を追加することができる
{
    chatDiv.innerHTML += "<div>Hello<img src='smile.gif'/> !</div>";
    chatDiv.innerHTML += "How goes?";
}

// 技術的には下記の2つは同じ
{
    elem.innerHTML += "...";
    elem.innerHTML = elem.innerHTML + "..."
}

// この場合、innerHTMLは次のことを示す
// 1. 古いコンテンツは削除される
// 2. 代わりに新しいinnerHTMLが書かれる
// コンテンツが完全に取り除かれ、最初から書き直されると全ての画像やその他のリソースがリロードされる


// outerHTML: 要素の完全なHTML
// outerHTMLプロパティは要素の完全なHTMLを含む。
/*
    // 例
    <div id="elem">Hello <b>World</b></div>

    <script>
        alert(elem.outerHTML); // <div id="elem">Hello <b>World</b></div>
    </script>
*/

// innerHTMLとは違い、outerHTMLへの書き込みは要素を変更しない
// 代わりに、DOMで置き換えられる
/*
    <div>Hello, World!</div>

    <script>
        let div = document.querySelector("div");

        // div.outerHTMLを<p>...</p>に置き換え
        div.outerHTML = "<p>A new element!</p>";

        // なんと! divはまだ同じ
        alert(div.outerHTML); // <div>Hello, World!</div>
    </script>
*/


// codeValue/data: テキストノードのコンテンツ
// innerHTMLプロパティは要素ノードに対してのみ有効
/*
    テキストノードのコンテンツ
    <body>
        Hello
        <!-- Comment -->
        <script>
            let text = document.body.firstChild;
            alert(text.data); // Hello

            let comment = text.nextSibling;
            alert(comment.data); // Comment
        </script>
    </body>
*/

/*
    開発者がHTMLの中に情報やテンプレートの説明を埋め込むことがある
    <!-- if isAdmin -->
    <div>Welcome, Admin!</div>
    <!-- /if -->
*/


// textContent: 純粋なテキスト
// textContentは要素内のテキストへのアクセスを提供する
/*
    <div id="news">
        <h1>Headline!</h1>
        <p>Martians attack people!</p>
    </div>

    <script>
        // Headlines! Martians attack people!
        alert(news.textContent);
    </script>
*/
// textContentへの書き込みは非常に役に立つ
// なぜならテキストを安全な方法で書くことができるから

// 例えばユーザによって入力された任意の文字列を表示したいとする
// innerHTMLを使用すると、すべてのHTMLタグを一緒にHTMLとして挿入する
// textContentを使用すると、全てのシンボルは文字として取り扱われテキストとして挿入される
/*
    2つを比較する
    <div id="elem1"></div>
    <div id="elem2"></div>

    <script>
        let name = prompt("What's your name?", "<b>Winnie-the-pooh!</b>");

        elem1.innerHTML = name;
        elem2.textContent = name;
    </script>
*/

// hiddenプロパティ
// hidden属性とDOMプロパティは要素が見えるかどうかを指定する
/*
    <div>Both divs below are hidden</div>

    <div hidden>With the attribute "hidden"</div>

    <div id="elem">JavaScript assigned the property "hidden"</div>

    <script>
        elem.hidden = true;
    </script>
*/

// 技術的にはhiddenはstyle="display:none"と同じ動き
/*
    <div id="elem">A blinking element</div>

    <script>
        setInterval(() => elem.hidden = !elem.hidden, 1000);
    </script>
*/


// その他のプロパティ
// DOM要素には追加のプロパティ、特にクラスに依存するプロパティもある
/*
    // 例
    <input type="text" id="elem" value="value">

    <script>
        alert(elem.type); // "text"
        alert(elem.id); // "elem"
        alert(elem.value); // value
    </script>
*/