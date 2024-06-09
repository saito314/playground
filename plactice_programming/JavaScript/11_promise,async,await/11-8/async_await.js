"use strict";

// async/awaitはより快適にpromise１を利用する特別な構文
// Async関数
{
    async function f() {
        return 1;
    }

    f().then(alert);
}

// 明示的にpromiseを返すこともできる
{
    async function f)() {
        return Promise.resolve(1);
    }

    f().then(alert);
}