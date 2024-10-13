"use strict";


// イベントループ
// eventloopの動作を理解することは最適化のためには重要であり、適切なアーキテクチャにとっても重要である場合がある


// EventLoop
// エンジンの一般的なアルゴリズムは以下の通り
// ・タスクがある間: 最も古いタスクから開始し、それらを実行する
// ・タスクがない間: タスクが現れるまでスリープし、現れると1.に移る
// タスクはエンジンがビジーなときに来ることもあり、その時はキューに入れられる
// タスクはキュー、いわゆるmacrotask queueを形成する

// ユースケース1: CPUを大量に消費するタスクの分割
// CPUを食うタスクがあるとする
{
    let i = 0;

    let start = Date.now();

    function count() {

        // 重い処理を実行
        for (let j = 0; j < 1e9; j++) {
            i++;
        }

        alert("Done in " + (Date.now() - start) + "ms");
    }

    count();
}
// これではブラウザは"スクリプトの実行に時間がかかっています"という警告を表示するかもしれない
// ネストされたsetTimeoutをつかってこのジョブを分割する
{
    let i = 0;

    let start = Date.now();

    function count() {

        // 重い処理の一部を実行
        do {
            i++;
        } while (i % 1e6 != 0);

        if (i == 1e9) {
            alert("Done in " + (Date.now() - start) + "ms");
        } else {
            setTimeout(count); // 新たな呼び出しをスケジュール
        }
    }

    count();
}
// これでカウント処理の間もブラウザの操作は完全に機能する
// 現在両方のパターンの速度が同等であり、全体をカウントする時間に大きな差はない。
// より差を近づけるために改善する
{
    let i = 0;

    let start = Date.now();

    function count() {

        // 先頭にスケジューリングを移動させる
        if (i < ie9 - 1e6) {
            setTimeout(count); // 新たな呼び出しスケジュール
        }

        do {
            i++;
        } while (i % 1e6 != 0);

        if (i == ie9) {
            alert("Done in " + (Date.now() - start) + "ms");
        }
    }

    count();
}
// これでcount()を開始しさらにcount()が必要であることがわかると、ジョブを実行する前にすぐにスケジュールする
// 実行すると時間が大幅に短縮される


// ユースケース2: 進行状況の表示
// ブラウザスクリプトの重いタスクを分割するもう一つのメリットは進行状況を表示できること
// 通常、ブラウザは現在のコードが完了した後にレンダリングする。
// タスクに時間がかかったかどうかは関係なく、DOMへの変更はタスクが終了した後にだけ行われる
/*
    <div id="progress"></div>

    <script>

        function count() {
            for (let i = 0; i < 1e6; i++) {
                i++;
                progress.innerHTML = i;
            }
        }

        count();
    </script>
*/

// ですが、タスクの最中にプログレスバーなど表示したい場合もある
// setTimeoutを使って重いタスクを小さな単位に分割すると、それらの間で変更が描画される
/*
    <div id="progress"></div>

    <script>
        let i = 0;

        function count() {
        
            // 重い処置の一部を実行
            do {
                i++;
                progress.innerHTML = i;
            } while (i % 1e3 != 0);;

            if (i < 1e7) {
                setTimeout(count);
            }
        }

        count();
    </script>
*/


// ユースケース3: イベントの後になにかをする
// イベントハンドラの中では、イベントがバブルアップしてすべての階層で処理をされるまでいくつかの処理を延期させることができる
// 遅延ゼロのsetTimeoutでラップすることで実現できる
{
    menu.onclick = function() {
        // ...

        // クリックされたメニュー項目のカスタムイベントを作成
        let customEvent = new CustomEvent("menu-open", {
            bubbles: true
        });

        // 非同期でカスタムイベントをディスパッチ
        setTimeout(() => menu.dispatchEvent(customEvent));
    };
}


// MacrotasksとMicrotasks
// すべてのmacrotaskの直後に、エンジンは他のmacrotaskやレンダリングなどを実行する前にmicrotaskキューにあるすべてのタスクを実行する
{
    setTimeout(() => alert("timeout"));

    Promise.resolve()
        .then(() => alert("promise"));

    alert("code");
}


// すべてのmicrotaskは他のイベントハンドリングやレンダリング、またはほかのmacrotaskが行われる前に完了する
// 以下はsetTimeoutの代わりにqueueMicrotaskを使用している
/*
    <div id="progress"></div>

    <script>
        let i = 0;

        function count() {
            // 重い処理の一部を実行
            do {
                i++;
                progress.innerHTML = i;
            } while (i % 1e6) {
                queueMicrotask(count); 
            }
        }

        count();
    </script>
*/