"use strict";

// Dateオブジェクトを作成するにはnew Date()を呼ぶ
let now = new Date();
alert(now); // 現在の日時を表示する

// new Date(milliseconds)
// 0 は 01.01.1970を意味する
let Jan01_1970 = new Date(0);
alert(Jan01_1970);

// 24時間を追加する
let Jan02_1970 = new Date(24 * 3600 * 3600);
alert(Jan02_1970);

// 1970年以前の日付は負のタイムスタンプになる
let date = new Date("2017-01-26");
alert(date);

// ローカルタイムゾーンで与えられた要素で日付を作成する
// 最初の2つの引数は必須
new Date(2011, 0, 1, 0, 0, 0, 0); // 1 Jan 2011, 00:00:00
new Date(2011, 0, 1); // 同じ 時などはデフォルトで0となる

// 最小の精度は1ms
date = new Date(2011, 0, 1, 2, 3, 4, 567);
alert(date); // 1.01.2011 02:03:04:567

// dateコンポーネントへのアクセス
// getFullYear(): 年を取得する
// getMonth(): 月を取得する 0から11
// getDate(): 月の日を取得し、値は1から31
// getHours(), getMinutes(), getSeconds(), getMilliseconds(): 対応する時刻の構成要素を取得
// getDay(): 週の曜日を取得する 値は0(日)から6(土)

// 現在のdate
date = new Date();

// あなたの現在のタイムゾーンでの時間
alert(date.getHours());

// UTC+0のタイムゾーンでの時間（サマータイムのないロンドン時間）
alert(date.getUTCHours());

// getTime(): 日付のタイムスタンプを返す
// getTimezoneOffset(): ローカルタイムゾーンとUTCの差を分で返す。
alert(new Date().getTimezoneOffset());
// タイムゾーンUTC-1にいる場合60を出力
// タイムゾーンUTC+9の日本にいる場合は-540?

// 日付の構成要素を設定する
let today = new Date();

today.setHours(0);
alert(today); // 本日を示すが、時は0に変更する

today.setHours(0, 0, 0, 0);
alert(today); // 本日を示すが、00:00:00

// 自動補正
date = new Date(2013, 0, 32); // 32 Jan 2013 ?!?
alert(date); // ...iは2013/2/1

// 範囲外の数値が指定された構成要素は自動的に補正される
date = new Data(2016, 1, 28);
date.setDate(date.getDate() + 2);

alert(date); // 1 Mar 2016

// 自動補正は指定した期間後の日付を取得したいときによく利用される
date = new Date();
date.setSeconds(date.gerSeconds() + 70);

alert(date);

// また、ゼロや負値をセットすることもできる
date = new Date(2016, 0, 2);

date.setDate(1); // 月の1日を設定する
alert(date);

date.setDate(0); // 最小日は1なので、先月の最後の日になる
alert(date); // 31 Dec 2015

// 日付から数値へ、日付の差分
date = new Date();
alert(+date); // ミリ秒の数値 => date.getTime()と同じ出力

// 日付は減算することができるが、結果はミリ秒単位での差分になる
// これは時間の計測で使うことができる
let start = new Date(); // 計測開始

// do something
for (let i = 0; i < 100000; i++) {
    let doSmething = i * i * i;
}

let end = Date.now();

alert(`The loop took ${end - start} ms`); // 日付ではなく、数値を減算する

// ベンチマーク
// CPUを必要とする機能について信頼できるベンチマークが必要な場合は注意が必要
// 例えば下記の2つの関数はどちらの方がパフォーマンスがよいか？
function diffSubtract(date1, date2) {
    return date2 - date1;
}

function diffGetTime(date1, date2) {
    return date2.getTime() - date1.getTime();
}

// 結果は同じだが、複数回ループさせることでパフォーマンスを計ることができる
function bench(f) {
    let date1 = new Date(0);
    let date2 = new Date();

    start = Date.now();
    for (let i = 0; i < 100000; i++) f(date1, date2);

    return Date.now() - start;
}

alert("Time of diffSubtract: " + bench(diffSubtract) + " ms");
alert("Time of diffGetTime: " + bench(diffGetTime) + " ms");

// getTime()を使う方がパフォーマンスがよい
// しかしCPUはマルチプロセスで動くので上記も正しいベンチマークとは言い難い
let time1 = 0;
let time2 = 0;

// bench(upperSlice)とbench(upperLoop)を交互に10回実行する
for (let i = 0; i < 10; i++) {
    time1 += bench(diffSubtract);
    time2 += bench(diffGetTime);
}

alert("Total time for diffSubtract: " + time1);
alert("Total time for diffGetTime: " + time2);

// 現代のJavaScriptエンジンは何度も実行されるホットコードに対してのみ高度な最適化を適用する
// したがって、最初の実行のみ遅くなってしまうためヒートアップを実行することもできる
bench(diffSubtract);
bench(diffGetTime);

// now benchmark
for (let i = 0; i < 10; i++) {
    time1 += bench(diffSubtract);
    time2 += bench(diffGetTime);
}

// 文字列からのDate.parse
// このメソッドは文字列から日付を読むことができる
let ms = Date.parse("2012-01-26T13:51:50.417-07:00");

alert(ms); // 1327611110417（timestamp）

date = new Date(Date.parse("2012-01-26T13:51:50.417-07:00"));

alert(date);