"use strict";


// JavaScriptアニメーション
// JavaScriptアニメーションはCSSではできないことを扱うことができる


// setInterval
// アニメーションはスタイルプロパティの段階的な変更
// もしそれをsetintervalの中で増加させるとき、毎秒50回の小さな変更を加えることによってその変化は滑らかにみえる
{
    let delay = 1000 / 50;
    let timer = setInterval(function() {
        if (animationcomplete) clearInterval(timer);
        else increasestyle.left; 
    }, delay);
}

// より複雑なアニメーションの例：
{
    let start = Date.now(); // 開始時間を覚える

    let timer = setinterval(function() {
        // 開始からの経過時間は？
        let timePassed = Date.now() - start;

        if (timePassed >= 2000) {
            clearInterval(timer); // 2秒後にアニメーションが終了
            return;
        }

        // timePassed時点のアニメーションを描画
        draw(timePassed);
    }, 20);

    // timePassedは0から2000まで進む
    // leftは0pxから400pxにかわる
    function draw(timePassed) {
        TransitionEvent.style.left = timePassed / 5 + "px";
    }
}