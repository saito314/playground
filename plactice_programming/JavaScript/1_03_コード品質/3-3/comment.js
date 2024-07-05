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

// コードの塊を関数にする
for (let i = 0; i < 10; i++) {
    let drop = getWhiskey();
    smell(drop);
    add(drop, glass);
}

for (let t = 0; t < 3; t++) {
    let tomato = getTomato();
    examine(tomato);
    let juice = press(tomato);
    add(juice, glass);
}

addWhiskey(glass);
addJuice(glass);

function addWhiskey(container) {
    for(let i = 0; i < 10; i++) {
        let drop = getWhiskey();
        //...
    }
}

function addJuice(container) {
    for (let t = 0; t < 3; t++) {
        let tomato = getTomato();
        //...
    }
}

/**
  * Returns x raised to the n-th power.
  * 
  * @param {number} x The number to raise.
  * @param {number} n The power, must be a natural number.
  * @return {number} x raised to the n-th power. 
  */