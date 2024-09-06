"use strict";

// 誤字あり：移譲: focuin/focusout


// フォーカス: focus/blur
// ユーザがクリックするか、キーボードでTabキーを使うときに要素はフォーカスを受け取る
// ページが読み込まれたときにデフォルトで要素にフォーカスを与えるautofocus属性もある
// フォーカスを失う瞬間（blur）はより重要になる。
// フォーカスを失うということは通常データを入力されたことを意味する


// イベント focus/blur
// focusイベントはフォーカス時に呼ばれ、blurは要素がフォーカスを失ったときに呼ばれる
// 以下は例
// ・blurハンドラはemailが入力されたかどうかをチェックし、もしそうでなければエラーを表示する
// ・focusハンドラはエラーメッセージを隠す
/*
    <style>
        .invalid { border-color: red; }
        #error { color: red }
    </style>

    Your email please: <input type="email" id="input">

    <div id="error"></div>

    <script>
        input.onblur = function() {
            if (!input.value.includes("@")) { // not email
                input.classList.add("invalid");
                error.innerHTML = "Please enter a correct email."
            }
        };

        input.onfocus = function() {
            if (this.classList.contains("invalid")) {
                // ユーザは何かを再入力したいので、エラー表示を削除する
                this.classList.remove("invalid");
                error.innerHTML = "";
            }
        };
    </script>
*/


// メソッド focus/blur
// メソッドelem.focus()とelem.blur()は要素のフォーカスを設定/解除する
// 値が有効でない場合には訪問者がinputから離れられないようにしてみる
/*
    <style>
        .error {
            background: red;
        }
    </style>

    Your email please: <input type="email" id="input">
    <input type="text" style="width:220px" placeholder="make email invalid and try to focus here.";

    <script>
        input.onblur = function() {
            if (!this.value.include("@")) { // not email
                // エラーを表示
                this.classList.add("error");
                // そのあと、フォーカスを戻す
                input.focus();
            } else {
                this.classList.remove("error"); 
            }
        };
    </script>
*/


// 任意の要素にフォーカスを当てる: tabindex
// デフォルトでは多くの要素はフォーカスをサポートしていない
// focus/blurのサポートは<button><input><select><a>など、訪問者が対話できる要素に対して保証されている
// 一方で、<div><span><table>のような体裁のために存在する要素はデフォルトではフォーカス可能。
// メソッドelem.focus()はそれらに対しては機能せず、focus/blurイベントがトリガされることはない。
// HTML属性tabindexを使用することでこれを変更することが可能
// 2つの要素があり、1つ目はtabindex="1"、2つ目はtabindex="2"を持っている場合、最初の要素でTabを押すと2つ目に移動する
// 2つの特別な値がある
// ・tabindex="0": 要素を最後にする
// ・tabindex="-1": Tabはその要素を無視することを意味する
/*
    <ul>
        <li tabindex="1">One</li>
        <li tabindex="0">Zero</li>
        <li tabindex="2">Two</li>
        <li tabindex="-1">Minus one</li>
    </li>

    <style>
        li { cursor: pointer; }
        :focus { outline: 1px dashed green; }
    </style>
*/


// 移譲: focusin/focusout
// イベントfocusとblurはバブルしない
// 例えば、次のようにonfocusを<form>において強調表示させる、ということはできない
/*
    <!-- on focusing in the form -- add the class -->
    <form onfocus="this.className='focused'">
        <input type="text" name="name" value="Name">
        <input type="text" name="surname" value="Surname">
    </form>

    <style> .focused { outline: 1px solid red; } </style>
*/

// 上の例は機能しない
// ユーザが<input>にフォーカスしたとき、focusイベントはそのinputでのみトリガされるため
// バブルしないので、form.onfocusがトリガされることはない
// 2つの解決策がある
// 1つ目は面白い歴史的な機能: focus/blurはバブルしないが、キャプチャリングフェーズで伝搬する
/*
    <form id="form">
        <input type="text" name="name" value="Name">
        <input type="text" name="surname" value="Surname">
    </form>

    <style> .focused { outline: 1px solid red; } </style>

    <script>
        // キャプチャリングフェーズにハンドラを設定する（最後に引数をtrue）
        form.addEventListener("focus", () => form.classList.add('focused'), true);
        form.addEventListener("blur", () => form.classList.remove('focused'), true);
    </script>
*/

// 別のバリエーション
/*
    <form id="form">
        <input type="text" name="name" value="Name">
        <input type="text" name="surname" value="Surname">
    </form>

    <style> .focused { outline: 1px solid red; } </style>

    <script>
        form.addEventListener("focusin", () => form.classList.add("focused"));
        form.addEventListener("focusout", () => form.classList.remove("focused"));
    </script>
*/