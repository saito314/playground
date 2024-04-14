"use strict";

function extractCurrencyValue(s) {
    return +s.slice(1);
};

alert( extractCurrencyValue('$120'));