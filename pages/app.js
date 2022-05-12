import React,{useState} from 'react'
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
    const [user, loading, error] = useAuthState(auth);

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
    if (user) {
        router.push(`/user/${user.uid}`)
    }

    return (
        <AlignItems
            style={{
                height: '100vh',
                justifyContent: 'center'
            }}
        >
            <NextSeo
                title="新規登録・ログイン"
                description="DEIZUのアカウントにログイン・新規登録"
            />
            <Container style={{maxWidth:'600px'}}>
                <Banner type="announce">
                    <ul>
                        <li>アプリケーションのサイトURLが変わりました（deizu-site.web.appはもう使用することはできません）</li>
                        <li>2022年5月14日よりDEIZUのv2.0.0が一般公開されました（過去のバージョン情報はGitHubから見れます）</li>
                        <li>Zennにて開発に関する記事が再び投稿されました。</li>
                    </ul>
                </Banner>
                <h1>時間割表をすばやく作成</h1>
                <strong>DEIZUへようこそ！</strong>
                <p>
                    時間割表の作りづらさを改善しようと考えられ開発されたソフトです。シンプルなデザインを活用し誰もが簡単にそして満足できるような時間割作成に望めます！
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