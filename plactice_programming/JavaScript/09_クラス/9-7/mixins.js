"use strict";

// JavaScriptは単一のオブジェクトからのみ継承することができる
// 2つのクラスから継承したい場合はmixinsと呼ばれる考え方を利用する

// mixinの例
// JavaScriptでmixinを作る最もシンプルな方法は役立つメソッドをもつオブジェクトを作ること
{
    // mixin
    let sayHiMixin = {
        sayHi() {
            alert("Hello " + this.name);
        },
        sayBye() {
            alert("Bye " + this.name);
        }
    };

    // 使い方:
    class User {
        constructor(name) {
            this.name = name;
        }
    }

    // メソッドをコピー
    Object.assign(User.prototype, sayHiMixin);

    // これでUserはsayHiできる
    new User("Dude").sayHi();
}

// これは継承ではなく、単純なメソッドのコピーである。
// Userクラスは他のクラスを継承することでさらに以下のように追加のメソッドをミックスインすることができる
{
    class User extends Person {
        // ...
    }

    Object.assagn(User.prototype, sayHiMixin);
}

// ミックスインは自身の内部で継承を活用することもできる
{
    let sayMixin = {
        say(phrase) {
            alert(phrase);
        }
    };

    let sayHiMixin = {
        __proto__: sayMixin, // またはここでprototypeを設定するのにObject.createが使える

        satHi() {
            // 親メソッド呼び出し
            super.say("Hello " + this.name);
        },
        sayBye() {
            super.say("Bye " + this.name);
        }
    };

    class User {
        constructor(name) {
            this.name = name;
        }
    }

    // メソッドをコピー
    Object.assign(User.prototype, sayHiMixin);

    // これでUserはsayHiできる
    new User("Dude").sayHi(); // Hello Dude!
}

// 実践のためのイベントMixin
// 多くのブラウザオブジェクトの重要な特徴はイベントを生成できること
// 簡単にイベントに関連する関数を任意のclass/objectに追加できるようにmixinを作成する
{
    let eventMixin = {
        /**
         * イベント購読、使い方:
         * menu.on("select", function(item) { ... })
         */
        on(eventName, handler) {
            if (!this._eventHandlers) this._eventHandlers = {};
            if (!this._eventHandlers[eventName]) {
                this._eventHandlers[eventName] = [];
            }
            this._eventHandlers[eventName].push(handler);
        },
        
        /**
         * 購読のキャンセル 使い方:
         * musu.off("select", handler)
         */
        off(eventName, handler) {
            let handlers = this._eventHandlers && this._eventHandlers[eventName];
            if (!handlers) return;
            for (let i = 0; i < handlers.length; i++) {
                if (handlers[i] == handler) {
                    handlers.splice(i--, 1);
                }
            }
        },

        /**
         * イベントを生成してデータをアタッチ
         * this.trigger("select", data1, data2);
         */
        trigger(eventName, ...args) {
            if (!this._eventHandlers || !this._eventHandlers[eventName]) {
                return; // イベントに対応するハンドラがない場合
            }

            // ハンドラ呼び出し
            this._eventHandlers[eventName].forEach(handler => handler.apply(this.args));
        }
    };

    // クラスを作成
    class Menu {
        choose(value) {
            this.trigger("select", value);
        }
    }

    // Mixinを追加
    Object.assign(Menu.prototype, eventMixin);

    let menu = new Menu();

    // 選択時にハンドラを呼び出し
    menu.on("select", value => alert("Value selected: " + value));

    // イベントのトリガ => 上のハンドラを実行し次を表示
    // Value selected: 123
    menu.choose(123); // 選択された値
}
