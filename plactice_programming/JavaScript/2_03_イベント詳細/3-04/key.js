"use strict";


// キーボード： keydownとkeyup
// 現在のデバイスでは何かを入力するためのほかの方法があることに留意
// 例えば、音声認識やマウスのコピーアンドペーストなど
// <input>フィールドへの任意の入力を追跡したい場合、キーボードイベントだけでは十分ではない
// キーボードイベントはキーボードアクションを処理したいときに使われるべき


// keydownとkeyup
// keydownはキーが押されたときに、keyupはそれが離されたときに発生する


// event.codeとevent.key
// イベントオブジェクトのkeyプロパティは、イベントオブジェクトのcodeプロパティが物理的なキーコードを取得できる一方
// 文字を取得することができる
// event.keyはまさに文字であり、それは異なる。しかし、event.codeは同じ
// event.codeは正確にどのキーが押されたかを特定することに注意
// 例えばshiftキーは2つあるが、event.codeは厳密にどちらのshiftが押されたかを特定する
// ホットキーを処理するときはevent.codeをチェックするのが理にかなっている
{
    document.addEventListener("keydown", function(event) {
        if (event.code == "keyZ" && (event.ctrlKey || event.metaKey)) {
            alert("Undo!");
        }
    });
}