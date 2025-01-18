"use strict";

// localstorageのデモ
// 主な特徴は
// ・同じオリジンからのすべてのタブとウィンドウ間で共有される
// ・データは期限切れにならない
{
    localStorage.setItem("test", 1);
}

// その後ブラウザを閉じる/開く、あるいは別のウィンドウで同じページを開いた後、次のようにしてその値を取得できる
{
    alert(localStorage.getItem("test"));
}


// オブジェクトライクなアクセス
// 平易なオブジェクトを使ってキーの取得/設定をすることもできる
{
    // キーをセット
    localStorage.test = 2;

    // キーを取得
    alert(localStorage.test);

    // キーを削除
    delete localStorage.test;
}
// 2つの理由から推奨されない
// 1. キーがユーザが生成したものである場合、予約語を使用される場合がある
// 2. 上記のイベントはオブジェクトライクなアクセスの場合には発生しない


// キーをループする
// メソッドはget/set/removeの機能を提供する
// しかし、すべてのキーを取得する機能はなく、ストレージオブジェクトは反復可能ではない
// 1. 配列ライクなイテレーションを使うこと
{
    for (let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
        alert(`${key}: ${localStorage.getItem(key)}`);
    }
}

// 2. オブジェクト固有の for key in localStorageループを使用する
{
    // bad try
    for (let ket in localStorage) {
        alert(key);
    }
    // これには必要のない組み込みフィールドまで出力される
}

// hasOwnPropertyチェックでプロトタイプからのフィールドをフィルタする必要がある
{
    for (let key in localStorage) {
        if (!localStorage.hasOwnProperty(key)) {
            continue;
        }
        alert(`${key}: ${localStorage.getItem(key)}`);
    }
}

// あるいはObject.keysで自身のkeyを取得し、必要に応じてそれらをループする
{
    let keys = Object.keys(localStorage);
    for (let key of keys) {
        alert(`${key}: ${localStorage.getItem(key)}`);
    }
}

// 文字列のみ
// キーと値は両方とも文字列でなければならない
// 数値やオブジェクトのような別の型の場合には自動的に文字列に変換される
{
    sessionStorage.user = {name: "John"};
    alert(sessionStorage.user); // [object Object]
}

// オブジェクトを格納するにはJSONが使える
{
    sessionStorage.user = JSON.stringify({name: "John"});

    // sometime later
    let user = JSON.parse(sessionStorage.user);
    alert(user.name);
}

// 例えばでバック目的でストレージオブジェクト全体を文字列化することも可能
{
    // オブジェクトを見やすくするために JSON.stringify にフォーマットオプションを追加
    alert( JSON.stringify(localStorage, null, 2) );
}


// sessionStorage
// sessionStorageオブジェクトはlocalStorageよりも使われることがずっと少ない
// 制限事項
// ・sessionStorageは現在のブラウザタブ内でのみ存在する
// ・タブ内のiframe間では共有される
// ・データはページ更新後も有効だが、タブを閉じたり開いたりした場合は無効になる
{
    sessionStorage.setItem("test", 1);
}
// ページを更新してもデータを取得できる
{
    alert(sessionStorage.getItem('test'));
}
// しかし、別タブで同じページを開いて試すとnullになる


// ストレージイベント
// データがlocalStorageあるいはsessionStorageで更新されると次のプロパティをもつstorageイベントがトリガされる
// 重要なことはそれは起きたwindowを除く、ストレージがアクセス可能なすべてのwindowオブジェクト上でイベントがトリガされる
{
    // 他のdocumentから同じストレージに対して行われた更新をトリガする
    window.onstorage = event => {
        if (event.key != "now") return;
        alert(event.key + ":" + event.newValue + " at " + event.url);
    };

    localStorage.setItem("now", Date.now());
}