"use strict";

if (-1 || 0) alert("first");            // 実行される
if (-1 && 0) alert("second");           // 実行されない
if (null || -1 && 1) alert("third");    // 実行される