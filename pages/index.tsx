import type { GetStaticProps } from 'next'
import { Song } from '~/types/song'
import { client } from '~/utils/microCMSClient'
import styles from '../styles/Home.module.scss'
import { parseISO, format } from 'date-fns'
import Meta from '~/components/_common/Meta'

export interface Props {
  data: Song[]
}

const Home = ({data}: Props):JSX.Element => {
  return (
    <div className={styles.container}>
      <Meta pageTitle='' pageUrl='' pageOgImage='' />
      <div className={styles.header}>
        <h1>電音部配信楽曲一覧</h1>
        <h2>電音部の配信楽曲情報をまとめたサイトです。</h2>
      </div>
      <h3 className={styles.main}>
        {data.map((song) => (
          <div className={styles.musicContainer} key={song.id}>
            <div className={styles.releaseDate}>
             <span>{format(parseISO(song.release_date), 'yyyy.MM.dd')}</span> Release
            </div>
            <div className={styles.musicTitle}>{song.title}</div>
            <div className={styles.imageAndLinkContainer}>
              <div className={styles.imageContainer}>
                <img className={styles.jacketImage} src={song.jacket_image.url} />
                <div className={styles.areas}>
                  {song.all_flag ? <></>
                  :
                    <>
                      {song.area.map((a)=>(
                        <div className={styles.area} key={a.id}>{a.name}</div>
                      ))}
                    </>
                  }
                </div>
              </div>
              <div className={styles.linksAndCharacterContainer}>
                <div className={styles.links}>
                  {song.youtube &&
                    <div className={styles.button}>
                      <a className={styles.link} href={song.youtube} target='_blank' rel='noopener noreferrer'>YouTube</a>
                    </div>
                  }
                  {song.streaming_link &&
                    <div className={styles.button}>
                      <a className={styles.link} href={song.streaming_link} target='_blank' rel='noopener noreferrer'>配信Link</a>
                    </div>
                  }

                </div>
                <div className={styles.characters}>
                  {song.all_flag ?
                    <div className={styles.character} style={{backgroundColor: 'red'}}>電音部</div>
                  :
                  <>
                    {song.characters.map((character) => (
                      <div className={styles.character} style={{backgroundColor: character.color}} key={character.id}>{character.name}</div>
                    ))}
                  </>
                  }
                </div>
              </div>
            </div>
          </div>
        ))}
      </h3>
      <div className={styles.footer}>
        <div className={styles.desc}>
          <h3>このサイトについて</h3>
          <p>電音部の楽曲情報（YouTube, Twitter etc…）が混在していて配信サイト一覧などが追いづらい状態だったので、一覧で見やすいサイトが欲しくなったので作成しました。</p>
          <h3>TODO</h3>
            <ul>
              <li>フィルター機能（エリア、キャラクター）</li>
              <li>並び替え（リリース日昇順降順）</li>
              <li>ページング</li>
            </ul>
          <h3>ポリシー</h3>
          <ul className={styles.policy}>
            <li>当サイトは電音部の非公式ファンサイトです。</li>
            <li>バンダイナムコエンターテインメント様とは一切関係ありません。</li>
            <li>当サイトで使用している画像の著作権は各権利者に帰属いたします。</li>
            <li>ご意見ご要望ございましたら下記Twitterアカウントまでご連絡ください。</li>
          </ul>
        </div>
        <div className={styles.copyright}><a href='https://twitter.com/nakaatsu' target='_blank' rel='noopener noreferrer'>@nakaatsu</a></div>
      </div>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const data = await client.get({ endpoint: "music", queries: {limit: 100} });

  return {
    props: {
      data: data.contents
    }
  }
}
