"use strict";

let user = {
    name: "John Smith",
    age: 35
};

let json = JSON.parse(JSON.stringify(user));

alert(json);