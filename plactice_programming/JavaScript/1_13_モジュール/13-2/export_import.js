"use strict";

// 宣言の前のexport
// 変数、関数、クラスのいずれかであれば、その前にexportを置くことでエクスポートの対象として任意の宣言にラベル付けすることができる

// 配列のエクスポート
export let months = ['Jan', 'Feb', 'Mar','Apr', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// 定数のエクスポート
export const MODULES_BECAME_STANDARD_YEAR = 2015;

// クラスのエクスポート
export class User {
    constructor(name) {
        this.name = name;
    }
}

// 宣言とは別にexportする
// 別のexportを記述することもできる
function sayHi(user) {
    alert(`Hello, ${user}!`);
}

function sayBye(user) {
    alert(`Bye, ${user}!`);
}

export {sayHi, sayBye}; // エクスポートされた関数のリスト

// import *
// 通常は下記のようにインポートするものの一覧を波括弧import{...}に置く
import {sayHi, sayBye} from "./say.js";

sayHi("John"); // Hello, John!
sayBye("John"); // Bye, John!

// import * as <obj> from ...
import * as say from "./say.js";

say.sayHi("John") // Hello, John!
say.sayBye("John") // Bye, John!

// import * as ...を使わずに明示的にimportする理由
// 1. 明示的にリストすることで短い名前で使うことができる
// 2. 明示的なインポートの一覧はコード構造の見通しをより良くする
// また、ビルドツールによって最適化されない可能性がある

// import as
// 異なる名前でインポートするためにasを使うこともできる
import {sayHi as hi, sayBye as bye} from "./say.js";

hi("John");
bye("John");

// export as
// importと同様にexportにも構文が存在する
export {sayHi as hi, sayBye as bye};
// 今hiとbyeは外部にとって公式な名前になる
import * as say from "./say.js";

say.hi("John");
say.bye("John");

// export default
// 2種類のモジュールがある
// say.jsのような関数のパックを含むモジュール
// 単一のエンティティを宣言するモジュール
// 通常は後者がよく、その場合はexport defaultが有用
// export defaultはファイルごとに1つだけ
export default class User {
    constructor(name) {
        this.name = name;
    }
}

// 波括弧なしでそれをインポートする
import User from "./user.js";

new User("John");

// 下記が有効なデフォルトエクスポートの例
/* クラス名なし
export default class {
    constructor() {
        // ...
    }
}
*/

/* 関数名なし
export default function (user) {
    alert(`Hello, ${user}!`);
}
*/

/* 変数の作成なしで単一値のエクスポート
export default ["Jan", "Feb", "Mar", "Apr", "Aug", "Sep", "Oct", "Nov", "Dec"];
*/

// export defaultはファイル毎に1つだけなのでエラーにはならない
// ただし、defaultがない場合の名無しはエラーになる


// "default"名
// 状況によってはdefaultキーワードが関数の定義とは別にエクスポートする場合がある
function sayHi(user) {
    alert(`Hello, ${user}!`);
}

// 関数の前に"export default"を追加する
// export { sayHi as default };

// モジュールuser.jsが1つのメインのデフォルトのものと、幾つかの名前付きのものをエクスポートする場合は次の通り
/*
export default class User {
    constructor(name) {
        this.name = name;
    }
}

export function sayHi(user) {
    alert(`Hello, ${user}!`);
}
*/

// これは名前付きと一緒にデフォルトエクスポートをインポートする方法
import {default as User, sayHi} from "./user.js";

new User("John");

// そして、オブジェクトとして*ですべてインポートする場合、defaultプロパティはまさにデフォルトエクスポート
import * as user from "./user.js";

let User = user.default;
new User("John");

// デフォルトエクスポートを使うべきかどうか
// 名前付きエクスポートは明示的であり、インポートをするのに正確に正しい名前を使うことを強制する
// import {User} from "./user.js";

// デフォルトエクスポートの場合はインポート時に常に独自に名前を作成する必要がある
// import User from "./user.js";
// import MyUser from "./user.js";

// デフォルトインポートの場合、チームメンバは同じものにことなる名前を使用することができてしまう
// 通常、それを避けコードの一貫性を保つため、インポートされた変数はファイル名に対応するべきである規則がある
// import User from "./user.js";
// import LoginForm from "./loginForm.js";
// import func from "/path/to/func.js";


// 再エクスポート
// 構文export ... from ...を使用すると別の名前でインポートできる
export {sayHi} from "./say.js";
export {default as User} from "./user.js";

// login/logoutをインポートし、すぐにエクスポートする
// import {login, logout} from "./helper.js";
// export {login, logout};

// Userとしてdefaultをインポートし、エクスポートする
// import User from "./user.js";
// export {User};

// 構文export ... from ...はこのようなインポートエクスポートの短縮記法
export {login, logout} from "./helper.js";

// Userでdefaultエクスポートを再エクスポート
export {default as User} from "./user.js";

