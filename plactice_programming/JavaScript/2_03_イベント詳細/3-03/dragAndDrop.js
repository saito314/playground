"use strict";


// ドラッグアンドドロップはコピーや移動などの多くの実行を簡単にする


// ドラッグ&ドロップアルゴリズム
// 基本的なドラッグアンドドロップのアルゴリズムは下記のようになる
// 1. ドラッグ可能な要素でmousedownをキャッチする
// 2. 移動する要素を準備する
// 3. その後、mousemoveでleft/topとposition:absoluteを変更することで、それを移動させる
// 4. mouseupで終了したドラッグアンドドロップに関するすべてのアクションを実行する
// ドラッグアンドドロップは拡張可能で、ドロップ可能な要素上にマウスを持ってきたときに強調表示することなどが可能
// ボールをドラッグアンドドロップするときのアルゴリズムの例
{
    ball.onmousedown = function(event) { // (1) 処理を開始

        // (2) 移動のための準備: absoluteにし、z-indexでトップにする
        ball.style.position = "absolute";
        ball.style.zIndex = 1000;
        // 現在の親からbodyへ直接移動させ、bodyに対して相対配置をする
        document.body.append(ball);
        // ...そしてその絶対配置されたボールをカーソルの下に置く

        moveAt(event.pageX, event.pageY);

        // ボールを(pageX, pageY)座標の中心に置く
        function moveAt(pageX, pageY) {
            ball.style.left = pageX - ball.offsetWidth / 2 + "px";
            ball.style.top = pageY - ball.offsetHeight / 2 + "px";
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // (3) mousemoveでボールを移動する
        document.addEventListener("mousemove", onMouseMove);

        // (4) ボールをドロップする。不要なハンドラを削除する
        ball.onmouseup = function() {
            document.removeEventListener("mousemove", onMouseMove);
            ball.onmouseup = null;
        };
    };
}

// これでは奇妙な動作が起こる
// ブラウザが持つ独自のドラッグアンドドロップ機能と競合するため
{
    // 解除するには下記のものが必要
    ball.ondragstart = function() {
        return false;
    };
}


// 正しいポジショニング
// 上の例ではボールが常にポインタの下で中央に配置されている
// ボールの端をつかんだ場合に中央に寄せるようにボールがジャンプしてしまう
// 1. 訪問者がボタンを押したとき、変数shiftX/shiftYに、カーソルからボールの左端の距離を覚えることができる。座標のずれを取得するには座標の減算をする
{
    // onmousedown
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
}

// 次に、ドラッグの間はこのようにして、ポインタに相対的な同じシフトにボールを置く
{
    // onmousemove
    // ball has position;absolute
    ball.style.left = event.pageX - shiftX + "px";
    ball.style.top = event.pageY + "px";
}

// 最終的なコード
{
    ball.onmousedown = function(event) {

        let shiftX = event.clientX - ball.getBoundingClientRect().left;
        let shiftY = event.clientY - ball.getBoundingClientRect().top;

        ball.style.position = "absolute";
        ball.style.zIndex = 1000;
        document.body.append(ball);

        moveBy.At(event.pageX, event.pageY);

        // ボールを(pageX, pageY)座標の中心に置く
        function moveAt(pageX, pageY) {
            ball.style.left = pageX - shiftX + "px";
            ball.style.top = pageY - shiftY + "px";
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        // (3) mousemoveでボールを移動する
        document.addEventListerer("mousemove", onMouseMove);

        // (4) ボールをドロップする。不要なハンドラを削除する
        ball.onmouseup = function() {
            document.removeEventListener("mousemove", onMouseMove);
            ball.onmouseup = null;
        };
    };

    ball.ondragstart = function() {
        return false;
    };
}