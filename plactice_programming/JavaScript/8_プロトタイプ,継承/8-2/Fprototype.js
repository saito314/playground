"use strict";

// F.prototype
// F.prototypeがオブジェクトの場合、new演算子は新しいオブジェクトで[[prototype]]をセットするために使用される
{
    let animal = {
        eats: true
    };

    function Rabbit(name) {
        this.name = name;
    };

    Rabbit.prototype = animal;

    let rabbit = new Rabbit("White Rabbit"); // rabbit.__proto__ == animal

    alert(rabbit.eats); // true
}

// Rabbit.prototype = animalの設定は"new Rabbitが生成されるとき、その[[prototype]]へanimalを割り当てる"を意味する

// デフォルトのR.prototype, construntorプロパティ
// すべての関数は、たとえ明示的に提供されていなくても"prototype"プロパティを持っている
// デフォルトのprototypeはconstructorというプロパティだけをもつオブジェクト
{
    function Rabbit() {
        /*
        Rabbit.prototype = { constructor: Rabbit };
        */
    };
}

// コードで確認できる
{
    function Rabbit() {};

    alert(Rabbit.prototype.constructor == Rabbit); // true
}

// 何もしない場合は当然constructorプロパティは[[prototype]]を通じてすべてのrabbitが利用できる
{
    function Rabbit() {}

    let rabbit = new Rabbit();

    alert(rabbit.constructor == Rabbit); // true
}

// constructorプロパティを使って既存のものと同じコンストラクタを使って新しいオブジェクトを作成できる
{
    function Rabbit(name) {
        this.name = name;
        alert(name);
    }

    let rabbit = new Rabbit("White Rabbit");

    let rabbit2 = new rabbit.constructor("Black Rabbit");
}

// JavaScript自体は正しい"constructor"の値を保証しない
{
    function Rabbit() {}

    Rabbit.prototype = {
        junmps: true,
    };

    let rabbit = new Rabbit();
    alert(rabbit.constructor === Rabbit); // false
}

// したがって、正しいconstructorを維持するためには全体を上書きする代わりにデフォルトprototypeに対して追加/削除を行う
{
    function Rabbit() {};

    // 完全にRabbit.prototypeを上書きしない
    // 単に追加するだけ
    Rabbit.prototype.jumps = true;
}

// もしくは代替手段として手動でconstructorプロパティを再び作る
{
    Rabbit.prototype = {
        jumps: true,
        constructor: Rabbit
    };
}