import Head from 'next/head'
import Image from 'next/image'
import { NextSeo } from 'next-seo';

import Button from '../lib/button/Button'
import { BlurHeader } from '../lib/component/BlurHeader'
import Container from '../lib/component/Container'

import AlignItems from '../lib/style/AlignItems'

import appIcon from '../public/deizuAppIconUpdated.png'
import { useRouter } from 'next/router'

import { FiArrowRightCircle } from 'react-icons/fi';
import Stack from '../lib/style/Stack';
import { styled } from '../stitches.config';
import MockUp from '../lib/pages/landing/MockUp';
import BodyMargin from '../lib/style/BodyMargin';
import LinkTag from '../lib/component/LinkTag';


const BlockListStyled = styled('li',{
  borderRadius: '$2',
  backgroundColor: '$gray3',
  border:'1px solid $gray4',
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
  const router = useRouter();

  let featureList = [
    "シンプルでわかりやすいUI",
    "Googleでログイン",
    "Web上で使用",
    "科目のセルの色、リンク、概要欄可",
    "時間割の時間を指定",
    "何枚もの時間割表を作成・保存可",
    "リンクを通した時間割表の共有",
    "GitHubにてオープンソース",
  ]

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
      <BlurHeader />
      <AlignItems
        flexDirection={'column'}
        justifyContent={'center'}
      >
        <AlignItems
          marginTop={'small'}
          gap={'medium'}
        >
          <Image
            src={appIcon}
            width={40}
            height={40}
            alt={'Application Icon'}
          />
          <h1 style={{fontWeight:'900'}}>Deizu</h1>
        </AlignItems>
        <p>時間割作成、履修の記録を効率的に。</p>
        <MockUp/>
        <AlignItems
          marginTop={'medium'}
          gap={'medium'}
        >
          <Button
            styleType={'fill'}
            onClick={() =>router.push('/app')}
            icon={<FiArrowRightCircle/>}
          >
            今すぐ始める
          </Button>
        </AlignItems>
      </AlignItems>
      {/* <hr/> */}
      <DuoGridStyled>
        <AlignItems style={{justifyContent: 'center'}}>
          <Container styleType={'transparent'}>
            <h2>ピュアで。端的に。</h2>
            <h1>ミニマルかつ機能的に。</h1>
            <p>
              テンプレートの作成で時間をかけてしまい、大事だった「時間割」を作れなかった日々はもう終わり。Deizuはシンプルな時間割表作成に特化したアプリです。ユーザー様に最適なUXをお届けするほか、学生限らず、誰もが使用できる汎用性のあるソフトを目指しております。
            </p>
          </Container>
        </AlignItems>
        <AlignItems justifyContent={'center'}>
          <Container
            xDegree={'5deg'}
            yDegree={'-2deg'}
          >
            <h2>v3.0.0</h2>
            {/* <h4>ミニマル</h4> */}
            <ul>
              <li>APIコールの削減</li>
              <li>モバイルに適したレイアウト</li>
              <li>データシートのセルの消去・編集</li>
              <li>配色を2種類にまで削減</li>
            </ul>
            <p>詳しい情報については<LinkTag href='/updates'>こちらから</LinkTag></p>
          </Container>
        </AlignItems>
      </DuoGridStyled>

      <DuoGridStyled>            
        <AlignItems>
          <Container styleType={'transparent'}>
            <Stack gap={'$2'}>
              {featureList.map(listContent => {
                return <BlockListStyled key={listContent}>{listContent}</BlockListStyled>
              })}
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
              styleType={'fill'}
              onClick={() =>router.push('/app')}
              icon={<FiArrowRightCircle/>}
            >
              Webアプリを開く
            </Button>
          </Container>
        </AlignItems>
      </DuoGridStyled>
    </BodyMargin>
  )
}
