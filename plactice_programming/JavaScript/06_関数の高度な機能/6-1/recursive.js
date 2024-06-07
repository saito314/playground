"use strict";

// 関数があるタスクを解決するときに、自分自身を呼んで解決することを再帰という
// xのn乗する関数pow(x, n)を考えてみる
pow(2, 2) = 4;
pow(2, 3) = 8;
pow(2, 4) = 16;

// 実装方法1: 反復的な考え方 forループ
function pow(x, n) {
    let result = 1;

    // ループでn回結果をxで乗算する
    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

alert(pow(2, 3)); // 8

// 実装方法2: 再帰的な考え方 タスクの単純化と自身を呼び出す
function pow(x, n) {
    if (n == 1) {
        return x;
    } else {
        return x * pow(x, n-1);
    }
}

alert(pow(2, 3));

// powが呼ばれたとき、その実行は2つの分岐に分かれる
// 1. n == 1のときは明白で、これは再帰の基底と呼ばれる
// 2. pow(x, n)はx * pow(x, n-1)と表現することができる
// powはn == 1まで再帰的に自分自身を呼び出すともいえる

// 通常再帰の方がより短く書ける
// 再帰の最大の深さはJavaScriptエンジンによって制限されている

// 実行コンテキストとスタック
// 関数の実行に関する情報はその実行コンテキストに格納されている
// 実行コンテキストは関数の実行に関する詳細を含む内部のデータ構造
// 今はどの制御フローであるか、現在の変数、thisの値やその他いくつかの内部データをもつ
// powが呼ばれたときに何が起きるのかみてみる

// pow(2, 3)
// pow(2, 3)の呼び出しの始めでは実行コンテキストは変数を格納する
// Context: {x: 2, n: 3, at line 1}とスケッチできる
// 条件n == 1はfalseになるので、elseに続く
function pow(x, n) {
    if (n == 1) {
        return x;
    } else {
        return x * pow(x, n-1); // <= ココ
    }
};

alert(pow(2, 3));
// この時点でコンテキストはContext: {x: 2, n: 3, at line 5} call pow(2, 3)となる

// pow(2, 2)
// サブコールに入った時のコンテキストスタックは下記の通り
// Context: {x: 2, n: 2, at line 1} call pow(2, 2)
// Context: {x: 2, n: 3, at line 5} call pow(2, 3)

// pow(2, 1)
// 新しいサブコールが5行目で作成され、今はx=2, n=1という引数になる
// この時点のコンテキストスタックは下記の通り
// Context: {x: 2, n: 1, at line 1} call pow(2, 1)
// Context: {x: 2, n: 2, at line 5} call pow(2, 2)
// Context: {x: 2, n: 3, at line 5} call pow(2, 3)

// pow(2, 1)はn == 1を満たすので2を返して実行コンテキストはメモリから削除される
// Context: {x: 2, n: 2, at line 5} call pow(2, 2)
// Context: {x: 2, n: 3, at line 5} call pow(2, 3)

// pow(2, 2)の実行が再開され、サブコールpow(2, 1)の結果を持っている
// x * pow(x, n-1)の評価を完了することができ4を返す
// pow(2, 2)の実行コンテキストはメモリから削除される
// Context: {x: 2, n: 3, at line 5} call pow(2, 3)
// このケースでは再帰の深さは3

// 一方ループベースのアルゴリズムはメモリを節約する
function pow(x, n) {
    let result = 1;

    for (let i = 0; i < n; i++) {
        result *= x;
    }

    return result;
}

// どんな再帰もループで書き直すことができる
// ループはメモリ消費量が少なく、再帰はコードの可読性を向上させる

// 再帰的な横断
// 再帰のもう一つの優れた用途は再帰的な探索
let conpany = {
    sales: [{
        name: "John",
        salary: 1000,
    }, {
        name: "Alice",
        salary: 600,
    }],

    development: {
        sites: [{
            name: "Peter",
            salary: 2000,
        }, {
            name: "Alex",
            salary: 1800,
        }],

        internals: [{
            name: "Jack",
            salary: 1300,
        }]
    }
};

// 部署はスタッフの配列を持っているかもしれない
// developmentは2つの枝を持っていて、部署はサブの部署に分割される可能性がある
// サブの部署が成長したときにサブのさらにサブの部署に分割される可能性がある

// 再帰で全員の給料の合計を取得する関数を作ってみる
// 1. 人の配列だけをもつシンプルな部署の場合は単純なループで給料を合計することができる
// 2. もしくはN個のサブ部門をもつオブジェクトの場合、N回の再帰呼び出しを行ってサブ部門の各合計を取得し結果を結合する

// ジョブを行う関数
function sumSaralies(department) {
    if (Array.isArray(department)) {
        // 1番目のケースの場合
        return department.reduce((prev, current) => prev + current.saraly, 0);
    } else {
        // 2番目のケースの場合
        let sum = 0;
        for (let subdep of Object.values(department)) {
            sum += sumSalaries(subdep);
        }

        return sum;
    }
}

alert(sumSalaries(company));

// 再帰構造
// web開発者にとってはHTMLやXMLドキュメントが再帰データ構造にあたる

// 連結リスト
// 順序すけされたオブジェクトのリストを保存したいとするとき
// let arr = [obj1, obj2, obj3];
// しかし、配列は要素の削除と要素の挿入のコストが高い
// もし速いデータの挿入/削除が必要であれば連結リストを選択すると良い
// 例：
let list = {
    value: 1,
    next: {
        value: 2,
        next: {
            value: 3,
            next: {
                value: 4,
                next: null
            }
        }
    }
};

// 以下は作成するための代替コード
list = {value: 1};
list.next = {value: 2};
list.next.next = {value: 3};
list.next.next.next = {value: 4};
list.next.next.next.next = null;

// listは簡単に複数部分に分割したり、後で戻したりできる
let secondList = list.next.next;
list.next.next = null;

// 次の方法で結合できる
list.next.next = secondList;

// どんな場所にもアイテムを挿入したり取り除いたりすることができる
// たとえば新しい要素を専用に追加するにはリストの先頭を更新する
list = {value: 1};
list.next = {value: 2};
list.next.next = {value: 3};
list.next.next.next = {value: 4};

// 新しい要素をリストの前に追加する
list = {value: "new item", next: list};
// 要素を取り除くにはその前のnextを変更する
list.next = list.next.next;

// 当然ながら連結リストが配列よりも優れているとは限らない
// 主な欠点は番号では簡単に要素にアクセスできないこと