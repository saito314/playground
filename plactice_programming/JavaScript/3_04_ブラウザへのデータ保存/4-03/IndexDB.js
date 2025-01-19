"use strict";


// IndexedDB
// IndexedDBは組み込みのデータベースで、localStorageよりも遥かに強力
// IndexedDBはServiceWorkersや他のテクノロジーと組み合わせるオフラインアプリケーションを想定している


// データベースを開く
// IndexedDBを使い始めるにはデータベースをopenする
{
    let openRequest = indexedDB.open(name, version);
}

// 別のWebサイトはお互いのデータベースにアクセスすることはできない
// IndexDBにはサーバサイドのデータベースにはない組み込みのスキーマバージョニングの仕組みがある
// 新しいアプリを公開するとき、データベースの更新が必要なことがある
{
    let openRequest = indexedDB.open("store", 1);

    openRequest.onupgradeneeded = function() {
        // クライアントがデータベースを持っていない場合にトリガーされる
    };

    openRequest.onerror = function() {
        console.error("Error", openResult.error);
    };

    openRequest.onsuccess = function() {
        let db = openRequest.result;
    };
}

// 次のバージョンをリリースした時
{
    let openRequest = indexedDB.open("store", 2);

    // 既存のデータベースのバージョンをチェックし、必要なら更新する
    openRequest.onupgradeneeded = function() {
        let db = openRequest.result;
        switch(db.version) {
            case 0:
                // バージョン0は、クライアントがデータベースを持っていないことを意味する。
                // 初期化を行う
            case 1:
                // クライアントはバージョン1
                // 最新版に更新する
        }
    };
}

// データベースを削除するには
{
    let deleteRequest = indexedDB.deleteDatabase(name);
}