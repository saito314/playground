"use strict";

// ウィンドウサイズとスクローリング
// ルートドキュメント要素はdocument.documentElementその要素は<html>の対応し、前のチャプターで説明したジオメトリプロパティを持っている


// ウィンドウの幅/高さ
// 理論上はルートドキュメント要素はdocumentElement.clientWidth/Heightであり
// すべてのコンテンツを囲むので、フルサイズをdocumentElement.scrollWidth/scrollHeightで測定できる
// しかし、Chrome/Safari/Operaでは、スクロールがない場合、documentElement.scrollHeightは
// documentElement.clientHeightよりも小さいかもしれない
// 信頼できるウィンドウサイズを取得するために、それらのプロパティの最大をとる必要がある
{
    let scrollHeight = Math.max(
        document.body.scrollHeight, document.documentElement.scrollHeight,
        document.body.offsetHeight, document.documentElement.offsetHeight,
        document.body.clientHeight, document.documentElement.clientHeight
    );

    alert(`Full document height, with scrolled out part: ` + scrollHeight);
}

// 現在のスクロールを取得する
// 通常の要素はelem.scrollLeft/scrollTopに現在のスクロール状態を持っている
{
    alert("Current scroll from the top: " + window.pageYOffset);
    alert("Curremt scroll from the left: " + window.pageXOffset);
}


// スクローリング
// 通常の要素はscrollTop/scrollLeftを変更することでスクロールすることができる
// ページに対して同じことができる
// Chrome/Safari/Operaを除くすべてのブラウザ:
//      document.documentElement.scrollTop/Leftを使う
// Chrome/Safari/Operaの場合:
//      document.body.scrollTop/Leftを使う


// scrollIntoView
// elem.scrollIntoView(top)は完全性のためのもう1つのメソッド
// elem.scrollIntoView(top)への呼び出しはelemが見えるようにページをスクロールする


// スクロールを禁止する
// 私たちはドキュメントをスクロール不可にする必要がある
// 例えば、すぐに注意を必要とするようなサイズの大きなメッセージを伝える必要があるとき
// 訪問者にはドキュメントではなく、そのメッセージをやりとりすることを望む
// ドキュメントをスクロール不可にするためには、document.body.style.overflow = "hidden"を設定すれば十分