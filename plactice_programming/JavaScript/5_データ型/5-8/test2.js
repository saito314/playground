"use strict";

let messages = [
    {text: "Hello", from: "John"},
    {text: "How goes?", from: "John"},
    {text: "See you soon", from: "Alice"}
];

let readMessageTime = new WeakMap();

readMessageTime.set(messages[0], new Date(1997, 3, 14));