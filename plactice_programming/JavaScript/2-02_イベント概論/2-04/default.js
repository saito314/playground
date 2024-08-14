"use strict";

// ブラウザのデフォルト動作
// リンクのクリック：URLにいく
// フォーム内のサブミットボタンのクリック：サーバへの送信を開始する
// テキスト上でマウスボタンを押し、移動する：テキストを選択する

// JavaScriptでイベント処理をしているとデフォルト動作が必要ないことがよくある
// ブラウザの動作を防ぐ
// eventオブジェクトを使う方法
// ハンドラを使って割り当てられている場合、そこからfalseを返すだけで実現できる
// 下記の例ではリンククリックしてもURLが変更されない
/*
    <a href="/" onclick="return false">Click here</a>
    or
    <a href="/" onclick="event.preventDefault()">here</a>
*/

// 例：メニュー
// サイトのメニューを考える
/*
    <ul id="menu" class="menu">
        <li><a href="/html">HTML</a></li>
        <li><a href="/javascript">JavaScript</a></li>
        <li><a href="/css">CSS</a></li>
    </ul>
*/

// マークアップで<a>タグを使用するが、通常はJavaScriptでクリックを処理することを意図する
// そのため、デフォルトのブラウザ動作を防ぐ必要がある
{
    menu.onclick = function(event) {
        if (event.target.nodeName != "A") return;

        let href = event.target.getAttribute("href");
        alert(href);

        return false;
    }
}

// さらなるイベントの防止
// あるイベントは別のものへと流れる。最初のイベントを防いだ場合、2つめはない。
/*
    <input value="Focus works" onfocus="this.value=''">
    <input onmousedown="return false" onfocus="this.value=''" value="Click me">
*/

// event.defaultPrevented
// デフォルトアクションが防がれた場合、event.defaultPreventedはtrueで、それ以外はfalse
// バブリングの停止が必要に見える例を見てみる
// 実際にはバブリングを止める必要はない
/*
    <button>Right-click for browser context menu</button>

    <button oncontextmenu="alert('Draw our menu'); return false">
        Right-click for our context menu
    </button>
*/

// 今、オプションを使用した独自のドキュメント全体のコンテキストメニューを実装したいとする
// そしてドキュメント内には独自のコンテキストメニューを持つほかの要素がある可能性がある
/*
    <p>Right-click here for the document context menu</p>
    <button id="elem">Right-click here for the button context menu</button>

    <script>
        elem.oncontextmenu = function(event) {
            event.preventDefault();
            alert("Button context menu");
        };

        document.oncontextmenu = function(event) {
            event.preventDefault();
            alert("Document context menu");
        };
    </script>
*/

// 問題はelemのクリック時2つのメニューを取得する：ボタンレベルとドキュメントレベルのメニュー
// 修正方法はボタンハンドラの中でイベントを完全に処理し、それを止めることでevent.stopPropagation()を使う
/*
    <p>Right-click for the document menu</p>
    <button id="elem">Right-click for the button menu (fixed with event.stopPropagation)</button>

    <script>
        elem.oncontextmenu = function(event) {
            event.preventDefault();
            event.stopPropagation();
            alert("Button context menu");
        };

        document.oncontextmenu = function(event) {
            event.preventDefault();
            alert("Document context menu");
        };
    </script>
*/

// これでボタンレベルのメニューは期待通りに動作する
// しかし、コストは高外部コードの右クリックに関する情報へのアクセスは拒否される
/*
    <p>Right-click for the document menu (fixed with event.defaultPrevented)</p>
    <button id="elem">Right-click for the button menu</button>

    <script>
        elem.oncontextmenu = function(event) {
            event.preventDefault();
            alert("Button context menu");
        };

        document.oncontextmenu = function(event) {
            if (event.defaultPrevented) return;

            event.preventDefault();
            alert("Document context menu");
        };
    </script>
*/