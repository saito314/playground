"use strict";

// プロトタイプ継承
// プロトタイプ[[prototype]]
// JavaScriptはオブジェクトは特別な隠しプロパティをもっており、それはnullまたは別のオブジェクトを参照する
// オブジェクトからプロパティを呼んだ時に存在しない場合は自動的にプロトタイプから取得する
{
    let animal = {
        eats: true
    };
    let rabbit = {
        jumps: true
    };

    rabbit.__proto__ = animal;

    // 今、rabbitで両方のプロパティを見つけることができる
    alert(rabbit.eats);
    alert(rabbit.jumps);
}

// もしanimalが多くの役立つプロパティやメソッドを持っている場合rabbitもそれを呼ぶことができる
{
    let animal = {
        eats: true,
        walk() {
            alert("Animal walk");
        }
    };

    let rabbit = {
        jumps: true,
        __proto__: animal,
    }

    // walkがprototypeから得られた
    rabbit.walk();
}

{
    let animal = {
        eats: true,
        walk() {
            alert("Animal walk");
        }
    };

    let rabbit = {
        jumps: true,
        __proto__: animal,
    };

    let longEar = {
        earLength: 10,
        __proto__: rabbit,
    }

    // walkはprototypeチューンから得られた
    longEar.walk();
    alert(longEar.jumps);
}

// prototypeチューンの2つの制限
// 1. 循環参照禁止
// 2. __proto__の値はnullまたはオブジェクト。プリミティブは無視される


// 書き込みはプロトタイプを使用しない
// 書き込み/削除操作はオブジェクトで直接動作する
{
    let animal = {
        eats: true,
        walk() {
            // このメソッドはrabbitでつかわれない
        }
    };

    let rabbit = {
        __proto__: animal
    }

    rabbit.walk = function() {
        alert("Rabbit! Bounce-bounce");
    };

    rabbit.walk();
}

// getter/setterの場合プロトタイプで参照されて呼び出される
{
    let user = {
        name: "John",
        surname: "Smith",

        set fullName(value) {
            [this.name, this.surname] = value.split(" ");
        },

        get fullName() {
            return `${this.name} ${this.surname}`;
        }
    };

    let admin = {
        __proto__: user,
        isAdmin: true,
    };

    alert(admin.fullName);

    admin.fullName = "Alice Cooper";

    alert(admin.fullName); // Alice Cooper
    alert(user.fullName); // John Smith 
}

// thisの値
// thisはプロトタイプの影響をウケない
// thisは常にドットの前のオブジェクトとなる
{
    let animal = {
        walk() {
            if (!this.isSleeping) {
                alert(`I walk`);
            }
        },
        sleep() {
            this.isSleeping = true;
        }
    };

    let rabbit = {
        name: "White Rabbit",
        __proto__: animal
    };

    // rabbit.isSleepingを変える
    rabbit.sleep();

    alert(rabbit.isSleeping); // true
    alert(animal.isSleeping); // undefined
}
// 結果としてメソッドは共有されるがオブジェクトの状態は共有されるわけではない

// for...in
// for...inループは継承したプロパティも繰り返し処理する
{
    let animal = {
        eats: true,
    };

    let rabbit = {
        jumps: true,
        __proto__: animal
    };

    // Object.keysは実親のキーだけを返す
    alert(Object.keys(rabbit));

    // for...inは実親と継承したキー両方をループする
    for(let prop in rabbit) alert(prop); // jumps, eats
}

// 継承したプロパティを除きたい場合は組み込みのメソッド
// Object.hasOwnProperty(key)が利用できる
{
    let animal = {
        eats: true
    };

    let rabbit = {
        jumps: true,
        __proto__: animal
    };

    for(let prop in rabbit) {
        let isOwn = rabbit.hasOwnProperty(prop);

        if (isOwn) {
            alert(`Our: ${prop}`);
        } else {
            alert(`Inherited: ${prop}`);
        }
    }
}