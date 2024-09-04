"use strict";


// フォームプロパティとメソッド
// フォームや<input>のようなコントロール要素は多くの特別なプロパティやイベントを持っている


// ナビゲーション:フォームと要素
// ドキュメントは特別な集合document.formsのメンバ
// それは名づけられた集合で、名前と数字の両方を使ってフォームを取得することができる
/*
    document.forms.my - name="my"のフォーム
    document.forms[0] - ドキュメント中の最初のフォーム
*/
// フォームをもつと、名前付けされた集合forms.elementsで任意の要素が利用可能
/*
    例
    <form name="my">
        <input name="one" value="1">
        <input name="two" value="2">
    </form>

    <script>
        // フォーム取得
        let form = document.forms.my; // <form name="my"> element

        // 要素取得
        let elem = form.elements.one; // <input name="one"> element

        alert(elem.value); // 1
*/
// 同じ名前で複数の要素がある可能性があり、それはラジオボタンの場合がよくある
// この場合、form.elements[name]は集合
/*
    <form>
        <input type="radio" name="age" value="10">
        <input type="radio" name="age" value="20">
    </form>

    <script>
    let form = document.forms[0];

    let ageElems = form.elements.age;

    alert(ageElems[0].value); // 10, 1つ目のinputの値
    </script>
*/
// これらのナビゲーションプロパティはタグ構造には依存しない
// すべての要素はフォーム中での深さに関係なく、form.elementsで利用可能


// サブフォームとしてのフィールドセット
// フォームは1つ以上の<fieldset>要素をその中に持っている場合がある
/*
    <body>
        <form id="form">
            <fieldset name="userFields">
                <legend>info</legend>
                <input name="login" type="text">
            </fieldset> 
        </form>

        <script>
            alert(form.elements.login); // <input name="login">

            let fieldset = form.elements.userFields;
            alert(fieldset); // HTMLFieldSetElement

            // フォームとフィールドセット両方からinputを取得することができる
            alert(fieldset.elements.login == form.elements.)
*/

