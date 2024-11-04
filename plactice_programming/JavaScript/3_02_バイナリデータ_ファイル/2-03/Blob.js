"use strict";


// Blob
// ArrayBufferとビューはECMA規格、JavaScriptの一部
// ブラウザには、さらにFile APIに記載されている高水準のオブジェクトがある。
// Blobはオプションの文字列typeとblobParts 一連のほかのBlobオブジェクト、文字列やBufferSourcesから構成される
{
    new Blob(blobParts, options);
}

// 例
{
    // 文字列からBlobを作成する
    let blob = new Blob(["<html>...</html>"], {type: "text/html"});
    // 注意: 最初の引数は配列である必要がある
}
{
    // 型付き配列と文字列からBlobを作成する
    let hello = new Uint8Array([72, 101, 108, 108, 111]);

    let blob = new Blob([hello, " ", "wworld"], {type: "text/plain"});
}

// Blobsはイミュータブル
// blobのデータを直接変更することはできないが、blobの一部を切り出したり、それらから新しいblobを作成したり
// それらを新しいblobのミックスにしたりできる


// URLとしてのBlob
// Blobはその内容を表示するのに<a><img>やほかのタグのURLとして簡単に使うことができる
// typeのおかげでblobをダウンロード/アップロードすることも可能で、それはネットワークリクエストではもちろんContent-Typeになる
/*
    download属性はブラウザを移動する代わりにダウンロードを行う
    <a download="hello.txt" href="#" id="link">Download</a>

    <script>
    let blob = new Blob(["Hello, world!"], {type: "text/plain"});

    link.href = URL.createObjectURL(blob);
    </script>
*/

// HTMLなしで動的に作成されたBLobを利用者にダウンロードさせるコード
{
    let link = document.createElement("a");
    link.download = "hello.txt";

    let blob = new Blob(["Hello, world!"], {type: "text/plain"});

    link.href = URL.createObjectURL(blob);

    link.click();

    URL.revokeObjectURL(link.href);
}

// 副作用として、blobのマッピングがある間、blob自身はメモリ内に存在しつ透ける
// URLを作成すると、それ以上必要なくなってもblobはメモリにとどまる


// Blobをbase64にする
// blobをbase64に変換するには組み込みのFileReaderオブジェクトを使用する
{
    let link = document.createElement("a");
    link.download = "hello.txt";

    let blob = new Blob(["Hello, world"], {type: "text/plain"});

    let reader = new FileReader();
    reader.readAsDataURL(blob);

    reader.onload = function() {
        link.href = reader.result; // data url
        link.click();
    };
}

// Imageをblobにする
// 画像、画像の一部、あるいはページのスクリーンショットのblobを作成することもできる
// 1. canvas.draeImageを使ってcanvas上で画像を書く
// 2. blobを作成し、完了時にcallbackを実行するcanvasメソッドを呼び出す
{
    // 画像を取る
    let img = document.querySelector("img");

    // 同じサイズの<canvas>を作る
    let canvas = document.createElement("canvas");
    canvas.width = img.clientWidth;
    canvas.height = img.clientHeight;

    let context = canvas.getContext("2d");

    // 画像をコピーする
    context.drawImage(img, 0, 0);
    // canvas上ではcontext.rotate()やその他様々なことができる

    // toBlobは非同期操作でcallbackは完了時に呼ばれる
    canvas.toBlob(function(blob) {
        // blobの準備ができたのでダウンロードする
        let link = document.createElement("a");
        link.download = "example,png";

        link.href = URL.createObjectURL(blob);
        link.click();

        // ブラウザがメモリをクリアできるよう、内側のblobへの参照を削除する
        URL.revokeObjectURL(link.href);
    }, "image/png");
}

// コールバックよりasync/awaitを好む場合は
{
    let blob = await new Promise(resolve => canvasElem.toBlob(resolve, "image/png"));
}


// BlobからArrayBufferへ
// BlobコンストラクタはBufferSourceを含め、ほぼ何からでもblobを作成することができる
// しかし、低レベルの処理を実行する必要がある場合、FileReaderを使って最も低レベルであるArrayBufferを取得できる
{
    // blobからarrayBufferを取得
    let fileReader = new FileReader();

    fileReader.readAsArrayBuffer(blob);

    fileReader.onload = function(event) {
        let arrayBuffer = fileReader.result;
    };
}