"use strict";


// 再開可能なファイルアップロード
// fetchメソッドを使用すると、とても簡単にファイルをアップロードすることができる
// 再開可能なアップロードには、アップロードの進行状況の表示が一緒に必要になる
// fetchではアップロードの進行状況を追跡できないため、XMLHttpRequestを使う


// あまり役にたたないprogressイベント
// アップロードを再開するには、接続が失われるまでにどれだけアップロードされたかを知る必要がある
// アップロードの進行状況を追跡するxhr.upload.onprogressがある。
// これはデータが送られたときに発生しますが、サーバが受け取ったかはブラウザは知らない。


// アルゴリズム
// 1. 最初に、アップロードするファイルを一意に識別するためにファイルidを作成する
{
    let fileId = file.name + "-" + file.size + "-" + +file.lastModifiedDate;
}

// 2. サーバにリクエストを送り、すでに受け取り済みのバイト数を尋ねる。
{
    let response = await fetch("status", {
        headers: {
            "X-file-Id": fileId
        }
    });

    let startByte = +await response.text();
}

// 3. 次にBlobのメソッドsliceを使ってstartByteからファイルを送信する
{
    xhr.open("POST", "upload", true);

    xhr.setRequestHeader('X-File-Id', fileId);

    xhr.setRequestHeader('X-Start-Byte', startByte);

    xhr.upload.onprogress = (e) => {
        console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`)
    };

    xhr.send(file.slice(startByte));
}