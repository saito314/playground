"use strict";

// ジェネレータは要求に応じて次々に複数の値、場合によっては無限の数の値を返すことができる
// iterables(反復可能)とうまく機能し、データストリームを簡単に作成することができる

// ジェネレータ関数
{
    function* generateSequence() {
        yield 1;
        yield 2;
        return 3;
    }

    // ジェネレータ関数はジェネレータオブジェクトを生成する
    let generator = generateSequence();
}

// ジェネレータオブジェクトは凍結された関数呼び出しととらえることができる
// ジェネレータのメインのメソッドはnext()
// next()が呼ばれると最も近いyield文まで実行を再開する
{
    function* genetateSequence() {
        yield 1;
        yield 2;
        return 3;
    }

    let generator = generateSequence();

    let one = generator.next();

    alert(JSON.stringify(one)); // {value: 1, done: false}
}

// nextの結果は常にオブジェクト
// value: 戻された値
// done: コードが終わっていない場合はfalse、そうでなければtrue
{
    // 再びgenerator.next()を呼ぶ
    let two = generator.next();

    alert(JSON.stringify(two)); // {value: 2, done: false}
}

{
    // 3回目の呼び出しで実行は関数を終了するreturn文に到達する
    let three = generator.next();

    alert(JSON.stringify(three)); // {value: 3, done: true}
}

// これ以上next()を実行しても{done: true}だけが返却され続ける


// ジェネレータは反復可能
// for...ofによって値をループすることができる
{
    function* generatorSequence() {
        yield 1;
        yield 2;
        return 3;
    }

    let generator = generatorSequence();

    for (let value of generator) {
        alert(value); // 1, 2
    }
}

// .next().valueを呼び出すよりもジェネレータを操作するのに見栄えがよい
// 上記は1と2は表示されるが3は表示されないことに注意
// done: trueのときにfor...ofは値を返さない
{
    // returnの代わりにyieldを用いることで解決できる
    function* genereteSequence() {
        yield 1;
        yield 2;
        yield 3;
    }

    let generator = generateSequence();

    for (let value of generator) {
        alert(value); // 1, 2, 3
    }
}


// 反復可能の代わりにジェネレータを使用する
{
    let range = {
        from: 1,
        to: 5,

        // for...ofは最初にこのメソッドを一度呼び出す
        [Symbol.itarator]() {
            // ..これはitaratorオブジェクトを返す
            // 以降、for...ofはそのオブジェクトでのみ機能し、次の値を要求する
            return {
                current: this.from,
                last: this.to,

                // next()はfor...ofループの各イテレーションで呼ばれる
                next() {
                    // 値をオブジェクトとして返す必要がある
                    if (this.current <= this.last) {
                        return {done: false, value: this.current++};
                    } else {
                        return {done: true};
                    }
                }
            };
        }
    };

    alert([...range]); // 1, 2, 3, 4, 5
}


// ジェネレータを使用して反復可能のシーケンスを作る方がはるかにエレガント
{
    function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }

    let sequence = [...generateSequence(1, 5)];

    alert(sequence); // 1, 2, 3, 4, 5
}

// Symbol.iteratorからジェネレータへの変換
// ジェネレータをSymbol.iteratorとして提供することで、両方の世界からベストを得ることができる
{
    let range = {
        from: 1,
        to: 5,

        *[Symbol.itarator]() { // [Symbol.iterator]: function*()の短縮記法
            for (let value = this.from; value <= this.to; value++) {
                yield value;
            }
        }
    };

    alert([...range]); // 1, 2, 3, 4, 5
}

// ジェネレータの合成
// ジェネレータ同士を透過的に埋め込むことを可能にするジェネレータの特別な機能
// 選択した文字でパスワードを作成することを考える
{
    function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) yield i;
    }

    function* generatePasswordCodes() {
        // 0..9
        yield* generateSequence(48, 57);
        // A..Z
        yield* generateSequence(65, 90);
        // a..z
        yield* generateSequence(97, 122);
    }

    let str = "";

    for (let code of generatePasswordCodes()) {
        str += String.fromCharCode(code);
    }

    alert(str); // 0..9A..Za..z
}

// 上記は入れ子のジェネレータのコードがインライン展開された場合と同じ
{
    function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) yield i;
    }

    function* generateAlphaNum() {
        // yield* generateSequence(48, 57);
        for (let i = 48; i <= 57; i++) yield i;
        // yield* generateSequence(65, 90);
        for (let i = 65; i <= 90; i++) yield i;
        // yield* generateSequence(97, 122);
        for (let i = 97; i <= 122; i++) yield i;
    }

    let str = "";

    for (let code of genereteAlphaNum()) {
        str += String.fromCharCode(code);
    }

    alert(str); // 0..9A..Za..z
}

// yieldは双方向
// ジェネレータは結果を外部に返すだけでなく、ジェネレータ内部に値を渡すことができる
{
    function* gen() {
        // 質問を外側のコードに渡して答えを待つ
        let result = yield "2 + 2?";

        alert(result);
    }

    let generator = gen();

    let question = generator.next().value; // <-- yield は値を返す

    generator.next(4); // --> 結果をジェネレータに返す

    // ある時間経過後にジェネレータを再開する
    setTimeout(() => generator.next(4), 1000);
}

// 関数と呼び出しコードがお互いに値を渡しあうことはめったにない
// 明白にするコードは下記の例
{
    function* gen() {
        let ask1 = yield "2 + 2?";

        alert(ask1); // 4

        let ask2 = yield "3 * 3?";

        alert(ask2); // 9
    }

    let generator = gen();

    alert(generator.next().value); // "2 + 2?"
    alert(generator.next(4).value); // "3 * 3?"
    alert(generator.next(9).done); // true
}

// generator.throw
// 外部のコードはyieldの結果として値をジェネレータに渡す可能性がある
// エラーをyieldに渡すにはgenerator.throw(err)を呼び出す必要がある
{
    function* gen() {
        try {
            let result = yield "2 + 2?";

            alert("The execution does not reach here, because the exception is thrown above");
        } catch(e) {
            alert(e); // エラーを表示する
        }
    }

    let generator = gen();

    let question = generator.next().value;

    generator.throw(new Error("The answer is not found in my database"));
}

// try..catchでキャッチしない場合は他の例外のようにジェネレータは呼び出しコードで落ちる
{
    function* generate() {
        let result = yield "2 + 2?";
    }

    let generator = generate();

    let question = generator.next().value;

    try {
        generator.throw(new Error("The answer is not found in my database"));
    } catch(e) {
        alert(e); // エラーを表示する
    }
}