"use strict";

let str = "Hello";

str.test = 5;

alert(str.test);

// str.test = 5は動作するがラッパーオブジェクトはそこで消えてしまうため
// alert(str.test)が参照する値はないためundefinedとなる