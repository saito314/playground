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

// DOMContentLoadedとscripts
// ブラウザが最初にHTMLをロードし、テキスト中の<script>にでクラスとDOMの構築を続けることができない
// そのため、スクリプトが実行された後にのみDOMContentLoadedが発生する可能性がある
// 外部スクリプトも一時停止する
// asyncやdefer属性をもつ外部スクリプトは例外で処理が続く


// DOMContentLoadedとstyles
// 外部のスタイルシートはDOMには影響しないので、DOMContentLoadedはそれらを待たない
// しかし、スタイルの後にスクリプトがある場合、そのスクリプトはスタイルシートが実行されるのを待たないといけない
/*
    <link type="text/css" rel="stylesheet" href="style.css">
    <script>
        // スクリプトはスタイルシートが読み込まれるまで実行されない
        alert(getComputedStyle(document.body).marginTop);
    </style>
*/

// この理由は、上の例のようにスクリプトが座標やほかのスタイルに依存した要素のプロパティを取得したい場合があるため


// 組み込みのブラウザの自動入力
// Firefox, ChromeやOperaの自動入力はDOMContentLoadedで起こる
// 例えば、ページがログインとパスワードのフォームを持っていて、ブラウザがその値を覚えていた場合、DOMContentLoadedでそれらを自動入力しようとする場合がある
// そのため、読み込みに時間のかかるスクリプトによってDOMContentLoadedが伸びると、自動入力もまた待たされる


// window.onload
// windowオブジェクトのloadイベントはスタイルや画像、その他リソースを含めページ全体が読み込まれたときにトリガされる
/*
    <script>
        window.onload = function() {
            alert('Page loaded');
            
            // この時、画像はロードされている
            alert(`Image size: ${img.offsetWidth}x${img.offsetHeight}`);
        };
    </script>

    <img id="img" src="https://en.js.cx/clipart/train.gif?speed=1&cache=0">
*/


// window.onunload
// 訪問者がページを離れるとき、unloadイベントがwindowでトリガされる
// そこでは、関連するポップアップウィンドウを閉じるなど、遅延なく何かをすることができる
// しかし、別のページへの繊維をキャンセルすることなどはできない


// window.onbeforeunload
// 訪問者がページを離れ始めたり、ウィンドウを閉じようとした場合、beforeunloadハンドラで追加の確認を訪ねることができる。
// 質問の文字列を返す必要がある
// ブラウザはそれを表示する
/*
    window.onbeforeunload = function() {
        return "There are saved changes. Leave now?";
    };
*/


// readyState
// ドキュメントがロードされた後にDOMContentLoadedハンドラを設定しても実行されない
// ドキュメントが準備できたかどうかが定かでない場合があるため、我々はドキュメントの現在状態を知ることが大事
// document.readyStateプロパティが我々にその情報を提供する
// "loading": ドキュメントのロード中
// "interactive": ドキュメントが完全に読み込まれた
// "complete": ドキュメントが読み込まれ、画像のようなリソースも読み込まれた
// document.readyStateをチェックし、ハンドラを設定することができる
/*
    function work() { ... }

    if (document.readyState == 'loading') {
        document.addEventListener('DOMContentLoaded', work);
    } else {
        work(); 
    }
*/

// 状態が終わったときにトリガされるreadystatechangeイベントがある
/*
    // 現在の状態
    console.log(document.readyState);

    // 状態の変化を出力
    document.addEventListener('readystatechange', () => console.log(document.readyState));
*/


// readystatechangeイベントはドキュメントの読み込み状態を追跡する代替のメカニズム
/*
    <script>
        function log(text) { output the time and message };
        log('Initial readyState:' + document.readyState);

        document.addEventListener('readystatechange', () => log(readyState: + document.readyState));
        document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

        window.onload = () => log('window onload');
    </script>

    <iframe src="iframe.html" onload="log('iframe onload')"></iframe>

    <img src="http://en.js.cx/clipart/train.gif" id="img">
    <script>
        img.onload = () => log('img onload');
    </script>
*/

// img.onloadとwindow.onloadがほぼ同じ時間に発生していることがわかる
// 違いはwindow.onloadは常にほかのすべてのloadハンドラの後で操作するということ