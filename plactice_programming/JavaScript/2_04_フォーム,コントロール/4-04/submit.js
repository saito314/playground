"use strict";



// フォームの送信: submitイベントとメソッド
// submitイベントはフォームが送信されたときにトリガされる
// フォームをサーバーに送信する前に検証したり、送信を中止したり、JavaScriptで処理したりするために使用される


// イベント: submit
// フォームを送信する方法として、主に2つある
// 1. <input type="submit">または<input type="image">をクリックする
// 2. inputフィールドでEnter
// 両方のアクションは、フォーム上でsubmitイベントにつながる
// ハンドラはデータをチェックでき、もしエラーがあればevent.preventDefault()を呼び出すとフォームはサーバには送られない
/*
    <form onsubmit="alert('submit!');return false">
        First: Enter in the input field <input type="text" value="text"><br>
        Second: Click "submit": <input type="submit" value="Submit">
    </form>
*/


// メソッド: submit
// form.submit()を呼び出すことで、手動でサーバーにフォームを送信することができる
// そのあと、submitイベントは生成されない
/*
    let form = document.createElement('form');
    form.action = 'https://google.com/search';
    form.method = 'GET';

    form.innerHTML = '<input name="q" value="test">';

    // submitするためにフォームはドキュメント内になければならない
    document.body.append(form);

    form.submit();
*/