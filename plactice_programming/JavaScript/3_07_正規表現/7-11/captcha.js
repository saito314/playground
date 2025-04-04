"use strict";


// 誤字あり：result のインデックス 0 は常のマッチ全体になります。


// キャプチャグループ
// パターンの一部を〇かっこで囲むことができる
// これをキャプチャグループという


// gogogo
// 括弧なしだと、パターン/go+/がgoと、それに続けて1回以上のoの繰り返しを意味する
{
    alert("Gogogo now!".match(/(go)+/i));
}

// domein
// もっと複雑なもの - webサイトのドメインを探す正規表現を作る
/*
    mail.com
    users.mail.com
    smith.users.mail.com
*/

// ドメインは繰り返される単語で構成され、最後の単語以外の単語の後にドットがある
// 正規表現では、(\w+\.)+\w+
{
    let regexp = /(\w+\.)+\w+/g;

    alert("site.com my.site.com".match(regwxp));
}

// -を含むドメインには対応していないため、その場合には/wから/[w-]とすると対処できる


// email
// 前の例が拡張で可能
{
    let regexp = /[-.\w]+@([\w-]+\.)+[\w-]+/g;

    alert("my@mail.com @ his@site.com.uk".match(regexp));
}


// 括弧の中身
// 丸括弧は左から右へ番号付けされる
// 検索エンジンはそれぞれの中身を覚えており、パターンまたは置換文字列の中で内容を参照できる
{
    let str = '<h1>Hello, world!</h1>';

    let tag = str.match(/<(.*?)>/);

    alert(tag[0]);
    alert(tag[1]);
}


// ネストされたグループ
// 括弧はネストすることができる。
{
    let str = '<span class="my">';

    let regexp = /<(([a-z]+)\s*([^>]*))>/;

    let result = str.match(regexp);
    alert(result[0]);
    alert(result[1]);
    alert(result[2]);
    alert(result[3]);
}
// resultのインデックス0は常にマッチ全体になる


// オプションのグループ
// たとえグループがオプションであり、マッチに存在しない場合でも、対応するresultの配列項目は存在しundefinedと等価
{
    let match = 'a'.match(/a(z)?(c)?/);

    alert(match.length); // 3
    alert(match[0]);
    alert(match[1]);
    alert(match[2]);
}

// 文字列acの場合はより複雑なマッチになる
{
    let match = "ac".match(/a(z)?(c)?/);

    alert(match.length);
    alert(match[0]);
    alert(match[1]);
    alert(match[2]);
}


// グループを含むすべて一致を検索する: matchAll
{
    let str = '<h1> <h2>';

    let tags = str.match(/<(.*?)>/g);

    alert(tags);
}