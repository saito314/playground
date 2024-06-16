"use strict";

// アプリケーションが大きくなるにつれてソースコードをファイルに分割したくなる
// モジュールとは単なる1つのファイル
// ディレクティブのexportとimportを利用することでモジュール間で機能を相互にやり取りすることができる
// exportキーワードはファイルの外部からアクセス可能であるべき変数や関数にラベル付けをする
// importキーワードが他のモジュールからきのうをインポートできるようにする
import {sayHi} from "./module_sayHi.js";

{
   alert(sayHi);
   sayHi("John");
}

/*
    htmlでモジュールを読み込む方法は以下の通り
    <!doctype html>
    <script type="module">
        import {sayHi} from "./module_sayHi.js";

        document.body.innerHTML = sayHi("John");
    </script>
*/

// コアなモジュールの特徴
// モジュールは常にuse strict
// インポートされたモジュール同士は互いに見えない
// 2つのtype=moduleもお互いの変数が見れない
