"use strict";

// 誤字あり：from-to のでカウント: {3,5}


// 量指定子
// 数字は1つ以上の\dの連続。それだけ必要かを示す手段を量指定子という。


// 量指定子 {n}
// 正確なカウント: {5}
{
    alert("I'm 12345 years old".match(/\d{5}/));
}

// from-toでのカウント: {3,5}
{
    alert("I'm not 12, but 1234 years old".match(/\d{3,5}/));
}

// 上記は省略できる
{
    alert("I'm not 12, but 345678 years old".match(/\d{3,}/));
}

// \d{1,}
{
    let str = "+7(903)-123-45-67";

    let numbers = str.match(/\d{1,}/g);

    alert(numbers);
}


// 簡易表記
// +
{
    let str = "+7(903)-123-45-67";

    alert(str.match(/\d+/g));
}

// ?
// "0"か"1"を意味する
{
    let str = "Should I write color or colour?";

    alert(str.match(/colou?r/g));
}

// *
// "0"以上を意味する
{
    alert("100 10 1".match(/\d0*/g));
}

// +と比較する
{
    alert("100 10 1".match(/\d0+/g));
}


// より多くの例
// "少数": \d+\.\d+
{
    alert("0 1 12.345 7890".match(/\d+\.\d+/g));
}
// "属性なしのHTMLの開始タグ"の正規表現
{
    alert("<body> ... </body>".match(/<[a-z]+>/gi));
}
{
    alert("<h1>Hi!</h1>".match(/<[a-z][a-z0-9]*>/gi));
}