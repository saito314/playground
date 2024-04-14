"use strict";

function truncate(s, l) {
    let str = s.slice(0, l - 1)

    if (s.length > l) {
        return str + "...";
    };

    return str;
};

alert(truncate("What I'd like to tell on this topic is:", 20));

alert(truncate("Hi everyone!", 20));