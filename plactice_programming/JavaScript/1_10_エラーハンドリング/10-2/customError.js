"use strict";

// カスタムエラー, Errorの拡張
// 開発途中でタスクがうまくいかない可能性があり、特定の物事を反映するために
// 独自のエラークラスが必要になる場合がある
// ネットワーク操作エラー：HttpError
// データベース操作：DbError
// 検索操作：NotFoundError
// エラーはmessage, nameもしくはstackのような基本のエラープロパティをサポートするべき


// Errorを拡張する
// 例としてユーザデータをもつJSONを読む関数readUser(json)を考えてみる
{
    let json = `{ "name": "John", "age": 30 }`;
}

// readUser(json)はJSONを読むだけでなく、データのチェックをする
// 必須のフィールドがなかったり、フォーマットが謝っている場合はエラーにする
// しかし、そのエラーは必ずしもSyntaxErrorとは限らない
// したがってこのエラーをValidationErrorと呼び、そのためのクラスを作成する
{
    // JavaScript自体が定義された組み込みのErrorクラスの「疑似コード」
    class Error {
        constructor(message) {
            this.message = message;
            this.name = "Error"; // (組み込みのエラークラスごとに異なる名前)
            // this.stack = <nested calls>; // 非標準だが、ほとんどの環境はサポートしている（サポートされてなかったのでCO）
        }
    }

    // ValidationErrorをそれから継承させて動かす
    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = "ValidationError";
        }
    }

    function test() {
        throw new ValidationError("Whoops!");
    }

    try {
        test();
    } catch(err) {
        alert(err.message); // Whoops!
        alert(err.name); // ValidationError
        alert(err.stack); // それぞれの行番号を持つネストされたコールのリスト(呼び出せないけど)
    }
}

// 上記でsuperの呼び出しは必須になる
// readUser(json)を使ってみる
{
    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = "ValidationError";
        }
    }

    // Usage
    function readUser(json) {
        let user = JSON.parse(json);

        if (!user.age) {
            throw new ValidationError("No field: age");
        }
        if (!user.name) {
            throw new ValidationError("No field: name");
        }

        return user;
    }

    // try..catchでの動作例
    try {
        let user = readUser(`{ "age": 25 }`);
    } catch(err) {
        if (err instanceof ValidationError) {
            alert("Invalid data: " + err.message); // Invalid data: No field: name
        } else if (err instanceof SyntexError) {
            alert("JSON Syntax Error: " + err.message);
        } else {
            throw err; // 知らないエラーなので、再スロー
        }
    }
}

// さらなる継承
// 存在しないプロパティに対する具体的なクラスPropertyRequiredErrorを作成する
{
    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = "ValidationError";
        }
    }

    class PropertyRequiredError extends ValidationError {
        constructor(property) {
            super("No property: " + property);
            this.name = "PropertyRequiredError";
            this.property = property;
        }
    }

    // 使用法
    function readUser(json) {
        let user = JSON.parse(json);
        
        if (!user.age) {
            throw new PropertyRequiredError("age");
        }
        if (!user.name) {
            throw new PropertyRequiredError("name");
        }
    
        return user;
    }

    // try..catchでの動作例
    try {
        let user = readUser('{"age": 25}');
    } catch (err) {
        if (err instanceof ValidationError) {
            alert("Invalid data: " + err.message); // Invalid data: No property: name
            alert(err.name); // PropertyRequiredError
            alert(err.property); // name
        } else if (err instanceof SyntaxError) {
            alert("JSON Syntax Error: " + err.message);
        } else {
            throw err; // 知らないエラーなので、それを再スロー
        }
    }
}

// 単純化したMyErrorコード
{
    class MyError extends Error {
        constructor(message) {
            super(message);
            this.name = this.constructor.name;
        }
    }

    class ValidationError extends MyError {}

    class PropertyRequiredError extends ValidationError {
        constructor(property) {
            super("No property: " + property);
            this.property = property;
        }
    }

    // name is correct
    alert(new PropertyRequiredError("field".name)); // PropertyRequiredError
}

// 例外のラッピング
// 将来readUser関数が成長し、新たなコードが別の種類のエラーを生み出すかもしれない
{
    try {
        readUser()
    } catch (err) {
        if (err instanceof ValidationError) {
            // バリデーションエラーの処理
        } else if (err instanceof SyntaxError) {
            // シンタックスエラーの処理
        } else {
            throw err; // 未知のエラー、再スロー
        }
    }
}

// 多くの場合、必要な場合にのみエラーの詳細を取得する方法が必要
// このテクニックを例外のラッピングという
// 汎用的なデータ読み込みエラーを表現する新しいクラスReadErrorを作成する
{
    class ReadError extends Error {
        constructor(message, cause) {
            super(message);
            this.cause = cause;
            this.name = "ReadError";
        }
    }

    class ValidationError extends Error {}
    class PropertyRequiredError extends ValidationError {}

    function validateUser(user) {
        if (!user.age) {
            throw new PropertyRequiredError("age");
        }

        if (!user.name) {
            throw new PropertyRequiredError("name");
        }
    }

    function readUser(json) {
        let user;

        try {
            user = JSON.parse(json);
        } catch(err) {
            if (err instanceof SyntaxError) {
                throw new ReadError("Syntax Error", err);
            } else {
                throw err;
            }
        }

        try {
            calidateUser(user);
        } catch(err) {
            if (err instanceof ValidationError) {
                throw new ReadError("Validation Error", err);
            } else {
                throw err;
            }
        }
    }

    try {
        readUser("{bad json}");
    } catch(e) {
        if (e instanceof ReadError) {
            alert(e);
            // original error: SyntaxError: Unexpected token b in JSON at position 1
            alert("Original error: " + e.cause);
        } else {
            throw e;
        }
    }
}