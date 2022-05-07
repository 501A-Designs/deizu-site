import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'

// import { BrowserMockup } from 'react-mockup'
// import 'react-mockup/dist/index.css'

import Footer from '../lib/component/Footer'
import Container from '../lib/component/Container'

import { MdOutlineOpenInBrowser, MdCode } from "react-icons/md";
import Button from '../lib/component/Button'
import AlignItems from '../lib/style/AlignItems'
import GradientText from '../lib/component/GradientText'
import BodyMargin from '../lib/style/BodyMargin'
import BlockList from '../lib/component/BlockList'

export default function Home() {
  const [versionData, setVersionData] = useState();

  return (
    <div className={'container'}>
      <Head>
        <title>DEIZU</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className={'grid-1fr-1fr sidePadding responsiveFullHeight'}>
          <AlignItems style={{justifyContent: 'center'}}>
            <div>
              <h2>時間割をすばやく作成</h2>
              <h1 style={{fontSize:'5em'}}>DEIZU</h1>
              <AlignItems style={{marginTop:'1em'}}>
                <Button
                  icon={<MdOutlineOpenInBrowser/>}
                  onClick={() => window.open('https://deizu-site.firebaseapp.com/', "_blank")}
                >
                  Webアプリを開く
                </Button>
                <Button
                  icon={<MdCode/>}
                  onClick={() => window.open('https://github.com/501A-Designs/DEIZU', "_blank")}
                >
                  GitHubを見る
                </Button>
              </AlignItems>
            </div>
          </AlignItems>
          <section className="mockupContainer">
            {/* <BrowserMockup
              src="/deizu-screenshot.png"
              type="mac"
              color="black"
            /> */}
          </section>
        </div>

        <div className={'grid-1fr-1fr sidePadding responsiveFullHeight'}>
          <AlignItems>
            <div>
              <BlockList>シンプルでわかりやすい UI</BlockList>
              <BlockList>Google アカウントでログイン</BlockList>
              <BlockList>早い処理速度</BlockList>
              <BlockList>科目のセルの色、リンク、概要欄可</BlockList>
              <BlockList>時間割の時間を指定</BlockList>
              <BlockList>何枚もの時間割表を作成・保存可</BlockList>
              <BlockList>リンクを通した時間割表の共有</BlockList>
            </div>
          </AlignItems>
          <AlignItems>
            <div>
              <h1 style={{fontSize:'3em'}}>どシンプルがいいのだ</h1>
              <h2>シンプルで使いやすい時間割表作成サイト</h2>
              <p>
                このソフトは時間割表の作りづらさを改善しようと考えられ開発されたソフトです。シンプルなデザインと共に紙で作成するマニュアルなプロセスやスプレッドシートやExcelを使用する際にテンプレートを作成する作業を全て排除します！
              </p>
            </div>
          </AlignItems>
        </div>

        <div className={'grid-1fr-1fr sidePadding responsiveFullHeight'}>
          <AlignItems>
            <div>
              <h1 style={{fontSize:'3em'}}>あなたにあった場所で</h1>
              <h2>異なるデバイスでも同じデータを共有。</h2>
              <p>
                場所と機種問わずデータは全てユーザーに結び付けられ保存されています。Webで作成した時間割をスマホアプリで見れる便利さ。シンプルでかつ説明書すらいらないユーザー重視のプラットフォームを体験してませんか？
              </p>
            </div>
          </AlignItems>
          <AlignItems>
            <div>
              <Container style={{marginBottom:'1.5em'}}>
                <h2>Web &rarr;</h2>
                <p>Next.Js等のモダンなウェブテクノロジーで構成された時間割作成アプリケーション。バックエンドではFirebaseを使用し、充実したユーザーエクスピリエンスとデザインを兼ね備えた唯一無二な時間割表作成プラットフォームです。</p>
                <Button>Webアプリを開く</Button>                
              </Container>
              {/* <Container>
                <h2>iOSとAndroid &rarr;</h2>
                <p>React Nativeで作成されたモバイルプラットフォームはWebほどヘビーユーザーでないあなたに最低限の機能が搭載され、時間割作成を簡単にそして素早く行ってくれるプラットフォームです。</p>
                <p>Coming Soon ...</p>
                <AlignItems>
                  <Button disabled={true}>iOSのアプリダウンロード</Button>
                  <Button disabled={true}>Androidのアプリダウンロード</Button>
                </AlignItems>
              </Container> */}
            </div>
          </AlignItems>
        </div>


      <Footer />
    </div >
  )
}
