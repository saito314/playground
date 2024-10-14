"use strict";


// ポップアップとウィンドウメソッド
// ポップアップウィンドウは利用者に追加のコンテンツを見せるための最も古い方法の1つ
{
    window.open("http://javascript.info/");
}

// ほとんどのモダンブラウザは別ウィンドウではなく、新しいタブで開くように設定されている


// ポップアップブロック
// 悪意のあるサイトはポップアップを大いに乱用した。
// そのため、現在多くのブラウザはポップアップをブロックし、ユーザを守ろうとしている
// ポップアップはsetTimeoutで開くか？
{
    // ポップアップはブロックされる
    window.open("https://javascript.info");

    // ポップアップは許可される
    button.onclick = () => {
        window.open("https://javascript.info");
    };
}
// このように機能を完全には無効できない


// window.open
// ポップアップを開く構文は次の通り: window.oepn(url, name, params)
// url: 新しいウィンドウでロードするURL
// name: 新しいウィンドウの名前
// params: 新しいウィンドウの設定文字列


// 例: 最小限のウィンドウ
// ブラウザがどの機能の無効化を許容するか、最小セットの機能でウィンドウを開いてみる
{
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=0,height=0,left=-1000,top=-1000`;
    open("/", "test". params);
}

// 通常の配置オプションと妥当なwidth, height, left, top座標を追加する
{
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=300,left=100,top=100`;
    open("/", "test", params)
}