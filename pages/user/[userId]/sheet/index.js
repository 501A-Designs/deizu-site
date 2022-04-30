import React,{useState} from 'react'
import Button from '../../../../lib/component/Button'
import Container from '../../../../lib/component/Container'
import Input from '../../../../lib/component/Input'
import AlignItems from '../../../../lib/style/AlignItems'
import Stack from '../../../../lib/style/Stack'

import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from '../../../../src/service/firebase'
import { doc, setDoc,getDoc, serverTimestamp} from "firebase/firestore";

import { scheduleCellId } from '../../../../lib/data/scheduleCellId'
import StaticScene from '../../../../lib/style/StaticScene'

export default function index() {
    const router = useRouter();
    const [sheetName, setSheetName] = useState('');
    const [user] = useAuthState(auth);

    const convertArrayToObject = (array) => {
        const initialValue = {};
        return array.reduce((obj, cellId) => {
            return {
            ...obj,
            [cellId]: {
                [cellId]: '',
                [cellId + 'Link']: '',
                [cellId + 'Dscrp']: '',
                [cellId + 'Color']: ''
            }
            };
        }, initialValue);
    }

    const [sheetData, setSheetData] = useState()
    const createScheduleSheet = async (e) =>{
        e.preventDefault();
        const docRef = doc(db, "users", user.uid);
        await getDoc(docRef).then((doc) => {
            if(doc.data().sheets[sheetName]){
                alert(`${sheetName}は既に作成されております。別の名前を試そう！`)
            }else{
                console.log(sheetName)
                setDoc(docRef,
                    {
                        sheets:{
                            [sheetName]: {
                                cells: convertArrayToObject(scheduleCellId),
                                date: serverTimestamp(),
                                sharing:false
                            }
                        },
                    }, { merge: true }
                );
                router.push(`/user/${user.uid}/sheet/${sheetName}`)
            };
        })
    }

    const handleSheetNameInputChange =(e) =>{
        setSheetName(e.target.value)
    }

    return (
        <>
            {user ?
                <AlignItems style={{justifyContent: 'center', height: '100vh'}}>
                    <Container>
                        <h1>新規作成</h1>
                        <h3>新しい時間割を作成しよう</h3>
                        <p>
                            新しい時間割表のタイトルは一度指定すると変更することはできないのでご了承ください。
                        </p>
                        <Stack>
                            <Input
                                value={sheetName}
                                onChange={handleSheetNameInputChange}
                                placeholder={'時間割タイトル'}
                            />
                            {/* <Input
                                value={sheetWallpaper}
                                onChange={(e)=>e.target.value}
                                placeholder={'壁紙（画像URL）※任意'}
                            /> */}
                            <Button
                                width={'full'}
                                onClick={(e)=> createScheduleSheet(e)}
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
