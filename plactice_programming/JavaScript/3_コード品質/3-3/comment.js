"use strict";

// 自己記述的
function showPrimes(n) {
    nextPrime:
    for (let i = 2; i < n; i++) {

        // iが素数であるかをチェックする
        for (let j = 2; j < i; j++) {
            if (i % j == 0) continue nextPrime;
        }

        alert(i);
    }
}

// 自己記述的な関数にするには下記の通り
// isPrimeと関数名を定めることで素数と判定していることがわかる
function newShowPrimes(n) {

    for (let i = 2; i < n; i++) {
        if (!isPrime(i)) continue;

        alert(i);
    }
}

function isPrime(n) {
    for (let i = 2; i < n; i++) {
        if (n % i == 0) return false;
    }

    return true;
}