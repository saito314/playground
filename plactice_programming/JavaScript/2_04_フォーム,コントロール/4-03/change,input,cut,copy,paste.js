"use strict";


// 脱字？：input イベント値が変更されるたびにトリガされます。


// イベント: change, input, cut, copy, paste


// イベント: change
// changeイベントは要素の更新が終わったときにトリガされる
// テキストインプットの場合、それはフォーカスを受け取ったときにトリガされる
// 例えば、以下のテキストフィールドでタイプしている間、イベントは起きない
// しかし、例えばボタンクリックなどほかの何かにフォーカスを移動をさせたときにchangeイベントが発生する
/*
    <input type="text" onchange="alert(this.value)">
    <input type="button" value="Button">
*/

// ほかの要素select, input type=chackbox/radioの場合、選択が変わった直後にトリガされる


// イベント: input
// inputイベントは値が変更されるたびにトリガされる
/*
    <input type="text" id="input"> oninput: <span id="result"></span>
    <script>
        input.oninput = function() {
            result.innerHTML = input.value;
        };
    </script>
*/

// input上でのすべての変更を処理したい場合、このイベントがベストな選択となる
// キーボードイベントとは違い、キーボード操作を伴わないものであっても、あらゆる値の変更にも対応する


// イベント: cut, copy, paste
// これらのイベントは値のカット/コピー/ペースト時に起こる
// これらはClipboardEventクラスに属しており、コピー/ペーストされるデータへのアクセスを提供する
// event.preventDefault()を使ってアクションを中止することもできる
// 例えば、下のコードはこのようなすべてのイベントを防ぎ、我々が何をカット/コピー/ペーストしようとしているかを表示する
/*
    <input type="text" id="input">
    <script>
        input.oncut = input.oncopy = input.onpaste = function(event) {
            alert(event.type + ' - ' + event.clipboardData.getData('text/plain'));
            return false;
        };
    </script>
*/


// 技術的にはなんでもコピー/ペーストすることができる
// 例えば、OSのファイルマネージャでコピーや保管ができ、それを貼り付けることができる
// クリップボードはOSレベルのグローバルなもので、ほとんどのブラウザでは安全のために特定のユーザ操作の範囲でのみクリップボードへの読み書きができる
// また、FireFoxを除いてすべてのブラウザでカスタムのクリップボードイベントを作成することが禁じられている
