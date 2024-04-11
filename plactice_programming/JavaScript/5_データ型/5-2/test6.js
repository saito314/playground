"use strict";

// 間違った解法
function randomInteger(min, max) {
    let rand = min + Math.random() * (max - min);
    return Math.round(rand);
  }
  
// 正しい解法
function randomInteger(min, max) {
    // rand は (min-0.5) から (max+0.5) になりました
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }