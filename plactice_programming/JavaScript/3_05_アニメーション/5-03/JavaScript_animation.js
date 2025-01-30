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


// requestAnimationFrame
// 複数のアニメーションを別々に実行し、それぞれが個別にsetIntervalを持っていると、ブラウザは20ms間隔よりもっと頻繁に再描画する必要がある
// 各setIntervalは20ms毎に一回トリガするが、独立しているので20msの中に複数の独立した実行があることになる
// これらの複数の独立した再描画はブラウザの再描画を簡単にし、CPUの負荷を減らしてより滑らかに見せるためグループ化するべき
{
    setInterval(function() {
        animate1();
        animate2();
        animate3();
    }, 20);
}
//は、下記のコードよりも軽量
{
    setInterval(animate1, 20);
    setInterval(animate2, 20);
    setInterval(animate3, 20);
}


{
    let requestId = requestAnimationFrame(callback);
}
// これはアニメーションをしたい最も近い時間にcallback関数を実行するようにスケジューリングする
{
    // スケジューリングされたコールバックの実行をキャンセルする
    cancelAnimationFrame(requestId);
}


// 通常callbackはCPUが過負荷状態になったり、バッテリーが少なかったり、そのほか別の理由がある場合を除きすぐに実行される
/*
    <script>
        let prev = performance.now();
        let times = 0;

        requestAnimationFrame(function measure(time) {
            document.body.insertAdjacentHTML("beforeEnd", Math.floor(time - prev) + " ");
            prev = time;

            if (times++ < 10) requestAnimationFrame(measure);
        })
    </script>
*/


// Structured animation
{
    function animate({timing, draw, duration}) {
        let start = performance.now();

        requestAnimationFrame(function animate(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            let progress = timing(timeFraction);

            draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }
}
{
    function linear(timeFraction) {
        return timeFraction;
    }
}
{
    function draw(progress) {
        train.style.left = progress + "px";
    }
}
{
    animate({
        duration: 1000,
        timing(timeFraction) {
            return timeFraction;
        },
        draw(progress) {
            elem.style.width = progress * 100 + "%";
        }
    });
}


// タイミング関数
// Power of n
{   // 放物曲線
    function quad(timeFunction) {
        return Math.pow(timeFraction, 2);
    }
}
{   // 円弧
    function circ(timeFraction) {
        return 1 - Math.sin(Math.acos(timeFraction));
    }
}
{   // 戻る弓
    function back(x, timeFraction) {
        return Math.pow(timeFraction, 2) * ((x + 1) * timeFraction - x);
    }
}
{   // バウンド
    function bounce(timeFraction) {
        for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
            if (timeFraction >= (7 - 4 * a) / 11) {
                return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2);
            }
        }
    }
}
{   // 弾性のあるアニメーション
    function elastic(x, timeFraction) {
        return Math.pow(2, 10 * (timeFraction - 1)) * Math.cos(20 * Math.PI * x / 3 * timeFraction);
    }
}


// Reversal: ease*
// easeout
{
    timingEaseOut(timeFraction) = 1 - timing(1 - timeFraction);
}
{
    // タイミング関数を引数とし、変換したものを返す
    function makeEaseOut(timing) {
        return function(timeFraction) {
            return 1 - timing(1 - timeFraction);
        }
    }
}
{
    let bounceEaseOut = makeEaseOut(bounce);
}

// easeInOut
{
    if (timeFraction < 0.5) {
        return timing(2 * timeFraction) / 2;
    } else {
        return (2 - timing(2 * (1 - timeFraction))) / 2;
    }
}
{
    function makeEaseInOut(timing) {
        return function(timeFraction) {
            if (timeFraction < .5)
                return timing(2 * timeFraction) / 2;
            else
                return (2 - timing(2 * (1 - timeFraction))) / 2;
        }
    }

    bounceEaseInOut = makeEaseInOut(bounce);
}


// サマリ
{
    function animate({timing, draw, duration}) {

        let start = performance.now();

        requestAnimationFrame(function animate(time) {

            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) timeFraction = 1;

            let progress = timing(timeFraction);

            draw(progress);

            if (timeFraction < 1) {
                requestAnimationFrame(animate);
            }
        });
    }
}