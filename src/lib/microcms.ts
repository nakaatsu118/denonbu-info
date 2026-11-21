import { fold } from './fold';
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

// 検索の対象にする文字列。曲名、キャラクターの名前とふりがな、エリア名を入れる。
// 名前とふりがなは、姓と名の間の空白を詰めた形でも引けるようにする。
export const searchKey = (song: Song) => {
  const names = song.characters.flatMap((c) => [c.name, c.furigana]).filter(Boolean);
  const words = [song.title, ...names, ...names.map((name) => name.replace(/\s+/g, '')), ...song.area.map((a) => a.name)];
  return fold([...new Set(words)].join(' '));
};

// 旧サイトはUTCのビルド環境で date-fns の format を使っていたため、UTCの日付で表示する。
export const formatDate = (iso: string) => new Date(iso).toISOString().slice(0, 10).replaceAll('-', '.');
