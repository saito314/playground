"use strict";

// 誤字あり：ここでは、document.body の背景色を変更するのに、style.background を使用していますが、以下のようにたに多くのプロパティがあります:
// DOM を調べるにつれて、DOMをに対して JavaScript を適用したいことがあります。例えば、ノードを取得して修正するコードを実行し、その結果を確認る、です。 ここでは、Elementsタブとコンソールの間を移動する tips をいくつか紹介します。

// DOMツリー
// HTMLドキュメントのバックボーンはタグ
// DOMによるとすべてのHTMLタグはオブジェクト
// すべてのオブジェクトはJavaScriptでアクセス可能であり、これらを使用してページが変更できる
{
    // 3秒間<body>が赤になる
    document.body.style.baxkground = "red"; // 背景が赤になる

    setTimeout(() => document.body.style.baxkground = "", 3000); // 3秒後元に戻る
}

// ここではdocument.bodyを使用しているが、以下のように似た多くのプロパティがある
// ・innerHTML - ノードのHTMLコンテンツ
// ・offsetWidth - ノードの幅
// など


// DOMの例
// 例えばこのドキュメントに対するDOMを調べてみる
/*
    <!DOCTYPE HTML>
    <html>
    <head>
        <title>Abount elks</title>
    </head>
    <body>
        The truth about elks.
    </body>
    </html>
*/

// すべてのツリーノードはオブジェクトである。
// タグは要素ノードと呼ばれ、ツリー構造を形成する
// <html>がルート<head>, <body>がその子、と言った構造
// 要素内のテキストはテキストノードを形成し、#textとラベル付けされる
// テキストノードは文字列だけを含み、子を持たないため常にツリーの葉になる
// スペースと改行は文字や数字と同様に完全に有効な文字である。
// 例えば、上記の例では<head>タグは<title>の前にいくつかのスペースが含まれており
// そのテキストは#textノードになる
// そこには2つだけ、トップレベルの除外がある
// 1. <head>の前のスペースと改行は歴史的な理由から無視される
// 2. HTMLスペックでは全てのコンテンツが<body>の内側でなければならないため、
//    </body>の後に何かを置いた場合、最後にそれらは自動的にbodyの中に移動される

// スペースがないテキストノードは下記の通り
/*
    <!DOCTYPE HTML>
    <html><head><title>About elks</title></head>The truth about elks.</body></html>
*/


// 自動補正
// ブラウザが不正な形式のHTMLに遭遇した場合、DOM作成時に自動補正する
// 例えばトップタグは常に<html>であり、ドキュメントの中になくてもDOMの中に存在することになる
// <body>についても<html>タグと同様
// もしHTMLファイルが"Hello"だけだった場合、ブラウザはそれを<html>と<body>でラップし、
// 必須の<head>を追加する
// 以下のように"無効な"ドキュメントの場合
/*
    <p>Hello
    <li>Mom
    <li>and
    <li>Dad
*/
// このような場合でもタグを読みかけた部分を復元し、通常のDOMになる



// 他の種類のノード
// 要素とテキストノード以外にも、他の種類のノードがある
// 例えば、コメント
/*
    <!DOCTYPE HTML>
    <html>
    <body>
        The truth about elks.
        <ol>
            <li>An elk is a smart.</li>
            <!-- comment -->
            <li>...and cunning animal!</li>
        </ol>
    </body>
    </html>
*/

// HTMLに何かがある場合は、DOMツリーにもなければならないルールが存在する
// HTML上のすべて、たとえコメントでもDOMの一部になる
