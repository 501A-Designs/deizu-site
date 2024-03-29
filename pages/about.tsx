import Head from 'next/head'
import Container from '../lib/component/Container';
import Heading from '../lib/component/Heading';
import LinkTag from '../lib/component/LinkTag';


import AlignItems from '../lib/style/AlignItems';
import BodyMargin from '../lib/style/BodyMargin';
import { BlurHeader } from '../lib/component/BlurHeader';

export default function About() {
  return (
    <>
      <Head>
        <title>Deizuについて</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BlurHeader/>
      <BodyMargin>
        <AlignItems
          flexDirection={'column'}
          justifyContent={'center'}
          marginBottom={'extraLarge'}
        >
          <Heading type={'h1'}>Deizuについて</Heading>
          <Heading type={'h4'}>プライバシーポリシー</Heading>
        </AlignItems>
        <Container
          index="inner"
          styleType="filled"
        >
          <p>
            プライバシーポリシーは誰が見ても理解出来るほどわかりやすくする必要があると考えています。多くの場合長く回りくどく書かれているものを極力わかりやすくシンプルに書きました。本サイトを使用する際はよく読んで、同意した上で使用してください。
          </p>
        </Container>
        <p>
          当サイトの名前は2021年7月17日をもちまして「Schedule Creator」から「Deizu」と改名しました。Deizuの主なサービスである時間割表の作成をご利用するにあたり、以下のルールを定めまさせていただきます：
        </p>
        <ol>
          <li>ユーザー情報の保存の許可</li>
          <li>第三者サービスの使用の許可</li>
        </ol>
        <p>上記で定めたルールに関する詳しい情報：</p>
        <h3>1.ユーザー情報の保存の許可</h3>
        <h4>使用される上で保存される情報</h4>
        <p>基本的にはDeizu本サイトに入力する情報のみ保存されます</p>
        <ul>
          <li>GoogleアカウントのEmail</li>
          <li>アカウント作成日</li>
          <li>ログインした最終日</li>
          <li>時間割表のタイトル</li>
          <li>時間割表のを最後編集した日にちと時間</li>
          <li>時間割表等のメタデータ：入力した科目・URL・概要・色等</li>
        </ul>
        <h3>2.第三者サービスの使用の許可</h3>
        <h4>Deizuで利用している第三者サービス</h4>
        <p>Deizuは以下の第三者サービスを利用します。</p>
        <h5>Google Analytics</h5>
        <p>Deizuを使用する際には匿名で場所・閲覧時間・閲覧されたデバイスなどが記録されます。</p>
        <h5>Firebase (Google Cloud Platform)</h5>
        <p>当サイトは、Firebase (Google Cloud Platform) を通し、ユーザーのアカウント・時間割表のデータを管理させていただいています。ログインし使用する際はFirebaseにデータが保存されます。</p>
        <p>
          ※Google Inc.の<LinkTag href="https://policies.google.com/?hl=ja">プライバシーポリシー</LinkTag>
        </p>
        <h3>これらの情報収集の目的について</h3>
        <p>
          本ポリシーにおける変更はユーザーに通知する場合はございませんのでご了承下さい：
        </p>
        <ol>
          <li>Deizuのユーザー層を理解するため：ユーザーによってサービスにおける改善また新たな機能の追加を行う場合がございます</li>
          <li>Deizuの新機能やアップデートに関する連絡</li>
        </ol>
      </BodyMargin>
    </>
  )
}
