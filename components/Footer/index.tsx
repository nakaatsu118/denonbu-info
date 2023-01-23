import styles from './Footer.module.scss'

const Footer = (): JSX.Element => {
  return (
    <div className={styles.footer}>
      <div className={styles.desc}>
        <h3>このサイトについて</h3>
        <p>
          電音部の楽曲情報をまとめて見やすいサイトが欲しくなったので作成しました。
        </p>
        <h3>TODO</h3>
        <ul>
          <li>フィルター機能（エリア、キャラクター）</li>
          <li>並び替え（リリース日昇順降順）</li>
        </ul>
        <h3>ポリシー</h3>
        <ul className={styles.policy}>
          <li>当サイトは電音部の非公式ファンサイトです。</li>
          <li>バンダイナムコエンターテインメント様とは一切関係ありません。</li>
          <li>当サイトで使用している画像の著作権は各権利者に帰属いたします。</li>
          <li>ご意見ご要望ございましたら下記Twitterアカウントまでご連絡ください。</li>
          <li>
            このコンテンツはファンメイドコンテンツです。ファンメイドコンテンツポリシー（
            <a href="https://denonbu.jp/guidelines">https://denonbu.jp/guidelines</a>）のもと制作されています。
          </li>
        </ul>
      </div>
      <div className={styles.copyright}>
        <a href="https://twitter.com/nakaatsu" target="_blank" rel="noopener noreferrer">
          @nakaatsu
        </a>
      </div>
    </div>
  )
}

export default Footer;
