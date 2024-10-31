"use stirict";


// TextDecoderとTextEncoder
// 組み込みのTextDecoderオブジェクトを使うと、指定されたバッファとエンコーディングから値を実際のJavaScript文字列として読み込むことができる
{
    let decoder = new TextDecoder([label], [options]);
}

// そしてデコードする
{
    let str = decoder.decode([input], [options]);
}

// 例:
{
    let uint8Array = new Uint8Array([72, 101, 108, 108, 111]);

    alert(new TextDecoder().decode(uint8Array)); // Hello
}
{
    let uint8Array = new Uint8Array([228, 189, 160, 229, 165, 189]);

    alert(new TextDecoder().decode(uint8Array));
}
// サブアレイ(subarray)ビューを作成することで、バッファの一部をデコードすることもできる
{
    let uint8Array = new Uint8Array([0, 72, 101, 108, 108, 111, 0]);

    // 文字列が中央にある
    // コピーせずに、新しいビューを作成する
    let binaryString = uint8Array.subarray(1, -1);

    alert(new TextDecoder().decode(binaryString)); // Hello
}


// TextEncoder
// TextEncoderは逆のこと：文字列をバイトに変換する
{
    let encoder = new TextEncoder();
}

// サポートしているエンコーディングはutf-8だけ
{
    let encoder = new TextEncoder();

    let uint8Array = encoder.encode("Hello");
    alert(uint8Array); // 72, 101, 108, 108, 111
}