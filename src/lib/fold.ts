// 検索で比べる前の正規化。全角と半角、大文字と小文字、ひらがなとカタカナを区別しない。
// ビルド時の検索用文字列（microcms.ts）と、入力された語（SongGrid）の両方に同じものを使う。
export const fold = (text: string) =>
  text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[ァ-ヶ]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0x60));
