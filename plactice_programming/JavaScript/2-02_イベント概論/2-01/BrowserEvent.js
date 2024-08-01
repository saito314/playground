"use strict";

// ブラウザイベントの紹介
// イベントとは何かが起きたという信号のこと。
// すべてのDOMノードはこのような信号を生成する


// マウスイベント
// click: 要素上でマウスをクリックしたとき（タッチスクリーンデバイスでは、タップでこのイベントを生成する
// contextmenu: 要素上でマウスを右クリックしたとき
// mouseover / mouseout: マウスカーソルが要素へ来た / 出たとき
// mousedown / mouseup: 要素上でマウスボタンを押したり話されたりしたとき
// mousemove: マウスが移動したとき


// フォーム要素イベント
// submit: 訪問者が<from>をサブミットしたとき
// focus: 訪問者が要素をフォーカスしたとき。e.g.<input>


// キーボードイベント
// keydownとkeyup: 訪問者がボタンを押したり離したりしたとき


// ドキュメントイベント
// DOMContentLoaded: HTMLがロードされ処理されたとき、DOMは完全に構築済み


// CSSイベント
// transitioned: CSSアニメーションが終了したとき


// イベントハンドラ
// イベントに反応するためにハンドラ(イベント発生時に実行する関数)を割り当てることができる
// ハンドラは、ユーザーアクション時にJavaScriptコードを実行する方法である

// HTML属性
// ハンドラはon<event>という名前の属性で、HTML上で設定できる
// 例えば、inputに対してclickハンドラを割り当てるためには、このようにonclickを使う
{
    <input value="Click me" onClick="alert('Click!')" type="button"></input>
}
// マウスをクリックすると、onclick内のコードが実行される

// HTML属性は多くのコードを書くのに便利な場所ではないので、JavaScript関数を作り、そこでその関数を呼ぶのが良い
/*
    ここではクリックで関数countRabbits()を実行する
    <script>
        function countRabbits() {
            for (let i=1; i<=3; i++) {
            alert("Rabbit number " + i);
            }
        }
    </script>

    <input type="button" onClick="countRabbits()" value="Count rabbits!">
*/
// HTML属性名は大文字小文字を区別しない。そのため、ONCLICKはonClickやonCLICKと同様に動作する
// しかし、通常属性は小文字表記: onclick


// DOMプロパティ
// DOMプロパティon<event>を使ってハンドラを割り当てることができる
// 例えば、elem.onclick:
/*
    <input id="elem" type="button" value="Click me">
    <script>
        elem.onclick = function() {
            alert("Thank you");
        }
    </script>
*/

// ハンドラがHTML属性を使用して割り当てられた場合、ブラウザはそれを読み、属性コンテンツから新しい関数を作成し、DOMプロパティに書き込む
// ハンドラは常にDOMプロパティにある: HTML属性は単にその初期化の方法の1つに過ぎない
// 1. HTMLのみ
/*
    <input type="button" onclick="alert('Click!')" value="Button">
*/

// 2. HTML + JS
/*
    <input type="button" id="button" value="Button">
    <script>
        button.onclick = function() {
            alert('Click!');
        };
    </script>
*/

// onclickプロパティは1つしかないため、1つ以上のイベントハンドラは割り当てることはできない
// 下の例ではJavaScriptでのハンドラの追加は既存のハンドラを上書きする
/*
    <input type="buttton" id="elem" onclick="alert('Before')" value="Click me">
    <script>
        elem.onclick = function() {
            alert("After");
        };
    </script>
*/

// ちなみに、既存の関数を直接ハンドラとして割り当てることもできる
{
    function sayThanks() {
        alert("Thanks!");
    };

    elem.onclick = sayThanks;
}

// イベントハンドラを削除するにはelem.onclick = nullを代入する


// 要素thisにアクセスする
// ハンドラの中のthisの値はその要素
// 下のコードではbuttonはthis.innerHTMLで自身の中身を表示する
/*
    <button onclick="alert(this.innerHTML)">Click me</button>
*/


// ありそうなミス
// イベントを使う場合、関数はsayThanks()ではなく、sayThanksで割り当てる必要がある
{
    // 正しい
    button.onclick = sayThanks;

    // 誤り
    button.onclick = sayThanks();
}
// もしカッコをつけると、sayThanks()関数の実行結果になるので、最後の行のonclickはundefinedになる
// しかし、マークアップでは、カッコが必要
/*
    <input type="button" id="button" onclick="sayThanks()">
*/
// この違いはブラウザが属性を読み取るとその内容から本体を含むハンドラ関数が作成されるからである。
// したがって、最後の例と次は同じ
/*
    button.onclick = function() {
        sayThanks(); // ここが属性の中身
    };
*/

