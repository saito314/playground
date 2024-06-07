"use strict";

// new functionより高度class構文
// constructor()メソッドはnewより自動で呼び出され、そこでオブジェクトを初期化できる
{
    class User {

        constructor(name) {
            this.name = name;
        }

        sayHi() {
            alert(this.name);
        }
    }

    // 使い方:
    let user = new User("John");
    user.sayHi();
}

// JavaScriptではクラスは関数の一種
{
    class User {
        constructor(name) {this.name = name;}
        sayHi() {alert(this.name);}
    }

    alert(typeof User); // function
}

// 確認するコードを記載
{
    class User {
        constructor(name) {this.name = name;}
        sayHi() {alert(this.name);}
    }

    // classはfunction
    alert(typeof User); // function
    // あるいはより正確にはUserはconstructorメソッド
    alert(User === User.prototype.constructor); // true
    // メソッドはUser.prototypeにある
    alert(User.prototype.sayHi);
    // prototypeには正確には2つのメソッドがある
    alert(Object.getOwnPropertyNames(User.prototype)); // constructor. sayHi
}

// 単なるシンタックスシュガーではない
{
    // constructor関数を作成
    function User(name) {
        this.name = name;
    }

    // 関数prototypeはconstructorプロパティをデフォルトでもつ
    // prototypeへメソッドを追加
    User.prototype.sayHi = function() {
        alert(this.name);
    }

    // 使い方
    let user = new User("John");
    user.sayHi();
}

// classで生成された関数は特別な内部プロパティの[[IsClassConstructor]]: trueをもつ
// 通常の関数とは異なり、newで呼び出すことが必須
{
    class User {
        constructor() {}
    }

    alert(typeof User); // function
    User(); // Error
}

// ほとんどのJavaScriptエンジンではクラスのコンストラクタの文字列表現は"class ..."で始まる
{
    class User {
        constructor() {}
    }

    alert(User);
}

// クラスメソッドは列挙不可
// クラスは常に"use strict"モード

// クラス表現
// クラスも別の式の中で定義し、渡したり、返却したり代入できる
{
    let User = class {
        sayHi() {
            alert("Hello");
        }
    };
}

// 名前付き関数と同様にクラスも名前を持つことができる
// クラス式に名前がある場合は、クラスの内部でしか見えない
{
    // 名前付きクラス式
    let User = class MyClass {
        sayHi() {
            alert(MyClass); // MyClassの名前はクラスの内でのみ見える
        }
    };

    new User().sayHi(); // 動作する

    alert(MyClass); // error
}

// クラスを動的に要求に応じて作ることもできる
{
    function makeClass(phrase) {
        // クラス定義とその返却
        return class {
            sayHi() {
                alert(phrase);
            }
        };
    }

    let User = makeClass("Hello");

    new User().sayHi(); // Hello
}

// Getters / Setters
// リテラルオブジェクトのようにgetters/setters, 算出プロパティなどを含めることができる
// get / setを使用して実装されたuser.nameの例
{
    class User {

        constructor(name) {
            // setterを呼び出す
            this.name = name;
        }

        get name() {
            return this._name;
        }

        set name(value) {
            if (value.length < 4) {
                alert("Name too short.");
                return;
            }
            this._name = value;
        }
    }

    let user = new User("John");
    alert(user.name); // John

    user = new User(""); // Name too shotr.
}

// 計算された名前 (conputed name)
// []を使用した計算されたメソッド名の例
{
    class User {
        ["say" + "Hi"]() {
            alert("Hello");
        }
    }
}

new User().sayHi()

// クラスフィールド
// 以前はクラスはメソッドだけをもっていた
// クラスフィールドは任意のプロパティを追加できる構文
{
    class User {
        name = "John";

        sayHi() {
            alert(`Hello, ${this.name}!`);
        }
    }

    new User().sayHi();
}

// クラスフィールドの重要な違いはUser.prototypeではなく個々のオブジェクトにセットされる
{
    class User {
        name = "John";
    }

    let user = new User();
    alert(user.name); // John
    alert(User.prototype.name); // undefined
}

// より複雑な式や関数呼び出しで値を代入することもできる
{
    class User {
        name = prompt("Name, please?", "John");
    }

    let user = new User();
    alert(user.name);
}

// クラスフィールドでバインドされたメソッドを作成する
// オブジェクトメソッドが渡され別のコンテキストで呼び出された場合、thisはもうそのオブジェクトの参照ではありません。
{
    class Button {
        constructor(value) {
            this.value = value;
        }

        click() {
            alert(this.value);
        }

    }

    let button = new Button("hello");

    setTimeout(button.click, 1000); // undefined
}

// クラスフィールドは別の素晴らしい構文を提供する
{
    class Button {
        constructor(value) {
            this.value = value;
        }
        click = () => {
            alert(this.value);
        }
    }

    let button = new Button("hello");

    setTimeout(button.click, 1000);
}