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


// ポップアップにアクセスする
// open呼び出しは新しいウィンドウへの参照を返す
// それはプロパティを操作したり、位置を変えたりといったことをするのに利用できる
{
    let newWin = window.open("about:blank", "hello", "width=200,height=200");

    newWin.document.write("Hello, world!");
}

// コンテンツのロード後に変更する
{
    let newWindow = open("/", "example", "width=300,height=300");
    newWindow.focus();

    alert(newWindow.location.href); // about:blank, 読み込みはまだ始まってない

    newWindow.onload = function() {
        let html = `<div style="font-size:30px">Welcome!</div>`;
        newWindow.document.body.insertAdjacentHTML("afterbegin", html);
    };
}


// 開いた元(opener)のウィンドウにアクセスする
// ポップアップはwindow.opener参照を用いることでも"opener"ウィンドウにアクセスできる
// ポップアップ以外のすべてのウィンドウの場合、それはnull
{
    let newWin = window.open("about:blank", "hello", "width=200, height=200");

    newWin.document.write(
        "<script>window.opener.document.body.innerHTML = 'Test'</script>"
    );
}

// ポップアップを閉じる
{
    let newWindow = open("/", "example", "width=300,height=300");

    newWindow.onload = function() {
        newWindow.close();
        alert(newWindow.closed); // true
    };
}


// 移動とリサイズ
// moveBy, moveTo, resizeBy, resizeTo
// ただし、追加のタブのないポップアップに対してのみ確実に機能する


// ウィンドウのスクロール
// scrollBy, scrollTo, scrollIntoView


// ポップアップのfocus/blur
// 理論的にはウィンドウにフォーカスを当てる/外すfocus()/blur()メソッドがある
// 実際はかなり制限されている。
{
    window.onblur = () => window.focus();
}