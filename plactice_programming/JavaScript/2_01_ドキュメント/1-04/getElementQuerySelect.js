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

// querySelectorAll
// 最も用途の広いメソッドelem.querySelectorAll(css)は、指定されたCSSセレクタに一致するelem内の要素を全て返す
/*
    最後の子要素となるすべて<li>要素を探す
    <ul>
        <li>The</li>
        <li>test</li>
    </ul>
    <ul>
        <li>has</li>
        <li>passed</li>
    </ul>
    <script>
        let elements = document.querySelectorAll("ul > li:last-child");

        for (let elem of elements) {
            alert(elem.innerHTML); // "test", "passed"
        }
    </script>
*/

// querySelector
// elem.querySelector(css)は、指定されたCSSセレクタの最初の要素を返す
// elem.querySelectorAll(css)[0]と同じ結果になるが、後者は全ての要素を一度探すため効率が悪い

// matchs
// elem.matchs(css)は単にelemが与えられたCSSセレクタに一致するかをチェックしtrueまたはfalseを返す
/*
    これは要素を反復処理し、興味のあるものをフィルタ使用とするときに便利
    <a href="http://example.com/file.zip">...</a>
    <a href="http://ya.ru">...</a>

    <script>
        // document.body.childrenの代わりに任意のコレクションが可能
        for (let elem of document.body.children) {
            if (elem.matchs('a[href$="zip"]')) {
                alert("The archive reference: " + elem.href);
            }
        }
    <\script>
*/


// closest
// CSSセレクタにマッチする最も近い祖先を見る。elem自身も検索対象に含まれている
// closestは要素(elem)から上に進み、親をチェックしていく。
// セレクタにマッチしたら、検索を止めてその祖先を返却する
/*
    <h1>Contents</h1>

    <div class="contents">
        <ul class="book">
            <li class="chapter">Chapter 1</li>
            <li class="chapter">Chapter 1</li>
        </ul>
    </div>

    <script>
        let chapter = document.querySelector(".chapter"); // LI

        alert(chapter.closest(".book")); // UL
        alert(chapter.closest(".contents")); // DIV

        alert(chapter.closest("h1")); // null (h1は祖先ではないため)
    </script>
*/


// getElementsBy
// elem.getElementsByTagName(tag): 指定されたタグの要素を探し、コレクションを返す
// elem.getElementsByClassName(className): 指定されたCSSクラスを持つ要素を返す
// elem.getElementsByName(name): 指定されたname属性をもつ要素をドキュメント全体で返す
/*
    <table id="table">
        <tr>
            <td>
                <label>
                    <input type="radio" name="age" value="young" checked> less than 18
                </label>
                <label>
                    <input type="radio" name="age" value="mature"> from 18 to 50
                </label>
                <label>
                    <input type="radio" name="age" value="senior"> more than 60
                </label>
            </td>
        </tr>
    </table>

    <script>
        let inputs = table.getElementsByTagName("input");

        for (let input of inputs) {
            alert(input.value + ": " + input.checked);
        }
    </script>
*/


// .article要素を探す
/*
    <form name="my-form">
        <div class="article">Article</div>
        <div class="long article">Long article</div>
    </form>

    <script>
        // name属性で見つける
        let form = document.getElementsByName("my-from")[0];

        // form の内側でclassで見つける
        let articles = form.getElementsByClassName("article");
        alert(articles.length); // 2, class "article"をもつ要素が2つ見つかる
    </script>
*/


// ライブ(動的)なコレクション
// すべての"getElementsBy*"メソッドはライブなコレクションを返す
// 1.最初のスクリプトは<div>のコレクションへの参照を作成する
// 2.2つ目のスクリプトはブラウザが1つ以上の<div>にあった後に実行する
/*
    <div>First div</div>

    <script>
        let divs = document.getElementsByTagName("div");
        alert(divs.length);
    </script>

    <div>Second div</div>

    <script>
        alert(divs.length);
    </script>
*/


// 対照的にquerySelectorAllは静的コレクション
/*
    <div>First div</div>

    <script>
        let divs = document.querySelectorAll("div");
        alert(divs.length);
    </script>

    <div>Second div</div>

    <script>
        alert(divs.length); // 1
    </script>
*/