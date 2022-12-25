import React,{useState,useEffect} from 'react'
import BodyMargin from '../../lib/style/BodyMargin'
import { FiPlus, FiArrowLeft } from "react-icons/fi";
import { NextSeo } from 'next-seo';


import { addDoc, collection, DocumentData, query, where } from "firebase/firestore";

// Button Component
import Button from '../../lib/button/Button';

import AlignItems from '../../lib/style/AlignItems';
import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from "../../src/service/firebase"
import Heading from '../../lib/component/Heading';
import Footer from '../../lib/component/Footer';
import Dialog from '../../lib/component/Dialog';
import CreateNewButton from '../../lib/component/CreateNewButton';
import Container from '../../lib/component/Container';
import Stack from '../../lib/style/Stack';
import DataSheetButton from '../../lib/button/DataSheetButton';
import { styled } from '../../stitches.config';
import { useCollection } from 'react-firebase-hooks/firestore';
import LinkTag from '../../lib/component/LinkTag';
import Input from '../../lib/component/Input';


const DuoGrid = styled('div',{
  display:'grid',
  '@bp1_2':{
    gridTemplateColumns:'1fr',
  },
  '@bp3_':{
    gridTemplateColumns:'1fr 1fr',
  }
})

export default function Index() {
  const router = useRouter()
  const [user] = useAuthState(auth);
  const [dataSheetData] = useCollection<DocumentData>(query(collection(db, "sheets")))


  const [sheetLoading, setSheetLoading] = useState(false)
  const [dataSheetName, setDataSheetName] = useState('')
  // const [dataSheetImageUrl, setDataSheetImageUrl] = useState('')
  const [dataSheetDescription, setDataSheetDescription] = useState('')

  const createDataSheet = async (e:any) =>{
    e.preventDefault();
    setSheetLoading(true);
    const docRef = await addDoc(collection(db, "sheets"), {
      dataSheet:[],
      dataSheetName:dataSheetName,
      dataSheetDescription:dataSheetDescription,
      // dataSheetImageUrl:dataSheetImageUrl,
      ownerId:user?.uid
    });
    router.push(`/datasheet/${docRef.id}/`)
  }

  return (
    <>
      <NextSeo
        title="データシート"
        description="時間割表を作成するアプリ"
      />
      <BodyMargin minHeight={'100vh'}>
        <Stack>
          <AlignItems gap={'medium'}>
            <Button
              size={'icon'}
              icon={<FiArrowLeft/>}
              onClick={() =>{
                user ? router.push(`/user/${user.uid}`):router.push('/app')
              }}
            >
              戻る
            </Button>
            <Heading type={'h1'}>Datasheets</Heading>
          </AlignItems>
          <Container
            index={'inner'}
            styleType={'filled'}
            marginBottom={'1em'}
          >
            <p>
              データシートは科目を項目ごとですばやく時間割表を入力することを可能とする機能です。データシートのIDをコピーし時間割表の設定から追加しよう！（使用法について、詳しくは<LinkTag href={'/usage'}>こちら</LinkTag>から。）
            </p>
          </Container>
          <DuoGrid>
            {dataSheetData?.docs.map((datasheet) =>{
              return (
                <DataSheetButton
                  key={datasheet.id}
                  size={'large'}
                  public={datasheet.data().public}
                  dataSheetId={datasheet.id}
                  imageSource={datasheet.data().dataSheetImageUrl}
                  subtitle={datasheet.data().dataSheetDescription}
                  onClick={() => router.push(`/datasheet/${datasheet.id}`)}
                >
                  {datasheet.data().dataSheetName}
                </DataSheetButton>
              )})
            }
          </DuoGrid>
        </Stack>
      </BodyMargin>
      {user && 
        <Footer shadow>
          <AlignItems justifyContent={'center'}>
            <Dialog
              title={'新規作成'}
              trigger={<CreateNewButton/>}
            >
              {!sheetLoading ? 
                <Stack>
                  <AlignItems
                    justifyContent={'center'}
                    marginTop={'large'}
                    marginBottom={'large'}
                  >
                    <Input
                      fullWidth
                      size={'extraLarge'}
                      value={dataSheetName}
                      onChange={(e)=>setDataSheetName(e.target.value)}
                      placeholder={'タイトル'}
                    />
                  </AlignItems>
                  <Input
                    fullWidth
                    value={dataSheetDescription}
                    onChange={(e)=>setDataSheetDescription(e.target.value)}
                    placeholder={'データシートの概要・説明'}
                  />
                  {/* <Input
                    fullWidth
                    value={dataSheetImageUrl}
                    onChange={(e)=>setDataSheetImageUrl(e.target.value)}
                    placeholder={'画像URL'}
                  /> */}
                  
                  <Button
                    icon={<FiPlus/>}
                    onClick={(e)=> createDataSheet(e)}
                    disabled={dataSheetName ? false:true}
                  >
                    新規作成
                  </Button>
                </Stack>:
                <h3>作成中・・・</h3>
              }
            </Dialog>
          </AlignItems>
        </Footer>
      }
    </>
  )
}
