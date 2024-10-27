"use strict";


// ArrayBuffer, binaryarrays
// web開発ではファイルを処理するときにバイナリデータに出くわす
// その他の典型的なユースケースは画像処理

// JavaScriptでのバイナリデータは他の言語に比べて非標準的な方法で実装されている
// 一度整理できればすべてがとても簡単になる
// 基本となるバイナリオブジェクトはArrayBufferで、これは固定長の連続したメモリ領域への参照
{
    let buffer = new ArrayBuffer(16); // 長さ16のバッファを作成
    alert(buffer.byteLength); // 16
}


// ArrayBufferはメモリ領域で、何が格納されているかわからない
// ArrayBufferを操作するにはviewオブジェクトを使用する必要がある
// ArrayBufferはコアとなるオブジェクト、すべてのもののルート、生のバイナリデータ
{
    let buffer = new ArrayBuffer(16); // 長さ16のバッファを作成

    let view = new Uint32Array(buffer); // 32ビット整数列としてバッファを扱う

    alert(Unit32Array.BYTES_PER_ELEMENT); // 4バイト毎の整数

    alert(view.length); // 4, 多くの整数が格納される
    alert(view.byteLength); // 16, バイトサイズ

    // 値の書き込み
    view[0] = 123456;

    // 値のイテレート
    for(let num of view) {
        alert(num); // 123456, 次に0, 0, 0 (全部で4つの値)
    }
}


// TypedArray