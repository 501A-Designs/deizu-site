import Head from 'next/head'
import Image from 'next/image'
import { NextSeo } from 'next-seo';

import Button from '../lib/button/Button'
import Footer from '../lib/component/Footer'
import Container from '../lib/component/Container'

import AlignItems from '../lib/style/AlignItems'

import appIcon from '../public/deizuAppIconUpdated.png'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { FiArrowUpCircle } from 'react-icons/fi';
import Stack from '../lib/style/Stack';
import { styled } from '../stitches.config';
import MockUp from '../lib/pages/landing/MockUp';

export default function Home() {
  let router = useRouter();

  const BlockList = styled('li',{
    borderRadius: '$2',
    backgroundColor: '$system2',
    padding: '0.5em 1em',
    fontSize: '1rem',
    width: 'fit-content'
  })

  return (
    <div className={'container'}>
      <NextSeo
        title="Deizu"
        description="時間割表を作成するアプリ"
        openGraph={{
          url: '/deizu-og-image.png',
          title: 'Deizu',
          description: '時間割表を作成するアプリ',
          images: [
            {
              url: '/deizu-og-image.png',
              width: 800,
              height: 600,
              alt: 'Deizu OG Image',
              type: 'image/png',
            },
            {
              url: '/deizu-og-image.png',
              width: 900,
              height: 800,
              alt: 'Deizu OG Image',
              type: 'image/png',
            },
          ],
          // siteName: 'Deizu',
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <div
        className={'sidePadding'}
        style={{
          display:'flex',
          justifyContent: 'center'
        }}
      >
        <AlignItems
          flexDirection={'column'}
          justifyContent={'center'}
        >
          <AlignItems
            marginTop={'extraLarge'}
            gap={'medium'}
          >
            <Image
              src={appIcon}
              width={50}
              height={50}
              alt={'Application Icon'}
            />
            <h1 style={{fontWeight:'900'}}>Deizu</h1>
          </AlignItems>
          <p>時間割作成、履修の記録を効率的に。</p>
          <MockUp/>
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
          <Container
            xDegree={'5deg'}
            yDegree={'-2deg'}
          >
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
          <Container styleType={'transparent'}>
            <Stack gap={'$2'}>
              <BlockList>シンプルでわかりやすいUI</BlockList>
              <BlockList>Googleでログイン</BlockList>
              <BlockList>Web上で使用</BlockList>
              <BlockList>科目のセルの色、リンク、概要欄可</BlockList>
              <BlockList>時間割の時間を指定</BlockList>
              <BlockList>何枚もの時間割表を作成・保存可</BlockList>
              <BlockList>リンクを通した時間割表の共有</BlockList>
              <BlockList>GitHubにてオープンソース</BlockList>
            </Stack>
          </Container>
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
          <Container marginBottom={'small'}>
            <h2>Web &rarr;</h2>
            <p>Next.Js等のモダンなウェブテクノロジーで構成された時間割作成アプリケーション。バックエンドではFirebaseを使用し、充実したユーザーエクスピリエンスとデザインを兼ね備えた唯一無二な時間割表作成プラットフォームです。</p>
            <Button
              onClick={() =>router.push('/app')}
              icon={<FiArrowUpCircle/>}
            >
              Webアプリを開く
            </Button>
          </Container>
        </AlignItems>
      </div>
      <Footer />
    </div >
  )
}
