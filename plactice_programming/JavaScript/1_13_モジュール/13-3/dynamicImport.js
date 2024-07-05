"use strict";

// Dynamic imports
// 以前まで行っていたインポートとエクスポートは静的と呼ばれる
// importは任意のパラメータを動的に生成することはできない
// モジュールパスはプリミティブな文字列でなければならず、関数呼び出しもできない
// import ... from getMoculeName(); <- 許されない

// 条件に応じたインポートや実行時にインポートできない
/*
    if (...) {
        import ...; <- 許さない
    }

    {
        import ...; <- 任意のコードブロックに置くことも許されない
    }
*/

// これはコード構造を分析し、ツールを使用してモジュールを1つにまとめることができるようにするため
// または未使用のエクスポートが除去されるなどの最適化にも寄与している

// import() 式
// import(module)式はモジュールを読み込み、モジュールがもつすべてのエクスポートを含むモジュールオブジェクトになるpromiseを返す
/*
    let module = prompt("Module path?");

    import(modulePath)
        .then(obj => <module object>)
        .catch(err => <loading error, no such module?>)
*/

// async function内であればlet module = await import(modulePath)とすることができる
export function hi() {
    alert(`Hello`);
}

export function bye() {
    alert(`Bye`);
}

// 動的インポートは下記のようになる
let {hi, bye} = await import("./say.js");

hi();
bye();

// またsay.jsがdefault exportを持っている場合は次のようになる
export default function() {
    alert("Module loaded (export default)!");
}

// そこにアクセスするにはモジュールオブジェクトのdefaultプロパティを使用する
let obj = await import("./say.js");
let say = obj.default;

say();