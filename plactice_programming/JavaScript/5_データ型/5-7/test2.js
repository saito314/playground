"use strict";

function aclean(arr) {
    let map = new Map();
  
    for (let word of arr) {
      // 単語を文字で分割し、ソートして結合し直します
      let sorted = word.toLowerCase().split('').sort().join(''); // (*)
      map.set(sorted, word);
    }
  
    return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

alert( aclean(arr) );