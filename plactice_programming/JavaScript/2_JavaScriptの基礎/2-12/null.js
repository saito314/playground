"use strict";

let user;

alert(user ?? "Anonymous");

user = "John";

alert(user ?? "Anonymous");

let firstName = null;
let lastName = null;
let nickName = "Supercoder";

alert(firstName ?? lastName ?? nickName ?? "Anonymous");

// ||との比較
alert(firstName || lastName || nickName || "Anonymous");

let height = 0;

alert(height || 100);
alert(height ?? 100);
