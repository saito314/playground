"use strict";

// 答えが分からなかったため転写
let ladder = {
    step: 0,
    up() {
        this.step++;
        return this;
    },
    down() {
        this.step--;
        return this;
    },
    showStep: function() {
        alert(this.step);
    },
};