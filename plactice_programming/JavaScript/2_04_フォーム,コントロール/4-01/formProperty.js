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


// より短い記法: form.name
// form[index/name]でアクセスすることができる
// form.elements.loginの代わりに、form.loginと書ける
// もし要素にアクセスしたとでそのnameを変えた場合、依然として古い名前で利用可能
/*
    <form id="form">
        <input name="login">
    </form>

    <script>
        alert(form.elements.login === form.login); // true

        form.login.name = "username"; // inputの名前を変更

        // form.elementsはnameを更新:
        alert(form.elements.login); // undefined
        alert(form.elements.username); // input

        // 直アクセスが両方の名前が利用可能
        alert(form.username == form.login); // true
    </script>
*/


// 後方参照: elements.form
// 任意の要素に対して、フォームはelements.formとして利用可能
// そのため、フォームはすべての要素を参照し、要素はフォームを参照する
/*
    <form id="form">
        <input type="text" name="login">
    </form>

    <script>
        // form -> element
        let login = form.login;

        // element -> form
        alert(login.form); // HTMLFormElement
    </script>
*/


// フォーム要素
// それぞれの機能に注意を払いながら、フォームコントロールについて知る


// inputとtextarea
// 通常、チェックボックスに対してはinput.valueまたはinput.checkedで値にアクセスできる
{
    input.value = "New value";
    textarea.value = "New text";

    input.checked = true; // チェックボックスやラジオボタンの場合
}

// selectとoption
// <select>要素は3つの重要なプロパティを持っている
// 1. select.options - <option>要素の集合
// 2. select.value - 選ばれた選択肢の値
// 3. select.selectedIndex - 選ばれた選択肢の番号

// したがって、<select>の値を設定するのに3つの方法がある
// 1. 必要な<option>を見つけて、option.selectedをtrueに設定する
// 2. select.valueに値を設定する
// 3. select.selectedIndexにoptionの番号を設定する

/*
    <select id="select">
        <option value="apple">Apple</option>
        <option value="pear">Pear</option>
        <option value="banana">Banana</option>
    </select>

    <script>
        // この3行はすべて同じことをしている
        select.options[2].selected = true;
        select.selectedIndex = 2;
        select.value = "banana";
    </select>
*/


// ほかのコントロールとは違い、<select multiple>は複数の選択を許可する
// この場合、すべての選択された値を取得するには、select.optionsを参照する必要がある
/*
    <select id="select" multiple>
        <option value="blues" selected>Blues</option>
        <option value="rock" selected>Rock</option>
        <option value="classic">Classic</option>
    </select>

    <script>
        // get all selected values form multi-select
        let selected = Array.from(select.options)
            .filter(option => option.selected)
            .map(option => option.value);

        alert(selected); // blues,rock
    </script>
*/


// new Option
// option要素には<option>要素を作成するための簡単でナイスな構文がある
/*
    option = new Option(text, value, defaultSelected, selected);
*/

// 例
{
    let option = new Option("Text", "value");
}