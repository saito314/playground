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