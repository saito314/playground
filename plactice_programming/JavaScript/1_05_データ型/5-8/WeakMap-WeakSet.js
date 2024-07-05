"use strict";

// JavaScriptエンジンはオブジェクトが到達可能な間はメモリ乗に保存している
let john = {name: "John"};

// 参照は上書きされ、オブジェクトに到達不可能になる
john = null;


john = {name: "John"};

let array = [john];

// johnが参照していたオブジェクトは配列内に格納されて到達可能のため削除されない
john = null;

// Mapのキーとしてオブジェクトを使うとMapが存在している間はオブジェクトも存在する
john = {name: "John"};

let map = new Map();
map.set(john, "...");

// johnはmapの中に保持されている
john = null;


// WeakMap
// Mapとの違いはWeakMapのキーはプリミティブ値ではなくオブジェクトでなければならない
let weakMap = new WeakMap();

let obj = {};

weakMap.set(obj, "ok"); // 正常に動作する

// キーに文字列（プリミティブ値）は使えない
weakMap.set("test", "Whoops"); // エラー

// WeakMapではキーとなったオブジェクトの参照が他にない場合、自動的にメモリから削除する
john = {name: "John"};

weakMap = new WeakMap();
weakMap.set(john, "...");

// 参照を上書き
john = null; 
// johnはメモリから削除される

// WeakMapは繰り返しとkeys(), values(), entries()をサポートしない


// WeakMapのユースケース: additional data
// WeakMapのアプリケーションの主な領域は追加のデータ格納
// 例えばユーザの訪問カウントを保持するコードがあるとする
// Mapを使用したカウント関数の例
// visitsCount.js
let visitsCountMap = new Map(); // map: user => visits count

// 訪問カウントを増やす
function countUser(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
}

// main.js
john = {name: "John"};

countUser(john); // 訪問をカウント

// あとでjohnが離脱したとき
john = null;
// johnはガベージコレクトされるべきだが、visitsCountMapのキーに残っているためガベージコレクトされない
// 代わりにWeakMapに切り替えることで回避できる
// visitsCountMap.js
visitsCountMap = new WeakMap();

// 訪問数を増加
function countUser(user) {
    let count = visitsCountMap.get(user) || 0;
    visitsCountMap.set(user, count + 1);
}
// これでjohnオブジェクトの参照がなくなった場合、自動的にvisitsCountMapから削除される

// WeakMapのユースケース: キャッシュ
// Mapを使った場合
// chche.js
let cache = new Map();

// 計算し結果を覚える
function process(obj) {
    // NOTE: hasについて調べる
    if (!cache.has(obj)) {
        let result = obj /* に対する計算結果 */;

        cache.set(obj, result);
    }

    return cache.get(obj);
}

// ここで別ファイルでprocess()を使用する
// main.js
obj = {/* オブジェクトがあるとする */};

let result1 = process(obj); // 計算する

// その後別の場所で呼ばれるとする
let result2 = process(obj);

// 後ほどオブジェクトがこれ以上不要になったとき
obj = null;

alert(cache.size); // 1

// WeakMapを使った場合
// cache.js
cache = new WeakMap();

// 計算し結果を覚える
function process(obj) {
    if (!cache.has(obj)) {
        let result = obj /* に対する計算結果 */

        cache.set(obj, result);
    }

    return cache.set(obj, result);
}

// main.js
obj = {/* なにかのオブジェクトがあるとする */};

result1 = process(obj);
result2 = process(obj);

// 後ほど、オブジェクトが不要になったとき
obj = null;

// WeakMapなのでchache.sizeは取得できない


// WeakSet
// WeakSetもWeakMap同様に動作する
// 例えばユーザをWeakSetに追加して、サイトにアクセスしたユーザを追跡できる
let visitedSet = new WeakSet();

john = {name: "John"};
let pete = {name: "Pete"};
let mary = {name: "Mary"};

visitedSet.add(john);
visitedSet.add(pete);
visitedSet.add(john); // john再び

// johnが訪問したかどうかチェック
alert(visitedSet.has(john));

// Maryが訪問したかチェック
alert(visitedSet.has(mary));

john = null;
// visitedSetは自動的にクリーンアップする

// NOTE: WeakMap, WeakSetのユースケースについてもっと調べる