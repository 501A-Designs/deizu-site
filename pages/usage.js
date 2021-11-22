import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { BrowserMockup } from 'react-mockup'
import 'react-mockup/dist/index.css'
import Header from './Header'

export default function Usage() {
    return (
        <div className={'container'}>
            <Head>
                <title>使用法</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header/>
            <main className={styles.main}>
                <div className={styles.duoGrid}>
                    <section>
                        <h1 className={styles.title}>DEIZUの使用法</h1>
                        <h3>アカウントの作成・新しい時間割表の作成</h3>
                    </section>
                    <div className={styles.aboutScroll}>
                        <h2>アカウントの作成</h2>
                        <h3>ログイン</h3>
                        <p>Googleでログインのボタンを押すことで登録されているGoogleアカウントで簡単にアカウントを作成することができます。</p>
                        <h3>ログアウト</h3>
                        <p>設定のアイコンを押し、「〇〇さんのプロフィール」のタブを開くとポップアップが表示され、プロフィール画像の下にログアウトのボタンがあります。</p>
                        <hr />
                        <h2>カスタマイズ</h2>
                        <p>プロフィールのボタンを押し[カスタマイズ]のタブを開くと：
                            <br />
                            <ul>
                                <ol>画像のURLで壁紙の指定</ol>
                                <ol>テーマの変更：6種類</ol>
                                <ol>色を変更：9種類</ol>
                            </ul>
                            のオプションが有ります
                        </p>
                        <div className={styles.carousel}>
                            <div className={styles.card}>
                            <BrowserMockup src="/deizu-browntheme.png" />
                            </div>
                            <div className={styles.card}>
                            <BrowserMockup src="/deizu-bluetheme.png" />
                            </div>
                            <div className={styles.card}>
                            <BrowserMockup src="/deizu-greentheme.png" />
                            </div>
                            <div className={styles.card}>
                            <BrowserMockup src="/deizu-greytheme.png" />
                            </div>
                            <div className={styles.card}>
                            <BrowserMockup src="/deizu-orangetheme.png" />
                            </div>
                        </div>
                        <hr />
                        <h2>時間割表の切り替え</h2>
                        <h3>ログイン済みの場合（ダッシュボードから）</h3>
                        <p>
                            ログイン済みの場合は自動的にダッシュボードに移動します。ダッシュボードでは新しい表を作成というボタンがあり、過去に既に作成した場合には表がボタンの下に並べられます。
                            <br />
                            表のタイトルを押すことで開くことができ、タイトル以外の物全てを再び編集することができます。
                        </p>
                        <h3>時間割表を既に開いている場合</h3>
                        <p>
                            時間割表を既に開いてる場合はタイトルが書かれている欄（スーパーインプット）の隣にあるボタンを押すことで他の表が載っているポップアップが表示され好みの時間割表を選ぶ事ができます。
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
