"use strict";

// 複雑なメソッドの呼び出しはthisを失う可能性がある
{
    let user = {
        name: "John",
        hi() { alert(this.name); },
        bye() { alert("Bye"); }
    };

    user.hi(); // John (シンプルな呼び出しは動作する)

    // 今、nameに応じてuser.hiまたはuser.byeを呼んでみる
    (user.name == "John" ? user.hi : user.bye)(); // Error
}

// 最後の行ではhiかbyeかを三項演算子で選択して実行している
// ただし、呼び出しの内側のthisの値はundefinedになるから

{
    // これは動く
    user.hi();
}

{
    // これは動かない
    (user.name == "John" ? user.hi : user.bye)(); // Error
}

// 参照型の説明
// よく見るとobj.method()文に2つの操作がある
// 1. まずドットがプロパティobj.methodを抽出する
// 2. 次に丸括弧でそれを実行する
// これらの操作を別々の行に書いた場合はthisが失われる
{
    let user = {
        name: "John",
        hi() {alert(this.name);}
    }

    // メソッドの取得呼び出しを2行に分ける
    let hi = user.hi;
    hi(); // Error, thisはundefined
}

// ここでhi = user.hiは関数を変数の中においている
// そして最後の行は完全に独立しているためthisがない
// user.hi()呼び出しを動作させるためにjavaScriptは特別な参照型を返す
// 参照型は使用上の型であり、実装者は明示的に使うことはできない
