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
/*
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