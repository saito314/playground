"use strict";

// 透過キャッシュ
// cpu負荷が高いがその結果が不変である関数slow(x)があるとする
// 関数が頻繁に呼ばれる場合結果をキャッシュした方がよい場合がある
function slow(x) {
    // cpuを対象に消費するジョブがここにある
    alert(`Called with ${x}`);
    return x;
}

function cachingDecorator(func) {
    let cache = new Map();

    return function(x) {
        if (cache.has(x)) { // 結果がmapにあれば
            return cache.get(x);
        }

        let result = func(x); // なければfuncを呼ぶ

        cache.set(x, result); // 結果をキャッシュする
        return result;
    };
}

slow = cachingDecorator(slow);

alert(slow(1)); // slow(1)はキャッシュされる
alert("Again: " + slow(1)); // キャッシュされたものが出力される

alert(slow(2)); // slow(2)はキャッシュされる
alert("Again: " + slow(2));

// 上記コードのcachingDecoratorはデコレータと呼ばれる
// cachingDecorator(func)の出力はラッパー

// コンテキストのために"func.call"を利用する
// 上記のコードはオブジェクトメソッドではうまく動作しない

// worker.slowのキャッシングを作成する
let worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        // 実際にはCPUの重いタスクがここにあるとする
        alert("Called with " + x);
        return x * this.someMethod();
    }
};

// 前と同じコード
function cachingDecorator(func) {
    let cache = new Map();
    return function(x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        let result = func(x);
        cache.set(x, result);
        return result;
    };
}

alert(worker.slow(1)); // オリジナルメソッドは動く

worker.slow = cachingDecorator(worker.slow); // キャッシングする

alert(worker.slow(2)); // Whoops! Error: Cannot read property "someMethod" of undefined.

// this.someMethodにアクセスしようとして失敗してエラーになる
// デコレータがオリジナルメソッドfuncを呼ぼうとするため

// func.call:明示的に設定したthisで関数を呼び出すことができる特別な組み込みメソッド
// これはどちらも同じ動作だが、func.callはthisの対象を選ぶことができる
func(1, 2, 3);
func.call(obj, 1, 2, 3);

// 下記のコードが異なるオブジェクトのコンテキストでsayHiを呼び出す
function sayHi() {
    alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// 別のオブジェクトをthisとして渡すためにcallを使用する
sayHi.call(user);
sayHi.call(Admin);

// 次にcallを使って与えられたコンテキストとphraseでsayを呼び出す
function say(phrase) {
    alert(this.name + ": " + phrase);
}

user = {name: "John"};

// userはthisになり、"Hello"は最初の引数になる
say.call(user, "Hello");

// ラッパーのケースではオリジナルの関数にコンテキストを渡すために使える
worker = {
    someMethod() {
        return 1;
    },

    slow(x) {
        alert(`Called with ${x}`);
        return x * this.someMethod();
    }
};

function cachingDecorator(func) {
    let cache = new Map();
    return function(x) {
        if (cache.has(x)) {
            return cache.get(x);
        }
        let result = func.call(this, x);
        cache.set(x, result);
        return result;
    };
}

worker.slow = cachingDecorator(worker.slow); // キャッシングする
alert(worker.slow(2)); // 動作する
alert(worker.slow(2)); // キャッシュした値が使われる

// 複数の引数
// cachingDecoratorをより普遍的なものに変える
let worker = {
    slow(min, max) {
        return min + max; // 天地がひっくり返るほどのcpu負荷が想定される
    }
};

// 同じ引数呼び出しを覚える必要あり
worker.slow = cachingDecorator(worker.slow);

// cache.set(x, result)として結果を保存するため、cache.fet(x)でそれを取得していた
// 複数の引数となったときに対応できなくなる
// 解決策は多くある

// 1. 汎用性があり複数キーを許可する新しいマップライクなデータ構造を実行する
// 2. 入れ子のマップを使用する
// 3. 2つの値を1つに結合する
// 実用的な多くのアプリケーションでは第3の選択肢で十分
worker = {
    slow(min, max) {
        alert(`Called with ${min},${max}`);
        return min + max;
    }
};

function cachingDecorator(func, hash) {
    let cache = new Map();
    return function() {
        let key = hash(arguments);
        if (cache.has(key)) {
            return cache.get(key);
        }

        let result = func.call(this, ...arguments);

        cache.set(key, result);
        return result;
    };
}

function hash(args) {
    return args[0] + "," + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert(worker.slow(3, 5));
alert("Again " + worker.slow(3, 5));

// func.apply
// func.callの代わりとして使用することができる
// 以下は同等な結果の呼び出し
func.call(context, ...args);
func.apply(context, args);

// applyの使い方は若干の違いがある
// スプレッド演算子...はcallへのリストとして反復可能なargsを渡すことができる
// 配列ライクなargsのみを許可する
// 多くのJavaScriptエンジンで内部が最適化されるためapplyの方がおそらく高速
// 最もシンプルな形は以下の通り
let wrapper = function() {
    return func.apply(this, arguments);
};

// メソッドの借用（Borrowing a method）
function hash(args) {
    return args[0] + "," + args[1]
}
// 上記のコードは今のところ2つの引数にのみ依存している
// 任意の数のargsを指定できるようにする
function hash(args) {
    return args.join();
}

// 残念ながらhash(arguments)とargumentsはどちらも反復可能で配列ライクではあるが、配列ではないためjoinは動作しない
function hash() {
    alert(arguments.join()); // Error: arguments.join is not a function
}

hash(1, 2);

// 配列ライクなオブジェクトに対して配列結合を使う簡単な方法
function hash() {
    alert([].join.call(arguments));
}

hash(1, 2);

// 上記のようなトリックはメソッドの借用と呼ばれる
