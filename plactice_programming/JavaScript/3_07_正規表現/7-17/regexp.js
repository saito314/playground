"use stirct";


// 誤字あり: "賢い"な置換が必要な状況では、2つ目の引数は関数にすることができます


// RegExpと文字列のメソッド
// 正規表現を扱う2つの方法
// 1. ます正規表現は組み込みのRegExpクラスのオブジェクトであり、多くのメソッドを提供する
// 2. それに加えて、文字列の中に正規表現で動作するメソッドがある


// str.search(reg)
// これは最初にマッチした位置を、見つからない場合は-1を返す
{
    let str = "A drop of ink may make a million think";

    alert(str.search(/a/i));
}

// 重要な制限: searchは常に最初のマッチを探す


// str.match(reg), "g"フラグなし
// メソッドstr.matchはgフラグに応じて振る舞いが異なる。
// str.match(reg)は最初のマッチのみを探す
{
    let str = "Fame is the thirst of youth";

    let result = str.match(/fame/i);

    alert(result[0]);
    alert(result.index);
    alert(result.input);
}

// パターンの一部が丸括弧で区切られている場合、それは配列の別の要素になる
{
    let str = "JavaScript is a programming language";

    let result = str.match(/JAVA(SCRIPT)/i);

    alert(result[0]);
    alert(result[1]);
    alert(result.index);
    alert(result.input);
}


// str.match(reg)"g"フラグ付き
// "g"フラグがあると、str.matchはすべての配列を返す
// その配列には追加のプロパティはなく、括弧は要素を作成しない。
{
    let str = "HO-Ho-ho!";

    let result = str.match(/ho/ig);

    alert(result);
}

// 括弧がある場合も変わりません。
{
    let str = "HO-Ho-ho!";

    let result = str.match(/h(o)/ig);

    alert(result);
}

// gフラグがあると、resultはシンプルなマッチの配列になる



// str.split(regexp|substr, limit)
// 正規表現または部分文字列を区切り文字として仕様して文字列を分割する
{
    alert("12-34-56".split("-"));
}

// しかし、正規表現を渡すことも可能
{
    alert("12-34-56".split(/-/));
}


// str.replace(str|reg, str|func)
// 文字列の検索や置換のためのスイス・アーミーナイフ
{
    alert("12-34-56".replace("-", ":"));
}

// すべてのダッシュをみつけるためには文字列"-"ではなく、gフラグを持つ正規表現/-/gを使用する必要がある
{
    alert("12-34-56".replace(/-/g, ":"));
}


// 2つ目の引数は置換文字列で、特別な文字を利用できる
{
    let str = "John Doe, John Smith and John Bull.";

    alert(str.replace(/John/g, "Mr.$&"));
}


// 括弧は次のように$1, $2などと一緒によく使用される
{
    let str = "John Smith";

    alert(str.replace(/(John) (Smith)/, "$2, $1"));
}


// "賢い"置換が必要な状況では、2つ目の引数は関数にすることができる
{
    let i = 0;

    // 各"ho"を関数の結果に置換する
    alert("Ho-Ho-ho".replace(/ho/gi, function() {
        return ++i;
    }))
}


// 正規表現に括弧がない場合、関数は常に3つの引数
{
    // すべてのマッチを表示し置き換える
    function replacer(str, offset, s) {
        alert(`Found ${str} at position ${offset} in string ${s}`);
        return str.toLowerCase();
    }

    let result = "HO-Ho-ho".replace(/ho/gi, replacer);
    alert("Result: " + result);
}


// 下の例では2つの括弧がある
// replacerは5つの引数で呼ばれる
// strは完全なマッチ、次に括弧、そしれoffsetとs
{
    function replacer(str, name, surname, offset, s) {
        // nameは最初の括弧で、surnameは2つ目です
        return surname + ", " + name;
    }

    let str = "John Smith";

    alert(str.replace(/(John) (Smith)/, replacer));
}


// regexp.test(str)
{
    let str = "I love JavaScript";

    // これらの2つのテストは同じことをする
    alert(/love/i.test(str)); // true
    alert(str.search(/love/i) != -1); // true
}

// 見つからない場合の例
{
    let str = "Bla-bla-bla";

    alert(/love/i.test(str));
    alert(str.search(/love/i) != -1);
}