"use strict";

// DOMは要素やコンテンツに対して様々なことができますが、最初に対応するDOMオブジェクトに到達する必要がある
// DOM上のすべての操作はdocumentオブジェクトから始まる
// そこから任意のノードにアクセスできる


// トップ：documentElementとbody
// 最上位のツリーノードはdocumentプロパティとして直接利用可能
// <html> = document.documentElement
// <body> = document.body
// <head> = document.head

// 子：childNodes, firstChild, lastChild
// これから使う2つの用語がある
// 子ノード：直接の子要素。与えられた要素にネストされている
// 子孫：：子要素、さらにその子要素など、指定された要素にネストされた全ての要素
/*
    例えばここで<body>は子<div>と<ul>を持つ
    <html>
    <body>
        <div>Begin</div>

        <ul>
            <li>
                <b>Information</b>
            </li>
        </ul>
    </body>
    </html>
*/

// また、<body>のすべての子孫は、直接の子<div>や<ul>だけでなく、
// <li>や<b>のようなさらにネストされた要素を含むサブツリー全体
/*
    以下はdocument.bodyの子を表示する
    <html>
    <body>
        <div>Begin</div>

        <ul>
            <li>Information</li>
        </ul>

        <div>End</div>

        <script>
            for (let i = 0; i < document.body.childNodes.length; i++) {
                alert(document.body.childNodes[i]);
            }
        </script>
        ...他の要素...
    </body>
    </html>
*/

// 興味深い点はスクリプト実行時にはscript要素の後の要素を見つけることができない
// また、プロパティfirstChildとlastChildは最初の最後の子への高速なアクセスができる
{
    // これらは単なる簡略表記
    elem.childNodes[0] === elem.firstChild;
    elem.childNodes[elem.childNodes.length - 1] === elem.lastChild;
}

// 子ノードがあるかどうかをチェックするための特別な関数elem.hasChildNodes()もある


// DOMコレクション
// childNodesは配列のように見えるが実際には配列ではなくコレクション
// 特別な配列ライクで反復可能なオブジェクト
// 重要な点1：反復する際にfor...ofが使える
{
    for (let node of document.body.childNodes) {
        alert(node); // コレクションのすべてのノードを表示する
    }
}

// 重要な点2：配列でないため、配列メソッドは動作しない
// alert(document.body.childNodes.filter); // undefined
// これはArray.from()で本当の配列を作ることができるので許容できる
{
    alert(Array.from(document.body.childNodes).filter);
}

// 兄弟と親
// 兄弟は同じ親の子ノード
// 例えば、<head>と<body>は兄弟
/*
    <html>
        <head>...</head><body>...</body>
    </html>
*/

// 次のノードはnextSiblingであり、前のノードはpreviousSibling
// 親はparentNodeとして利用可能
{
    // 例えば
    // <body>の親は<html>
    alert(document.body.parentNode === document.documentElement); // true

    // <head>の後は<body>にいく
    alert(document.head.nextSibling); // HTMLBodyElement

    // <body>の前は<head>
    alert(document.body.previousSibling); // HTMLHeadElement
}


// Element-only navigation
// ChildNodesでは、テキストノード、要素ノードの両方を、さらに存在する場合にはコメントノードを見ることができる
// しかし、多くのタスクではテキストノードやコメントノードは必要ない
// タグを表し、ページ構造を形成する要素ノードを操作したい
// 要素ノードだけを考慮に入れたナビゲーションリンクをもっと見てみる

// リンクは上で与えられたものと似ていて、Elementという言葉が内部にある
// children: 要素ノードの子のみ
// firstElementChild, lastElementChild: 最初/最後の要素の子
// previousElementSibling, nextElementSibling: 隣の要素
// parentElement: 親の要素

// 上記の例を修正して要素のみが表示されるようにする
/*
    <html>
    <body>
        <div>Begin</div>

        <ul>
            <li>Information</li>
        <ul>

        <div>End</div>

        <script>
            for (let elem of document.body.children) {
                alert(elem);
            }
        </script>
        ...
    </body>
    </html>
*/


// 他のリンク: tables
// 今まで基本的なナビゲーションプロパティを学習した
// 特定の種類のDOM要素は便宜上、その種類に固有の追加のプロパティを提供することがある
// <table>要素は次のプロパティをサポートする
// table.rows : テーブルの<tr>要素のコレクション
// table.caption/tHead/tFoot: 要素<caption><thead><tfoot>への参照
// table.tBodies: <tbody>要素のコレクション
// tbody.rows: 内側の<tr>コレクション
// <tr>
// tr.cells: 与えられた<tr>の中の<td>と<th>セルの集合
// re.sectionRowIndex: 囲んでいる<tbody>/<tfoot>の内部にある与えられた<tr>の番号
// tr.rowIndex: テーブル内の<tr>番号
// <td>と<th>
// td.cellIndex: <tr>で囲まれている内側でのセル番号

/*
    使用例
    <table id = "table">
        <tr>
            <td>one</td><td>two</td>
        </tr>
        <tr>
            <td>three</td><td>four</td>
        </tr>
    </table>

    <script>
        // "two"のtdを取得
        let td = table.rows[0].cells[1];
        td.style.backgroundColor = "red"; // ハイライト
    </script>
*/