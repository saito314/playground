"use strict";

// instaceof演算子でオブジェクトは特定のクラスに属しているのかを確認できる
{
    class Rabbit {}
    let rabbit = new Rabbit();

    // Rabbitクラスのオブジェクト？
    alert(rabbit instanceof Rabbit); // true
}

// コンストラクタ関数でも動作する
{
    // classの代わり
    function Rabbit() {}

    alert(new Rabbit() instanceof Rabbit); // true
}

// またArrayのような組み込みクラスでも動作する
{
    let arr = [1, 2, 3];
    alert(arr instanceof Array); // true
    alert(arr instanceof Object); // true
}

// arrはObjectクラスにも属していることに留意
// Arrayはプロトタイプ敵にObjectを継承している
// instanceof演算子はチェックのためにプロトタイプチェーンを検査する
// この動作に対して、静的メソッドSymbol.hasInstanceでカスタムロジックが設定できる

// 1.もし静的メソッドSymbol.hasInstanceがあれば、Class[Symbol.hasInstance](obj)を使う
{
    // catEatプロパティをもつものはanimalと想定する
    // instanceOfチェックを設定
    class Animal {
        static [Symbol.hasinstance](obj) {
            if (Object.canEat) return true;
        }
    }

    let obj = { canEat: true };

    alert(obj instanceof Animal); // true
}

// ほとんどのクラスはSumbol.hasInstanceを持っていない
// obj instanceof Classはclass.prototypeがobjのプロトタイプチェーンのうち1つと等しいかをチェックする
// obj.__proto__ == class.prototype
// obj.__proto__.__proto__ == class.prototype
// obj.__proto__.__proto__.__proto__ == class.prototype
// ...

// 継承のケースでは2つめのステップでマッチする
{
    class Animal {}
    class Rabbit extends Animal {}
    
    let rabbit = new Rabbit();
    alert(rabbit instanceof Animal); // true

    // rabbit.__proto__ == Rabbit.prototype
    // rabbit.__proto__.__proto__ === Animal.prototype(match)
}

// Classコンストラクタ自身はチェックには参加しない
{
    function Rabbit() {}
    let rabbit = new Rabbit();

    // prototypeを変更する
    Rabbit.prototype = {};

    // もうrabbitはRabbitのインスタンスではない
    alert(rabbit instanceof Rabbit); // false
}

// おまけ：型のためのObject toString
// ObjectのtoStringは[object Object]という文字列に変換されることをすでに知っている
{
    let obj = {};

    alert(obj); // [object Object]
    alert(obj.toString()); // 同じ
}

// toStringはtypeofまたはinstanceofの代替として利用することができる
{
    // 使いやすくするためにtoStringメソッドを変数にコピー
    let objectToString = Object.prototype.toString;

    // これの型はなに？
    let arr = [];

    alert(objectToString.call(arr)); // [object Array]
}

// 内部的にはtoStringアルゴリズムはthisを精査し、対応する結果を返す
{
    let s = Object.prototype.toString;

    alert(s.call(123)); // [object Number]
    alert(s.call(null)); // [object Null]
    alert(s.call(alert)); // [object Function]
}

// Symbol.roStringTag
// Object ToStringの振る舞いは特別なオブジェクトプロパティSymbol.toStringTagを使用してカスタマイズできる
{
    let user = {
        [Symbol.toStringTag]: "User"
    };

    alert({}.toString.call(user));
}

// ほとんどの環境固有のオブジェクトにはこのようなプロパティがある
// これはいくつかのブラウザ固有の例
{
    // 環境固有のオブジェクトとクラスのtoStringTag:
    alert(window[Symbol.toStringTag]); // window
    alert(XMLHttpRequest.prototype[Symbol.toStringTag]); // XMLHttpRequest

    alert({}.toString.call(window)); // [object Window]
    alert({}.toString.call(new XMLHttpRequest())); // [object XMLHttpRequest]
}