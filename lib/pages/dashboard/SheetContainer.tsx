import React,{useEffect, useState} from 'react'
import { useRouter } from 'next/router';
import { FiCalendar, FiPlus, FiSave } from 'react-icons/fi';
import { styled } from '../../../stitches.config';
import Button from '../../button/Button';
import SheetButton from './SheetButton';
import Container from '../../component/Container';
import AlignItems from '../../style/AlignItems';
import Stack from '../../style/Stack';
import { addDoc, collection, deleteField, doc, DocumentData, DocumentSnapshot, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../../src/service/firebase';

import { useDocument } from 'react-firebase-hooks/firestore';
import Alert from '../../component/Alert';
import StaticScene from '../../style/StaticScene';
import { ClipLoader, MoonLoader } from 'react-spinners';
import { scheduleCellId } from '../../data/scheduleCellId';
import { SheetDocTypes } from '../../../pages/user/[userId]';
import { SheetDataTypes } from '../sheet/Editor';
import Heading from '../../component/Heading';

interface SheetContainerProps {
  title:string,
  user:any,
  sheetDataArray:any | SheetDataTypes[],
  currentView:string
}

const SheetContainerStyled = styled('div',{
  width:'100%'
})

const TotalText = styled('p',{
  userSelect:'none',
  width:'fit-content',
  marginTop:'$4',
  backgroundColor:'$gray1',
  border:'1px solid $gray4',
  color:'$gray12',
  padding:'$1 $3',
  borderRadius:'$3',
  fontSize:'$s'
})

export default function SheetContainer(props:SheetContainerProps) {
  const router = useRouter();
  const sheetDataArray = props.sheetDataArray
  const userDoc = doc(db,`users/${props.user && props.user.uid}/`);
  const [v2SheetData, loadingV2SheetData] = useDocument<DocumentData>(userDoc);

  const convertV2toV3 = async () =>{
    const scheduleGridCollection:any = collection(db, `users/${props.user && props.user.uid}/scheduleGrid/`)
    await Object.keys(v2SheetData?.data()?.sheets).map(sheet => {
      addDoc(scheduleGridCollection,{
        title:sheet,
        sharing:false,
        cells:v2SheetData?.data()?.sheets[sheet].cells ? v2SheetData?.data()?.sheets[sheet].cells:{},
        dataSheetId:v2SheetData?.data()?.sheets[sheet]?.dataSheetId === undefined ? '':v2SheetData?.data()?.sheets[sheet]?.dataSheetId,
        date: serverTimestamp(),
        bannerImageUrl:v2SheetData?.data()?.[sheet]?.bannerImageUrl === undefined ?
        '':v2SheetData?.data()?.[sheet].bannerImageUrl,
        backgroundImageUrl:v2SheetData?.data()?.[sheet]?.backgroundImageUrl === undefined ?
        '':v2SheetData?.data()?.[sheet].backgroundImageUrl,
        archived:false
      })
    })
    updateDoc(userDoc, {
      sheets: deleteField()
    })
  }
  
  return (
    <SheetContainerStyled>
      {v2SheetData?.data()?.sheets ?
        <Alert
          open={true}
          closeButton={
            <Button
              fullWidth
              styleType={'fill'}
              icon={<FiSave/>}
              onClick={()=>convertV2toV3()}
            >
              変更
            </Button>
          }
          title={'v3へ対応'}
          description={
            'Deizu v3のリリース基づき時間割表の保存の方法を大幅に変更いたしました。今まで作成した時間割表を引き続き使用するには以下の変更ボタンを押す必要があります。'
          }
          // loading={convertV2toV3State == 'loading'}
        >
        </Alert>:
        <Stack gap={'0'}>
          <Heading
            type={'h1'}
            margin={'0 0 0.5em 0.5em'}
          >
            {props?.title}
          </Heading>
          {sheetDataArray?.docs.map((sheetDoc:SheetDocTypes) =>
            <SheetButton
              key={sheetDoc.id}
              imageSource={sheetDoc.data().bannerImageUrl}
              onClick={() =>{
                // setLoadSheet(true);
                router.push(`/user/${props.user?.uid}/sheet/${sheetDoc.id}`);
              }}
              sharing={sheetDoc.data().sharing}
              archived={sheetDoc.data().archived}
              date={sheetDoc.data().date.toDate().toDateString()}
            >
              {sheetDoc.data().title}
            </SheetButton>
          )}
          {sheetDataArray && 
            <>
              {
                sheetDataArray.docs.length === 0 &&
                <Container>
                  <AlignItems
                    justifyContent={'center'}
                  >
                    <FiCalendar/>
                    <h4>
                      時間割表が作成されていません
                    </h4>
                  </AlignItems>
                </Container>
              }
              <AlignItems justifyContent={'right'}>
                <TotalText>
                  合計：{sheetDataArray.docs.length}枚
                </TotalText> 
              </AlignItems>
            </>
          }
        </Stack>
      }

      {loadingV2SheetData &&
        <AlignItems
          minHeight={'100px'}
          justifyContent={'center'}
        >
          <MoonLoader size={30}/>
        </AlignItems>
      }
    </SheetContainerStyled>
  )
}
