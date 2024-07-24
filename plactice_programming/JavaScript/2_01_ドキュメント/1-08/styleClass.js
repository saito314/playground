"use strict";

// 誤字あり:値に CSS の単位を追加するのを忘れないようにましょう。
// スタイルを変更するのは簡単です。しかしどうやってそれを 参照 ますか？


// スタイルとクラス
// 一般的に要素をスタイルする方法が2つある
// 1. CSSでクラスを生成し、それを追加する
// 2. styleに直接プロパティを書く
// JavaScriptではどちらの変更も可能
// 常にstyleよりもCSSクラスを優先するべき
{
    let top = 0; /* 複雑な計算 */
    let left = 0; // 複雑な計算

    elem.style.left = left; // e.g. "123px"
    elem.style.top = top; // e.g. "456px"
}


// classNameとclassList
// クラスに対して類似したプロパティ名"className"が導入された
/*
    <body class="main page">
        <script>
            alert(document.body.className); // main page
        </script>
    </body>
*/

// elem.classList
// elem.classListはクラスを追加/削除/トグルするためのメソッドを持つ特別なオブジェクト
/*
    <body class="main page">
        <script>
            // クラスを追加する
            document.body.classList.add("article");

            alert(document.body.className); // main page article
        </script>
    </body>
*/

// classNameで完全なクラス文字列全体を操作したり、classListで個々のクラスを操作することができる
// それに加え、classListは反復可能
/*
    <body class="main page">
        <script>
            for (let name of document.body.classList) {
                alert(name); // main, and then page
            }
        </script>
    </body>
*/

// 要素のスタイル
// 複数後のプロパティはキャメルケースが使われる
/*
    background-color    => elem.style.backgroundColor
    z-index             => elem.style.zIndex
    border-left-width   => elem.style.borderLeftWidth
*/
{
    document.body.style.backgroundColor = prompt("background color?", "green");
}

// スタイルプロパティのリセット
// スタイルプロパティを割り当てた後、削除したい場合がある
// 要素を隠すにはelem.style.display = "none"とする
// style.displayを削除したい場合はelem.style.displayに空行を割り当てる
{
    // このコードを実行すると<body>が"点滅"する
    document.style.display = "none"; // 隠す

    setTimeout(() => document.body.style.display = "", 1000); // 通常に戻る
}

// elem.style.removeProperty("style property")を使用してプロパティを削除できる
{
    document.body.background = "red"; // backgroundをredにする

    setTimeout(() => document.body.style.removeProperty("background"), 1000); // 1秒後backgroundを削除する
}

// 単位に留意する
// 値にCSSの単位を追加するのを忘れないようにする
/*
    <body>
        <script>
            // 動作しない
            document.body.style.margin = 20;
            alert(document.body.style.margin); // ""(空文字列、この代入は無視される)

            // 今CSSの単位(px)を追加 -- これは動作する
            document.body.style.margin = "20px";
            alert(document.body.style.margin); // 20px

            alert(document.body.style.marginTop); // 20px
            alert(document.body.style.marginLeft); // 20px
        </style>
    </body>
*/


// 算出スタイル: getComputedStyle
// スタイルをどのように参照するのか？
// styleプロパティはCSSカスケードなしで、その"style"属性の値だけを操作する
/*
    <head>
        <style> body { color: red; margin: 5px } </style>
    </head>
    <body>
        The red text
        <script>
            alert(document.body.style.color); // 空
            alert(document.body.style.marginTop); // 空
        </script>
    </body>
*/

// getComputedStyle
/*
    <head>
        <style> body { color: red; margin: 5px } </style>
    </head>
    <body>
        <script>
            let computedStyle = getComputedStyle(document.body);

            // 今やそこからマージンや色を読み取ることができる

            alert(computedStyle.marginTop); // 5px
            alert(computedStyle.color); // rgb(255, 0, 0)
        </script>
    </body>
*/