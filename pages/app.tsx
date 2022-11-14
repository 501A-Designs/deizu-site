import React from 'react'
import { useRouter } from 'next/router'

import Button from '../lib/button/Button';
import AlignItems from '../lib/style/AlignItems';
import Container from '../lib/component/Container';

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../src/service/firebase"
import { NextSeo } from 'next-seo';
import { FiFileText, FiLogIn } from 'react-icons/fi';
import BodyCenter from '../lib/style/BodyCenter';
import LinkTag from '../lib/component/LinkTag';
import Heading from '../lib/component/Heading';
import { styled } from '../stitches.config';

const StackWidth = styled('div',{
  display:'grid',
  gap:'$1',
  width:'250px'
})

export default function App() {
  const router = useRouter()
  const [user] = useAuthState(auth);

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
    });
  }
  user && router.push(`/user/${user.uid}`);

  return (
    <BodyCenter>
      <NextSeo
        title="新規登録・ログイン"
        description="Deizuのアカウントにログイン・新規登録"
      />
      <AlignItems justifyContent={'center'}>
        <Heading type={'h1'}>時間割表をすばやく作成</Heading>
      </AlignItems>
      <Container
        styleType={'filled'}
        index={'inner'}
        marginTop={'1em'}
      >
        <p>
          Deizuのv2.0.3以来時間割表を開けないエラーが出回っています。また、今後バグ等の告知は<LinkTag href="https://forms.gle/XrqF7XsibpWtoK6bA">こちら</LinkTag>のグーグルフォームからご報告ください。
        </p>
      </Container>
      <p>
        時間割表の作りづらさを改善しようと考えられ開発されたソフトです。シンプルなデザインを活用し誰もが簡単にそして満足できるような時間割作成に望めます！なお、登録される前は必ず<LinkTag href="/about">プライバシーポリシー</LinkTag>を読むようお願い致します。
      </p>
      <AlignItems
        flexDirection={'column'}
        justifyContent={'center'}
        marginTop={'medium'}
      >
        <StackWidth>
          <Button
            icon={<FiLogIn/>}
            onClick={signInWithGoogle}
          >
            Googleでログイン
          </Button>
          <Button
            icon={<FiFileText/>}
            onClick={() => router.push('/')}
          >
            サイトについて
          </Button>
        </StackWidth>
      </AlignItems>
      <AlignItems
        flexDirection={'column'}
        justifyContent={'center'}
        marginTop={'medium'}
      >
        <Heading type={'h4'}>v{require('../package.json').version}</Heading>
      </AlignItems>
    </BodyCenter>
  )
}