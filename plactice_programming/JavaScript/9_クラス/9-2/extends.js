"use strict";

// extendsキーワード
{
    class Animal {
        constructor(name) {
            this.speed = 0;
            this.name = name;
        }
        run(speed) {
            this.speed += speed;
            alert(`${this.name} runs with speed ${this.speed}.`);
        }
        stop() {
            this.speed = 0;
            alert(`${this.name} stopped.`);
        }
    }

    let animal = new Animal("My animal");
}

// Animalを継承したclass Rabbitを作成する
{
    class Rabbit extends Animal {
        hide() {
            alert(`${this.name} hides!`);
        }
    }

    let rabbit = new Rabbit("White Rabbit");

    rabbit.run(5); // white Rabbit runs with speed 5.
    rabbit.hide(); // White Rabbit hides!
}

// extendsの後では任意の式が指定できる
// 例えば親クラスを生成する関数を呼び出す
{
    function f(phrase) {
        return class {
            sayHi() { alert(phrase); }
        }
    }

    class User extends f("Hello") {}

    new User().sayHi(); // Hello
}

// メソッドのオーバーライド
// 上記のRabbitでstopを実装すると代わりにそれが使われる
{
    // 通常のオーバーライドでは親メソッドを完全に置き換えるのではなく
    // 機能の微調整 または 拡張を行う
    // そのためにsuperキーワードを提供している
    class Animal {

        constructor(name) {
            this.speed = 0;
            this.name = name;
        }

        run(speed) {
            this.speed += speed;
            alert(`${this.name} runs with speed ${this.speed}.`);
        }

        stop() {
            this.speed = 0;
            alert(`${this.name} stopped.`);
        }
    }

    class Rabbit extends Animal {
        hide() {
            super.stop(); // 親のstop()を呼び出し
            this.hide(); // その後に隠す
        }
    }

    let rabbit = new Rabbit("White Rabbit");

    rabbit.run(5);
    rabbit.stop();
}

// アロー関数はsuperを持たない。
{
    class Rabbit extends Animal {
        // stop内でのsuperと同じため意図通りに動く
        stop() {
            setTimeout(() => super.stop(), 1000);
        }
    }
}

// コンストラクタのオーバーライド
// 独自のコンストラクタを持たないクラスを拡張するために生成される
{
    class Animal {
        constructor(name) {
            this.speed = 0;
            this.name = name;
        }
    }

    class Rabbit extends Animal {

        constructor(name, earLength) {
            this.speed = 0;
            this.name = name;
            this.earLength = earLength;
        }
    }

    let rabbit = new Rabbit("White Rabbit", 10); // Error: thisは定義されていない
}

// JavaScriptでは継承しているクラスのコンストラクタ関数とその他関数で区別がある
// 派生コンストラクタ関数は特別な内部プロパティ[[ConstructorKind]]: "devided"が付けられる
// このラベルはnewのふるまいに影響を与える
// ・通常の関数がnewで実行される際、空のオブジェクトを作成し、thisに割り当てる
// ・派生コンストラクタが実行されるときは親のコンストラクタが上記のジョブを実行することを期待する
// つまり継承クラスでは親のコンストラクタを呼び出さないとthisにオブジェクトが割り当てられない
{
    class Animal {
        constructor(name) {
            this.speed = 0;
            this.name = name;
        }
    }

    class Rabbit extends Animal {

        constructor(name, earLength) {
            super(name);
            this.earLength = earLength;
        }
    }

    // 今は問題ない
    let rabbit = new Rabbit("White Rabbit", 10);
    alert(rabbit.name); // White Rabbit
    alert(rabbit.earLength); // 10
}

// クラスフィールドのオーバライド
{
    class Animal {
        name = "animal";

        constructor() {
            alert(this.name);
        }
    }

    class Rabbit extends Animal {
        name = "rabbit";
    }

    new Animal(); // animal
    new Rabbit(); // animal
}

