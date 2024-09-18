"use strict";


// ページのライフサイクル
// DOMContentLoaded, load, beforeunload, unload


// HTMLページのライフサイクルは3つの重要なイベントを持っている
// DOMContentLoaded: ブラウザがHTMLを完全に読み込みDOMツリーは構築されたが、写真のような外部リソースなどは読み込まれていない可能性がある
// load: ブラウザがすべてのリソースを読み込んだ
// beforeunload/unload: ユーザがページを離れようとしているとき


// DOMContentLoaded
// DOMContentLoadedイベントはdocumentオブジェクトで発生する
// キャッチするためにはaddEventListennerを使わなければならない
/*
    <script>
        function ready() {
            alert("DOM is ready");

            // イメージはまだロードされていない
            alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
        }

        document.addEventListenner("DOMContentLoaded", ready);
    </script>

    <img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
*/