"use strict";


// 誤字あり：Chromeような一部のブラウザでは、結果 getBoundingClientRect にプロパティ width と height も追加します。減算することでもそれらを取得することは可能です: height=bottom-top, width=right-left。



// 座標
// 要素を移動させるには、座標についてよく知っている必要がある
// ほとんどのJavaScriptメソッドは2つの座標系のいずれかを扱う
// 1. ウィンドウ(もしくは別のビューポート)の上/左を基準にする
// 2. ドキュメントの上/左を基準とする


// ウィンドウ座標: getBoundlingClientRect
// ウィンドウ座標はウィンドウの左上端から始まる
// メソッドelem.getBoundingClientRect()はプロパティを持つオブジェクトとしてelemに対するウィンドウ座標を返す
// ウィンドウ座標はドキュメントのスクロールアウト部分を考慮せず、ウィンドウの左上端から計算されたものになる
// 座標は少数の場合がある。それは正常で、内部的にはブラウザは計算のためにそれを使用する
// 座標は負の値になる場合がある。
// Chromeのような一部のブラウザでは、結果getBoundingClientRectにプロパティwidthとheightも追加する


// elementFromPoint(x, y)
// document.elementFromPoint(x, y)の呼び出しは、ウィンドウ座標(x, y)で最もネストされた要素を返す
{
    // 構文は次の通り
    let elem = document.elementFromPoint(x, y);
}

{
    let centerX = document.documentElement.clientWidth / 2;
    let centerY = document.documentElement.clientHeight / 2;

    let elem = document.elementFromPoint(centerX, centerY);

    elem.computedStyleMap.background = "red";
    alert(elem.tagName);
}


// position: fixedを用いる
// 多くの場合、何かを配置するために座標を必要とする
// CSSではビューポートを基準として要素を配置するために、left/topと一緒にposition:fixedを使う
{
    let elem = document.getElementById("coord-show-mark");

    function createMessageUnder(elem, html) {
        // メッセージ要素の作成
        let message = document.createElement("div");
        // ここでは、スタイルにCSSクラスを使う方が良い
        message.style.cssText = "position:fixed; color: red";

        // 座標の設定, "px"を忘れない
        let coords = elem.getBoundingClientRect();

        message.style.left = coords.left + "px";
        message.style.top = coords.bottom + "px";

        message.innerHTML = html;

        return message;
    }

    // 使用例:
    // ドキュメント上に5秒間追加する
    let message = createMessageUnder(elem, "Hello, World");
    document.body.append(message);
    setTimeout(() => message.remove(), 5000);
}


// ドキュメント座標
// ドキュメント相対座標は、ウィンドウではなくドキュメントの左上端から始める
// ページがスクロールされていないとき、ウィンドウ座標とドキュメント座標はまったく同じ


// ドキュメント座標の取得
// 要素のドキュメント座標を取得するための標準メソッドはない
// 2つの座標系は次の式でつながれる
// pageY = clientY + ドキュメントのスクロールアウトした垂直部分の高さ
// pageX = clientX + ドキュメントのスクロールアウトした水平部分の幅
// 関数getCoords(elem)はelem.getBoundingClientRect()からウィンドウ座標を取り、それらに現在のスクロールを加える
{
    // 要素のドキュメント座標を取得
    function getCoords(elem) {
        let box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}