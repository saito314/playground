"use strict";


// 集合と範囲
// 角括弧の中の複数の文字または文字クラスが指定された中の任意の文字を探すことを意味する


// 集合
// 例えば、[eao]は3文字のいずれかを意味する
{
    alert("Mop top".match(/[tm]op/gi));
}

// 集合には複数の文字があるが、マッチした中での1文字に相当することに注意
{
    alert("Volia".match(/V[oi]la/)); // null
}


// 範囲
// 各括弧は文字の範囲を含むこともある
{
    alert("Exception 0xAF".match(/x[0-9A-F][0-9A-F]/g));
}

// 例：多言語 \w
{
    let regexp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;

    let str = `Hi 你好 12`;

    alert(str.match(regexp));
}


// 範囲を除外する
{
    alert("alice15@gmail.com".match(/[^\d\sA-Z]/gi));
}


// []でのエスケープ
{
    let regexp = /[-().^+]/g;

    alert("1 + 2 - 3".match(regexp));
}

{ // 全部エスケープ
    let regexp = /[\-\(\)\.\^\+]/g;

    alert("1 + 2 - 3".match(regexp));
}


// 範囲とフラグ"u"
// 集合の中にサロゲートペアがある場合、正しく動作させるためにフラグuが必要になる
{
    alert('𝒳'.match(/[𝒳𝒴]/));
}

// デフォルトではサロゲートペアを知らない
{
    for(let i=0; i<'𝒳𝒴'.length; i++) {
        alert('𝒳𝒴'.charCodeAt(i)); // 55349, 56499, 55349, 56500
    };
}

// フラグ"u"を追加すると正しいふるまいになる
{
    alert('𝒳'.match(/[𝒳𝒴]/u));
}

// フラグ"u"を追加し忘れた場合、エラーになる
{
    '𝒳'.match(/[𝒳-𝒴]/);
}

// フラグ"u"がない場合にはサロゲートペアは2文字として認識される
// フラグuがあると正しく動作する
{
    alert('𝒴'.match(/[𝒳-𝒵]/u));
}