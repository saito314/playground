"use strict";


// ウィンドウを跨いだやり取り
// 同一オリジンポリシーはウィンドウとフレームのアクセスを互いに制限する


// 同一オリジン
// これらのURLはすべて同じオリジン
// ・http://site.com
// ・http://site.com/
// ・http://site.com/my/page.html


// iframeのコンテンツにアクセスする
// <iframe>は2面性がある
// <script>あるいは<img>と同じような単なるタグである一方、ウィンドウ内のウィンドウ
// ・iframe.contentWindowは<iframe>内のウィンドウへの参照
// ・iframe.contentDocumentは<iframe>内のドキュメントへの参照
/* 別のオリジン
    <iframe src="https://example.com" id="iframe"></iframe>

    <script>
        iframe.onload = function() {
            // 内部のウィンドウへの参照を取得できる
            let iframeWindow = iframe.contentWindow;

            try {
                // ...が、その中のドキュメントを取得できる
                let doc = iframe.contentDocument;
            } catch(e) {
                alert(e); // セキュリティエラー 
            }

            // その中のページ
            try {
                alert(iframe.contentWindow.location);
            } catch(e) {
                alert(e); // セキュリティエラー 
            }

            // しかし、変更することはできる
            iframe.contentWindow.location = "/"; // 動作する

            iframe.coload = null; // 一度だけ実行させるためにハンドラをクリア
        };
    </script>
*/


/* 同一オリジン
    <iframe src="/" id="iframe"></iframe>

    <script>
        iframe.onload = function() {
            // なんでもできる
            iframe.contentDocument.body.prepend("Hello, world!");
        };
    </script>
*/


// iframeがロードされるまで待ってください
// iframeが作成されるとすぐにドキュメントを待つが、そのドキュメントは最終的にそこにロードされるものとは異なる
/*
    <iframe src="/" id="iframe"></iframe>

    <script>
        let oldDoc = iframe.contentDocument;
        iframe.onload = function() {
            let newDoc = iframe.contentDocument;
            // ロードされたドキュメントは初期のものとは同じではない
            alert(oldDoc == newDoc); // false
        };
    </script>
*/


// 同一オリジンの場合は次のように新しいドキュメントが現れる瞬間をとらえて、必要なハンドラの設定を試みることができる
/*
    <iframe src="/" id="iframe"></iframe>

    <script>
        let oldDoc = iframe.contentDocument;

        // ドキュメントが新しいものか100ms毎にチェック
        let timer = setInterval(() => {
            if (iframe.contentDocument == oldDoc) return;

            // 新しいドキュメントなので、ハンドラをセットする
            iframe.contentDocument.addEventListener("DOMContentLoaded", () => {
                iframe.contentDocument.body.prepend("Hello, world!");        
            });

            clearInterval(timer); // もう必要ないのでsetIntercvalをクリアする
        }, 100);
    </script>
*/