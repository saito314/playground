"use strict";

// 多くの関数は非同期アクションがスケジュールできるJavaScriptホスト環境によって提供されている
// 例えばsetTimeout関数など
// スクリプトをロードする関数loadScript(src)を考えてみる
{
    function loadScript(src) {
        // <script>タグを作りページに追加する
        // 指定されたsrcのスクリプトの読み込みを開始し、完了時に実行する
        let script = document.createElement("script");
        script.src = src;
        document.head.append(script);
    }
    // これは指定されたsrcをもつ、新たに動的に作成された<script src="...">をドキュメントに挿入する
    // 使用例
    loadScript("/my/script.js");
}

// また、JavaScriptの下になんらかのコードがある場合、そのコードの実行はスクリプトの読み込みを待たない
{
    // 今新しいスクリプトを読み込んで、そのスクリプト内の関数を実行したいとする
    loadScript("/my/script.js"); // このスクリプトは下のnewFunctionを待っている

    newFunction(); // Error: newFunction is not defined.
}

// 今のところloadScript関数は読み込み干渉を追跡する方法を提供していない
// スクリプトは読み込まれ、最終的に実行されたいがそのスクリプトの関数や変数を使用するために
// それらがいつ起きるのかを知りたい
// JavaScriptの2つ目の引数に、スクリプトが読み込まれたときに実行するcallback関数を追加する
{
    function loadScript(src, callback) {
        let script = document.createElement("script");
        script.src = src;

        script.onload = () => callback(script);

        document.head.append(script);
    }

    // ロードしたスクリプトにある新しい関数を呼びたい場合はcallbackに書く
    loadScript("/my/script.js", function() {
        // コールバックはスクリプトがロード後に実行される
        newFunction(); // なので、これは実行される
    });
}

// 第2引数がアクションが完了したときに実行される関数（通常は無名）
// 実際のスクリプトを使った実行可能な例を示す
{
    function loadScript(src, callback) {
        let script = document.createElement("script");
        script.src = src;
        script.onload = () => callback(script);
        document.head.append(script);
    }

    loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js", script => {
        alert(`Cool, the ${script.src} is loaded`);
        alert( _ ); // ロードされたスクリプトで宣言されている関数
    });
}

//　これはコールバックベースと呼ばれる非同期プログラミングのスタイル

// callbackの中のcallback
// 2つのスクリプトを順次読み込む方法
// 自然な解決策は2つ目のloadScript呼び出しをcallbackの中に置くこと
{
    loadScript("/my/script.js", function(script) {
        alert(`Cool, the ${script.src} is loaded, let's load one more`);

        loadScript("/my/script2.js", function(script) {
            alert(`Cool, the second script is loaded`);
        });
    });
}

// 仮にもっとスクリプトを読み込みたい場合は…？
{
    loadScript("/my/script.js", function(script) {
        loadScript("/my/script2.js", function(script) {
            loadScript("/my/script3.js", function(script) {
                // 全てのスクリプトが読み込まれるまで続く…
            });
        });
    });

    // アクションが多い場合は問題になる
}

// エラーハンドリング
// スクリプトが読み込みに失敗した場合のloadScript()を考える
{
    function loadScript(src, callback) {
        let script = document.createElement("script");
        script.src = src;

        script.onload = () => callback(null, script);
        script.onerror = () => callback(new Error(`Script load error for ${src}`));

        document.head.append(script);
    }
}

// 使用方法
{
    loadScript("/my/script.js", function(error, script) {
        if (error) {
            // エラー処理
        } else {
            // スクリプトの読み込み成功処理
        }
    });
    // loadScriptで使った方法は非常に一般的なものでエラーファーストなコールバックスタイルと呼ばれる
}

// 破滅のピラミッド
// 次々に続く複数の非同期アクションの場合、次のようなコードを持つことになる
{
    loadScript("1.js", function(error, script) {

        if(error) {
            handleError(error);
        } else {
            // ...
            loadScript("2.js", function(error, script) {
                if (error) {
                    handleError(error);
                } else {
                    // ...
                    loadScript("3.js", function(error, script) {
                        if (error) {
                            handleError(error);
                        } else {
                            // すべてのスクリプトが読み込まれるまで続く
                        }
                    });
                }
            });
        }
    });
}

// 呼び出しのネストが深くなるにつれて実際により多くのループや条件式などを含むコードがある場合は管理が難しくなる
// これをコールバック地獄や破滅のピラミッドと呼ばれる

// つぎのように全てのアクションをスタンドアロンの関数にすることでこの問題を軽減することができる
{
    loadScript("1.js", step1);

    function step1(error, script) {
        if (error) {
            handleError(error);
        } else {
            loadScript("2.js", step2);
        }
    }

    function step2(error, script) {
        if (error) {
            handleError(error);
        } else {
            loadScript("3.js", step3);
        }
    }

    function step3(error, script) {
        if (error) {
            handleError(error);
        } else {
            // ...すべてのスクリプトが読み込まれた後に続く
        }
    };
}