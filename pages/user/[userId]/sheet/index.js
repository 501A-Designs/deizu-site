import React,{useState} from 'react'
import Button from '../../../../lib/component/Button'
import IconButton from '../../../../lib/component/IconButton'
import { MdArrowBack,MdAddCircle } from "react-icons/md";


import Container from '../../../../lib/component/Container'
import Input from '../../../../lib/component/Input'
import AlignItems from '../../../../lib/style/AlignItems'
import Stack from '../../../../lib/style/Stack'

import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from '../../../../src/service/firebase'
import { doc, setDoc, serverTimestamp} from "firebase/firestore";
import StaticScene from '../../../../lib/style/StaticScene'
import { NextSeo } from 'next-seo';

export default function Index() {
    const router = useRouter();
    const [sheetName, setSheetName] = useState('');
    const [sheetBackgroundImageUrl, setSheetBackgroundImageUrl] = useState('');
    const [sheetBannerImageUrl, setSheetBannerImageUrl] = useState('');
    const [user] = useAuthState(auth);

    const [loading, setLoading] = useState(false)

    const createScheduleSheet = async (e) =>{
        e.preventDefault();
        setLoading(true);
        const docRef = doc(db, `users/${user.uid}`);
        await setDoc(docRef,
            {
                sheets:{
                    [sheetName]: {
                        date: serverTimestamp(),
                        sharing: false,
                        backgroundImageUrl: sheetBackgroundImageUrl,
                        bannerImageUrl: sheetBannerImageUrl,
                    }
                },
            }, { merge: true }
        );
        router.push(`/user/${user.uid}/sheet/${sheetName}`)
    }

    return (
        <>
            <NextSeo
                title={`新規作成`}
                description={`新しい時間割表を作成`}
            />
            {user ?
                <AlignItems
                    style={{
                        justifyContent: 'center',
                        height: '100vh'
                    }}
                >
                    <Container style={{maxWidth:'600px'}}>
                        <AlignItems gap={'1em'}>
                            <IconButton icon={<MdArrowBack/>} onClick={() =>router.push(`/user/${user.uid}/`)}>戻る</IconButton>
                            <h1 style={{margin: 0,padding:0}}>新規作成</h1>
                        </AlignItems>
                        <h3>新しい時間割を作成しよう</h3>
                        <p>
                            新しい時間割表のタイトルは一度指定すると変更することはできないのでご了承ください。なお、今まで作った時間割と重複しないようなタイトルにしてください。時間割表のタイトルを入力すると、作成ボタンが表示されます。
                        </p>
                        {!loading ?
                            <Stack>
                                <Input
                                    value={sheetName}
                                    onChange={(e) => setSheetName(e.target.value)}
                                    placeholder={'時間割タイトル　※必須'}
                                />
                                <Input
                                    value={sheetBannerImageUrl}
                                    onChange={(e) =>setSheetBannerImageUrl(e.target.value)}
                                    placeholder={'バナー画像URL'}
                                />
                                <Input
                                    value={sheetBackgroundImageUrl}
                                    onChange={(e) =>setSheetBackgroundImageUrl(e.target.value)}
                                    placeholder={'背景画像URL'}
                                />
                                {sheetName &&
                                    <Button
                                        icon={<MdAddCircle/>}
                                        width={'full'}
                                        onClick={(e)=> createScheduleSheet(e)}
                                    >
                                        新規作成
                                    </Button>
                                }
                            </Stack>:
                            <h3>作成中・・・</h3>
                        }
                    </Container>
                </AlignItems>:<StaticScene type="notLoggedIn"/>
            }
        </>
    )
}
