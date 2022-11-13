import React,{useState,useEffect} from 'react'
import BodyMargin from '../../lib/style/BodyMargin'
import { FiPlus, FiArrowLeft } from "react-icons/fi";
import { NextSeo } from 'next-seo';


import { collection, DocumentData, getDocs, query, where } from "firebase/firestore";

// Button Component
import Button from '../../lib/button/Button';
import IconButton from '../../lib/button/IconButton';
import LargeImageButton from '../../lib/button/LargeImageButton';

import AlignItems from '../../lib/style/AlignItems';
import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from "../../src/service/firebase"
import Link from 'next/link';
import Heading from '../../lib/component/Heading';
import Footer from '../../lib/component/Footer';
import Dialog from '../../lib/component/Dialog';
import CreateNewButton from '../../lib/component/CreateNewButton';
import Container from '../../lib/component/Container';
import Stack from '../../lib/style/Stack';
import DataSheetButton from '../../lib/button/DataSheetButton';
import { styled } from '../../stitches.config';
import { useCollection } from 'react-firebase-hooks/firestore';


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
  const [dataSheetData] = useCollection<DocumentData>(query(collection(db, "sheets"),where('public','==', true)))

  return (
    <BodyMargin>
      <NextSeo
        title="データシート"
        description="時間割表を作成するアプリ"
      />
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
            データシートは科目を項目ごとですばやく時間割表を入力することを可能とする機能です。データシートのIDをコピーし時間割表の設定から追加しよう！（使用法について、詳しくは<Link href={'/usage'}>こちら</Link>から。）
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
      {user && 
        <Footer shadow>
          <AlignItems justifyContent={'center'}>
            <Dialog
              title={'新規作成'}
              trigger={<CreateNewButton/>}
            >
              <h1>bruh</h1>
            </Dialog>
          </AlignItems>
        </Footer>
      }
    </BodyMargin>
  )
}
