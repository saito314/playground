"use strict";

// Cookies, document.cookie
// Cookieはサーバによって設定される
// ブラウザはCookieのための特別なアクセサdocument.cookieを提供する
// Cookieとそのオプションについては多くの注意点がある


// document.cookieからの読み込み
{
    alert(document.cookie)
}
// 文字列はname=valueのペアからなり、;により区切られる。
// 特定のCookieを見つけるには、;でdocument.cookieを分割し、正しい名前を見つける
// それをするのに、正規表現あるいは配列関数が使える


// document.cookieへの書き込み
// document.cookieへ書き込む事ができる
// データプロパティではなくアクセサを利用する
// document.cookieへの書き込み動作はブラウザは通して行われ、そこに記載されているCookieを更新しますが、他のCookieには触れない
// この呼び出しは名前がuserで値がJohnのCookieをセットする
{
    document.cookie = "user=John";
    alert(document.cookie);
}


// おそらく複数のCookieが見えるでしょう。
// document.cookie=操作はすべてクッキーを上書きするのではなく、userだけを上書きする
// 技術的には名前と値を任意の文字に変更可能だが、フォーマットを有効に保つためには組み込みのencodeURIComponent関数を使ってエスケープする必要がある
{
    // 特別な値、エンコードが必要
    let name = "<>";
    let value = "=";

    document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    alert(document.cookie);
}

// Cookieはいくつかのオプションを持っておりその多くは重要で設定するべきもの
{
    document.cookie = "user=John; path=/; expires=Tue, 19 Jan 2038 03:14:07 GMT"
}