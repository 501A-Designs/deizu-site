import React,{useState} from 'react'
import Button from '../../lib/component/Button'
import IconButton from '../../lib/component/IconButton'

import { MdArrowBack,MdOutlineViewList,MdOutlineViewModule } from "react-icons/md";

import Container from '../../lib/component/Container'
import Input from '../../lib/component/Input'
import AlignItems from '../../lib/style/AlignItems'
import BodyMargin from '../../lib/style/BodyMargin'
import Stack from '../../lib/style/Stack'
import StaticScene from '../../lib/style/StaticScene'

import { collection, addDoc } from "firebase/firestore"; 

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from "../../src/service/firebase"

import { useRouter } from 'next/router'

export default function create() {
    const router = useRouter();
    const [user, loading, error] = useAuthState(auth);

    const [dataSheetName, setDataSheetName] = useState()
    const [dataSheetDescription, setDataSheetDescription] = useState()
    const [dataSheetImageUrl, setDataSheetImageUrl] = useState()

    const createDataSheet = async (e) =>{
        e.preventDefault();
        await addDoc(collection(db, "sheets"), {
            dataSheet:[],
            dataSheetName:dataSheetName,
            dataSheetImageUrl:dataSheetImageUrl ? dataSheetImageUrl :`https://avatars.dicebear.com/api/jdenticon/${dataSheetName}.svg`,
            dataSheetDescription:dataSheetDescription,
            ownerId:user.uid
        });
    }

    return (
        <>
            {user ?
                <AlignItems style={{justifyContent: 'center', height: '100vh'}}>
                    <Container style={{maxWidth:'600px'}}>
                        <AlignItems gap={'1em'}>
                            <IconButton icon={<MdArrowBack/>} onClick={() =>router.push('/datasheet')}>戻る</IconButton>
                            <h1 style={{margin: 0,padding:0}}>新規作成</h1>
                        </AlignItems>
                        <h3>新しいデータシートを作成しよう</h3>
                        <p>
                            新しいデータシートのタイトルは一度指定すると変更することはできないのでご了承ください。
                        </p>
                        <Stack>
                            <Input
                                value={dataSheetName}
                                onChange={(e)=>setDataSheetName(e.target.value)}
                                placeholder={'データシートタイトル'}
                            />
                            <Input
                                value={dataSheetDescription}
                                onChange={(e)=>setDataSheetDescription(e.target.value)}
                                placeholder={'データシートの概要・説明'}
                            />
                            <Input
                                value={dataSheetImageUrl}
                                onChange={(e)=>setDataSheetImageUrl(e.target.value)}
                                placeholder={'画像URL *何も入力しない場合画像が自動生成されます'}
                            />
                            <Button
                                width={'full'}
                                onClick={(e)=> createDataSheet(e)}
                            >
                                新規作成
                            </Button>
                        </Stack>
                    </Container>
                </AlignItems>:<StaticScene type="notLoggedIn"/>
            }
        </>
    )
}
