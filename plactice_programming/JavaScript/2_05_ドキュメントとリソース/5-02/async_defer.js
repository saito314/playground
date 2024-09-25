"use strict";


// スクリプト: async, defer
// 最近のwebサイトはスクリプトはHTMLより重いことがしばしば
// ブラウザがHTMLをロードし、<script>タグに遭遇するとDOMの構築を続けることができない。
// 外部スクリプトについても同じ
/*
    <p>...content before script...</p>

    <script src="https://javascript.info/article/script-async-defer/dong.js?speed=1"></script>

    <!-- スクリプトがロードされるまで表示されない -->
    <p>...content after script...</p>
*/

// 回避策としてページの末尾にスクリプトを置く手段がある
/*
    <body>
        ...all content is above the script...

        <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
    </body>
*/

// しかし、この方法ではブラウザが完全なHTMLドキュメントをダウンロードした後にのみスクリプトに気づく
// HTMLドキュメントが長いとかなりの遅延になる可能性がある
// この問題を解決する2つのsciript属性がある


// defer
// defer属性がブラウザにスクリプトを待たないように指示する
// 代わりにブラウザはHTMLの処理を継続しDOMを構築する
// スクリプトはバックグラウンドでロードされDOMが完全に構築された後に実行される
/*
    <p>...content before script...</p>

    <script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

    <!-- すぐに表示される -->
    <p>...content after script...</p>
*/

// deferをもつスクリプトがページをブロックしない
// deferをもつスクリプトはつねにDOMを準備できたときに実行される
/*
    <p>...content before scripts...>/p>

    <script>
        document.addEventListener("DOMcontentLoaded, () => alert("DOM ready after defer!"));
    </script>

    <script defer src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>

    <p>...content after scripts...</p>
*/

// 1. ページコンテンツはすぐに表示される
// 2. DOMContentLoadedイベントハンドラは遅延スクリプトを待つ
// 遅延スクリプトは通常のスクリプトのように相対的な順序を維持する
// 2つの遅延スクリプトがあるとする
/*
    <script defer src="https://javascript.info/article/script-async-defer/long.js"></scirpt>
    <script defer src="https://javascript.info/article/script-async-defer/small.js"></script> 
*/

// ブラウザがページをスキャンしてスクリプトを探し、それらを並列にダウンロードしてパフォーマンスを向上させる
// 上の例では両方のスクリプトが並列でダウンロードされ、small.jsのほうが最初に終了する
// しかし、相対的な順序を維持することが保証されるため、最初に実行されるのはlong.js

// deferは外部スクリプト専用


// async
// async属性はdefer属性に似ている
// スクリプトはブロックしないが振る舞いに重要な違いがある
// async属性はスクリプトが完全に独立していることを意味する
// ・ブラウザがasyncスクリプトをブロックしない
// ・ほかのスクリプトを待たずasyncスクリプトもそれらを待たない
// ・DOMContentLoadedとasyncスクリプトは互いを待たない
// ・DOMContentLoadedはasyncスクリプトの前で発生する可能性がある
// ・あるいはasyncスクリプトの後
// asyncスクリプトはバックグラウンドでよみこまれ、準備ができたら実行される
// DOMとほかのスクリプトはそれらを待たず、それらも何も待たない
/*
    <p>...content before scripts...</p>

    <script>
        document.addEventListener("DOMContentLoaded", () => alert("DOM ready!"));
    </script>

    <script async src="https://javascript.info/article/script-async-defer/long.js"></script>
    <script async src="https://javascript.info/article/script-async-defer/small.js"></script>

    <p>...content after scripts...</p>
*/


// ページコンテンツはすぐに表示される: asyncはブロックしない
// DOMContentLoadedはasyncの前後の両方で発生する可能性があり、ここでは保証されない
// 非同期スクリプトはロードファースト順で実行される
// 非同期スクリプトは独立したサードパーティのスクリプトを読み込む際に便利
/*
    <!-- Google Analyticsは通常このように追加される -->
    <script async src="https://google-analytics.com/analytics.js"></script>
*/


// ダイナミックスクリプト
// ページにスクリプトを追加するもう一つ重要な方法がある
// JavaScriptを利用して動的にスクリプトを作成し、ドキュメントを追加することが可能
/*
    let script = document.createElement("script");
    script.src = "/article/script-async-defer/long.js";
    document.body.append(script);
*/

// スクリプトはドキュメントが追加sれるとすぐに読み込みを開始する
// ダイナミックスクリプトはデフォルトで非同期として動作する
// これらは何も待たず、何もこれらを待たない
// 最初に読み込まれたスクリプトが最初に実行される
// script.async = trueを明示的に設定することで変更できる
// スクリプトはdeferのようにドキュメント順に実行される
// この例では、loadScirpt(src)関数はスクリプトを追加し、asyncをfalseにしている
/*
    function loadScript(src) {
        let script = document.createElement("script");
        script.src = src;
        script.async = false;
        document.body.append(script);
    }

    // scync=false なので long.js が最初に実行される
    loadScript("/article/script-async-defer/long.js");
    loadScript("/article/script-async-defer/small.js");
*/