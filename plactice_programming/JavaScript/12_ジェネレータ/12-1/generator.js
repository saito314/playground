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