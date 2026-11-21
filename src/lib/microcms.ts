import type { Song } from '../types/song';

const LIMIT = 100;

// ビルド時に全楽曲を取得する。APIキーはクライアントへ出さない。
const fetchAllSongs = async (): Promise<Song[]> => {
  const domain = import.meta.env.microCMSServiceDomain;
  const apiKey = import.meta.env.microCMSApiKey;
  if (!domain || !apiKey) throw new Error('microCMSServiceDomain and microCMSApiKey are required');

  const songs: Song[] = [];
  let totalCount = Infinity;
  while (songs.length < totalCount) {
    const url = `https://${domain}.microcms.io/api/v1/music?limit=${LIMIT}&offset=${songs.length}`;
    const res = await fetch(url, { headers: { 'X-MICROCMS-API-KEY': apiKey }, signal: AbortSignal.timeout(10_000) });
    if (!res.ok) throw new Error(`microCMS request failed: ${res.status}`);
    const data: { contents: Song[]; totalCount: number } = await res.json();
    if (data.contents.length === 0) break;
    songs.push(...data.contents);
    totalCount = data.totalCount;
  }
  if (songs.length !== totalCount) throw new Error(`microCMS returned ${songs.length} of ${totalCount} songs`);
  // リリース日の新しい順に並べる。同じ日の曲はmicroCMSの並びのままにする。
  return songs.sort((a, b) => b.release_date.localeCompare(a.release_date));
};

// 複数のページから呼んでも、取得は1回で済ませる。
let cache: Promise<Song[]> | undefined;
export const getAllSongs = () => (cache ??= fetchAllSongs());

export const ALL = 'all'; // 全員曲（all_flag）をエリアの選択肢として扱うための値

export const image = (url: string, width: number) => `${url}?w=${width}&fm=webp`;

// 検索は全角半角と大文字小文字を区別しない。クライアント側のスクリプトと同じ正規化にする。
export const searchKey = (song: Song) =>
  [song.title, ...song.characters.map((c) => c.name), ...song.area.map((a) => a.name)]
    .join(' ')
    .normalize('NFKC')
    .toLowerCase();

// 旧サイトはUTCのビルド環境で date-fns の format を使っていたため、UTCの日付で表示する。
export const formatDate = (iso: string) => new Date(iso).toISOString().slice(0, 10).replaceAll('-', '.');
