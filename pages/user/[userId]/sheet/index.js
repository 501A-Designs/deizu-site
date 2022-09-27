import React,{useState} from 'react'

// Button Components
import Button from '../../../../lib/button/Button'
import IconButton from '../../../../lib/button/IconButton'

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
import { FiArrowLeft, FiArrowRightCircle, FiPlus } from 'react-icons/fi';
import { useAutoAnimate } from '@formkit/auto-animate/react'
// import { MoonLoader } from 'react-spinners'

export default function Index() {
    const router = useRouter();
    const [parent] = useAutoAnimate()
    const [sheetName, setSheetName] = useState('');
    const [sheetBackgroundImageUrl, setSheetBackgroundImageUrl] = useState('');
    const [sheetBannerImageUrl, setSheetBannerImageUrl] = useState('');

    const [section, setSection] = useState(0);
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
                        {!loading &&
                            <AlignItems gap={'1em'}>
                                <IconButton
                                    fill
                                    icon={<FiArrowLeft/>}
                                    onClick={() =>
                                        {section === 0 ?
                                            router.push(`/user/${user.uid}/`):
                                            section === 1 ? setSection(0):setSection(1)
                                        }
                                    }
                                >
                                    戻る
                                </IconButton>
                                <h2 style={{margin: 0,padding:0}}>
                                    {sheetName && section > 0 ? sheetName:'新規作成'}
                                </h2>
                            </AlignItems>
                        }
                        <div ref={parent}>
                            {section === 0 &&
                                <p>
                                    新しい時間割表のタイトルは一度指定すると変更することはできないのでご了承ください。なお、今まで作った時間割と重複しないようなタイトルにしてください。時間割表のタイトルを入力すると、作成ボタンが表示されます。
                                </p>
                            }
                            {section === 1 && 
                                <div>
                                    <p>
                                        時間割表のタイトルがの後ろにバナー画像を表示することができます。なお、指定する際には正規な画像URLを入力する必要がございます：
                                    </p>
                                    <img
                                        alt={'Banner Image'}
                                        style={{
                                            border: '1px solid var(--system0)',
                                            borderRadius: 'var(--borderRadius1)',
                                            marginBottom:'0.5em'
                                        }}
                                        width={'100%'}
                                        height={'100%'}
                                        src={'/banner.png'}
                                    />
                                </div>
                            }
                            {section === 2 && !loading &&
                                <div>
                                    <p>
                                        時間割表の後ろには背景画像を表示することができます。なお、指定する際にはバナー画像と同様、正規な画像URLを入力する必要がございます：
                                    </p>
                                    <img
                                        alt={'Background Image'}
                                        style={{
                                            border: '1px solid var(--system0)',
                                            borderRadius: 'var(--borderRadius1)',
                                            marginBottom:'0.5em'
                                        }}
                                        width={'100%'}
                                        height={'100%'}
                                        src={'/background.png'}
                                    />
                                </div>
                            }
                        </div>

                        <Stack>
                            {section === 0 &&
                            <>
                                <Input
                                    value={sheetName}
                                    onChange={(e) => setSheetName(e.target.value)}
                                    placeholder={'時間割タイトル　※必須'}
                                />
                                {sheetName &&
                                    <Button
                                        icon={<FiArrowRightCircle/>}
                                        width={'full'}
                                        onClick={()=> {
                                            setSection(1)
                                        }}
                                    >
                                        次へ
                                    </Button>
                                }
                            </>
                            }
                            {section === 1 &&
                            <>
                                <Input
                                    value={sheetBannerImageUrl}
                                    onChange={(e) =>setSheetBannerImageUrl(e.target.value)}
                                    placeholder={'バナー画像URL'}
                                />
                                <Button
                                    icon={<FiArrowRightCircle/>}
                                    width={'full'}
                                    onClick={()=> setSection(2)}
                                >
                                    {sheetBannerImageUrl ? '次へ':'スキップ'}
                                </Button>
                            </>
                            }
                            {section === 2 &&
                                <>
                                    {!loading ?
                                        <>                                        
                                            <Input
                                                value={sheetBackgroundImageUrl}
                                                onChange={(e) =>setSheetBackgroundImageUrl(e.target.value)}
                                                placeholder={'背景画像URL'}
                                            />
                                            <Button
                                                icon={<FiPlus/>}
                                                width={'full'}
                                                onClick={(e)=> {
                                                    createScheduleSheet(e)
                                                }}
                                            >
                                                {sheetBannerImageUrl ? '時間割表を作成':'スキップして作成'}
                                            </Button>
                                        </>:
                                        <AlignItems
                                            style={{justifyContent: 'center'}}
                                        >
                                            {/* <MoonLoader
                                                size={40}
                                                color="var(--system3)"
                                                loading={loading}
                                            /> */}
                                            <h3>更新中・・・</h3>
                                        </AlignItems>
                                    }
                                </>
                            }
                        </Stack>
                    </Container>
                </AlignItems>:<StaticScene type="notLoggedIn"/>
            }
        </>
    )
}
