"use strict";

// typoあり erro.name -> err.name

// エラーをキャッチして即時停止に代わりより意味のあることをする構文構造try..catchがある
{
    // エラーなしの場合
    try {
        alert("Start of try runs");

        // ...ここではエラーはない

        alert("End of try runs");
    } catch(err) {
        alert("Catch is ignored, because there are no errors");
    }
}

{
    // エラーの例
    try {
        alert("Start of try runs");

        lalala; // Error: undefined

        alert("End of try (never reached)");
    } catch(err) {
        alert("Error has occured!");
    }
}

// try..catchは実行時エラーのみに作用する
// 読み込み時に発生したエラーは解析時間エラーと呼ばれ回避不能
// 実行時エラーはランタイムエラーともいう


// try..carchは同期的に動作する
// もしsetTimeoutの中のような"スケジュールされた"コードで例外が発生した場合
// try..catchはそれをキャッチしない
{
    try {
        setTimeout(function() {
            noSuchVariable; // スクリプトはここで停止する
        }, 1000);
    } catch(e) {
        alert("won't work");
    }
}

// スケジュールされた関数の内側の例外をキャッチするためにはその関数の中にtry..catchが必要
{
    setTimeout(function() {
        try {
            noSuchVariable; // try..catchがエラーをハンドリングする
        } catch(e) {
            alert("error is caught here!");
        }
    }, 1000);
}

// エラーオブジェクト
// エラーが発生したときその詳細を含めたオブジェクトを生成し、catchの引数として渡される
{
    try {
        lalala; // Error: undefined
    } catch(err) {
        alert(err.name); // ReferenceError
        alert(err.message); // lalala is not defined.
        alert(err.stack); // ReferenceError: lalala is not defined at ...

        // 全体としてエラー表示することもできる
        // エラーは"name: message"として文字列に変換される
        alert(err); // ReferenceError: lalala is not defined
    }
}

// 任意の"catch"バインディング
// エラーの詳細が必要ない場合は引数をcatchの引数を省略することができる


// "try..catch"の利用
// try..catchの実際のユースケースについて探索する
// データを受信し、JSON.parseを呼び出す
{
    let json = '{"name": "John", "age": 30}'; // サーバからのデータ

    let user = JSON.parse(json); // テキスト表現をJSオブジェクトに変換

    // 今、user文字列からプロパティをもつオブジェクト
    alert(user.name); // John
    alert(user.age); // 30
}

// jsonが不正な形式の場合、JSON.parseはエラーになり停止する
{
    let json = "{bad json}";

    try {
        let user = JSON.parse(json); // エラー
        alert(user.name); // 動作しない
    } catch(e) {
        // 実行はここに来る
        alert(" Our apologies, the data has errore. we'll try to request it one more time.");
        alert(e.name);
        alert(e.message);
    }
}
// ここでは単にメッセージを表示しているだけだが、より多くのことが可能
// 例えば新たなネットワーク要求、訪問者への代替手段の提案、ロギング機構へのエラーに関する情報の送信など


// 独自のエラーをスローする
// 仮にjsonが構文的に正しいが、必須の"name"プロパティを持っていない場合どうなるか
{
    let json = "{'age': 30}"; // 不完全なデータ

    try {
        let user = JSON.parse(json); // エラーなし
        alert(user.name); // nameはない
    } catch(e) {
        alert("doesn't execute");
    }
}

// このままだとJSON.parseでエラーが発生したのか、nameがないからエラーが発生したのか判別できない
// エラー処理を統一するためにthrow演算子を使う
{
    let error = new Error("Things happen o_0");

    alert(error.name); // Error
    alert(error.message); // Things happen o_0
}

// JSON.parseが生成するエラーの種類を確認する
{
    try {
        JSON.parse("{ bad json o_0 }");
    } catch(e) {
        alert(e.name); // SyntaxError
        alert(e.message); // Unexpected token o in JSON at position 0
    }
}

// nameの欠落も構文エラーとして扱いたい
{
    let json = '{ "age": 30 }'; // 不完全なデータ
    
    try {
        let user = JSON.parse(json); // エラー

        if (!user.name) {
            throw new SyntaxError("Incomplete data: no name");
        }

        alert(user.name);
    } catch(e) {
        alert("JSON Error: " + e.message); // JSON Error: Incomplete data: no name
    }
}

