"use strict";

let user = {
    name: "John",
    age: 30,

    toString() {
        return `{name: "${this.name}", age: ${this.age}}`;
    }
};

alert(user);

// 上記のような変換処理はプロパティの変更などにより、再実装するのが手間になる

// JSON.stringify
// JSONは値とオブジェクトを表現する一般的な形式。
// JavaScriptは次のメソッドを提供している
// JSON.stringify: オブジェクトをJSONに変換する
// JSON.parse: JSONをオブジェクトに変換する

let student = {
    name: "John",
    age: 30,
    isAdmin: false,
    coutses: ["html", "css", "js"],
    wife: null,
};

let json = JSON.stringify(student);

alert(typeof json);
alert(json);
/* JSON-encoded object:
{
  "name": "John",
  "age": 30,
  "isAdmin": false,
  "courses": ["html", "css", "js"],
  "wife": null
}
*/

// JSON.stringify(student)はオブジェクトを受け取り、それを文字列に変換する
// JSONエンコードされたオブジェクトはオブジェクトリテラルと比べて下記の点に違いがある
// 文字列にダブルクォートを使う
// オブジェクトのプロパティ名もまたダブルクォートであり、必須となる

// JSON内の数値はまさに数値
alert(JSON.stringify(1));
// JSON内の文字列は文字列のままだが、ダブルクォート
alert(JSON.stringify('test'));
alert(JSON.stringify(true)); // true
alert(JSON.stringify([1, 2, 3])); // [1,2,3]

// JSONはデータのみのマルチ言語使用なので、JavaScript固有のオブジェクトプロパティの一部は無視される
user = {
    sayHi() {
        alert("Hello");
    },
    [Symbol("id")]: 123,
    something: undefined,
};

alert(JSON.stringify(user)); // {} 空のオブジェクト

// JSON.stringifyは入れ子にも対応している
let meetup = {
    title: "Conference",
    room: {
        number: 123,
        participants: ["john", "ann"],
    }
};

alert(JSON.stringify(meetup));
/* 構造全体が文字列化される:
{
  "title":"Conference",
  "room":{"number":23,"participants":["john","ann"]},
}
*/

// 循環参照があってはならない
let room = {
    number: 23,
}

meetup = {
    title: "Conference",
    participants: ["john", "ann"],
};

meetup.place = room;
room.occupiedBy = meetup;

JSON.stringify(meetup); // Error: Converting circular structure to JSON

// 除外（Excluding）と変形（transforming）: replacer
// JSON.stringifyの完全な構文は let json = JSON.stringify(valu[, replacer, space])
// 循環参照をフィルタリングするような置換処理を微調整する必要がある場合は第2引数を使用できる
let room = {
    number: 23,
};

let meetup = {
    title: "Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room
};

room.occupiedBy = meetup;

// ラベルを指定してエンコード
alert(JSON.stringify(meetup, ["title", "participants"]));

// ただし、participantsの中身が空になってしまう
// roomのoccupiedByを除いた各プロパティを含める
let room = {
    number: 23
};

let meetup = {
    title: "Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room
};

room.occupiedBy = meetup;

alert(JSON.stringify(meetup, ["title", "participants", "place", "name", "number"]));
/*
{
  "title":"Conference",
  "participants":[{"name":"John"},{"name":"Alice"}],
  "place":{"number":23}
}
*/

// 上記の場合でうまくいくが、全てのプロパティを指定するのは手間になる
// そこでreplaceを使用する
let room = {
    number: 23
};

let meetup = {
    title: "Conference",
    participants: [{name: "John"}, {name: "Alice"}],
    place: room
};

room.occupiedBy = meetup;

alert(JSON.stringify(meetup, function replacer(key, value) {
    alert(`${key}: ${value}`);
    return (key == "occupiedBy") ? undefined : value;
}))
/* key:value pairs that come to replacer:
:             [object Object]
title:        Conference
participants: [object Object],[object Object]
0:            [object Object]
name:         John
1:            [object Object]
name:         Alice
place:        [object Object]
number:       23
occupiedBy: [object Object]
*/

// 書式設定: spacer
// spaces引数は見やすい出力をしたいときに使われる
// 下記の例ではspaces = 2はJavaScriptがネストされたオブジェクトを複数行で表示するように指示し、オブジェクトの内側は2つのスペースでインデントする
user = {
    name: "John",
    age: 25,
    roles: {
        isAdmin: false,
        isEditor: true
    }
};

alert(JSON.stringify(user, null, 2));
/* 2つのスペースインデント:
{
  "name": "John",
  "age": 25,
  "roles": {
    "isAdmin": false,
    "isEditor": true
  }
}
*/

/* JSON.stringify(user, null, 4) の場合、結果はよりインデントされたもの:
{
    "name": "John",
    "age": 25,
    "roles": {
        "isAdmin": false,
        "isEditor": true
    }
}
*/
// spacesパラメータは単にロギングや見やすい出力のためだけに使われる

// カスタムのtoJSON
// 文字列変換用のtoStringのようにtoJSONも提供されている
let room = {
    number: 23,
};

let meetup = {
    title: "Conference",
    date: new Date(Date.UTC(2017, 0, 1)),
    room
};

alert(JSON.stringify(meetup));
/*
  {
    "title":"Conference",
    "date":"2017-01-01T00:00:00.000Z",  // (1)
    "room": {"number":23}               // (2)
  }
*/

let room = {
    number: 23,
    toJSON() {
        return this.number;
    },
};

let meetup = {
    title: "Conference",
    room
};

alert(JSON.stringify(room)); // 23
alert(JSON.stringify(meetup));
/*
  {
    "title":"Conference",
    "room": 23
  }
*/

// json文字列をデコードするにはJSON.parseというメソッドが必要
// let value = JSON.parse(str[, reviver]);
// reviver: 各(key, value)ペアで呼ばれ、値を変換することができるオプションの関数
// 文字列化された配列
let numbers = "[0, 1, 2, 3]";
numbers = JSON.parse(numbers);
alert(numbers[1]);

// ネストされたオブジェクトの場合
user = '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3]}';
user = JSON.parse(user);
alert(user.friends[1]);

// 手書きのJSONでの典型的な間違い
json = `{
    name: "John",                       // ダブルクォート忘れ
    "surname": 'Smith',                 // 値がシングルクォート
    'isAdmin': false                    // キーがシングルクォート、カンマ忘れ
    "birthday": new Date(2000, 2, 3),   // newは許可されていない
    "friends": [0,1,2,3],               // これはOK
}`;
// JSON文字列でのコメントは無効になる

// reviverを利用する
// title: (meetup title), date: (meetup date)
let str = '{"title": "Comference", "date": "2017-11-30T12:00:00.000Z"}';
// これをデシリアライズすると…
meetup = JSON.parse(str);

alert(meetup.date.getDate()); // Error!

// meetup.dateは文字列で、Dateオブジェクトではない
// JSON.parseのときに教えてあげる
meetup = JSON.parse(str, function(key, value) {
    if (key == "date") return new Date(value);
    return value;
});

alert(meetup.date.getDate()); // これは動く

// リバイバーはネストされたオブジェクトでも同様に動作する
let schedule = `{
    "meetups": [
        {"title": "Comference", "date": "2017-11-30T12:00:00.000Z"},
        {"title":"Birthday","date":"2017-04-18T12:00:00.000Z"},
    ]
}`;

schedule = JSON.parse(schedule, function(key, value) {
    if (key == "date") return new Date(value);
    return value;
});

alert(schedule.meetups[1].date.getDate());