import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Button from '../lib/component/Button';
import AlignItems from '../lib/style/AlignItems';
import { MdPerson, MdDescription } from 'react-icons/md';
import Container from '../lib/component/Container';
import Banner from '../lib/component/Banner';

export default function App() {
    const router = useRouter()

    // const signInWithGoogle = () => {
    //     const provider = new firebase.auth.GoogleAuthProvider();
    //     auth.signInWithPopup(provider);
    // }
    return (
        <AlignItems
            style={{
                height: '100vh',
                justifyContent: 'center'
            }}
        >
            <Container>
                {/* <Banner type="announce">
                    <ul>
                        <li>2021年12月2日よりDEIZUのv1.0.0が一般公開されました（過去のバージョン情報はGitHubから見れます）</li>
                        <li>Zennにて開発に関する記事が投稿されました。</li>
                    </ul>
                </Banner> */}
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
                        // onClick={signInWithGoogle}
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