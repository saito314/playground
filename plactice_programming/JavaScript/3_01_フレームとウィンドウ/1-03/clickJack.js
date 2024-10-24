"use strict";


// クリックジャッキング
// 訪問者の代わりに悪意のあるページが被害を受けたサイト上でクリックすることを可能にするもの


// 考え方
// Facebookで行われたクリックジャッキング
// 1. 訪問者が悪意のあるページに誘い出される
// 2. そのページは無害に見えるリンクを持っている
// 3. そのリンク上に例えば"いいね"ボタンがそのリンクの真上に来るように悪意のあるページが
//    facebook.comのsrcを値要した透明な<iframe>を配置する
// 4. リンクをクリックしようとしたとき実際には訪問者はそのボタンをクリックすることになる


// デモ
// 悪意のあるページがそのように見えるかのデモ
/*
    <style>
    iframe {
        width: 400px;
        height: 100px;
        position: absolute;
        top: 0; left: -20px;
        opacity: 0.5;
        z-index: 1;
    }
    </style>

    <div>Click to get rich now:</div>

    被害サイトのurl
    <iframe src="/clickjacking/facebook.html"></iframe>

    <button>Click here!</button>

    <div>...And you're cool (I'm a cool hacker actually)!</div>
*/

// 攻撃するために必要なことはボタンがリンクの真上にくるよう<iframe>を悪意のあるページに配置することだけ


// 伝統的な防御策（弱い）
// 最も古い防御策はフレーム内でページを開くことを禁止するJavaScriptです
{
    if (top != window) {
        top.location = window.location;
    }
}
// windowがトップにないことがわかった場合、自信を自動的にトップにする


// トップナビゲーションをブロックする
// beforeunloadイベントで、top.locationを変更することにより引き起こされる遷移をブロックすることができる
// トップページはそれにハンドラをセットし、iframeがtop.locationを変更しようとすると訪問者がここを去りたいかを尋ねるメッセージを受けとる
{
    window.onbeforeunload = function() {
        window.onbeforeunload = null;
        return "Want to leave without learning all the secrets (he-he)?";
    };
}


// Sandbox属性
// sandbox属性によって制限されることの1つにナビゲーションがある
// サンドボックス化されたiframeは、top.locationを変更しない場合がある
/*
    <iframe sandbox="allow-scripts allow-forms" src="facebook.html"></frame>
*/


// X-Frame-Options
// サーバサイドのヘッダX-Frame-Optionsはフレーム内にページを表示することを許可または禁止することができる
// これはサーバから送られなければならない。
// <meta>タグの中でそれを見つけても、ブラウザは無視する


// 機能性を無効にして表示する
// X-Frame-Optionsヘッダには副作用がある
// 他のサイトでは、たとえ正当な理由があったとしてもページフレーム内に表示することはできない
/*
    <style>
        #protector {
            hright: 100%;
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 99999999;
        }
    </style>

    <div id="pritector">
        <a href="/" target="_blank">Go to the site</a>
    </div>

    <script>
        // トップのウィンドウが異なるオリジンからのものであればエラーになる
        // ここではOKです
        if (top.document.domain == document.domain) {
            protector.remove();
        }
    </script>
*/