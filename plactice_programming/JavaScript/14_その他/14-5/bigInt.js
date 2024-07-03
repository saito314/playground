"use strict";

{
    const bigint = 1234567890123456789012345678901234567890n;

    const sameBinint = BigInt("1234567890123456789012345678901234567890");

    const bigintFromNumber = BigInt(10); // 10n一緒
}

{
    // 注意：5/2は小数部分なしでゼロに向かって丸められた結果を返す
    alert(1n + 2);
}

// 必要なら明示的な変換が必要
{
    let bigint = 1n;
    let number = 2;

    // number から bigintへ
    alert(bigint + BigInt(number)); // 3

    // bigint から numberへ
    alert(Number(bigint) + number); // 3
}

// 算術演算子
{
    // BigIntはほぼ通常の数値のように扱うことができる
    alert(1n + 2n);

    alert(5n / 2n);
}

{
    // bigintと通常の数値を混在させることはできない
    alert(1n + 2);
}

{
    // 必要な未維持的な変更名が必要
    let bigint = 1n;
    let number = 2;

    // numberからbigintへ
    alert(bigint + BigInt(number)); // 3

    // bigintからnumberへ
    alert(Number(bigint) + number); // 3
}

// 比較
{
    alert(2n > 1n); // true

    alert(2n > 1) // true
}

// Boolean
{
    alert(1 == 1n);

    alert(1 === 1n); // false
}