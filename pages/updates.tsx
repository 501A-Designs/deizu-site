import React from 'react'

// Button Components
import Button from '../lib/button/Button'

import Container from '../lib/component/Container'
import AlignItems from '../lib/style/AlignItems'
import BodyMargin from '../lib/style/BodyMargin'

import { useRouter } from 'next/router'
import { FiCode, FiHome, FiUser } from 'react-icons/fi'
import Heading from '../lib/component/Heading'
import Stack from '../lib/style/Stack'
import LinkTag from '../lib/component/LinkTag'
import Link from 'next/link'

export default function Updates() {
  return (
    <BodyMargin>
      <Stack>
        <Heading type={'h1'}>Deizuの開発状況</Heading>
        <p>
          Deizuは私（501A）が手掛けて作成した時間割表作成プラットフォームです。
          <br/>
          裏で動作している状況はユーザーを含め誰にでも閲覧できるようにしています。このようにオープンソースにすることでセキュリティーに関するリスクや機能の追加状況を目で確認することができます。ソースコードは全てGitHubに有り、以下のリンクからアクセスが可能です：
        </p>
        <AlignItems marginBottom={'extraLarge'}>
          <Button
            icon={<FiCode/>}
            onClick={() => { window.open('https://github.com/501A-Designs/deizu-site', "_blank") }}
          >
            GitHubを見る
          </Button>
          <Button
            icon={<FiUser/>}
            onClick={() => { window.open('https://501a.netlify.app', "_blank") }}
          >
            開発者のサイト
          </Button>
        </AlignItems>
        <Container styleType={'filled'}>
          <Heading type={'h3'}>テクノロジースタック</Heading>
          <Heading type={'h3'}>フロントエンドフレームワーク</Heading>
          <ul>
            <li>Next JS</li>
          </ul>
          <Heading type={'h3'}>バックエンド</Heading>
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
  )
}
