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
// 複数プロパティを一度にアニメーションすることができることに留意しておいてください。
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