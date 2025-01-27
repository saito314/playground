"use strict";

// CSSアニメーション
// JavaScriptを利用することで、CSSアニメーションを制御し少しのコードでより優れたものにすることができる


// CSSトランジション
// 必要なことはプロパティを変更することだけ
/*
    .animeted {
        transition-property: background-color;
        trasition-duration: 3s;
    }
*/

// 今、ある要素が.animatedクラスを持っている場合、background-colorの変更は3秒間でアニメーションされる
/*
    <button id="color">Click me</button>

    <style>
        #color {
            transition-property: background-color;
            transition-duration: 3s;
        }
    </style>

    <script>
        color.onclick = function() {
            this.style.backgroundColor = "red";
        };
    </script>
*/


// 今の次点では、共通のtransitionプロパティはproperty durationtiming-function delayの順番で一緒に宣言できること
// 複数プロパティを一度にアニメーションすることができることに留意が必要
/*
    <button id="growing">Click me</button>

    <style>
    #growing {
        transition: font-size 3s, color 2s;
    }
    </style>

    <script>
    growing.onclick = function() {
        this.style.fontSize = "36px";
        this.style.color = "red";
    };
    </script>
*/


// transition-property
// すべてのプロパティがアニメーションできるわけではないが、それらの多くが可能
// 値allは"すべてのプロパティをアニメートする"を意味する


// transition-duration
// trandition-durationでは、どのくらいの長さアニメーションするかを指定することができる
// 時間はCSS時間形式で表す


// trandition-delay
// アニメーションする前の遅延を指定することができる
// 例えば、transition-delay: 1sを指定した場合、アニメーションはある変更の1秒後に始まる
// transformプロパティは次のようにアニメーションされる
/*
    #stripe.animate {
        transform: translate(-90%);
        transition-property: transform;
        transition-duration: 9s;
    }
*/

// 上の例ではJavaScriptは要素にクラス.animateを追加し、それによりアニメーションを開始している
/*
    stripe.classList.add("animate");
*/
// 途中から始めることも可能
// 負の値transition-delayを使って、例えば、現在の秒数に対応する正確な数値から始めることができる


// JavaScriptは追加の行でそれをしている
{
    stripe.onclick = function() {
        let sec = new Date().getSeconds() % 10;
        // 例えば、ここで-3sは3番目からアニメーションを開始する
        stripe.style.transitionDelay = "-" + sec + "s";
        stripe.classList.add("animate");
    }
}


// transition-timing-function
// タイミング関数はアニメーションプロセスが時間とともにどのように広がっていくかを記述する
// ゆっくりとはじまりその急速に進む、またはその逆もありえる。
// 一見すると複雑なプロパティだが、非常に簡単なものになる。


// CSStransitionはその曲線に基づいている
/*
    .train {
        left: 0;
        transition: left 5s cubic-bezier(0, 0, 1, 1);
    }
*/