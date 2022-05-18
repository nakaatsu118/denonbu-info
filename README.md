# 電音部配信楽曲一覧ページ

## Usage

```sh
# setup
yarn install

# run local
yarn dev

# build static page
# /out
yarn build
```

## What Changed

- cssはsassを前提とする
- `component/_common/Meta.tsx` にて各ページのmeta情報共通化
- `_app.tsx` にGTM設定を追加
- `_document.tsx` を作成

### Directory

- `components` : コンポーネントファイルを格納。汎用的なものは`_common`に格納。
- `types` : 型定義ファイルを格納。
- `utils` : 汎用的に使われるfunctionを格納。

## Other Rules

各コンポーネントの構成を以下にする。
- /components
  - Hoge
    - index.tsx
    - Hoge.module.scss
