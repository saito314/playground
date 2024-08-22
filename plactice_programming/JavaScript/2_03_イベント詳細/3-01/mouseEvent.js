"use strict";

// 誤字あり：簡単に言うと、ドキュメント相対座標 pageX/Y はドキュメントの左上の端から数えた数値で、ページがスクールしても変わりません。
// 副作用か？：マウスのダブルクリックは、インターフェースによってはじゃまになる副作業があります

// マウスイベント
// マウスイベントの種類
// ・要素上でマウスボタンが押下/離された: mousedown/mouseup
// ・マウスポイントが要素に来る/出て行った: mouseover/mouseout
// ・要素上でのマウス移動毎にこのイベントが発生する: mousemove
// ・mousedownの後に発生し、マウスの左ボタンが使われた場合は同じ要素にmouseupが発生する: click
// ・短時間の間に同じ要素で2回クリックされた後に発生する: dbclick
// ・マウスの右ボタンが使われた場合に発生する: contextmenu


// イベント順
// 上の一覧を見てわかるように、ユーザアクションは複数のイベントを発生させることがある
// 例えば、左ボタンのクリックは最初にmousedownを発生させ、ボタンが押された後にそれが離されるとmouseupとclickが発生する
// 1つのアクションが複数イベントを発生させる場合、順序が決まっている
// ハンドラはmousedown -> mouseup -> clickの順番で呼び出される


// マウスボタン
// クリック関連のイベントには常にbuttonプロパティがあり、正確なマウスボタンが取得できる
// 通常ｍclickやcontextmenuでは使わない。
// 一方でmousedownとmouseupのハンドラがevent.buttonを必要とする場合がある
// このときbuttonで右マウスボタンと左マウスボタンが区別できる


// 修飾子: shift, alt, ctrl, meta
// すべてのマウスイベントは押された修飾子のキーに関する情報も含む
// イベントプロパティ:
// ・shiftKey: Shift
// ・altKey: Alt (or MacはOpt)
// ・ctrlKey: Ctrl
// ・metaKey: MacはCmd
// イベント時に対応するキーが押されていた場合にtrueになる
// 下のボタンはAlt+Shift+Clickでのみ動作する
/*
    <button id="button">Alt+Shift+Click on me!</button>

    <script>
        button.onclick = function(event) {
            if (event.altKey && event.shiftKey) {
                alert("Hooray!");
            }
        };
    </script>
*/


// 座標: clientX/Y, pageX/Y
// すべてのマウスイベントは2種類の座標を持っている
// 1. ウィンドウに相対: clientXとclientY
// 2. ドキュメントに相対: pageXとpageY
// ドキュメント相対座標pageX/Yはドキュメントの左上の端から数えた数値で、ページがスクロールしても変わらない
// 一方でclientX/Yはウィンドウの左端から数えた数値でページがスクロールされると値は変わる
/*
    <input onmousemove="this.value=event.clientX+":"+event.clientY" value="Mouse over me">
*/

// マウスダウンでの選択を防ぐ
// マウスのダブルクリックはインタフェースによっては邪魔になる副作用がある
// 例えば、下のテキストをダブルクリックするとハンドラに加えてそのテキストを選択する
/*
    <b ondbclick="alert("dbclick")">Double-click me</b>
*/

// 左マウスボタンを押した後に離さずにマウスを動かすとそれも選択範囲になるが、この動作は望まれないことがある
// この特定のケースで最も理にかなった方法はブラウザのmousedownのアクションを無効にすること
/*
    Before...
    <b ondbclick="alert("Click!")" onmousedown="return false">
        Double-click me
    </b>
    ...After
*/
// これで太字部分の要素はダブルクリックで選択されない
// また左ボタンを押しても選択は開始されない