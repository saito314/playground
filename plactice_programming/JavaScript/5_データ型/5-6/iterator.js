"use strict";

// 反復可能オブジェクト
// オブジェクトを反復可能にするためにはSymbol.iteratorというメソッドをオブジェクトに追加する必要がある
// 下記は実装例
let range = {
    from: 1,
    to: 5,
};

// for...ofの呼び出しは最初にこれを呼び出す
range[Symbol.iterator] = function() {
    // iteratorオブジェクトを返す
    return {
        current: this.from,
        last: this.to,

        // for...ofループにより各繰り返しでnext()が呼ばれる
        next() {
            // オブジェクト{done:..., value:...}を返す必要がある
            if (this.current <= this.last) {
                return {done: false, value: this.current++};
            } else {
                return {done: true};
            }
        }
    };
};

// これで動作する
for (let num of range) {
    alert(num); // 1, 2, 3, 4, 5
}

// 上記のコードをマージすることでシンプルにできる
let range = {
    from: 1,
    to: 5,

    [Symbol.iterator]() {
        this.current = this.from;
        return this;
    },

    next() {
        if (this.current <= this.to) {
            return {done: false, value: this.current++};
        } else {
            return {done: true};
        }
    }
};

for (let num of range) {
    alert(num);
}

// 文字列は文字をループする
for (let char of "test") {
    // 文字ごとに1回、計4回実行する
    alert(char);
}

// サロゲートペアも正しく動作！
let str = '𝒳😂';
for (let char of str) {
    alert(char);
}

// イテレータを明示的に呼び出す
str = "Hello";

// for (let char of str) alert(char);
// と同じ

let iterator = str[Symbol.iterator]();

while (true) {
    let result = iterator.next();
    if (result.done) break;
    alert(result.value); // 1つずつ文字を出力
};

// Iterablesとarray-like
// Iterables（反復可能）: Symbol.iteratorメソッドを実装したオブジェクト
// array-like（配列ライク）: インデックスとlengthを持ったオブジェクト
// 例えば配列ライクだが反復可能ではないもの
let arrayLike = {
    0: "Hello",
    1: "World",
    length: 2,
};

// エラー: Symbol.iteratorはないので
for (let item of arrayLike) {}

// Array.from
arrayLike = {
    0: "Hello",
    1: "World",
    length: 2,
};

let arr = Array.from(arrayLike);
alert(arr.pop());

// array.fromは反復可能か配列ライクなのか調べ新しい配列を作る
arr = Array.from(range);
alert(arr);

// Array.fromの2つ目の引数は配列に追加する前に各要素に適用する関数であり、thisArgはそこでthisを指定できる
arr = Array.from(range, num => num * num);

alert(arr);

// 文字列を文字配列に変換するためにArray.fromを使う
str = '𝒳😂';

let chars = Array.from(str);

alert(chars[0]);
alert(chars[1]);
alert(chars.length);

// 下記は技術的に同じことをしている
str = '𝒳😂';

chars = [];
for (let char of str) {
    chars.push(char);
}

alert(chars);

// サロゲートを意識したsliceを実装することもできる
function slice(str, start, end) {
    return Array.from(str).slice(start, end).join("");
}

str = '𝒳😂𩷶';

alert(slice(str, 1, 3));

alert(str.slice(1, 3));