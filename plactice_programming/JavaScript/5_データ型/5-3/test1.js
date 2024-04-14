"use strict";

function ucFirst(s) {
    let str = s[0].toUpperCase() + s.slice(1);
    
    return str
};

alert(ucFirst("john"));