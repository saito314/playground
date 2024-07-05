"use strict";

function makeUser() {
    return {
        name: "John",
        ref: this,
    };
};

let user = makeUser();

alert(user.ref.name);

// これはエラーになり動かない
// ref: thisをメソッド内に入れる必要がある
function makeUser() {
    return {
        name: "John",
        ref() {
            return this;
        }
    };
};

user = makeUser();

alert(user.ref().name);