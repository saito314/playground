"use strict";

// ガベージコレクション
// JavaScriptのガベージコレクタはオブジェクトを監視し、到達不可能になったオブジェクトを削除する

// シンプルな例
let user = {
    name: "John",
};

user = null;
// Object{ name: "John" }は到達不可能になり、削除される

user = {
    name: "John",
}

let admin = user;

// adminにオブジェクトがコピーされているためオブジェクトは到達可能のまま
user = null;

// より複雑な例
function marry(man, woman) {
    woman.husband = man;
    man.wife = woman;

    return {
        father: man,
        mother: woman,
    };
}

let family = marry({
    name: "John",
}, {
    name: "Ann",
});

// Object { name: "John" }は到達不可能になり削除される
delete family.father;
delete family.mother.husband;

// father, motherは互いに参照されていますが2つのオブジェクトへは到達不可能のため全体が削除される
family = null;



