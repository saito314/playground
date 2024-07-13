"use strict";

// ブラウザがページをロードするとき、HTMLテキストを読み込み（パースして）DOMオブジェクトを生成する
// 要素ノードの場合、ほとんどの標準のHTML属性は自動的にDOMオブジェクトのプロパティになる
// 例えば、もしタグが<body id="page">の場合、DOMオブジェクトはbody.id="page"を持つ


// DOMプロパティ
// DOMプロパティが不十分であれば独自のプロパティを追加できる
{
    // 例えば、document.bodyに新しいプロパティを作成してみる
    document.body.myData = {
        name: "Caesar",
        title: "Imperator"
    };

    alert(document.body.myData.title); // Imperator
}

{
    // 同様にメソッドの追加もできる
    document.body.sayHi = function() {
        alert(this.tagName);
    };

    document.body.sayHi(); // BODY (このメソッドのthisの値はdocument.body)
}

{
    // Element.prototypeのように組込のプロトタイプを修正し、全ての用途に新しいメソッドを追加することも可能
    Element.prototype.sayHi = function() {
        alert(`Hello, I'm ${this.tagName}`);
    };

    document.documentElement.sayHi(); // Hello, I'm HTML
    document.body.sayHi(); // Hello, I'm BODY
}

// したがってDOMプロパティとメソッドは、通常のJavaScriptオブジェクトと同じように振る舞う
// ・任意の値を持つことができる
// ・大文字と小文字が区別される


// HTML属性
// ブラウザがHTMLをパースして、タグに対するDOMオブジェクトを作成するとき、標準の属性を認識し、DOMプロパティを生成する
// 要素がidまたは他の標準の属性を持っている場合、対応するプロパティが生成される
// 要素がidまたは他の標準属性を持っている場合、対応するプロパティが生成される
// しかし、属性が非標準の場合はプロパティが生成されない
/*
    例:
    <body id="test" something="non-standard">
        <script>
            alert(document.body.id); // test
            // 非標準の属性はプロパティを生成しない
            alert(document.body.something); // undefined
        </script>
    </body>
*/

// ある要素に対する標準属性は、別の要素では未知の属性になる可能性がある
// 例えば"type"は<input>の標準だが、<body>においては標準ではない
/*
    確認:
    <body id="body" type="...">
        <input id="input" type="text">
        <script>
            alert(input.type); // text
            alert(body.type); // undefined: 非標準のため、DOMプロパティは作られない
        </script>
    </body>
*/

// 非標準の属性にアクセスする方法
// elem.hasAttribute(name): 存在をチェックする
// elem.getAttribute(name): 値を取得する
// elem.setAttribute(name, value): 値を設定する
// elem.removeAttribute(name): 属性を削除する
// elem.Attributesで全ての属性を読み込むことも可能
/*
    非標準のプロパティを読み込む例:
    <body something="non-standard">
        <script>
            alert(document.body.getAttribute("something")); // 非標準
        <\script>
    </body>
*/


// HTML属性には次の特徴がある
// ・名前は大文字小文字を区別しない
// ・常に文字列
/*
    属性を使ったデモ:
    <body>
        <div id="elem" about="Elephant"></div>

        <script>
            alert(elem.getAttribute("About")); // (1) "Elephant"読み込み

            elem.setAttibute("Test", 123); // (2) 書き込み

            alert(elem.outerHTML); // (3) 参照

            for (let attr of elem.attributes) { // (4) 全てをリスト
                alert(attr.name + " = " + attr.value);
            }
        </script>
    </body>
*/


// プロパティ - 属性の同期
// 標準の属性を変更するとき、対応するプロパティが自動更新される。逆もまた然り。
/*
    idは属性として修正された後にプロパティが変更されていることが確認できる
    <input>

    <script>
        let input = document.querySelector("input");

        // 属性 -> プロパティ
        input.seetAttribute("id", "id");
        alert(input.id); // id (更新された)

        // プロパティ -> 属性
        input.id = "newId";
        alert(input.getAttribute("id")); // newId (更新された)
    </script>
*/

/*
    ただし、例外もある
    input.valueの同期は属性 -> プロパティの場合のみが可能で、逆は同期されない
    <input>

    <script>
        let input = document.querySelector("input");

        // 属性 -> プロパティ
        input.setAttribute("value", "text");
        alert(input.value); // text

        // ✕ プロパティ -> 属性
        input.value = "newValue";
        alert(input.getAttribute("value")); // text (更新されていない)
    </script>
*/


// DOMプロパティは型付けされている
// DOMプロパティは文字列とは限らない。たとえばinput.checkedプロパティは真偽値
/*
    <input id="input" type="checkbox" checked> checkbox

    <script>
        alert(.getAttribute("checked")); // 属性値：空文字
        alert(input.checked); // プロパティ値：true
    </script>
*/

// 他の例：style属性は文字列だが、styleプロパティはオブジェクト
/*
    <div id="div" style="color:red;font-size:120%">Hello</div>

    <script>
        // string
        alert(div.getAttribute("style")); // color:red;font-size:120%

        // object
        alert(div.style); // [object CSSStyleDeclaration]
        alert(div.style.color); // red
    </script>
*/

// href DOMプロパティは属性が相対URLや単なる#hashだとしても、常に完全なURL
/*
    <a id="a" href="#hello">link</a>
    <script>
        // 属性
        alert(a.getAttribute("href")); // #hello

        // プロパティ
        alert(a.href); // 完全なURLの形式 http://site.com/page#hello
    </script>
*/