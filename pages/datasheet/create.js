import React,{useState} from 'react'
import Button from '../../lib/component/Button'
import IconButton from '../../lib/component/IconButton'

import { MdArrowBack,MdAddCircle } from "react-icons/md";

import Container from '../../lib/component/Container'
import Input from '../../lib/component/Input'
import AlignItems from '../../lib/style/AlignItems'
import Stack from '../../lib/style/Stack'
import StaticScene from '../../lib/style/StaticScene'

import { collection, addDoc } from "firebase/firestore"; 

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from "../../src/service/firebase"

import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo';

export default function Create() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);
    const [sheetLoading, setSheetLoading] = useState(false)

    const [dataSheetName, setDataSheetName] = useState('')
    const [dataSheetImageUrl, setDataSheetImageUrl] = useState('')
    const [dataSheetDescription, setDataSheetDescription] = useState('')

    const createDataSheet = async (e) =>{
        e.preventDefault();
        setSheetLoading(true);
        const docRef = await addDoc(collection(db, "sheets"), {
            dataSheet:[],
            dataSheetName:dataSheetName,
            dataSheetImageUrl:dataSheetImageUrl,
            dataSheetDescription:dataSheetDescription,
            ownerId:user.uid
        });
        router.push(`/datasheet/${docRef.id}/`)
    }

    return (
        <>
            <NextSeo
                title="新規作成"
                description="データシートを新しく作成"
            />
            {user ?
                <AlignItems style={{justifyContent: 'center', height: '100vh'}}>
                    <Container style={{maxWidth:'600px'}}>
                        <AlignItems gap={'1em'}>
                            <IconButton icon={<MdArrowBack/>} onClick={() =>router.push('/datasheet')}>戻る</IconButton>
                            <h1 style={{margin: 0,padding:0}}>新規作成</h1>
                        </AlignItems>
                        <h3>新しいデータシートを作成しよう</h3>
                        <p>
                            新しいデータシートのタイトルは一度指定すると変更することはできないのでご了承ください。また、何も入力しない場合画像が自動生成されるのでご了承下さい。
                        </p>
                        {!sheetLoading ? 
                            <Stack>
                                <Input
                                    value={dataSheetName}
                                    onChange={(e)=>setDataSheetName(e.target.value)}
                                    placeholder={'データシートタイトル　※必須'}
                                />
                                <Input
                                    value={dataSheetDescription}
                                    onChange={(e)=>setDataSheetDescription(e.target.value)}
                                    placeholder={'データシートの概要・説明'}
                                />
                                <Input
                                    value={dataSheetImageUrl}
                                    onChange={(e)=>setDataSheetImageUrl(e.target.value)}
                                    placeholder={'画像URL'}
                                />
                                {dataSheetName && 
                                    <Button
                                        icon={<MdAddCircle/>}
                                        width={'full'}
                                        onClick={(e)=> createDataSheet(e)}
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
