import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from '../lib/component/Button';
import AlignItems from '../lib/style/AlignItems';
import { MdPerson, MdDescription } from 'react-icons/md';
import Container from '../lib/component/Container';
import Banner from '../lib/component/Banner';

// Firebase
import { useAuthState } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../src/service/firebase"
import { NextSeo } from 'next-seo';

export default function App() {
    const router = useRouter()
    const [user] = useAuthState(auth);

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            console.log(token);
            // console.log(result.user);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }
    user && router.push(`/user/${user.uid}`);

    return (
        <AlignItems style={{justifyContent: 'center'}}>
            <NextSeo
                title="新規登録・ログイン"
                description="Deizuのアカウントにログイン・新規登録"
            />
            <Container style={{marginTop:'2em', marginBottom:'2em', maxWidth:'600px'}}>
                <Banner type="caution">
                    Deizuのv2.0.1以来時間割表を開けないエラーが出回っています。また、今後バグ等の告知は<Link href="https://forms.gle/XrqF7XsibpWtoK6bA"><a>こちら</a></Link>のグーグルフォームからご報告ください。
                </Banner>
                <h1>時間割表をすばやく作成</h1>
                <strong>Deizuへようこそ！</strong>
                <p>
                    時間割表の作りづらさを改善しようと考えられ開発されたソフトです。シンプルなデザインを活用し誰もが簡単にそして満足できるような時間割作成に望めます！なお、登録される前は<Link href="/about">プライバシーポリシー</Link>を読むようお願い致します。
                </p>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns:'1fr',
                    gap: '0.5em',
                    width: '250px',
                    margin: 'auto'
                }}>
                    <Button
                        onClick={signInWithGoogle}
                        width='full'
                        icon={<MdPerson/>}
                    >
                        Googleでログイン
                    </Button>
                    <Button
                        width='full'
                        onClick={() => router.push('/')}
                        icon={<MdDescription/>}
                    >
                        サイトについて
                    </Button>
                </div>
                <AlignItems
                    style={{
                        justifyContent: 'space-between',
                        marginTop: '2em',
                    }}
                >
                    <h3 className="versionBadge">v{require('../package.json').version}</h3>
                    <Link
                        href="https://501a.netlify.app/"
                        target="_blank"
                        rel="noreferrer"
                    >Design & Developed by 501A</Link>
                </AlignItems>
            </Container>
        </AlignItems>
    )
}