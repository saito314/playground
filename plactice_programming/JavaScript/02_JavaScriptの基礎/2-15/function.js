"use strict";

// 関数定義
function showMessage() {
    alert("Hello everyone");
}

// 作成した関数の呼び出し
showMessage();
showMessage();

// ローカル変数 -> 関数内で宣言した変数はスコープが関数内になる
function newShowMessage() {
    let message = "Hello, I'm JavaScript!";

    alert(message);
}

newShowMessage(); // Hello, JavaScript!
// alert(message) <- これはエラーになる

// 外部変数（グローバル変数） <- 関数外で定義した変数は関数でも参照可能
let userName = "John";

function reNewShowMessage() {
    userName = "Bob"; // 外部変数の変更

    let message = "Hello, " + userName;
    alert(message);
}

alert(userName); // 関数呼び出し前はJohn
reNewShowMessage();
alert(userName); // 関数呼び出し後はBob

// 外部変数と同じ名前の変数を関数内でローカル変数として定義する
userName = "John";

function showMessage2 () {
    let userName = "Bob"; // ローカル変数の宣言

    let message = "Hello, " + userName; // Bob
    alert(message);
}

// 関数は独自のuserNameを使用する
showMessage2();

alert(userName); // 外部変数は関数によって変更されていないのでJohnが出力される


// パラメータ（引数）
function showMessage3(from, text) { // 引数はfromとtext
    alert(from + ": " + text);
}

showMessage3("Ann", "Hello!");
showMessage3("Ann", "What's up?");

// パラメータとして渡している引数と関数内で使用しているパラメータは別なので関数内で編集しても元のパラメータに影響はない
// 実引数と仮引数の違い
function showMessage4(from, text) {
    // fromをよりよく見せるために変更する
    from = "*" + from + "*";
    alert(from + ": " + text);
}

let from = "Ann";
showMessage4(from, "Hello");

// 関数はローカルコピーを変更しただけ
alert(from);

// デフォルト値
// 関数が呼び出し時に変数が与えられていない場合、対応する値はundefinedになる
showMessage3("Ann");

// 呼び出し時に省略された場合に使用される値を事前に設定しておく
function showMessage5(from, text = "no text given") {
    alert(from + ": " + text);
}

// textパラメータが渡されていないためtextの値は"no text given"になる
showMessage5("Ann");

// デフォルト値で別関数の呼び出しをすることも可能
// function showMessage(from, text = anotherFunction()) {
//
// }

// 代替デフォルトパラメータ
// 関数内でパラメータのundefinedチェックを行う場合もある
function showMessage6(text) {
    if (text === undefined) {
        text = "empty message";
    }

    // もしくは||演算子で代用
    // text = text || "empty";

    alert(text);
}

showMessage6() // empty message

// モダンなJavaScriptエンジンはNULL合体演算子をサポートしている
// 0などの偽値を通常とみなす場合に適している
function showCount(count) {
    alert(count ?? "unknown");
}

showCount(0);
showCount(null);
showCount();


// 値の返却（return）
function sum(a, b) {
    return a + b;
}

let result = sum(1, 2);
alert(result);

function checkAge(age) {
    if (age > 18) {
        return true;
    } else {
        return confirm("Got a permission from the parents?");
    }
}

let age = prompt("How old are you?", 18);

if (checkAge(age)) {
    alert("Access pranted");
} else {
    alert("Access denied");
}

// 値なしでreturnを使うこともできる
function showMovie(age) {
    if (!checkAge(age)) {
        return;
    }

    alert("Showing you the movie");
}

// 空のreturn または returnのないものはundefinedを返す
// JavaScriptはreturnの後にセミコロンを想定するため改行を受け付けない
// どうしても改行したい場合は()を使用する

// 関数の命名
// "get…" - 値を返す
// "calc…" - 何かを計算する
// "create…" - 何かを生成する
// "check…" - 何かをチェックし、真偽値を返す

// 関数はなるべく小さく分ける
function showPrimes(n) {
    nextPrime:
    for (let i = 2; i < n; i++) {
        for (let j = 2; j < i; j++) {
            if (i % j == 0) {
                continue nextPrime;
            }
        }
        alert(i);
    }
}

// 上記をさらに関数で分けたもの
function showPrimes2(n) {
    for (let i = 2; i < n; i++) {
        if (!isPrime(i)) continue;

        alert(i);
    }
}

function isPrime(n) {
    for (let i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }
    return true
}