// 上の例で不正なデータを処理するためにtry..catchを使った
// しかし、tryの中で別の予期しないエラーが発生する可能性はあるか？
// 変数が未定義、またはその他、単に"不正なデータ"ではないなにかがあるか？
{
    let json = ' "age": 30 }'; // 不正なデータ
    
    try {
        user = JSON.parse(json); // <-- userの前に"let"をつけ忘れた
    } catch(err) {
        alert("JSON Error: " + err); // JSON Error: ReferenceError: user is not defiened
        // (実際にはJSONのエラーではない)
    }
}

// このような場合には再スローという手法が利用できる
// キャッチはそれが知っているエラーだけを処理し、すべてのオブジェクトを再スローするべき
// 再スローテクニックの詳細は次のように説明できる
// 1. 全てのエラーをキャッチする
// 2. catch(err) {...} ブロックでエラーオブジェクトerrを解析する
// 3. どう処理すればいいかわからなければthrow errをする
{
    try {
        user = {};
    } catch (err) {
        if (err instanceof ReferenceError) {
            alert("ReferenceError"); // 未定義変数へのアクセスに対する"ReferenceError"
        }
    }
}
// err.nameプロパティからエラークラス名を取得することも可能
// もう一つの選択肢は、err.constructor.nameを参照すること
{
    let json = '{"age": 30}'; // 不完全なデータ

    try {
        let user = JSON.parse(json);

        if (!user.name) {
            throw new SyntaxError("Incomplete data: no name");
        }

        blabla(); // 予期しないエラー
        
        alert(user.name)
    } catch(e) {
        if (e.name == "SyntaxError") {
            alert("JSON Error: " + e.message);
        } else {
            throw e; // 再スロー
        }
    }
}

// catchブロックは実際に扱い方を知っているエラーだけを処理し、その他全てをスキップする
// 下の例はこのようなエラーが1つ上のレベルでtry..catchで補足されるデモ
{
    function readData() {
        let json = '{"age": 30}';

        try {
            // ...
            blabla(); // error!
        } catch(e) {
            if (e.name != "SyntaxError") {
                throw e; // 再スロー（今はエラーの扱い方を知らない）
            }
        }
    }

    try {
        readData();
    } catch(e) {
        alert("External catch got: " + e); // Caught it!
    }
    // ここではreadDataはSyntaxErrorの処理の仕方だけを知っており、外部のtry..catchはすべての処理の方法を知っている
}

// try..catch..finally
// エラーがなかった場合はtryの後で
// エラーがあった場合にはcatchの後で
{
    try {
        alert("try");
        if (confirm("Make an error?")) BAD_CODE();
    } catch(e) {
        alert("catch");
    } finally {
        alert("finally");
    }

    // どのような結果であれファイナライズをしたいときに使われる
}

// finallyのユースケース
// どのような結果であっても処理時間の計測を完了されるときに使う
{
    let num = +prompt("Enter a positive integer number?", 35);

    let diff, result;

    function fib(n) {
        if (n < 0 || Math.trunc(n) != n) {
            throw new Error("Must not be negative, and also an integer.");
        }
        return n <= 1 ? n : fib(n - 1) + fib(n - 2);
    }

    let start = Date.now();

    try {
        result = fib(num);
    } catch (e) {
        result = 0;
    } finally {
        diff = Date.now() - start;
    }

    alert(result || "error occured");

    alert(`exesution took ${diff}ms`);
}

// finallyとreturn
// finally句はtry..catchからの任意の終了に対して機能する
{
    function func() {
        try {
            return 1;
        } catch(e) {

        } finally {
            alert("finally");
        }
    }

    alert(func()); // 最初にfinallyのalertが動作し、次にこれが動作する
}

// グローバルなtry..catch
/*
{
    <script>
        window.onerror = function(message, url, line, col, error) {
            alert(`${message}\n At ${line}:${col} of ${url}`);
        };

        function readData() {
            badfunc();
        }

        readData();
    </script>
}
*/