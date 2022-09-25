import Head from 'next/head'
import Image from 'next/image'
import { NextSeo } from 'next-seo';

import Button from '../lib/button/Button'
import Footer from '../lib/component/Footer'
import Container from '../lib/component/Container'

import { MdOutlineOpenInBrowser, MdCode,MdArrowDownward } from "react-icons/md";
import AlignItems from '../lib/style/AlignItems'
import BlockList from '../lib/component/BlockList'

import {isBrowser, isMobile} from 'react-device-detect';
import appIcon from '../public/deizuAppIconUpdated.png'
// import appScreenshot from '../public/deizu-screenshot.png'
import { useRouter } from 'next/router'
import Link from 'next/link'

import {BrowserMockup, MobileMockup} from 'react-mockup'
import 'react-mockup/dist/index.css'

export default function Home() {
  let router = useRouter();
  const frameStyle={
    backdropFilter: 'blur(16px)',
    background:'radial-gradient(86.36% 107.55% at 6.49% 12.32%,rgba(255, 255, 255, 0.5) 0%,rgba(255, 255, 255, 0.5) 100%)',
    border:'1px solid rgba(228, 228, 228, 0.3)',
    padding:'15px',
    borderRadius:'20px',
  }

  return (
    <div className={'container'}>
      <NextSeo
        title="Deizu"
        description="時間割表を作成するアプリ"
      />
        <div className={'sidePadding'} style={{display:'flex',justifyContent: 'center'}}>
          <AlignItems style={{flexDirection:'column', justifyContent: 'center'}}>
            <AlignItems style={{marginTop:'8em'}}>
              <Image src={appIcon} width={100} height={100}/>
            </AlignItems>
            <p>時間割作成、履修の記録を効率的に。</p>
            {isBrowser ?
              <div
                style={{
                  width:'85%',
                }}
              >
                <BrowserMockup
                  src='deizu-screenshot.png'
                  type="mac"
                  windowControlPosition="left"
                  angleX="1deg"
                  angleY="0deg"
                  accentColor="white"
                  urlValue="deizu.vercel.app"
                  // shadow="none"
                  // border="none"
                  color="black"
                  frameStyle={frameStyle}
                />
              </div>:
              <MobileMockup
                size="1"
                src="deizu-mobile-screenshot.png"
                angleX="4deg"
                angleY="0deg"
                border="none"
              />
            }
            {/* <MdArrowDownward/> */}
          </AlignItems>
        </div>
        {/* <hr/> */}
        <div className={'grid-1fr-1fr sidePadding responsiveFullHeight'}>
          <AlignItems style={{justifyContent: 'center'}}>
            <div>
              <h2>より早く。効率的に。</h2>
              <h1>v2.0.0で激的な変化。</h1>
              <p>
                テンプレートの作成で時間をかけてしまい、大事だった「時間割」を作れなかった日々はもう終わり。v2.0.0ではDeizuを根本的に作り直しました。これによって様々な機能の搭載が可能となり、ユーザー様に最適なUXをお届け。
              </p>
            </div>
          </AlignItems>
          <AlignItems style={{justifyContent: 'center'}}>
            <Container style={{transform: 'perspective(200px) rotateX(5deg) rotateY(-2deg)'}}>
              <h2>v2.0.0</h2>
              <h4>デザインと技術面での進歩</h4>
              <ul>
                <li>APIコールの削減</li>
                <li>見やすさを重視し見直されたテーマ</li>
                <li>データシートによる効率的な時間割入力</li>
                <li>時間割表のリスト表示</li>
              </ul>
              <p>詳しい情報については<Link href='/updates'>こちらから</Link></p>
            </Container>
          </AlignItems>
        </div>

        <div className={'grid-1fr-1fr sidePadding responsiveFullHeight'}>
          <AlignItems>
            <div>
              <BlockList>シンプルでわかりやすいUI</BlockList>
              <BlockList>Googleでログイン</BlockList>
              <BlockList>Web上で使用</BlockList>
              <BlockList>科目のセルの色、リンク、概要欄可</BlockList>
              <BlockList>時間割の時間を指定</BlockList>
              <BlockList>何枚もの時間割表を作成・保存可</BlockList>
              <BlockList>リンクを通した時間割表の共有</BlockList>
              <BlockList>GitHubにてオープンソース</BlockList>
            </div>
          </AlignItems>
          <AlignItems>
            <div>
              <h1>シンプルが一番</h1>
              <strong>シンプルでミニマルなUIのおかげで使いやすい時間割表作成サイトが出来上がりました。</strong>
              <p>
                このソフトは時間割表の作りづらさを改善しようと考えられ開発されたソフトです。シンプルなデザインと共に紙で作成するマニュアルなプロセスやスプレッドシートやExcelを使用する際にテンプレートを作成する作業を全て排除します！
              </p>
            </div>
          </AlignItems>
        </div>
        <div className={'grid-1fr-1fr sidePadding responsiveFullHeight'}>
          <AlignItems>
            <div>
              <h1>あなたにあった場所・場合で</h1>
              <strong>異なるデバイスでも同じデータを共有。</strong>
              <p>
                場所と機種問わずデータは全てユーザー様のアカウントと結び付けられ保存されています。Webで作成した時間割をスマホのブラウザーから見れる便利さ。シンプルでかつ説明書すらいらないユーザー重視のプラットフォームを体験してませんか？
              </p>
            </div>
          </AlignItems>
          <AlignItems>
            <div>
              <Container style={{marginBottom:'1.5em'}}>
                <h2>Web &rarr;</h2>
                <p>Next.Js等のモダンなウェブテクノロジーで構成された時間割作成アプリケーション。バックエンドではFirebaseを使用し、充実したユーザーエクスピリエンスとデザインを兼ね備えた唯一無二な時間割表作成プラットフォームです。</p>
                <Button
                  onClick={() =>router.push('/app')}
                  icon={<MdOutlineOpenInBrowser/>}
                >
                  Webアプリを開く
                </Button>
              </Container>
            </div>
          </AlignItems>
        </div>
      <Footer />
    </div >
  )
}
