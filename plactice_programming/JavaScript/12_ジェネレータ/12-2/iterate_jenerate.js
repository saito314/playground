"use strict";

// 誤字あり：// asyc next の中で、 "await" が使えます
// もう一個：非同期ジェネレータの場合、generator.nex() メソッドは非同期であり、promise を返します。

// iterableを思い出す
{
    let range = {
        from: 1,
        to: 5
    }
}

// 上記に[Symbol.iterator]を追加することでfor...ofで使用できる
{
    let range = {
        from: 1,
        to: 5,

        [Symbol.iterator]() {
            return {
                current: this.from,
                last: this.to,

                next() { // 各イテレーションで呼ばれ、次の値を取得する
                    if (this.current <= this.last) {
                        return {done: false, value: this.current++};
                    } else {
                        return {done: true};
                    }
                }
            };
        }
    };

    for (let value of range) {
        alert(value); // 1 then 2, then 3, then 4, then 5
    }
}

// 非同期の反復可能
// setTimeoutやほかの種類の遅延処理の後に値がくるときに必要になる
// オブジェクトを非同期的に反復可能にするには
// 1. Symbol.iteratorの代わりにSymbol.asyncIteratorを使用する
// 2. next()はpromiseを返す必要がある
// 3. 非同期的な反復可能オブジェクトをループするにはfor awaitループを使用する
{
    let range = {
        from: 1,
        to: 5,

        [Symbol.asyncIterator]() {
            return {
                current: this.from,
                last: this.to,

                async next() {
                    // async nextの中で"await"がつかえる
                    await new Promise(resolve => setTimeout(resolve, 1000));

                    if (this.current <= this.last) {
                        return {done: false, value: this.current++};
                    } else {
                        return {done: true};
                    }
                }
            };
        }
    };

    (async() => {
        for await(let value of range) {
            alert(value); // 1, 2, 3, 4, 5
        }
    })()
}

// Recall generators
{
    function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }

    for (let value of generateSequence(1, 5)) {
        alert(value); // 1, then 2, then 3, then 4, then 5
    }
}

// オブジェクトを反復可能にするためにはSymbol.itaratorの追加が必要
{
    let range = {
        from: 1,
        to: 5,

        [Symbol.itarator]() {
            return <object with next to make range itarable></object>
        }
    }
}

// Symbol.itaratorの一般的なプラクティスを返すことでコードを短くできる
{
    let range = {
        from: 1,
        to: 5,

        *[Symbol.itarator]() {
            for (let value = this.from; value <= this.to; value++) {
                yield value;
            }
        }
    };

    for (let value of range) {
        alert(value);
    }
}

// 非同期ジェネレータ
// 実践的なアプリケーションでは、一連の値を非同期的に生成するときに使う
{
    async function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) {
            // awaitが使える
            await new Promise(resolve => setTimeout(resolve, 1000));

            yield i;
        }
    }

    (async() => {
        let generator = generateSequence(1, 5);
        for await (let value of generator) {
            alert(value);
        }
    })();
}

// Async iterable range
{
    let range = {
        from: 1,
        to: 5,

        async *[Symbol.asyncIterator]() {
            for (let value = this.from; value <= this.to; value++) {
                // 値の間に間隔を作り、何かを待つ
                await new Promise(resolve => setTimeout(resolve, 1000));

                yield value;
            }
        }
    };

    (async () => {
        for await (let value of range) {
            alert(value);
        }
    })();
}

// 実演：ページネーションデータ
// ページング機能をもつデータを提供する多くのオンラインAPIがある
// fetchCommits(repo)関数を作り、必要に応じてリクエストを行いコミットを取得する
{
    async function* fetchCommits(repo) {
        let url = `https://api.github.com/repos/${repo}/commits`;

        while (url) {
            const response = await fetch(url, {
                headers: {'User-Agent': 'Our script'},
            });

            const body = await resnpose.json();

            let nextPage = response.headers.get("Link").match(/<(.*?)>; rel="next"/);
            nextPage = nextPage && nextPage[1];

            url = nextPage;

            for (let commit of body) {
                yield commit;
            }
        }
    }
}

// 使用例
{
    (async () => {
        let count = 0;

        for await (const commit of fetchCommits('javascript-tutorial/en.javascript.info')) {
            console.log(commit.author.login);

            if (++count == 100) {
                break;
            }
        }
    })();
}