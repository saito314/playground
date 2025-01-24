"use strict";

// 誤字：内部的には、ラッパーは onerror/onsuccess が追加されたネイテイブの IndexedDB リクエストを実行し、その結果を reject/resolve する promise を返します。



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

// オブジェクトストア
// オブジェクトストアはIndexedDBの中心となる概念
// オブジェクトストアという名前ではありますが、プリミティブを格納することも可能
// 複雑なオブジェクト含め、ほぼどんな値でも格納することができる
// ストア内のすべての値には一意となるkeyが必要
{
    db.createObjectStore(name, [, ketOptions]);
}

// 操作は同期であり、awaitは必要ないことに留意が必要
// 何もオプションを指定しない場合、後でオブジェクトを格納するときに明示的にキーを指定する必要がある
{
    db.createObjectStore("books", {keyPath: "id"});
}

// オブジェクトストアはupgradeneededハンドラ内でDBバージョンを更新している間にだけ、生成/変更することができる
// これは技術的な制限によるもの。ハンドラの外側ではデータの追加/削除/更新が可能ですが、オブジェクトストアの変更はバージョンの更新中だけ
{
    let openRequest = indexedDB.open("db", 1);

    // 存在しない場合にはbooksのためのオブジェクトストアを作成する
    openRequest.onupgradeneeded = function() {
        let db = openRequest.result;
        if (!db.objectDtoreNames.ontains("books")) {
            db.createObjectStore("books", {keyPath: "id"});
        }
    };
}

// オブジェクトストアを削除するには
{
    db.deleteObjectStore("books");
}


// トランザクション
// トランザクションはグループ操作であり、すべて成功したか/すべて失敗したかのいずれかになる
// IndexedDBでのすべてのデータ操作はトランザクション内で行わなければならない
{
    db.transaction(store, [, type]);
}

// トランザクションが作成されたら、次のようにしてストアにアイテムを追加することができる
{
    let transaction = db.tranzaction("books", "readwrite");

    let books = transaction.objectStore("books");

    let book = {
        id: "js",
        price: 10,
        created: new Date()
    };

    let request = books.add(book);

    request.onsuccess = function() {
        console.log("Book added to the store", request.result);
    };

    request.onerror = function() {
        console.log("Error", request.error);
    };
}


// トランザクションの自動コミット
// すべてのトランザクションの要求が終了し、microtasks queueが空になると、自動的にコミットされる
{
    let request1 = books.add(book);

    request1.onasuccess = function() {
        fetch("/").then(response => {
            let request2 = books.add(anotherBook);
            request2.onerror = function() {
                console.log(request2.error.name);
            };
        });
    };
}

// 正常に完了した瞬間を検知するにはtransaction.oncompleteイベントをリッスンする
{
    let transaction = db.transaction("books", "readwrite");

    transaction.oncomplete = function() {
        console.log("Transaction is compolete");
    };
}

// トランザクションを手動で停止するには以下を呼び出す
{
    transaction.abort();
}


// エラーハンドリング
// 書き込みリクエストは失敗に終わる可能性がある
// リクエストに失敗すると、トランザクションは自動的に中止され、すべての変更がキャンセルされる
{
    let transaction = db.transaction("books", "readwrite");

    let book = {id: "js", price: 10};

    let request = transaction.objectStore("books").add(book);

    request.onerror = function(event) {
        if (request.error.name == "ConstrainError") {
            console.log("Book with such id already exists");
            event.preventDefault();
        } else {

        }
    };

    transaction.onabort = function() {
        console.log("Error", transaction.error);
    };
}


// イベント移譲
// IndexedDBのイベントバブル: request -> transaction -> database
{
    db.onerror = function(event) {
        let request = event.target;

        console.log("Error", request.error);
    };
}

// request.onerrorでevent.stopPropagation()を利用することでバブリングを停止することができる
{
    request.onerror = function(event) {
        if (request.error.name == "ConstraintError") {
            console.log("Book with such id already exists");
            event.preventDefault();
            event.stopPropagation();
        } else {

        }
    };
}


// キーで検索する
// オブジェクトストアの検索には主には2つの種類がある
// 1. キー or キー範囲によるもの
// 2. 別のオブジェクトフィールドによるもの
{
    books.get("js");

    books.getAll(IDBKeyRange.bound('css', 'html'));

    books.getAll(IDBKeyRange.upperBound('html', true));

    books.getAll();

    books.getAllkeys(IDBKeyRange.lowerBound('js', true));
}


// index付きの任意フィールドで検索する
{
    objectStore.createIndex(name, keyPath, [options]);
}


// indexを作成する必要がある。オブジェクトストア同様、upgradeneededで行わなければならない
{
    openRequest.onupgradeneeded = function() {
        let books = db.createObjectStore("books", {keyPath: "id"});
        let index = books.createIndex("price_idx", "price");
    }
}

