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

interface SheetContainerProps {
  user:any,
  sheetDataArray:any | SheetDataTypes[],
}

{/* <>
<Container
  index={'inner'}
  styleType={"filled"}
>
  <ol>
    <li>時間割表を作成</li>
    <li>科目や時間を入力する</li>
    <li>友達や家族と共有！</li>
  </ol>
</Container>
<Container styleType="transparent">
  <AlignItems justifyContent={'center'}>
    <AlignItems
      justifyContent={'center'}
      flexDirection={'column'}
    >
      <span
        style={{
          fontSize: '2em',
          color: 'var(--system3)'
        }}
      >
        <FiCalendar/>
      </span>
      <h3 style={{color: 'var(--system3)'}}>
        時間割表が作成されていません
      </h3>
      <AlignItems>
        <Button
          onClick={() => router.push(`/user/${user.uid}/sheet`)}
          icon={<FiPlus/>}
        >
          新規作成
        </Button>
      </AlignItems>
    </AlignItems>
  </AlignItems>
</Container>
</> */}


const TotalText = styled('p',{
  userSelect:'none',
  width:'fit-content',
  marginTop:'$4',
  backgroundColor:'$system1',
  border:'1px solid $system2',
  padding:'$1 $3',
  borderRadius:'$3',
  color:'$fontColor1',
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
        dataSheetId:v2SheetData?.data()?.sheets[sheet].dataSheetId,
        date: serverTimestamp(),
        bannerImageUrl:v2SheetData?.data()?.[sheet].bannerImageUrl,
        backgroundImageUrl:v2SheetData?.data()?.[sheet].backgroundImageUrl,
      })
    })
    updateDoc(userDoc, {
      sheets: deleteField()
    })
  }
  
  return (
    <>
      {v2SheetData?.data()?.sheets ?
        <Alert
          open={true}
          closeButton={
            <Button
              fullWidth
              styleType={'outline'}
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
          {sheetDataArray?.docs.map((sheetDoc:SheetDocTypes) =>
            <SheetButton
              key={sheetDoc.id}
              imageSource={sheetDoc.data().bannerImageUrl}
              onClick={() =>{
                // setLoadSheet(true);
                router.push(`/user/${props.user?.uid}/sheet/${sheetDoc.id}`);
              }}
              sharing={sheetDoc.data().sharing}
              date={sheetDoc.data().date.toDate().toDateString()}
            >
              {sheetDoc.data().title}
            </SheetButton>
          )}
          {sheetDataArray &&
            <AlignItems justifyContent={'right'}>
              <TotalText>
                合計：{sheetDataArray.docs.length}枚
              </TotalText> 
            </AlignItems>
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
    </>
  )
}
