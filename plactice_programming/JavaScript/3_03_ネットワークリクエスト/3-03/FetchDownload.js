"use strict";


// Fetch: ダウンロードの進行状況
// fetchはダウンロードの進行状況を追跡することができる
// しかしアップロードの状況は追跡できない
{
    const reader = response.body.getReader();

    // 本文のダウンロードは無限ループ
    while(true) {
        // 最後のチャンクの場合、doneはtrue
        // valueはチャンクバイトのUint8Array
        const {done, value} = await reader.read();

        if (done) {
            break;
        }

        console.log(`Received ${value.length} bytes`);
    }
}

// await reader.read()がレスポンスのチャンクを返す間、ループする
// 進行状況を記録するにはチャンクを数える必要がある
{
    // step1: fetchを開始し、readerを取得する
    let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

    const reader = response.body.getReader();

    // step2: 合計の長さを取得する
    const contentLength = +response.headers.get("Content-Length");

    // step3: データを読み込む
    let receivedLength = 0;
    let chunks = [];
    while(true) {
        const {done, value} = await reader.read();

        if (done) {
            break;
        }

        chunks.push(value);
        receivedLength += value.length;

        console.log(`Received ${receivedLength} of ${contentLength}`);
    }

    // step4: チャンクを1つのUint8Arrayに連結する
    let chunksAll = new Uint8Array(receivedLength);
    let position = 0;
    for(let chunk of chunks) {
        chunksAll.set(chunk, position);
        position += chunk.length;
    }

    // step5: 文字列にデコード
    let result = new TextDecoder("utf-8").decode(chunksAll);

    // 完了
    let commits = JSON.parse(result);
    alert(commits[0].author.login);
}