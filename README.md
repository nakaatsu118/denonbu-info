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

ビルドは楽曲を全件取得し、取得件数が`totalCount`と合わなければ失敗します。ページは`/`だけです。年ごとの一覧から曲を探す画面で、背景にはジャケットの壁が流れます。旧サイトの`/music`と`/music/1`〜`/music/N`は`public/_redirects`で`/`へ転送します。末尾にスラッシュを付けたURLは付けないURLへ転送し、存在しないURLには`404.html`を返します。

## デプロイ

`wrangler.jsonc`のWorker名は`denonbu-info`です。Workers Buildsにリポジトリを接続し、ビルド環境にCMSの2変数を登録します。ビルドコマンドは`npm run build`、デプロイコマンドは`npm run deploy`です。microCMSの記事を更新したときは、ビルドとデプロイを再実行してください。

## ディレクトリ

- `src/pages` : ページ。`index.astro`が一覧と背景の壁を表示します。
- `src/layouts` : meta情報、GTM、ヘッダー、ABOUTのダイアログを含む共通レイアウト。
- `src/components` : コンポーネント。`SongGrid.astro`が年ごとの一覧と絞り込み、`SongWall.astro`が背景に流すジャケットの壁です。楽曲の詳細表示は`SongDialog.astro`と`SongInfo.astro`にあります。
- `src/lib` : microCMSからの取得と日付の整形。取得した曲はリリース日の新しい順に並べます。
- `src/styles` : SCSSのスタイル。コンポーネント用はCSS Modules（`*.module.scss`）にします。
- `src/types` : 型定義。
