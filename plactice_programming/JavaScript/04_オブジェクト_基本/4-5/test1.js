"use strict";

let c = {};

function A() {
    return c;
}

function B() {
    return c;
}

let a = A();
let b = B();

alert(a == b);