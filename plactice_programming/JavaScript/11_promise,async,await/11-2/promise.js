"use strict";

// promise
// new Promiseに渡される関数はexecuterと呼ばれる
// resolve: ジョブが正常に終了した場合。結果のvalueを待つ
// reject: エラーが発生した場合。errorはエラーオブジェクト


// Promiseコンストラクタとその生成コードをもつ単純なexecuter関数の例
{
    let promise = new Promise(function(resolve, reject) {
        // promiseが作られたとき、関数が自動的に実行される

        // 1秒後、ジョブが"done!"という結果と一緒に完了したことを合図する
        setTimeout(() => resolve("done!"), 1000);
    })
}

// 次はエラーでexecuterがpromiseを拒否する例
{
    let promise = new Promise(function(resolve, reject) {
        // 1秒後、ジョブがエラーで終わったことを合図する
        setTimeout(() => reject(new Error("Whoops!")), 1000);
    });
}

// executerが実行できるのは1つの結果またはエラーのみ
{
    let promise = new Promise(function(resolve, reject) {
        resolve("done!");

        reject(new Error("…")); // 無視される
        setTimeout(() => resolve("…")); // 無視される
    });
}

// resolve/rejectは即時実行可能
{
    let promise = new Promise(function(resolve, reject) {
        // not taking out time to do the job
        resolve(123); // 即座に結果123を返す
    });
}

// .then .catch .finally
// Promiseオブジェクトはexecuterと消費関数の間のリンクとして機能する
// 消費関数はメソッド .then .catch .finallyを使って登録できる
// then
// 基本的な構文は以下の通り
{
    promise.then(
        function(result) { /* 成功した結果を扱う */},
        function(error) { /* エラーを扱う */}
    );
}
// 正常に解決されたpromiseの動き例
{
    let promise = new Promise(function(resolve, reject) {
        setTimeout(() => resolve("done!"), 1000);
    });

    // resolveは.thenの最初の関数を実行する
    promise.then(
        result => alert(result), // 1秒後に"done!"を表示
        error => alert(error) // 実行されない
    )
}
// 拒否された場合
{
    let promise = new Promise(function(resolve, reject) {
        setTimeout(() => reject(new Error("Whoops!")), 1000);
    });

    promise.then(
        result => alert(resolve), // 実行されない
        error => alert(error) // 1秒後に"Error: Whoops!"を表示
    );
}

// もし正常完了の場合だけを扱いたい場合は.thenには引数を1つだけ指定する
{
    let promise = new Promise(resolve => {
        setTimeout(() => resolve("done!"), 1000);
    });

    promise.then(alert);
}


// .catch
// エラーにのみ関数がある場合は第一引数にnull: .then(null, function)と指定する
// または.catch(function)が使え、これは上記とまったく同じ
{
    let promise = new Promise(function(resolve, reject) {
        setTimeout(() => reject(new Error("Whoops!")), 1000);
    });

    // .catch(f)はpromise.then(null, f)と同じ
    promise.catch(alert); // 1秒後に"Error: Whoops!"を表示
}

// finally
// Promiseにもfinallyがある
// クリーンアップを実行するのに便利なハンドラ
{
    new Promise((resolve, reject) => {
        /* 時間のかかる処理を行う、その後resolve/rejectを呼び出す */
    })
    // 成功か失敗かは関係なく、promiseが確定したときに実行される
    .finally(() => {/* 読み込み中のインジケータを停止する */})
    // したがって、読み込み中のインジケータは結果/エラーを処理する前に必ず停止される
    .then(result => {/* 結果を表示する */}, reject => {/* エラーを表示する */})
}

// finallyハンドラは次のハンドラに結果あるいはエラーを渡す
{
    new Promise((resolve, reject) => {
        setTimeout(() => resolve("result"), 2000);
    })
    .finallt(() => alert("Promise ready"))
    .then(result => alert(result)); // <-- .thenは結果(result)を扱う
}
// finallyでエラーが発生し、catchにエラーが渡される例
{
    new Promise((resolve, reject) => {
        throw new Error("error");
    })
    .finally(() => alert("Promise ready"))
    .catch(err => alert(err)); // <-- .catchはエラーオブジェクトを扱う
}


// 非同期コードを書くにあたり、promiseがどのように役に立つかユースケースを見ていく
// loadScript
{
    function loadScript(src, callback) {
        let script = document.createElement("script");
        script.src = src;

        script.onload = () => callback(null, script);
        script.onerror = () => callback(new Error(`Script load error ` + src));

        document.head.append(script);
    }
}

// これをpromiseを使って再実装する
// 新しい関数loadScriptはコールバックを必要としない。
// 代わりに読み込みが完了したときにpromiseオブジェクトを生成して返す
// 外部コードは.thenを使用してそれにハンドラを追加することができる
{
    function loadScript(src) {
        return new Promise(function(resolve, reject) {
            let script = document.createElement("script");
            script.src = src;

            script.onload = () => resolve(script);
            script.onerror = () => reject(new Error("Script load Error: " + src));

            document.head.append(script);
        });
    }
}

// 使用方法
{
    let promise = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

    promise.then(
        script => alert(`${script.src} is loaded`),
        error => alert(`Error: ${error.message}`)
    );

    promise.then(script => alert("Another handler ..."));
}