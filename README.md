# 電音部配信楽曲一覧ページ

電音部の楽曲情報をまとめた非公式ファンサイトです。AstroでmicroCMSの楽曲データを静的生成し、Cloudflare Workers Static Assetsで配信します。

## セットアップ

Node.js 24.21.0を使用します（`.tool-versions`参照）。

```sh
npm ci
cp .env.sample .env
npm run dev
```

`.env`に`microCMSServiceDomain`と`microCMSApiKey`を設定します。キーはビルド時だけ使用し、`PUBLIC_`を付けません。

## 検証・ビルド

```sh
# Astroの型チェック
npm run check

# dist/に静的サイトを生成（microCMSへの接続が必要）
npm run build

# Wranglerのローカル環境でdist/を配信
npm start
```

ビルドは楽曲を全件取得し、取得件数が`totalCount`と合わなければ失敗します。URLは旧サイトと同じ`/`と`/music/1`〜`/music/N`です。末尾にスラッシュを付けたURLは付けないURLへ転送し、存在しないURLには`404.html`を返します。

## デプロイ

`wrangler.jsonc`のWorker名は`denonbu-info`です。Workers Buildsにリポジトリを接続し、ビルド環境にCMSの2変数を登録します。ビルドコマンドは`npm run build`、デプロイコマンドは`npm run deploy`です。microCMSの記事を更新したときは、ビルドとデプロイを再実行してください。

## ディレクトリ

- `src/pages` : ページ。`music/[id].astro`で一覧のページ送りを生成します。
- `src/layouts` : meta情報、GTM、ヘッダー、フッターを含む共通レイアウト。
- `src/components` : コンポーネント。
- `src/lib` : microCMSからの取得と日付の整形。
- `src/styles` : SCSSのスタイル。コンポーネント用はCSS Modules（`*.module.scss`）にします。
- `src/types` : 型定義。
