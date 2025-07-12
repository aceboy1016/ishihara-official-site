# イシハラ公式サイト兼ブログ

イシハラ氏の公式サイトとブログを統合したWebサイトです。Next.js、Sanity CMS、Tailwind CSSを使用して構築されています。

## 機能

- **レスポンシブデザイン**: モバイルファーストのアプローチ
- **ブログ機能**: Sanity CMSによるコンテンツ管理
- **検索機能**: 記事の全文検索
- **カテゴリー・タグ**: コンテンツの分類
- **SEO最適化**: メタタグ、構造化データ、サイトマップ
- **Google Analytics**: アクセス解析
- **高パフォーマンス**: 静的サイト生成（SSG）

## 技術スタック

- **フロントエンド**: Next.js 15 (App Router)
- **スタイリング**: Tailwind CSS v4
- **CMS**: Sanity
- **言語**: TypeScript
- **ホスティング**: Vercel
- **フォント**: Noto Sans JP

## 環境変数

プロジェクトルートに `.env.local` ファイルを作成し、以下の環境変数を設定してください：

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_TOKEN=your-read-token
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## セットアップ

1. **依存関係のインストール**:
   ```bash
   npm install
   ```

2. **Sanity CMSのセットアップ**:
   - [Sanity.io](https://www.sanity.io/) でアカウントを作成
   - 新しいプロジェクトを作成
   - プロジェクトIDとデータセットを取得
   - 環境変数を設定

3. **開発サーバーの起動**:
   ```bash
   npm run dev
   ```

4. **ブラウザでアクセス**:
   [http://localhost:3000](http://localhost:3000)

## Sanity CMSのスキーマ

以下のスキーマをSanity Studioで設定してください：

### Blog Post
- `title` (string): 記事タイトル
- `slug` (slug): URL用スラッグ
- `excerpt` (text): 記事の概要
- `publishedAt` (datetime): 公開日
- `updatedAt` (datetime): 更新日
- `mainImage` (image): メイン画像
- `body` (array): 記事本文（ブロックコンテンツ）
- `categories` (array): カテゴリー参照
- `tags` (array): タグ参照

### Category
- `title` (string): カテゴリー名
- `slug` (slug): URL用スラッグ
- `description` (text): カテゴリーの説明

### Tag
- `title` (string): タグ名
- `slug` (slug): URL用スラッグ

## デプロイ

### Vercelでのデプロイ

1. **Vercelアカウントにサインアップ**:
   [vercel.com](https://vercel.com/)

2. **GitHubリポジトリと連携**:
   - Vercelダッシュボードで「New Project」をクリック
   - GitHubリポジトリを選択

3. **環境変数の設定**:
   - Vercelのプロジェット設定で環境変数を追加
   - 上記の環境変数をすべて設定

4. **デプロイ**:
   - `main`ブランチにプッシュすると自動デプロイされます

## ディレクトリ構造

```
src/
├── app/                    # App Router (Next.js 13+)
│   ├── blog/              # ブログ関連ページ
│   │   ├── [slug]/        # 個別記事ページ
│   │   ├── category/      # カテゴリーページ
│   │   ├── tag/           # タグページ
│   │   └── search/        # 検索ページ
│   ├── layout.tsx         # ルートレイアウト
│   └── page.tsx           # ホームページ
├── components/            # 再利用可能なコンポーネント
│   ├── Header.tsx         # ヘッダーコンポーネント
│   ├── Footer.tsx         # フッターコンポーネント
│   ├── SearchBar.tsx      # 検索バーコンポーネント
│   ├── PortableText.tsx   # Sanityコンテンツ表示
│   └── GoogleAnalytics.tsx # GA4統合
├── lib/                   # ユーティリティとライブラリ
│   ├── sanity.ts          # Sanity設定とクエリ
│   ├── metadata.ts        # SEOメタデータ生成
│   └── structured-data.ts # JSON-LD構造化データ
└── types/                 # TypeScript型定義
    └── blog.ts            # ブログ関連の型
```

## スクリプト

- `npm run dev`: 開発サーバー起動（Turbopack使用）
- `npm run build`: 本番ビルド & サイトマップ生成
- `npm run start`: 本番サーバー起動
- `npm run lint`: ESLintによるコード検査
- `npm run sitemap`: サイトマップ生成

## パフォーマンス最適化

- **静的サイト生成（SSG）**: 高速な読み込み
- **画像最適化**: next/imageによる自動最適化
- **コード分割**: 自動的なバンドル分割
- **キャッシュ最適化**: Vercelのエッジキャッシュ活用

## SEO機能

- **メタタグ**: 動的なメタデータ生成
- **OGP**: ソーシャルメディア対応
- **構造化データ**: JSON-LD形式
- **サイトマップ**: 自動生成
- **robots.txt**: 検索エンジン向け設定

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
