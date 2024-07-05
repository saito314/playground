"use strict";

// オブジェクトプロパティには2種類ある
// 1つ目はデータプロパティ
// 2つ目はアクセサプロパティ


// Getterとsetter
let obj = {
    get prpName() {
        // getter, obj.propNameを取得するときのコードが実行される
    },

    set propName(value) {
        // setter, obj.propName = value時にコードが実行される
    }
};

// 例えばnameとsurnameをもつuserオブジェクトがある
let user = {
    name: "John",
    surname: "Smith"
};

// "John Smith"という"fullName"プロパティをアクセサを使用して追加する
user = {
    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    }
};

alert(user.fullName);

// 現在はfullNameはgetterしかもってなく、user.fullName = を指定しようとするとエラーになる
user = {
    get fullName() {
        return `...`;
    }
};

user.fullName = "Test"; // Error

// user.fullNameのsetterを追加して修正する
user = {
    name: "John",
    surname: "Smith",

    get fullName() {
        return `${this.name} ${this.surname}`;
    },

    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    }
};

user.fullname = "Alice Copper";

alert(user.name);
alert(user.surname);

// アクセサディスクリプタ
user = {
    name: "John",
    surname: "Smith",
};

Object.defineProperty(user, "fullName", {
    get() {
        return `${this.name} ${this.surname}`;
    },

    set(value) {
        [this.name, this.surname] = value.split(" ");
    }
});

alert(user.fullName);

for (let ket in user) alert(ket);

// プロパティがアクセサがデータプロパティのいずれかになれるが、両方にはなれない
// getとvalueを同じディスクリプタで指定するとエラー
Object.defineProperty({}, "prop", {
    get() {
        return 1
    },

    value: 2
});

// スマートなgetters/setters
// userで短すぎる名前を禁止したい場合、_nameに格納することができる
user = {
    get name() {
        return this._name;
    },

    set name(value) {
        if (value.length < 4) {
            alert("Name is too short, need at least 4 characters");
            return;
        }
        this._name = value;
    }
};

user.name = "Pete";
alert(user.name); // Pete

user.name = "";

// 互換性のために使用する
// 通常のデータプロパティを制御し、それをいつでも調整することができる
function User(name, age) {
    this.name = name;
    this.age = age;
}

let john = new User("John", 25);

alert(john.age); // 25

// ageの代わりにbirthdayを格納するかも…？
function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;
}

john = new User("Jhon", new Date(1992, 6, 1));

// ageのgetterを追加することで解消できる
function User(name, birthday) {
    this.name = name;
    this.birthday = birthday;

    // ageは現在の日付と誕生日から計算される
    Object.defineProperty(this, "age", {
        get() {
            let todayYear = new Date().getFullYear();
            return todayYear - this.birthday.getFullYear();
        }
    });
}

john = new User("John", new Date(1992, 6, 1));

alert(john.birthday);
alert(john.age);