"use strict";

let n = prompt("please input number", "");
n = Number(n)

outer:
for (let i = 2; i < n+1; i++) {
    for (let j = 2; j < i; j++) { // 今まで出てきた数で割り切れるなら次のループ
        if (i % j == 0) {
            continue outer;
        }
    }
    alert(i);
}