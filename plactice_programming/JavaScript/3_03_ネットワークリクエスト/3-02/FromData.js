"use strict";


// ファイルの有無や追加のフィールドなどFormDataオブジェクトはそれらの場合に役立つ
{
    let formData = new FormData([form]);
}


// シンプルなフォームの送信
/*
    <form id="formElem">
        <input type="text" name="name" value="John">
        <input type="text" name="surname" value="Smith">
    </form>

    <script>
        (async () => {
            let response = await fetch('/article/fetch-basics/post/user', {
                method: "POST",
                body: new FormData(formElem)
            });

            let result = await response.json();

            alert(result.message);
        })();
    </script>
*/


// FormDataメソッド
// フォームは技術的には同じnameをもつ複数のフィールドを持つことが可能なので
// 複数のappend呼び出しをするとその分同じ名前のフィールドを追加される
{
    let formData = new FormData();
    formData.append("key1", "value1");
    formData.append("key2", "value2");

    // key/value ペアをリストする
    for (let [name, value] of formData) {
        alert(`${name} = ${value}`);
    }
}


// ファイルを含むフォームを送信する
// フォームは常にContent-Type: form/multipartとして送信され、このエンコーディングはファイルを送信することが可能
/*
    <form id="formElem">
        <input type="text" name="firstName" value="John">
        Picture: <input type="file" name="picture" accept="image/*">
        <input type="submit">
    </form>

    <script>
        formElem.onsubmit = async(e) => {
            e.preventDefault();

            let response = await fetch('/article/formdata/post/user-avatar', {
                method: "POST",
                body: new FormData(formElem)
            });

            let result = await response.json()

            alert(result.message);
        };
    </script>
*/


// Blobデータを含むフォームを送信する
// 動的に生成されたBlobを送信する
// fetchパラメータのbodyに直接指定することができる
// nameやほかのメタデータのような追加のフィールド一緒に送信するのが便利な場合が多い
/*
    <body style="margin:0">
        <canvas id="canvasElem" width="100" height="80" style="border:1px solid"></canvas>

        <input type="button" value="Submit" onclick="submit()">

        <script>
            canvasElem.onmousemove = function(e) {
                let ctx = canvasElem.getContent("2d");
                ctx.lineTo(e.clientX, e.clientY);
                ctx.stroke();
            };

            async function submit() {
                let imageBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

                let formData = new FormData();
                formData.append("firstName", "John");
                formData.append("image", imageBlob, "image.png");

                let response = await fetch('/article/formdata/post/image-form', {
                    method: "POST",
                    body: formData
                });
                let result = await response.json();
                alert(result.message);
            }
        </script>
    </body>
*/