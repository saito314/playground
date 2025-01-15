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


// path
// path = /mypath
// Cookieへアクセス可能なURLパスプレフィックス。
// 絶対値でなければならない
// デフォルトでは現在のpathになる
// 通常はすべてのWebサイトのページからCookieへアクセスできるようpath=/を設定する


// domain
// domain = site.com
// Cookieへアクセス可能なドメイン
// デフォルトではCookieはそれを設定したドメインでのみアクセス可能
{
    document.cookie = "user=John";

    alert(document.cookie);
}
// 別の第2レベルのドメインからCookieにアクセスさせる方法はない。
// そのため、other.comがsite.comで設定されたCookieを受け取ることはない。
// しかし、サブドメインへのアクセスを許可したい場合、それは可能
{
    document.cookie = "user=John; domain=site.com";

    alert(document.cookie);
}


// expire, max-age
// デフォルトではCookieがこれらのどのオプションも持っていない場合、ブラウザが閉じられたときに消える
// このようなCookieをセッションクッキーと呼ぶ
// ブラウザを閉じれもCookieを生存させるにはexpiresあるいはmax-ageオプションを設定する
// Cookieの有効期限を1日に設定する場合は下記のようになる
{
    let date = new Data(Data.now() + 86400e3);
    date = date.toUTCString();
    document.cookie = "user=John; expires=" + date;
}
// expiresを過去に設定するとCookieは削除される
// また、expiresの代替としてCookieの有効期限を秒で指定する
{
    document.cookie = "user=John; max-age=3600";

    document.cookie = "user=John; max-age=0";
}


// secure
// デフォルトではCookieをhttp://site.comにセットした場合、それはhttps://site.comにも現れる
// 逆もまた然り
// つまり、Cookieはドメインのみをチェックしており、プロトコルを区別しない
// secureフラグを置くこともできる
{
    document.cookie = "user=John; secure";
}


// samesite
// クロスサイトリクエストフォージェリ攻撃から保護するためのセキュリティオプション
// Cookie samesiteオプションを入力する
// samesite=strict, 値なしのsamesiteと同じ
// ユーザがサイトの外から来た場合、samesite=strictを持つCookieは決して送信されない
// samesite=lax
// Laxモードもstrictと同様にサイトの外から来た時にブラウザがCookieを送信するのを禁止するが例外がある
// 保護を提供するためにsamesiteだけに頼った場合、古いブラウザは完全に脆弱になる


// 付録: Cookie関数
// Cookieを扱うための関数の小さなセットで、手動でdocument.cookieを変更するよりも便利
// getCookie
{
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
}

// setCookie
{
    function setCookie(name, value, options = {}) {

        options = {
            path: "/",
            // 必要であれば他のデフォルトを追加する
        };

        if (options.expires.toUTCString) {
            options.expires = options.expires.toUTCString();
        }

        let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

        for (let optionKey in options) {
            updatedCookie += "; " + optionKey;
            let optionValue = options[optionKey];
            if (optionValue !== true) {
                updatedCookie += "=" + optionValue;
            }
        }

        document.cookie = updatedCookie;
    }

    setCookie("user", "John", {secure: true, "max-age": 3600});
}

// deleteCookie
{
    function deleteCookie(name) {
        setCookie(name, "", {
            "max-age": -1
        });
    }
}