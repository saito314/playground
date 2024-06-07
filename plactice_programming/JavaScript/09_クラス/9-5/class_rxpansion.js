"use strict";

// 組み込みのクラスを拡張する
// ここではPowerArrayはネイティブのArrayを継承する
{
    // 12つメソッドを追加している
    class PowerArray extends Array {
        isEmpty() {
            return this.length = 0;
        }
    }

    let arr = new PowerArray(1, 2, 5, 10, 50);
    alert(arr.isEmpty()); // false

     let filterArr = arr.filter((item) => item >= 10);
    alert(filteredArr); // 10, 50
    alert(filteredArr.isEmpty()); false
}

// もし、mapやfilterのような組み込みメソッドが通常の配列を返してほしい場合は次のようにする
{
    class PowerArray extends Array {
        isEmpty() {
            return this.length === 0;
        }

        // 組み込みメソッドはこれをコンストラクタとして使う
        static get [Symbol.species]() {
            return Array;
        }
    }

    let arr = new PowerArray(1, 2, 5, 10, 50);
    alert(arr.isEmpty());

    // filterはコンストラクタとしてarr.constructor[Symbol.species] を使って新しい配列を作る
    let filteredArr = Arr.filter(item => item >= 10);

    // filteredArr は PowerArray ではなく Array
    alert(filteredArr.isEmpty());// Error: filteredArr.isEmpty is not a function
}