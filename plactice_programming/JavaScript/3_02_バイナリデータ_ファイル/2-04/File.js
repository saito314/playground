"use strict";


// FileオブジェクトはBlobを継承しており、ファイルシステムに関連した機能が拡張されている。
// Blobに似たコンストラクタ
{
    new File(fileParts, fileName, [options]);
}

// <input type="file">やドラッグドロップあるい他のブラウザインタフェースを使用してファイルを取得する
// こちらが主流
/*
    <input type="file" onchange="showFile(this)">

    <script>
    function showFile(input) {
        let file = input.files[0];
        
        alert(`File name: ${file.name}`);
        alert(`Last modified: ${file.lastModified}`);
    }
    </script>
*/

// FileReader
// FileReaderはBlobオブジェクトからデータを読み込むことのみを目的としたオブジェクト
// コンストラクタ
{
    let reader = new FileReader(); // 引数はない
}


// ファイル読み込みの例
/*
    <input type="file" onchange="readFile(this)">

    <script>
        function readFile(input) {
            let file = input.files[0];

            let reader = new FileReader();

            reader.readAsText(file);

            reader.onload = function() {
                console.log(reader.result);
            };

            reader.onerror = function() {
                console.log(reader.error);
            };
        }
    </script>
*/