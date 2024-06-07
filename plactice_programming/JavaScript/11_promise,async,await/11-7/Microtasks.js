"use strict";

// Promiseハンドラの.then/.catch/.finallyは常に非同期
{
    let promise = Promise.resolve();

    promise.then(() => alert("promise done!"));

    alert("code finished"); // このアラートが最初に表示される
}

// Microtasksキュー
// 非同期タスクの適切な管理のためにECMA基準では内部キューのPromisejobsについて述べられている
// ・キューは先出し先入れ
// ・タスクの実行は他になにも実行されていないときにだけ開始される
// 順序が重要な場合、例えば上記の場合.thenのあとにalertを処理したい場合はどうしたらいいか
{
    // .thenのあとに.thenでalertを処理すればよい
    Promise.resolve()
        .then(() => alert("promise done!"))
        .then(() => alert("code finished!"));
}

// 未処理の拒否(unhandled rejection)
// 未処理の拒否はmicrotasksキューの最後でPromiseエラーが処理されない場合に発生する
{
    let promise = Promise.reject(new Error("Promise Failed!"));
    promise.catch(err => alert("caught"));

    // 実行されない: error handled
    window.addEventListener("unhandledrejection", event => alert(event.reason));
}

// .catchを忘れていた場合、microtaskキューが空になったあとエンジンはイベントをトリガーする
{
    let promise = Promise.reject(new Error("Promise Failed!"));

    // 実行される: Promise Failed!
    window.addEventListener("unhandledrejection", event => alert(event.reason));
}

// 仮に次のように後でエラー処理をするとどうなるのか
{
    let promise = Promise.reject(new Error("Promise Failed!"));
    setTimeout(() => promise.catch(err => alert("caught")), 1000);

    // 実行される: Error: Promise Failed!
    window.addEventListener("unhandledrejection", event => alert(event.reason));
}