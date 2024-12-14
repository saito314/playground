"use strict";

// URLオブジェクト
// 組み込みのURLクラスはURLの作成や解析に関する便利なインタフェースを提供する

// URLを作成する
{
    new URL(url, [base])
}


// HTTP認証がある場合にはuserとpasswordプロパティがある
// 相対URLを作成するときにも利用できる
// この場合は2つめの引数を使う
{
    let url = new URL('profile/admin', 'https://javascript.info');

    alert(url);

    url = new URL('tester', url);

    alert(url);
}

// SearchParams
// 与えられた検索パラメータでurlを作成したいとする
// これらは正しくエンコードされている必要がある
// URLオブジェクトはurlパラメータを操作するための簡単な方法も提供する
{
    let url = new URL('https://google.com/search');
    url.searchParams.set("query", "test me!");

    alert(url);

    url.searchParams.set("tbs", "adr:y");

    alert(url);

    for(let [name, value] of url.searchParams) {
        alert(`${name}=${value}`);
    }
}