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