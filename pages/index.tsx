import Head from 'next/head'
import Image from 'next/image'
import { NextSeo } from 'next-seo';

import Button from '../lib/button/Button'
import NavFooter from '../lib/component/NavFooter'
import Container from '../lib/component/Container'

import AlignItems from '../lib/style/AlignItems'

import appIcon from '../public/deizuAppIconUpdated.png'
import { useRouter } from 'next/router'
import Link from 'next/link'

import { FiArrowUpCircle } from 'react-icons/fi';
import Stack from '../lib/style/Stack';
import { styled } from '../stitches.config';
import MockUp from '../lib/pages/landing/MockUp';
import BodyMargin from '../lib/style/BodyMargin';


const BlockListStyled = styled('li',{
  borderRadius: '$2',
  backgroundColor: '$gray2',
  padding: '0.5em 1em',
  fontSize: '1rem',
  width: 'fit-content'
})

const DuoGridStyled = styled('div',{
  minHeight:'100vh',
  display:'grid',
  '@bp1':{
    gridTemplateColumns:'1fr'
  },
  '@bp2_':{
    gridTemplateColumns:'1fr 1fr'
  }
})

export default function Home() {
  let router = useRouter();


  return (
    <BodyMargin>
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
      <DuoGridStyled>
        <AlignItems style={{justifyContent: 'center'}}>
          <Container styleType={'transparent'}>
            <h2>より早く。効率的に。</h2>
            <h1>v2.0.0で激的な変化。</h1>
            <p>
              テンプレートの作成で時間をかけてしまい、大事だった「時間割」を作れなかった日々はもう終わり。v2.0.0ではDeizuを根本的に作り直しました。これによって様々な機能の搭載が可能となり、ユーザー様に最適なUXをお届け。
            </p>
          </Container>
        </AlignItems>
        <AlignItems justifyContent={'center'}>
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
      </DuoGridStyled>

      <DuoGridStyled>            
        <AlignItems>
          <Container styleType={'transparent'}>
            <Stack gap={'$2'}>
              <BlockListStyled>シンプルでわかりやすいUI</BlockListStyled>
              <BlockListStyled>Googleでログイン</BlockListStyled>
              <BlockListStyled>Web上で使用</BlockListStyled>
              <BlockListStyled>科目のセルの色、リンク、概要欄可</BlockListStyled>
              <BlockListStyled>時間割の時間を指定</BlockListStyled>
              <BlockListStyled>何枚もの時間割表を作成・保存可</BlockListStyled>
              <BlockListStyled>リンクを通した時間割表の共有</BlockListStyled>
              <BlockListStyled>GitHubにてオープンソース</BlockListStyled>
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
      </DuoGridStyled>
      <DuoGridStyled>
        <AlignItems>
          <Container styleType={'transparent'}>
            <h1>どんな場所・場合でも</h1>
            <strong>異なるデバイスでも同じデータを共有。</strong>
            <p>
              場所と機種問わずデータは全てユーザー様のアカウントと結び付けられ保存されています。Webで作成した時間割をスマホのブラウザーから見れる便利さ。シンプルでかつ説明書すらいらないユーザー重視のプラットフォームを体験してませんか？
            </p>
          </Container>
        </AlignItems>
        <AlignItems>
          <Container
            styleType={'gradient'}
            marginBottom={'small'}
          >
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
      </DuoGridStyled>
      <NavFooter />
    </BodyMargin>
  )
}
