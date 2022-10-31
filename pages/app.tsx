import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

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
      <Container
        styleType={'filled'}
        index={'inner'}
        marginBottom={'1em'}
      >
        <p>
          Deizuのv2.0.3以来時間割表を開けないエラーが出回っています。また、今後バグ等の告知は<Link href="https://forms.gle/XrqF7XsibpWtoK6bA"><a>こちら</a></Link>のグーグルフォームからご報告ください。
        </p>
      </Container>
      <h1>時間割表をすばやく作成</h1>
      <strong>Deizuへようこそ！</strong>
      <p>
        時間割表の作りづらさを改善しようと考えられ開発されたソフトです。シンプルなデザインを活用し誰もが簡単にそして満足できるような時間割作成に望めます！なお、登録される前は必ず<Link href="/about">プライバシーポリシー</Link>を読むようお願い致します。
      </p>
      <div style={{
        display: 'grid',
        gridTemplateColumns:'1fr',
        gap: '0.5em',
        width: '250px',
        margin: 'auto'
      }}>
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
      </div>
      <AlignItems
        flexDirection={'column'}
        justifyContent={'center'}
        marginTop={'large'}
      >
        {/* <h3>v{require('../package.json').version}</h3> */}
        <Link
          href="https://501a.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          <a>
            Design & Developed by 501A
          </a>
        </Link>
      </AlignItems>
    </BodyCenter>
  )
}