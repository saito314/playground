"use strict";

let room = {
    number: 23
};
  
let meetup = {
    title: "Conference",
    occupiedBy: [{name: "John"}, {name: "Alice"}],
    place: room
};
  
// 循環参照
room.occupiedBy = meetup;
meetup.self = meetup;

alert( JSON.stringify(meetup, function replacer(key, value) {
    return (key != "" && value == meetup) ? undefined : value;
}));

// valueがmeetupである通常の場合の最初の呼び出しを除外するためにkey == ""を条件に含める必要あり

/* 結果は次のようになるはずです:
{
"title":"Conference",
"occupiedBy":[{"name":"John"},{"name":"Alice"}],
"place":{"number":23}
}
*/