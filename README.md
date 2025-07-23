# デザイン×AIスタジオ ランディングページ

AIツールを学び合うデザイナーコミュニティのランディングページです。

## 🌟 特徴

- **Fluid Background System**: スクロールに応じて有機的に変化する背景色
- **レスポンシブデザイン**: モバイル完全対応
- **Lottieアニメーション**: 動的なヒーローイラスト
- **高性能**: 60fps のスムーズなアニメーション

## 🚀 技術スタック

- **純粋なHTML/CSS/JavaScript**: フレームワーク不要
- **CSS変数システム**: 統一されたデザイントークン
- **数学的色生成**: サイン波関数による自然な色変化
- **Font Awesome**: アイコンライブラリ
- **Lottie**: アニメーション

## 📁 ファイル構成

```
├── index.html              # メインHTML
├── style.css               # CSS（fluid backgroundシステム含む）
├── script.js               # JavaScript（色変化ロジック）
├── profile.png             # プロフィール画像
├── favicon.ico             # ファビコン
├── Animation-*.json        # Lottieアニメーション
└── README.md              # このファイル
```

## 🔧 ローカル開発

```bash
# ローカルサーバー起動
python3 -m http.server 8080

# または
npx serve .
```

ブラウザで `http://localhost:8080` にアクセス

## 🌐 デプロイ

このプロジェクトはVercelでホスティング推奨：

1. GitHubにpush
2. Vercelでリポジトリ連携
3. 自動デプロイ設定

## 📝 ライセンス

© 2025 デザイン×AIスタジオ / 梅本周作
