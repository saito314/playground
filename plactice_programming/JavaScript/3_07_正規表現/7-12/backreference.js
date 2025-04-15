"use strict";


// 番号による後方参照: \N
// グループはパターンの中で\Nを使うことで参照することができNはグループの番号
// 引用符で囲まれた文字列を見つける必要がある場合、ダブルクォートとシングルクォートのどちらにも対応する必要がある
{
    let str = "He said: \'She's the one!\'.";

    let reg = /["'](.*?)["']/g;

    // 結果は気体したものにはならない
    alert(str.match(reg));
}

// これが正しいコード
{
    let str = "He said: \'She's the one!\'.";

    let reg = /(["'])(.*?)\1/g;

    alert(str.match(reg));
}

// 名前による後方参照: \k<name>
// 正規表現に多くの括弧がある場合、名前付けをすると便利
// 名前付けされたグループを参照するには\k<name>を使用する
{
    let str = `He said: "She's the one!".`;

    let regexp = /(?<quote>['"])(.*?)\k<quote>/g;

    alert(str.match(regexp));
}