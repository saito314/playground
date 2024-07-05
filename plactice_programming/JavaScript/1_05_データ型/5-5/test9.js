"use strict";

let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 28 };

let arr = [ john, pete, mary ];

sortByName(arr);

// now: [john, mary, pete]
alert(arr[1].name); // Mary

function sortByName(arr) {
    arr.sort((a, b) => b.name > a.name ? 1 : -1);
}