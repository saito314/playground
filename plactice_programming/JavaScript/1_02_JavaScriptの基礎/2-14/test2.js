"use strict";

/*
let a = +prompt('a?', '');

if (a == 0) {
  alert( 0 );
}
if (a == 1) {
  alert( 1 );
}

if (a == 2 || a == 3) {
  alert( '2,3' );
}

このコードをswitch文で書き直す
*/

let a = +prompt("a?", "");

switch (a) {
    case 0:
        alert(0);
    case 1:
        alert(1);
    case 2:
    case 3:
        alert("2,3");
}