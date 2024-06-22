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