// 文字列ではなく関数を使用すること
// 割り当てelem.onclick = "alert(1)"も動作する。
// これは互換性のために動作するが、強く推奨されない
// また、ハンドラに対してsetAttributeを使わない
{
    // <body>のクリックはエラーになる
    // なぜなら、属性は常に文字列であり、関数は文字列になるから
    document.body.setAttribute("onclick", function() { alert(1) });
}

// DOMプロパティは大文字小文字の区別をする
// elem.ONCLICKではなくelem.onclickにハンドラを割り当てること


// addEventListener
// ハンドラを割り当てるための前述の根本的な問題は1つのイベントに複数のハンドラを割り当てられないこと
{
    input.onclick = function() { alert(1); }
    input.onclick = function() { alert(2); } // 前のハンドラを上書きする
}

// 特別なメソッドaddEventListenerとremoveEventListenerを使うことで、ハンドラを管理する別の方法が提案された
// イベントハンドラの追加
{
    elem.addEventListener(event, handler);
}

// イベントハンドラの削除
{
    elem.removeEventListener(event, handler);
}

// 削除には同じ関数が必要
// 例えば以下は動作しない
{
    elem.addEventListener("click", () => alert("Thanks!"));
    elem.removeEventListener("click", () => alert("Thanks!"));
}

// こちらが正しい方法
{
    function handler() {
        alert("Thanks!");
    };

    elem.addEventListener("click", handler);
    elem.removeEventListener("click", handler);
}

// addEventListenerの複数回呼び出しで、複数のハンドラを追加することが可能
/*
    <input id="elem" type="button" value="Click me"/>

    <script>
        function handler1() {
            alert("Thanks!");
        };

        function handler2() {
            alert("Thanks again!");
        };

        elem.onclick = () => alert("Hello");
        elem.addEventListener("click", handler1); // Thanks!
        elem.addEventListener("click", handler2); // Thanks again!
    </script>
*/


// いくつかのイベントでは、ハンドラはaddEventListenerでのみ動作する
// 例えばtransitionedイベントなど
/*
    <style>
        input {
            transition: width 1s;
            width: 100px;
        }

        .wide {
            width: 300px;
        }
    </style>

    <input type="button" id="elem" onclick="this.classList.toggle('wide')" value="Click me">

    <script>
        elem.ontransitioned = function() {
            alert("DOM property"); // 動作しない
        };

        elem.addEventListener("transitioned", function() {
            alert("addEventListener"); // アニメーションが終わったときに表示される
        });
    </script>
*/


// イベントオブジェクト
// イベントを適切に処理するために、単に"click"や"keypress"だけでなく、ポインタの座標は何か？どのキーが押されたのか？などを知りたい
// イベントが起こったとき、ブラウザはイベントオブジェクトを作り、そこに詳細を入れハンドラの引数として渡す
/*
    <input type="button" value="Click me" id="elem">

    <script>
        elem.onclick = function(event) {
            // イベントタイプ、要素、クリック座標を表示
            alert(event.type + " at " + event.currentTarget);
            alert("Coordinates: " + event.clientX + ":" + event.clientY);
        };
    </script>
*/

// イベントオブジェクトもまたHTMLからアクセス可能
// もしHTMLでハンドラを割り当てる場合、このようにしeventオブジェクトを使うことも可能
/*
    <input type="button" onclick="alert(event.type)" value="Event type">
*/


// オブジェクトハンドラ: handleEvent
// addEventListenerを使用したイベントハンドラとしてオブジェクトを割り当てることも可能
// イベントが発生するとき、そのhandleEventメソッドが呼ばれる
/*
    <button id="elem">Click me</button>

    <script>
        elem.addEventListener('Click', {
            handleEvent(event) {
                alert(event.type + " at " + event.currentTarget);
            }
        });
    </script>
*/

/*
    <button id="elem">Click me</button>

    <script>
        class Menu {
            handleEvent(event) {
                switch(event.type) {
                    case "mousedown":
                        elem.innerHTML = "Mouse button Pressed";
                        break;
                    case "mouseup":
                        elem.innerHTML += "...and released";
                        break;
                }
            }
        }

        let menu = new Menu();
        elem.addEventListener("mousedown", menu);
        elem.addEventListener("mouseup", menu);
    </script>
*/

// メソッドhandleEventはそれ自身ですべてのジョブを行う必要はない
// 次のようにほかのイベント固有のメソッドを呼び出すことができる
/*
    <button id="elem">Click me</button>

    <script>
        class Menu {
            handleEvent(event) {
                // mousedown -> onMousedown
                let method = "on" + event.type[0].toUpperCase() + event.type.slice(1);
                this[method](event);
            }

            onMousedown() {
                elem.innerHTML = "Mouse button pressed";
            }

            onMouseup() {
                elem.innerHTML += "...and released.";
            }
        }

        let menu = new Menu();
        elem.addEventListener("mousedown", menu);
        elem.addEventLsitener("mouseup", menu);
    </script>
*/