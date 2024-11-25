"use strict";

// fetchを中止するのは少し面倒
// fetchをキャンセルするために特別なAbortControllerというオブジェクトがある
{
    let controller = new AbortController();
}

// abort()が呼ばれるとabortイベントがcontroller.signalで発生する
{
    let controller = new AbortController();
    let signal = controller.signal;

    // controller.abortが呼ばれるとトリガーする
    signal.addEventListenner("abort", () => alert("abort!"));

    controller.abort();

    alert(signal.aborted);
}

// signalプロパティをfetchオプションに渡す
{
    let controller = new AbortController();
    fetch(url, {
        signal: controller.signal
    });
}

// 中止するためにcontroller.abort()を呼ぶ
{
    controller.abort();
}

// fetchが中止されたとき、そのpromiseはAbot\rtErrorという名前でrejectされる
{
    // 1秒で中止
    let controller = new AbortController();
    setTimeout(() => controller.abort(), 1000);

    try {
        let response = await fetch("/article/fetch-abort/demo/hang", {
            signal: controller.signal
        });
    } catch(err) {
        if (err.name == "AbortError") {
            alert("Aborted!");
        } else {
            throw err;
        }
    }
}

// AbortControllerはスケーラブルで、複数のfetchを一度にキャンセルすることができる
{
    let urls = [/* ... */]; // 並行してfetchするurlのリスト

    let controller = new AbortController();

    let fetchJobs = urls.map(url => fetch(url, {
        signal: controller.signal
    }));

    let results = await Promise.all(fetchJobs);
}

// もしfetchとは別の独自ジョブがある場合も一つのAbortControllerを使用してfetchと一緒にそれらを停止することができる
{
    let urls = [];
    let controller = new AbortController();

    let ourJob = new Promise((resolve, reject) => {
        controller.signal.addEventListener("abort", reject);
    });

    let fetchJobs = urls.map(url => fetch(url, {
        signal: controller.signal
    }));

    let result = await Promise.all([...fetchJobs, ourJob]);
}