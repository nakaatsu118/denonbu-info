import { defineConfig } from 'astro/config';

// 旧サイト（Next.jsの静的出力）と同じく、/music/1 のような末尾スラッシュなしのURLにする。
export default defineConfig({
  site: 'https://www.denonbu.info',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
});
