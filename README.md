# 石原淳哉 公式サイト（Trainer × AI）

パーソナルトレーナー石原淳哉の公式サイトです。トレーナーとしての活動と、AIを使ったサービスづくり（VOICEカルテなど）を紹介します。

- パーソナルトレーニングのサイト: https://junya-luxury-training-blog.vercel.app （別リポジトリ `junya-luxury-training-blog`）
- デザインはトレーニングのサイトと共通（白 × 空色、Outfit / Inter、GSAP + Lenis のモーション）

## 技術

- Next.js 16（App Router）/ React 19 / TypeScript
- Tailwind CSS v4（色・フォントは `src/app/globals.css` の `@theme`）
- GSAP（ScrollTrigger / SplitText）+ Lenis

## 開発

```sh
npm install
npm run dev
npm run lint
npm run build
```

Node.js 22 以上（`.nvmrc`）。

## 内容を変えるとき

- 連絡先・リンク: `src/config.ts`
- ページ本文: `src/app/page.tsx`
- VOICEカルテは「音声でカルテを自動作成するAI」として紹介しています（オーナーの指定）。数値で効果を約束する表現（「記録時間◯%削減」など）は、検証が済むまで使わないでください。
- アニメーション用の `data-*` 属性（`data-split` / `data-reveal` / `data-hero` など）は消さないでください。`MotionProvider` はページの最後に置きます（`layout.tsx` に移すとハイドレーションエラーになります）。

## 環境変数（任意）

| 変数 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 正式URL（未設定時は `https://ishihara-official-site.vercel.app`） |
