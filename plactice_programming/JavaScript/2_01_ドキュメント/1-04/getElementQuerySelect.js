"use strict";

// getElementとquerySelector
// 要素が互いに近い場合にはDOMナビゲーションプロパティが役に立つ
// そうでない場合はページの任意の要素はどのように取得できるのか


// document.getElementByIdもしくは単にid
// 要素にid属性があるとdocucment.getElementById(id)メソッドを使用することで要素を取得できる
/*
    <div id="elem">
        <div id="elem-content">Element</div>
    </div>

    <script>
        // 要素を取得
        let elem = document.getElementById("elem");

        // 背景を赤にする
        elem.style.background="red";
    </script>
*/

// また、要素を参照するidで名前付けされたグローバル変数もある
/*
    <div id="elem">
        <div id="elem-content">Element</div>
    </div>

    <script>
        // elemはid="elem"のDOM要素を参照する
        elem.style.background="red";

        // id="elem-content"はハイフンがあるので変数名にできない
        // が、角括弧を使用してアクセスできる: window["elem-content"]
    </script>
*/

/*
    同じ名前のJavaScript変数を宣言しない限り、この値が優先される
    <div id="elem"></div>

    <script>
        let elem = 5;

        alert(elem); // 変数は要素を上書きする
    </script>
*/