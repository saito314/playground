"use strict";


// 導入
// web componentsはどのブラウザでも試すことはできるが、GoogleChromeが最新


// コンポーネントアーキテクチャ
// 複雑なソフトウェアを開発する上での規則は複雑なソフトウェアを作らないこと
// ユーザインタフェースは視覚的なコンポーネントに分割することができる
// それぞれがページ上に自身の場所を持ち、あるモデルによってきちんと説明されるタスクを実行できる

// コンポーネントはサブコンポーネントを持つことがある
// コンポーネントが次のものを持っている
// ・独自のJavaScriptクラス
// ・DOM構造: これはそのクラスによってのみ管理され、外部のコードはそこにアクセスしない
// ・CSSスタイル: コンポーネントに適用される
// ・API: 他のコンポーネントとやり取りするためのイベントやクラスメソッド