// 親のコンストラクタは常にオーバーライドされたものではなく、自身のフィールド値を利用する
{
    class Animal {
        showName() {
            alert("animal");
        }

        constructor() {
            this.showName();
        }
    }

    class Rabbit extends Animal {
        showName() {
            alert("Rabbit");
        }
    }

    new Animal();
    new Rabbit();
}

// 親コンストラクタが派生クラスで呼び出されるときオーバーライドされたメソッドが使用される
// しかし、フィールドは常に親コンストラクタが親フィールドを使用する


// Super: internals
// thisの動作について学ぶ
// まずはクラスではなくオブジェクトで試してみる
{
    let animal = {
        name: "Animal",
        eat() {
            alert(this.name + " eats.");
        }
    };

    let rabbit = {
        __proto__: animal,
        name: "Rabbit",
        eat() {
            // これがおそらくsuper.eat()が動作する方法
            this.__proto__.eat().call(this);
        }
    };

    rabbit.eat();
}

// 上記は正しく動作する
// もう一つオブジェクトをチェーンしてみる
{
    let animal = {
        name: "Animal",
        eat() {
            alert(this.name + " eats.");
        }
    };

    let rabbit = {
        __proto__: animal,
        eat() {
            // 親メソッドを呼び出す
            this.__proto__.eat.call(this);
        }
    };

    let longEar = {
        __proto__: rabbit,
        ear() {
            // 親メソッドを呼び出す
            this.__proto__.eat.call(this);
        }
    };

    longEar.eat(); // Error: 最大呼び出しスタックサイズを超えた
}

// 現在のthisの値はrabbitであり、rabbitのeat()で無限ループが起きてしまう
{
    // longEar.eat()の中ではthis = longEar
    this.__proto__.eat.call(this);
    // なので次のようになる
    longEar.__proto__.eat.call(this);
    // つまり呼ばれるのは
    rabbit.eat.call(this);
    // rabbit.eat()の中でもthis = longEar
    this.__proto__.eat.call(this);
    // なので次のようなる
    longEar.__proto__.eat.call(this);
    // なので…
    rabbit.eat.call(this);
}


// [[HomeObject]]
// 上記の解決策を提供するため、JavaScriptはもう一つ関数のための特別な内部プロパティを追加している
// superはこの[[HomeObject]]を使って解決する
{
    let animal = {
        name: "Animal",
        eat() {
            alert(this.name + " eats.");
        }
    };

    let rabbit = {
        __proto__: animal,
        name: "Rabbit",
        eat() {
            super.eat();
        }
    };
    
    let longEar = {
        __proto__: rabbit,
        name: "longEar",
        eat() {
            super.eat();
        }
    };

    // 正しく機能する
    longEar.eat();
}


// メソッドは自由ではない
// superを含むメソッドはコピーできない
{
    let animal = {
        sayHi() {
            alert("I'm an animal");
        }
    };

    // rabbitはanimalを継承
    let rabbit = {
        __proto__: animal,
        sayHi() {
            super.sayHi();
        }
    };

    let plant = {
        sayHi() {
            alert("I'm a plant");
        }
    };

    // treeはplantを継承
    let tree = {
        __proto__: plant,
        sayHi: rabbit.sayHi
    }

    tree.sayHi(); // I'm an animal(?!?)

    // 理由は簡単で
    // rabbitで作られているため[[HomeObject]]はrabbitで、変更はできない
    // tree.sayHi()のコードはsuper.sayHi()を内部に持つため、rabbitから進みanimalよりメソッドを取得する
}

// 関数プロパティではないメソッド
// クラスと単純なオブジェクト両方で定義されたメソッドに対して定義されている
// しかし、オブジェクトの場合、メソッドは指定された方法で正確に指定されなければならない
// "method: function()"ではなく、method()として指定する必要がある
// 例として非メソッド構文を使って[[HomeObject]]プロパティがセットされず継承が動作しないことを確かめる
{
    let animal = {
        eat: function() { // 本来は短縮構文: eat() {...}にする必要がある
            // ...
        }
    };

    let rabbit = {
        __proto__: animal,
        eat: function() {
            super.eat();
        }
    };

    rabbit.eat(); // super呼び出しエラー([[HomeObject]]がないため)
}