"use strict";

// ニアミス：open メソッドの3番目のパラメータ async が false が設定されていた場合、リクエストは同期になります。
// asyncが => asyncで
// 誤字あり：ヘッダ Content-Type: application/json を設定するのを忘れないでください。多くのサーバサイド側のフレームワークはそれで自動的に JSON をデコードしいます。:

// XMLHttpRequestはjavascriptでHTTPリクエストを行うための組み込みのブラウザオブジェクト
// 名前にXMLが含まれているが、XML形式だけでなくあらゆるデータを扱うことができる
// XMLHttpRequestは若干非推奨


// 基本
// XMLHttpRequestには2つの操作モードがある：同期と非同期
// ほとんどは非同期で使われる
// 1.XMLHttpRequestを作成する
{
    let xhr = new XMLHttpRequest();
}
// 2.初期化する
{
    xhr.open(method, URL, [async, user, password]);
}
// 3.それを送る
{
    xhr.send([send]);
}
// 4.応答に対するイベントをリッスンする
{
    xhr.onload = function() {
        alert(`Loaded: ${xhr.status} ${xhr.response}`);
    };

    xhr.onerror = function() { // リクエストがまったく送信できなかった時にだけトリガーされる
        alert(`Network Error`);
    }

    xhr.onprogress = function(event) { // 定期的にトリガーされる
        alert(`Received ${event.loaded} of ${event.total}`)
    }
}

// 下のサーバから/article/xmlhttprequest/example/loadのURLをロードし、進行状況を表示する
{
    let xhr = new XMLHttpRequest();

    xhr.open("GET", '/article/xmlhttprequest/example/load');

    xhr.send();

    xhr.onload = function() {
        if (xhr.status != 200) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            alert(`Done, got ${xhr.response.length} bytes`);
        }
    };

    xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            alert(`Received ${event.onload} of ${event.total} bytes`);
        } else {
            alert(`Received ${event.loaded} bytes`);
        }
    };

    xhr.onerror = function() {
        alert("Requested failed");
    };
}

// サーバーが応答すると、リクエストオブジェクトの次のプロパティで結果を受け取ることができる
// 対応するプロパティを使用してタイムアウトを指定することができる
{
    xhr.timeout = 10000;
}

// レスポンスタイプ
// レスポンスの形式を指定するにはxhr.responseTypeを使用する
// JSONとしてレスポンスを取得してみる
{
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/article/xmlhttprequest/example/json");

    xhr.responseType = "JSON";

    xhr.send();

    xhr.onload = function() {
        let responseObj = xhr.response;
        alert(responseObj.message);
    };
}

// Ready states
// XMLHttpRequestは状況が進むにつれ、状態が変化する
// 現在の状態はxhr.readyStateでアクセスできる
{
    UNSENT = 0;
    OPENED = 1; // openが呼ばれた
    HEADERS_RECEIVED = 2; // レスポンスヘッダを受け取った
    LOADING = 3; // レスポンスはロード中
    DONE = 4; // リクエスト完了
}

// readystatechangeイベント使って追跡することができる
{
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 3) {
            // loading
        }
        if (xhr.readyState == 4) {
            // request finished
        }
    };
}

// リクエストを中止する
// リクエストはいつでも終了できる。xhr.abort()呼び出しはそれを行う。
{
    xhr.abort(); // リクエストを中止する
}

// 同期リクエスト
// openメソッドの3番目のパラメータasyncでfalseが設定されていた場合、リクエストが同期になる
// つまりはJavaScriptの実行はsend()で止まり、レスポンスが帰ってきたときに再開される
// alertやpromptコマンドにやや似ている
{
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "/article/xmlhttprequest/hello.txt", false);

    try {
        xhr.send();
        if (xhr.status != 200) {
            alert(`Error ${xhr.status}: ${xhr.statusText}`);
        } else {
            alert(xhr.response);
        }
    } catch(err) {
        alert("Request failed");
    }
}

// HTTPヘッダ
// XMLHttpRequestはカスタムヘッダの送信とレスポンスからのヘッダ読み取り、両方が可能
// HTTPヘッダに関しては3つのメソッドがある
{   // setRequestHeader
    xhr.setRequestHeader("Content-Type", "application/json");
}
{   // getResponseHeader
    xhr.getResponseHeader("Content-type");
}
// getAllResponseHeaders()
// Set-CookieとSet-Cookie2を除く、すべてのレスポンスヘッダを返す
/*
Cache-Control: max-age=31536000
Content-Length: 4260
Content-Type: image/png
Date: Sat, 08 Sep 2012 16:53:16 GMT
*/
// name/valueのペアをもつオブジェクトを取得した場合は少しJSが必要になる
{
    let headers = xhr
        .getAllResponseHeaders()
        .split("\r\n")
        .reduce((result, current) => {
            let [name, value] = current.split(": ");
            result[name] = value;
            return result;
        }, {});
}


// POST, FormData
// POSTリクエストをするためには組み込みのFormDataオブジェクトを使う
{
    let formData = new FormData([form]); // オブジェクトを作成する
    formData.append(name, value); // フィールドを追加する
}
// オプションでフォームから作成し、必要に応じて追加フィールドを追加する
/*
    <form name="person">
        <input name="name" value="John">
        <input name="surname" value="Smith">
    </form>

    <script>
        let formData = new FormData(document.forms.person);

        formData.append("middle", "Lee");

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "/article/xmlhttprequest/post/user");
        xhr.send(formData);
    </script>
*/

// formはmultipart/form-dataエンコーディングで送信される
// あるいはJSONを好むならJSON.stringifyをして、文字列として送信する
{
    let xhr = new XMLHttpRequest();

    let json = JSON.stringify({
        name: "John",
        surname: "Smith"
    });

    xhr.open("POST", "/submit");
    xhr.setRequestHeader("Content-Type", "application/json; charset=utf-8");

    xhr.send(json);
}

// アップロードの進行状況
// progressイベントはダウンロードの段階でのみ機能する
// なにかをPOSTしたとき、XMLHttpRequestは最初にデータをアップロードし、次にレスポンスをダウンロードする
{
    xhr.upload.onprogress = function(event) {
        alert(`Uploaded ${event.loaded} of ${event.total} bytes`);
    };

    xhr.upload.onload = function() {
        alert(`Upload finished successfully.`);
    };

    xhr.upload.onerror = function() {
        alert(`Error during the upload: ${xhr.status}`);
    };
}

// 進行状況を示すファイルのアップロード
/*
    input type="file" onchange="upload(this.files[0])">

    <script>
        function upload(file) {
        let xhr = new XMLHttpRequest();

        // アップロードの進行状況を追跡する
        xhr.upload.onprogress = function(event) {
            console.log(`Uploaded ${event.loaded} of ${event.total}`);
        };

        // 追跡完了: 成功したか失敗したか
        xhr.onloaded = function() {
            if (xhr.status == 200) {
                console.log("success");
            } else {
                console.log("error " + this.status); 
            }
        };

        xhr.open("POST", "/article/xmlhttprequest/post/upload");
        xhr.send(file);
    }
    </script>
*/

// クロスオリジンリクエスト
{
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.open("POST", "http://anywhere.com/request");
}