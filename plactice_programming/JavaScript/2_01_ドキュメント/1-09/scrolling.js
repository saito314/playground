"use strict";

// サンプル要素
/*
    プロパティを示すサンプルの要素として、以下のものを使用する
    <div id="example">
        ...Text...
    </div>
    <style>
        #example {
            width: 300px;
            height: 200px;
            border: 25px solid #E8C48F;
            padding: 20px;
            overflow: auto;
        }
    </style>
*/

// ジオメトリ
// 幅、高さやほかのジオメトリを提供する要素プロパティは常に数値。


// offsetParent, offsetLeft/Top
// これらのプロパティはほとんど必要とされないが、最も外側のジオメトリプロパティのため見ていく
// 実践的なケースではoffsetParentを使用して、最も近いCSS一の祖先の取得をする
/*
    内部の<div>はoffsetParentとして<main>を持っていて、
    offsetLeft/offsetTopはその左上隅からシフトしている
    <main style="position: relative" id="main">
        <article>
            <div id="example" style="position: absolute; left: 180px top: 180px">...</div>
        </article>
    </main>
    <script>
        alert(example.offsetParent.id); // main
        alert(example.offsetLeft); // 180
        alert(example.offsetTop); // 180
    </style>
*/

// offsetParentがnullである場合は下記の3つの条件
// 1. 表示されていない要素(display:noneまたはドキュメント上にない)の場合
// 2. <body>と<html>の場合
// 3. position:fixedを持つ要素の場合


// offsetWidth / Height
// これらの2つのプロパティは要素の外部の幅/高さを提供する


// clientTop/Left
// 要素の内側にはボーダーがあり、それを測るためにclientTopとclientLeftがある


// clientWidth/Height
// 要素のボーダーの内側の領域のサイズを提供する
// パディングと一緒にコンテンツの幅を含むが、スクロールバーは含まれない
// もし、パディングがない場合にはclientWidth/Heightはちょうどボーダーとスクロールバーの内側のコンテンツ領域になる
// したがって、パディングがない場合はコンテンツ領域のサイズを取得するためにclientWidth/Heightを使うことができる


// scrollWidth/Height
// プロパティclientWidth/clientHeightは要素の可視部分のみを占める
// プロパティscrollWidth/scrollHeightはスクロールアウトされた部分も含める
// 要素の広さをそのいっぱいの幅/高さに広げるのにこれらのプロパティを使うことができる
{
    element.style.height = element.scrollHeight + "px";
}


// scrollLeft/scrollTop
// プロパティscrollLeft/scrollTopは隠された部分の幅/高さで、要素のスクロールアウトされた部分
// つまり、scrollTopは"どのくらいスクロールされているか"を示す


// CSSから幅/高さを取らない
// DOM要素のジオメトリプロパティは通常、幅や高さを取得したり距離を計算したりするために使われる
// しかし、CSSの幅/高さはgetComputedStyleを使って読み取ることができる
{
    let elem = document.body;

    alert(getComputedStyle(elem).width); // 要素のCSS幅を表示する
}

// なぜジオメトリプロパティを使う必要があるのか
// 1. CSS幅/高さは別のプロパティに依存しているから。
//    CSSの幅と高さが何かを定義するのはbox-sizingで、これを変更するとJavaScriptが壊れる可能性がある。
// 2. CSS width/heightはautoの可能性があるから。
/*
    <span id="elem">Hello!</span>

    <script>
        alert(getComputedStyle(elem).width); // auto
    </script>
*/
// CSSの立場からだとwidth:autoは正常だが、javascriptの計算には使えない


// もう一つの理由はスクロールバーの有無にある
// スクロールバーがない場合に正常に動くプログラムはスクロールバーありの場合に不具合を起こす可能性がある
// clientWidth/Heightはスクロールバーを考慮するが、getComputedStyleはブラウザによって振る舞いが異なる