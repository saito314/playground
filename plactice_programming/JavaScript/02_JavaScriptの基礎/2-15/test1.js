"use strict";

function checkAge(age) {
    if (age > 18) {
        return true;
    } else {
        return confirm("Did parents allow you?");
    }
}

// 上記の関数にelseはいるのか
// elseはいらない -> if文に入った時点でreturnで関数が終了することが明確だから