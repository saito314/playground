"use strict";

let calc = new Calculator;

alert( calc.calculate("3 + 7") ); // 10

function Calculator() {

    let methods = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
    }

    this.calcurate = function(str) {
        let splitStr = str.split(" "),
            a = +split[0],
            op = split[1],
            b = +split[2]

        return methods[op](a, b);
    }

    this.addMethod = function(op, func) {
        methods[op] = func;
    }
}