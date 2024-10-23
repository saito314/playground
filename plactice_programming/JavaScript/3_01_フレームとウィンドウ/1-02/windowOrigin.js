"use strict";


// 誤字か？：対応する window オブジェクトを階層を形成します。


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


// window.frames
// <iframe>のウィンドウオブジェクトを取得する別の方法は、名前付けされたコレクションwindow.framesから取得すること
/* 例
    <iframe src="/" style="height:80px" name="win" id="iframe"></iframe>

    <script>
        alert(iframe.contentWindow == frames[0]); // true
        alert(iframe.contentWindow == frames.win); // true
    </script>
*/
// iframeは内側に別のiframeを持つ場合がある
// 対応するwindowオブジェクトの階層を形成する

// 現在のドキュメントがフレームの中で開かれているかどうかを確認するのにtopプロパティが使える
/*
    if(window == top) {
        alert("The script is in the topmost window, not in a frame");
    } else {
        alert("The script tuns in a frame!"); 
    }
*/


// The sandbox attribute
// sandbox属性が信頼できないコードが実行されるのを防ぐため、<iframe>内の特定のアクションを除外できる
// それらを別のオリジンからくるものとして扱うことによって、またはほかの制限を適用することでiframeをサンドボックス化する


// ウィンドウを跨いだメッセージング
// postMessageインターフェースはどのオリジンから来ていたとしても、ウィンドウ同氏がやり取りするのを可能にする
/*
    <iframe src="http://example.com" name="example">

    <script>
        let win = window.frames.example;

        win.postMessage("message", "http://example.com");
    </script>
*/
/* チェックしたくない場合にはtargetOriginに*を設定する
    <iframe src="http://example.com" name="example">

    <script>
        let win = window.frames.example;

        win.postMessage("message", "*");
    </script>
*/

// onmessage
// メッセージを受け取るためにはターゲットウィンドウはmessageイベントのハンドラが必要
// これはpostMessageが呼び出されたときに実行される
{
    window.addEventListener("message", function(event) {
        if (event.origin != "http://javascript.info") {
            // 未知のドメインからの場合は無視する
            return;
        }

        this.alert("received: " + event.data);
    });
}