import type { GetStaticProps } from 'next';
import { Song } from '~/types/song';
import { client } from '~/utils/microCMSClient';
import styles from './Home.module.scss';
import { parseISO, format } from 'date-fns';
import Meta from '~/components/_common/Meta';
import { Pagination } from '~/components/Pagination';
import Link from 'next/link';

export interface Props {
  data: Song[];
  totalCount: number;
}

const isLazy = (index: Number) => {
  return index >= 8 ? 'lazy' : 'eager';
}
const PER_PAGE = 12;

const Home = ({ data, totalCount }: Props): JSX.Element => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <Link href='/' passHref>
          <img className={`${styles.headerImage} ${styles.blur}`} src='/image/logo_trans.png' alt='logo' width={128} height={88} />
        </Link>
      </div>
      <div className={styles.container}>
        <Meta pageTitle="" pageUrl="" pageOgImage="" />
        <div className={styles.topContainer} >
          <h1>ALL MUSIC</h1>
          <h2>電音部の楽曲情報、配信リンクをまとめています</h2>
        </div>
        <div className={styles.main}>
          {data.map((song, index) => (
            <div className={styles.musicContainer} key={song.id}>
              <div className={styles.imageContainer}>
                <img className={styles.jacketImage} src={song.jacket_image.url + '?w=240&fm=webp'} alt={song.title} width={240} height={240} loading={isLazy(index)} />
                <div className={styles.backImageContainer}>
                  <img className={styles.backImage} src={song.jacket_image.url + '?w=240&fm=webp'} alt={song.title + '_背景'} width={300} height={240} loading={isLazy(index)} />
                </div>
              </div>
              <div className={styles.releaseDate}>
                <span>{format(parseISO(song.release_date), 'yyyy.MM.dd')}</span>
              </div>
              <div className={styles.musicTitle}>{song.title}</div>
              <div className={styles.links}>
                {song.youtube && (
                  <div className={styles.button}>
                    <a className={styles.link} href={song.youtube} target="_blank" rel="noopener noreferrer">
                      <span className={styles.buttonText}>YouTube</span>
                    </a>
                  </div>
                )}
                {song.streaming_link && (
                  <div className={styles.button}>
                    <a className={styles.link} href={song.streaming_link} target="_blank" rel="noopener noreferrer">
                      <span className={styles.buttonText}>配信Link</span>
                    </a>
                  </div>
                )}
              </div>
              <div className={styles.characters}>
                {song.all_flag ? (
                  <div className={styles.character} style={{ backgroundColor: 'red' }}>
                    電音部
                  </div>
                ) : (
                  <>
                    {song.characters.map((character) => (
                      <div
                        className={styles.character}
                        style={{ backgroundColor: character.color }}
                        key={character.id}
                      >
                        {character.name}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <Pagination totalCount={totalCount} />
      </div>
    </div>
  );
};

export default Home;

export const getStaticPaths = async () => {
  const repos = await client.get({ endpoint: 'music' });
  const range = (start: number, end: number) =>
  [...Array(end - start + 1)].map((_, i) => start + i);
  const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/music/${repo}`);

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params ? context.params.id : '';
  const data = await client.get({ endpoint: 'music', queries: { offset: (Number(id) - 1) * PER_PAGE, limit: PER_PAGE } });

  return {
    props: {
      data: data.contents,
      totalCount: data.totalCount
    },
  };
};
