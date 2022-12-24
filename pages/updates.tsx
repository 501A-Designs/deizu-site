import React from 'react'

// Button Components
import Button from '../lib/button/Button'

import Container from '../lib/component/Container'
import AlignItems from '../lib/style/AlignItems'
import BodyMargin from '../lib/style/BodyMargin'

import { FiCode, FiFile, FiUser } from 'react-icons/fi'
import Heading from '../lib/component/Heading'
import Stack from '../lib/style/Stack'
import { BlurHeader } from '../lib/component/BlurHeader'

export default function Updates() {
  return (
    <>
      <BlurHeader/>
      <BodyMargin>
        <Stack>
          <Heading type={'h1'}>Deizuの開発状況</Heading>
          <p>
            Deizuは私（501A）が手掛けて作成した時間割表作成プラットフォームです。
            <br/>
            ユーザー様のデータ以外、アプリケーションとして裏で動作している状況は誰にでも閲覧できるようにしています。また、Deizuに関する新情報・リリースノートは全て一般公開されている以下のNotionのリンクで見ることができます。
          </p>
          <AlignItems marginBottom={'extraLarge'}>
            <Button
              icon={<FiFile/>}
              size={'small'}
              onClick={() => { window.open('https://www.notion.so/501a/Deizu-Updates-81616d0f98ba4903a14ceef9d0e48a29', "_blank") }}
            >
              Notionのページ              
            </Button>
            <Button
              icon={<FiUser/>}
              size={'small'}
              onClick={() => { window.open('https://501a.netlify.app', "_blank") }}
            >
              開発者のサイト
            </Button>
          </AlignItems>
          <Container styleType={'filled'}>
            <Container
              index={'inner'}
              marginBottom={'1em'}
            >
              <p>
                Deizuのテックスタックは非常にシンプルなものとなっております。また、ソースコードは全てGitHubに有り、以下のリンクからアクセスが可能です。是非良いアイデアなどあればフォークしてプルリクエストを出してみてください！
              </p>
            </Container>
            <AlignItems justifyContent={'spaceBetween'}>
              <Heading type={'h3'}>Tech Stack</Heading>
              <Button
                icon={<FiCode/>}
                size={'small'}
                styleType={'outline'}
                onClick={() => { window.open('https://github.com/501A-Designs/deizu-site', "_blank") }}
              >
                GitHubを見る
              </Button>
            </AlignItems>
            <Heading type={'h4'}>フロントエンド</Heading>
            <ul>
              <li>Next.JS</li>
              <li>Stitches.JS</li>
              <li>Radix UI</li>
              <li>Radix Colors</li>
            </ul>
            <Heading type={'h4'}>バックエンド</Heading>
            <p>
              DeizuはFirebaseをバックエンドで使用しております。
            </p>
            <ul>
              <li>
                Firebase：ユーザーデータとログインの管理システム（BAAS）
              </li>
              <ul>
                <li>Firestore (Google Cloud Platform)：ユーザーデータのデータベース</li>
                <li>Authentication：ログインシステム</li>
              </ul>
            </ul>
          </Container>
        </Stack>
      </BodyMargin>
    </>
  )
}
