"use strict";

// ハンドラは割り当てるだけでなく、JavaScriptからイベント生成することもできる
// カスタムイベントを使用して「グラフィックコンポーネント」を生成できる
// click, mousedownなどのような組み込みのイベントを生成することもでき、テストをするときに便利


// イベントコンストラクタ
// イベントがDOM要素クラスと同様に階層を形成する。
// ルートは組み込みのEventクラス


// dispatchEvent
// イベントオブジェクトを生成した後、elem.dispatchEvent(event)を使って、要素上で実行する必要がある
// ハンドラは正規の組み込みイベントであるかのように反応する。もし、bubblesフラグでイベントが生成された場合バブルする
/*
    <button id="elem" onclick="alert('Click');">Autoclick</button>

    <script>
        let event = new Event("click");
        elem.dispatchEvent(event);
    </script>
*/


// バブリング例
// "hello"という名前のバブリングイベントを生成し、documentでキャッチすることができる
// bubblesをtrueにセットすることが必要
/*
    <h1 id="elem">Hello from the script!</h1>

    <script>
        // documentでキャッチ
        document.addEventListener("hello", function(event) {
            alert("Hello from " + event.target.tagName); // Hello from H1
        });

        // ...elemでディスパッチ
        let event = new Event("hello", {bubbles: true});
        elem.dispatchEvent(event);
    </script>
*/