"use strict";



// バブリングとキャプチャリング

/*
    <div onclick="alert('The handler!')";>
        <em>If you click on <code>EM</code>, the handler on <code>DIV</code> runs.</em>
    </div>
*/


// バブリング
// バブリングの原理はシンプル
// 要素上でイベントが発生すると、最初にその要素上のハンドラが実行され、次にその親要素のハンドラが実行され、さらにほかの祖先を実行する

/*
    <style>
        body * {
            margin: 10px;
            border: 1px solid blue;
        }
    </style>

    <form onclick="alert('form')">FORM
        <div onsclick="alert('div')">DIV
            <p onclick="alert('p')">P</p>
        </div>
    </form>
*/
// <p>をクリックすると3つのアラートが表示される
// このプロセスをバブリングという


// event.target
// 親要素のハンドラは常に実際に発生した場所についての詳細を取得できる
// イベントが発生した最も深くネストされた要素はターゲット要素と呼ばれ、event.targetでアクセスできる
// this(=event.currentTarget)との違いは下記の通り
// ・event.targetはイベントが開始されたターゲット要素で、バブリングプロセスを通して変化しない
// ・thisは現在の要素で、現在実行中のハンドラをもつ


// バブリングを止める
// バブリングを止めるためのメソッドはevent.stopPropagation()
/*
    <body onclick="alert(`the bubbling doesn't reach here`)">
        <button onclick="event.stopPropagation()">Click me</button>
    </body>
*/


// キャプチャリング
// 実際にはほとんど使われないが、役立つときもある。
/*  
    elem.addEventListener(..., {capture: true});
    // または、単に"true"は{capture: true}のエイリアス
    elem.addEventListener(..., true);
*/

// キャプチャリングとバブリング両方の例を見てみる
/*
    <style>
        body * {
            margin: 10px;
            border: 1px solid blue;
        }
    </style>

    <form>FORM
        <div>DIV
            <p>P</p>
        </div>
    </form>

    <script>
        for(let elem of document.querySelectorAll('*')) {
            elem.addEventListener("click", e => alert(`Capturing: ${elem.tagName}`), true);
            elem.addEventListener("click", e => alert(`Bubbling: ${elem.tagName}`));
        }
    </script>
*/