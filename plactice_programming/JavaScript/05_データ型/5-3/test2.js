"use strict";

function checkSpam(s) {
    let str = s.toLowerCase();
    
    return str.includes("viagra") || str.includes("xxx");
};

alert(checkSpam('buy ViAgRA now'));
alert(checkSpam('free xxxxx'));
alert(checkSpam("innocent rabbit"));