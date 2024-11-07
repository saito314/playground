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