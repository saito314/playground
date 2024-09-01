"use strict";

// 誤字？：キーボードによって開始され得ることはたくさんあるので、デフォルトアクションさまざまです。


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
// キー配置が違うキーボードでもevent.codeは位置を特定する
// したがって、指定した文字と違う文字でイベントが発生してしまうことがある


// 自動繰り返し
// もしキーが長時間押されていると繰り返しを始める
// keydownが何度もトリガされ、それが離された後に最終的にkeyupがトリガされる


// デフォルトアクション
// キーボードによって開始されることはたくさんあるので、デフォルトアクションもさまざま
// keydownのデフォルトアクションを防ぐことはOSベースの特別なキーを除き、それらのほとんどを取り消すことが可能
/*
    <script>
        function checkPhoneKey(key) {
            return (key >= "0" && key <= "9") || key == "+" || key == "(" || key == ")" || key == "-";
        }
    </script>
    <input onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">
*/
// backspace, left, right, ctrl+Vのような特別なキーはインプットでは動作しないことに注意
// これは厳密なフィルタの副作用なので下の例ではすこしルールを弱める
/*
    <script>
        function checkPhoneKey(key) {
            return (key >= "0" && key <= "9") || key == "+" || key == "(" || key == ")" || key == "-" ||
                key == "ArrowLeft" || key == "ArrowRight" || key == "Delete" || key == "Backspace";
        }
    </script>
    <input onkeydown="return checkPhoneKey(event.key)" placeholder="Phone, please" type="tel">
*/