"use strict";


// 移動: mouseover/out, mouseenter/leave


// Mouseover/mouseout, relatedTarget
// mouseoverイベントはマウスポインタが要素の上に来るときに発生し、mouseoutはそこを離れるときにイベントが発生する
// 2つのイベントはrelatedTargetを持っているという点で特別
// mouseover
// event.target: マウスが来た要素
// event.relatedTarget: マウスが来た元の要素
// mouseout
// event.target: マウスが離れた要素
// event.relatedTarget: 新たなポインタの下の要素


// イベントの頻度
// mousemoveイベントはマウスの移動時にトリガされる
// しかし、すべてのピクセル単位の移動でイベントが発生するわけではない
// 訪問者がマウスをとても早く動かしている場合、DOM要素はスキップされる可能性がある


// 子へむけて移動するときの余分なmouseout
// マウスポインタが動くことでmouseoverの後にmouseoutがトリガされる可能性がある
// ブラウザのロジックによれば、マウスカーソルは常に単一の要素-最もネストされた要素-の上にだけある


// イベントmouseenterとmouseleave
// mouseenterとmouseleaveはmouseoverとmouseoutのようなもの
// 違いが2つだけある
// 1. 要素内の繊維はカウントされない
// 2. イベントmouseenter/mouseleaveはバブルしない


// イベント移譲
// イベントmouseenter/leaveは非常に使いやすいが、バブルしないためイベントの移譲ができない
// table上のmouseenter/leaveに対するハンドラはテーブル全体の出入りのみトリガする
// そんな場合にはmouseover/mouseoutを使ってみる
{
    // マウスの下にあるセルをハイライトする
    table.onmouseover = function(event) {
        let target = event.target;
        target.style.background = "pink";
    };

    table.onmouseout = function(event) {
        let target = event.target;
        target.style.background = "";
    };
}

// これらのハンドラは任意の要素からテーブルの内側で行くときに動作する
// しかし、全体として<td>に出入りする遷移のみを処理したいと考える。
// そしてセル全体を強調する。tdの子の間で起こる遷移を処理したくない
// 解決策は以下の通り
// ・変数で現在強調されているtdを覚える
// ・mouseoverではまだ現在のtdの中にいる場合はイベントを無視する
// ・mouseoutでは現在のtdを離れなかった場合には無視する