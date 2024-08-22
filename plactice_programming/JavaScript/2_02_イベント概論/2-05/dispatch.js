"use strict";

// カッコ足りてない？
/*
elem.dispatchEvent(new CustomEvent("hello", {
    detail: { name: "John" }
  });
/*


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


// MouseEvent, KeyboardEvent等
// コンストラクタでは、そのイベントのタイプの標準プロパティを指定できる
{
    let event = new MouseEvent("click", {
        bobbles: true,
        cancelable: true,
        clientX: 100,
        clientY: 100
    });

    alert(event.clientX);
}


// Eventコンストラクタはこれを許可しない
{
    let event = new Event("click", {
        bubbles: true, // bubblesとcancelableのみ
        cancelable: true,
        clientX: 100,
        clientY: 100
    });

    alert(event.clientX); // undefined, 道のプロパティは無視される
}


// カスタムイベント
// "hello"のような独自のカスタムイベントに対しては、new CustomEventを使うべき
/*
    <h1 id="elem"> Hello for John!</h1>

    <script>
        // イベントと一緒にハンドラに来る追加の詳細情報
        elem.addEventListener("hello", function(event) {
            alert(event.detail.name);
        });

        elem.dispatchEvent(new CustomEvent("hello", {
            detail: { name: "John" }
        }))
    </script>
*/


// event.preventDefault()
// もし、cancelable: trueフラグが指定されている場合、スクリプトで生成されたイベントでevent.preventDefault()を呼び出すことができる
// 下の例ではhide()関数があり、それは要素#rabbitで"hide"イベントを生成し、すべての関係者にウサギが隠れることを通知する
/*
    <pre id="rabbit">
        |\   /|
         \|_|/
         /. .\
        =\_Y_/=
         {>o<}
    </pre>

    <script>
        // hide()は2秒後に自動で呼び出される
        function hide() {
            let event = new CustomEvent("hide", {
                cancelable: true // このフラグがないとpreventDefaultが動作しない
            });
            if (!rabbit.dispatchEvent(event)) {
                alert("the action was prevented by a handler");
            } else {
                rabbit.hidden = true;
            }
        }

        rabbit.addEventListener("hide", function(event) {
            if (confirm("Call preventDefault?")) {
                event.preventDefault();
            }
        });

        // hide in 2 seconds
        setTimeout(hide, 2000);
    </script>
*/


// イベント中のイベントは同期的
// 通常、イベントは待ち行列に入れられてから処理される
// つまり、ブラウザがonclick処理をしているときに新しいイベントが起きた場合、その処理は待ち行列に入れられる
// 例えば、以下の例ではmenu-openイベントはonclickの途中でトリガされる
/*
    <button id="menu">Menu (click me)</button>

    <script>
        // 1 -> nested -> 2
        menu.onclick = function() {
            alert(1);

            // alert("nested");
            menu.dispatchEvent(new CustomEvent("menu-open", {
                bubbles: true
            }));

            alert(2);
        };

        document.addEventListener("nemu-oepn", () => alert("nested"));
    </script>
*/

// onclickを最初に完全に処理したい場合、dispatchEventをonclickの最後に置くか、ゼロ遅延のsetTimeoutでラップする
/*
    <button id="menu">Menu (click me)</button>

    <script>
        // 1 -> 2 -> nested
        menu.onclick = function() {
            alert(1);

            // alert(2)
            setTimeout(() => menu.dispatchEvent(new CustomEvent("menu-open", {
                bubbles: true
            })), 0);

            alert(2);
        };

        document.addEventLsitener("menu-oepn", () => alert("nested"));
    </script>
*/