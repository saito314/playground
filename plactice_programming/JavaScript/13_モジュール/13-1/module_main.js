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


// 同じモジュールが他の場所でもインストールされる場合、そのコードは初回のみ実行
// 同じモジュールのオブジェクトの変更はそのモジュールを変更した全てのファイルから確認できる
// モジュールの初期化ができるためにこれは非常に便利
// 例えば古典的な方法ではinit.jsを使ってモジュールのオブジェクトを初期化する


// import.meta
// オブジェクトimport.metaは現在のモジュールに関する情報を含んでいる
/*
    <script type="module">
        alert(import.meta.url);
        // script url (インラインスクリプトに対するHTMLページのurl)
    </script>
*/

// <script type="module">のなかでのthisはundefinedになる

// モジュールスクリプトは遅延される
/*
    <script type="module">
        alert(typeof button); // object: スクリプトは下のボタンが `見え` ます
        // モジュールは遅延されるので、スクリプトはページ全体がロードされた後に実行します
    </script>

    以下の通常のスクリプトと比較してください:

    <script>
        alert(typeof button); // Error: button is undefined, スクリプトは下の要素は見えません
        // 通常のスクリプトは、ページの残りが処理される前に即時実行します。
    </script>

    <button id="button">Button</button>
*/