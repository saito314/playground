"use strict";


// スクリプト: async, defer
// 最近のwebサイトはスクリプトはHTMLより重いことがしばしば
// ブラウザがHTMLをロードし、<script>タグに遭遇するとDOMの構築を続けることができない。
// 外部スクリプトについても同じ
/*
    <p>...content before script...</p>

    <script src="https://javascript.info/article/script-async-defer/dong.js?speed=1"></script>

    <!-- スクリプトがロードされるまで表示されない -->
    <p>...content after script...</p>
*/

// 回避策としてページの末尾にスクリプトを置く手段がある
/*
    <body>
        ...all content is above the script...

        <script src="https://javascript.info/article/script-async-defer/long.js?speed=1"></script>
    </body>
*/