import Head from 'next/head'
import Link from 'next/link'
import Footer from '../lib/component/Footer'
import TextPreview from '../lib/component/TextPreview'
import BodyMargin from '../lib/style/BodyMargin'

export default function Usage() {
    return (
        <>
            <Head>
                <title>使用法</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <BodyMargin>
                <div className={'grid-1fr-1fr'}>
                    <section>
                        <h1>Deizuの使用法</h1>
                        <h3>アカウントの作成・カスタマイズ・時間割表について</h3>
                    </section>
                    <div>
                        <h2>アカウントについて</h2>
                        <h3>新規登録・ログイン</h3>
                        <p><Link href="/app">deizu.vercel.app/app/</Link>から、Googleでログインのボタンを押すことで登録されているGoogleアカウントで簡単にアカウントを作成・ログインすることができます。</p>
                        <h3>ログアウト</h3>
                        <p>ダッシュボードの画面の左手にユーザー様のプロフィール画像がありますのでそちらをクリックしてもらうとログアウトボタンがある画面に進むことができるので、そちらを押すとログアウトすることができます。</p>
                        <hr />
                        <h2>カスタマイズ</h2>
                        <p>
                            ダッシュボードの左手にユーザー様のお名前と画像が表示される部分があります。そちらからみた右にパレットのアイコンがあるので、そちらを押すことでカスタマイズ設定（見た目の変更）を行うことができます。なお、以下の操作をすることができます：
                        </p>
                        <ul>
                            <li>ユーザー様のバナー画像の指定</li>
                            <li>テーマの変更：5種類</li>
                            <li>色を変更：8種類</li>
                        </ul>
                        <p>
                            なお、時間割それぞれには独自の「バナー画像の指定」と「壁紙の指定」を行うこともできます。（時間割を開き設定から追加・変更を行うことができます。）
                        </p>
                        <hr />
                        <h2>時間割表について</h2>
                        <h3>時間割表の開き方</h3>
                        <p>
                            ログイン済みの場合は自動的にダッシュボードに移動します。ダッシュボードでは新しい表を作成というボタンがあり、過去に既に作成した場合には表がボタンの下に並べられます。
                            <br />
                            表のタイトルを押すことで開くことができ、タイトル以外の物全てを再び編集することができます。
                        </p>
                        <h3>時間割表とデータシートの使用法</h3>
                        <h4>データシートとは？</h4>
                        <p>
                            Deizuには時間割ごとでデータシートというものを追加することができます。データシートはある項目にそって時間割の科目をまとまって保存されているものであり、データシートをある時間割に追加することで科目の入力がより素早くなります。
                        </p>
                        <h4>時間割表にデータシートを追加</h4>
                        <ol>
                            <li>データシートのIDをコピー</li>
                            <p>
                                データシートにはそれぞれユニークなIDがあり、データシートのIDをコピする事で時間割表に追加することができます。
                                <br />
                                IDはデータシートの一覧のページのデータシートのボタンの左にある丸いアイコンを押すことでコピーすることができます。
                                <br />
                                またボタンを押しデータシートのページを開くと移動するURLの後ろの部分からもIDを抽出することができます。（下記を参照）
                            </p>
                            <TextPreview style={{marginBottom:'1.5em'}}>
                                <span style={{color:'grey'}}>deizu.vercel.app/datasheet/</span>データシートID
                            </TextPreview>
                            <li>時間割表に追加</li>
                            <p>
                                データシートを追加したい時間割表を開き、一番右に見られる設定のアイコンを押してください。
                                <br />
                                設定を開くと一番上にある、「データシートを繋げる」を押し、1でコピーしたデータシートのIDをインプットに入力し「データシートを繋げる」と書いたボタンを押すとデータシートが時間割表に追加されます。
                            </p>
                            <li>確認</li>
                            <p>
                                追加されると追加したデータシートの名前が入力した欄の上に表示され、設定を閉じ時間割表のセルを開くとデータシートに保存されている科目の一覧が表示されます。横スクロールし、追加したい科目をクリックすると科目の情報が入力されます。
                                <br />
                                追加で「概要」または「URL」の部分に情報を書き込むことができ、追加で入力する情報はデータシートには共有されないので安心してください。
                            </p>
                        </ol>
                        <h4>データシートを作成</h4>
                        <p>
                            データシート一覧のページからデータシートを新しく作成することができます（以下のURL）
                        </p>
                        <TextPreview style={{color:'grey'}}>deizu.vercel.app/datasheet/</TextPreview>
                        <p>
                            なおデータシート作成のページに直接飛びたい人は以下のURLで開くことができます（Deizuにログインする必要がございます。新規登録・ログインは<Link href="/app">こちら</Link>から）
                        </p>
                        <TextPreview style={{color:'grey'}}>deizu.vercel.app/datasheet/create/</TextPreview>
                    </div>
                </div>
            </BodyMargin>
            <Footer/>
        </>
    )
}
