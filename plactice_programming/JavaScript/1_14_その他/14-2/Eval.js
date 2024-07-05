"use strict";

// Eval:コード文字列を実行する
{
    // 例
    let code = 'alert("Hello")';
    eval(code); // Hello
}

{
    // コード文字列は長かったり、改行や関数定義、変数を含んでいる可能性がある
    let value = eval("1+1");
    alert(value); // 2

    let value2 = eval("ket i = 0; ++1");
    alert(value2); // 1
}

{
    // evalされたコードは現在のレキシカル環境で実行されるため、外部変数を参照できる
    let a = 1;

    function f() {
        let a = 2;

        eval(`alert(a)`); // 2
    }

    f();
}

{
    // 同様に外部変数を変更することもできる
    let x = 5;
    eval("x = 10");
    alert(x); // 10, 値の変更
}

{
    // strictモードではevalは独自のレキシカル環境を持つ
    // そのため、eval内で宣言された関数や変数は外側では見えない
    eval("let x = 5; function f() {}");

    alert(typeof x); // undefined(そのような変数はありません)
}

// "Eval"を利用する
// モダンプログラミングではevalはあまり使われず、"eval"は悪とされている
// evalが使われない理由はコードのメンテナンスと最適化に悪い影響を与えるから

// どうしてもevalを使わなければならないとき
// evalが外部変数を使用していない場合、evalをwindow.eval(...)で呼び出す
{
    let x = 1;
    {
        let x = 5;
        window.eval("alert(x)"); // 1 (グローバル変数)
    }
}

// evalされたコードがローカル変数を必要とする場合、evalをnew Functionに変更し引数としてそれらを渡す
{
    let f = new Function("a", "alert(a)");

    f(5); // 5
}