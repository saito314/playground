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
// これらすべてのビューの共通の用語はTypedArrayで、これらは同じメソッドとプロパティのセットを共有する
// 通常の配列に似ていて、インデックスがあり反復可能
// 5つの引数のパターンがある
{
    new TypedArray(buffer, [bytesOffset], [length]);
    new TypedArray(object);
    new TypedArray(typedArray);
    new TypedArray(length);
    new TypedArray();
}

// 1. ArrayBufferの引数が与えられるとそれに対するビューが作られる
//    オプションでbytesOffsetで開始位置、lengthで長さを指定することができ、その場合はビューはbufferの一部だけをカバーする
// 2. Arrayまたは配列ライクなオブジェクトが与えられた場合は、同じ長さの型月配列を生成し、内容をコピーする
{
    let arr = new Uint8Array([0, 1, 2, 3]);
    alert(arr.length); // 4
    alert(arr[1]);
} 
// 3. 別のTypedArrayが与えられた場合も同じ
//    同じ長さの旗付き配列を生成し、値をコピーする
//    値はその処理の中で新しい型に変換される
{
    let arr16 = new Uint16Array([1, 1000]);
    let arr8 = new Uint8Array(arr16);
    alert(arr8[0]); // 1
    alert(arr8[1]); // 232
}
// 4. 数値引数の場合はlengthであり、その数の要素を含む型月配列を生成する
//    そのバイト長は1つあたりのアイテムのバイト数TypedArray.BYTES_PER_ELEMENTがlength倍されたものになる
{
    let arr = new Uint16Array(4); // 長さ4の型付き配列を生成する
    alert(Unit16Array.BYTES_PER_ELEMENT); // 要素あたり2バイト
    alert(arr.bytesLength); // 8(バイトサイズ)
}
// 5. 引数がなければ長さゼロの型付き配列を生成する
// ArrayBufferに言及することなく、直接TypedArrayを作成することができる
// しかし、ビューはその根底にあるArrayBufferなしで存在できないため、最初のケースを除く、すべての場合に自動的に作成される
{
    let arr8 = new Uint8Array([0, 1, 2, 3]);

    // 同じデータを別のビューで
    let arr16 = new Uint16Array(arr8.buffer);
}


// 範囲外の動作
// 範囲外の値を型付き配列に書き込もうとすると余分なビットが切り捨てられる
{
    let uint8array = new Uint8Array(16);

    let num = 256;
    alert(num.toString(2)); // 100000000

    uint8Array[0] = 256;
    uint8array[1] = 257;

    alert(uint8array[0]);
    alert(uint8array[1]);
}


// TypedArrayメソッド
// TypedArrayはmap, slice, find, reduceを使用してイテレートできる
// しかし、spliceはなくconcatメソッドもない


// Dataview
// DataViweは非常に柔軟なArrayBufferに対する型指定のないビュー
// あらゆるフォーマットの任意のオフセットのデータにアクセスすることができる
{
    // 同じバッファから異なるフォーマットで数値を取り出す
    let buffer = new Uint8Array([255, 255, 255, 255]).buffer;

    let dataView = new DataView(buffer);

    // オフセット0で、8ビットの数値を取得する
    alert(dataView.getUint8(0));

    // オフセット0で、16ビットの数値を取得する
    alert(dataView.getUint16(0));

    // オフセット0で、32ビットの数値を取得する
    alert(dataView.getUint32(0));

    dataView.setUint32(0, 0);
}