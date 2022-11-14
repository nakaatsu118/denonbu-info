import Head from "next/head";

const Meta = ({
  pageTitle,
  pageUrl,
  pageOgImage,
  noIndex = false,
}: {
  pageTitle: string;
  pageUrl: string;
  pageOgImage: string;
  noIndex?: boolean;
}) => {
  const defaultTitle = 'DENONBU MUSIC INFO';
  const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;
  const description = '電音部の楽曲情報、配信リンクをまとめています。';
  const siteName = 'DENONBU MUSIC INFO';
  const domain = 'www.denonbu.info';
  const url = pageUrl ? `https://${domain}/${pageUrl}/` : `https://${domain}`;
  const ogImage = pageOgImage || `https://${domain}/common/og-image.png`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="ja_JP" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="@nakaatsu" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="viewport" content="width=device-width" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#000000" />
      {/* noIndex === true の場合のみ noindex 有効化 */}
      {noIndex && <meta name="robots" content="noindex" />}
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Head>
  )
}

export default Meta;
