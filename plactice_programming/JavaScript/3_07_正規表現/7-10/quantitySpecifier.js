"use strict";


// 貪欲と怠惰な量指定子
// 量指定子と引用符
// 下記は意図しているようには動かない
{
    let reg = /".+"/g;

    let str = 'a "witch" and her "broom" is one';

    alert(str.match(reg));
}


// 貪欲（欲張り / 最大量）検索
// JavaScriptの正規表現のマッチングアルゴリズムは貪欲法が使われている
// デフォルトでは量指定子は可能な限り繰り返される


// 怠惰(最短)モード
// 貪欲モードとは違い、最小限の回数だけ繰り返すを意味する
{
    let reg = /".+?"/g;

    let str = 'a "witch" and her "broom" is one';

    alert(str.match(reg));
}
// これは?をつけた量指定子に対してのみ有効
// 他の量指定子は依然として貪欲
{
    alert("123 456".match(/\d+ \d+?/g));
}


// 代替のアプローチ
// 正規表現では同じことをする方法が複数あることがよくある
// 我々のケースでは、"[^"]+"を使うことで、怠惰モードなしで引用符で囲まれた文字列を見つけることができる
{
    let reg = /"[^"]+"/g;

    let str = 'a "witch" and her "broom" is one';

    alert(str.match(reg));
}

// 怠惰量指定子が失敗し、このバリアントが正しく動作する例を見てみる
{
    let str = '...<a href="link" class="doc">...';
    let reg = /<a href=".*" class="doc">/g;

    alert(str.match(reg)); // 動作する
}

// しかしテキスト中にもっとリンクがある場合には1つのマッチに複数のリンクが取得されてしまう場合がある
{
    let str = '...<a href="link1" class="doc">... <a href="link" class="doc">...';
    let reg = /<a href=".*" class="doc">/g;

    alert(str.match(reg));
}

// 量指定子.*?を怠惰にすることでパターンを修正する
{
    let str = '...<a href="link1" class="doc">... <a href="link" class="doc">...';
    let reg = /<a href=".*?" class="doc">/g;

    alert(str.match(reg));
}

// href="[^"]*"であれば問題ない
{
    let str1 = '...<a href="link1" class="wrong">... <p style="" class="doc">...';
    let str2 = '...<a href="link1" class="doc">... <a href="link2" class="doc">...';
    let reg = /<a href="[^"]*" class="doc">/g;

    // どちらも問題なく動作する
    alert(str1.match(reg));
    alert(str2.match(reg));
}