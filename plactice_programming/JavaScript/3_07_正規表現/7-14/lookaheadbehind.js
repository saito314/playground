"use strict";

// 先読みと後読み
// 別のパターンが続く、あるいは先行するパターンにマッチするものだけを探したいことがある
// そのための特別な構文が存在し、先読みと後読みとよばれ、まとめてlookaroundとよばれる


// 先読み
// 構文はX(?=Y)でXを探すけどYが続く場合にだけマッチするを意味する
{
    let str = "1 turkey costs 30€";

    alert(str.match(/\d+(?=€)/));
}

// もっと複雑なテストも可能
// 例えばX(?=Y)(?=Z)で、Xの後にY, Zが同時に続くことを意味する
{
    let str = "1 turkey costs 30€";

    alert(str.match(/\d+(?=\s)(?=.*30)/));
}


// 否定先読み（Negative lookahead）
// 同じ文字列から、価格ではなく数量がほしいとする
// それは数値/d+で€が続かないものとする
{
    let str = "2 turkey cost 60€";

    alert(str.match(/\d+(?!€)/));
}


// 後読み（Lookbehind）
// 後読みは先読みに似ていますが、これは後ろを見る
// 例えば価格をUSドルに変えてみる
{
    let str = "1 turkey costs $30";

    alert(str.match(/(?<=\$)\d+/));
}

// また数量$から始まらない数値が三つような場合否定後読みが利用できる
{
    let str = "2 turkey cost $60";

    alert(str.match(/(?<!\$)\d+/));
}


// キャプチャグループ
// lookaroundのカッコ内の内容が結果の一部にはならない。
// しかし、状況によってはlookaround式、またはその一部をキャプチャしたいかもしれない。
{
    let str = "1 turkey costs 30€";
    let regexp = /\d+(?=(€|kr))/;

    alert(str.match(regexp));
}

// 後読みの場合も同じ
{
    let str = "1 turkey costs $30";
    let regexp = /(?<=(\$|£))\d+/;

    alert(str.match(regexp));
}