// 今、特定の価格で検索したい場合、単にindexに対して同じ検索メソッドを適用するだけ
{
    let transaction = db.transaction("books");
    let books = transaction.objectStore("books");
    let priceIndex = books.index("price_idx");

    let request = priceIndex.getAll(10);

    request.onsuccess = function() {
        if (request.result !== undefined) {
            console.log("Books", request.result);
        } else {
            console.log("No such books");
        }
    };
}


// IDBKeyRangeで範囲を作成し、安い/高い本を探すことができる
{
    let request = priceIndex.getAll(IDBKeyRange.upperBound(5));
}


// ストアから削除する
// deleteメソッドはクエリによって削除する値を調べる
{
    // 例
    books.delete("js");
}
// 価格 あるいは別のオブジェクトフィールドをもとに本を削除したい場合は、最初にindexでキーを見つけ、その後deleteを呼び出す
{
    // price = 5のキーを見つける
    let request = priceIndex.getKey(5);

    request.onsuccess = function() {
        let id = request.result;
        let deleteRequest = books.delete(id);
    };
}

// すべてを削除するには
{
    // ストレージをクリアする
    books.clear();
}


// カーソル(Cursors)
// getAll/getAllKeysのようなメソッドはキー/値の配列を返す
// カーソルがオブジェクトストレージが巨大になりすぎて利用可能メモリからあふれてしまうことを回避する
// カーソルは与えられたクエリでオブジェクトストレージを横断する特別なオブジェクトで、一度に1つのキー/値を返すためメモリを節約する
{
    let request = store.openCursor(MediaQueryList, [direction]);
}

// カーソルの主な違いはrequest.onsuccessが複数回トリガされること
// 各結果に対して1度トリガされる
{
    let transaction = db.transaction("books");
    let books = transaction.objectStore("books");

    let request = books.openCursor();

    // カーソルで見つかった各本に対して呼び出される
    request.onsuccess = function() {
        let cursor = request.result;
        if (cursor) {
            let key = cursor.key;
            let value = cursor.value;
            console.log(key, value);
            cursor.continue();
        } else {
            console.log("No more books");
        }
    };
}

// カーソルに一致する値がもっとあるか否かはonsuccessを呼び出した後resultを見ることで、次のレコードを指すカーソルあるいはundefinedが取得できる
// index上にカーソルを作成することもできる
// index上のカーソルはオブジェクトストア上のカーソルとまったく同じように機能する
{
    let request = priceIdx.openCursor(IDBKeyRange.upperBound(5));

    request.onsuccess = function() {
        let cursor = request.result;
        if (cursor) {
            let primaryKey = cursor.primaryKey;
            let value = cursor.value;
            let key = cursor.key;
            console.log(key, value);
            cursor.continue();
        } else {
            console.log("No more books");
        }
    };
}


// promiseラッパー
// すべてのリクエストにonsuccess/onerrorを追加するのはとても面倒な作業
// イベント移譲を仕様することで、楽にできる場合があることがある。
// primise化されたIndexedDBメソッドを持つ、グローバルなidbオブジェクトを生成する
{
    let db = await idb.openDB("store", 1, db => {
        if (db.oldVersion == 0) {
            // 初期化の実行
            db.createObjectStore("books", {keyPath: "id"});
        }
    });

    let transaction = db.transaction("books", "readwrite");
    let books = transaction.objectStore("books");

    try {
        await books.add("");
        await books.add("");

        await transaction.complete;

        console.log("jsbook saved");
    } catch(err) {
        console.log("error", err.message);
    }
}


// エラーハンドリング
// エラーをキャッチしない場合、最も近い外側のtry catchまでエラーがくる
{
    window.addEventListener("unhandledrejection", event => {
        let request = event.target;
        let error = event.reason;
    });
}


// "非アクティブなトランザクション"の落とし穴
// すでにご存じのように、ブラウザが現在のコードとマイクロタスクを実行するとすぐにトランザクションは自動コミットされる
// promiseラッパーやasync.awaitの場合も同じ
{
    let transaction = db.transaction("inventory", "readwrite");
    let inventory = transaction.objectStore("inventory");

    await inventory.add({id: "js", price: 10, created: new Date()});

    await fetch();

    await inventory.add({id: "js", price: 10, created: new Date()}); // Error
}
// これを回避するためにはすべてのアイテムを準備してからコミットする


// ネイティブオブジェクトを取得する
// 内部的にはラッパーはonerror/onsuccessが追加されたネイティブのIndexedDBリクエストを実行し、その結果をreject/resolveするpromiseを返す
{
    let promise = books.add(book);

    let request = promise.request;
    let transaction = request.transaction;

    let result = await promise; // 必要であれば
}