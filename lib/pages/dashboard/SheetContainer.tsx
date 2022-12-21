import React from 'react'
import { useRouter } from 'next/router';
import { FiCalendar, FiCheck } from 'react-icons/fi';
import { styled } from '../../../stitches.config';
import Button from '../../button/Button';
import SheetButton from './SheetButton';
import Container from '../../component/Container';
import AlignItems from '../../style/AlignItems';
import Stack from '../../style/Stack';
import { addDoc, collection, deleteField, doc, DocumentData,serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../../src/service/firebase';

import { useDocument } from 'react-firebase-hooks/firestore';
import Alert from '../../component/Alert';
import { MoonLoader } from 'react-spinners';
import { SheetDocTypes } from '../../../pages/user/[userId]';
import { SheetDataTypes } from '../sheet/Editor';
import Heading from '../../component/Heading';
import LinkTag from '../../component/LinkTag';

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

const tagsData = [
  {
    type:'archived',
    name:'共有中'
  },
  {
    type:'sharing',
    name:'アーカイブ'
  },
]

export default function SheetContainer(props:SheetContainerProps) {
  const router = useRouter();
  const sheetDataArray = props.sheetDataArray
  const userDoc = doc(db,`users/${props.user?.uid}/`);
  const [v2SheetData, loadingV2SheetData] = useDocument<DocumentData>(userDoc);

  const convertV2toV3 = async () =>{
    const scheduleGridCollection:any = collection(db, `users/${props.user?.uid}/scheduleGrid/`)
    await Object.keys(v2SheetData?.data()?.sheets).map(sheet => {
      addDoc(scheduleGridCollection,{
        title:sheet,
        sharing:false,
        cells:v2SheetData?.data()?.sheets[sheet].cells ? v2SheetData?.data()?.sheets[sheet].cells:{},
        // dataSheetId:v2SheetData?.data()?.sheets[sheet]?.dataSheetId === undefined ? '':v2SheetData?.data()?.sheets[sheet]?.dataSheetId,
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
              icon={<FiCheck/>}
              onClick={()=>convertV2toV3()}
            >
              完了
            </Button>
          }
          title={'v3へ対応'}
          description={
            'Deizu v3のリリース基づき時間割表の保存の方法を大幅に変更いたしました。今まで作成した時間割表を引き続き使用するができますのでご安心ください。'
          }
        >
          <ul>
            <li><LinkTag href={'/'}>v3の変更一覧</LinkTag></li>
            <li><LinkTag href={'/'}>具体的な技術的な変更（ブログ記事）</LinkTag></li>
          </ul>
        </Alert>:
        <Stack gap={'0'}>
          <AlignItems justifyContent={'spaceBetween'}>
            <Heading
              type={'h1'}
              margin={'0 0 0.5em 0.5em'}
            >
              {props?.title}
            </Heading>
            {/* <AlignItems gap={'small'}>
              <Dropdown
                icon={<FiFilter/>}
                align={'left'}
                name={'フィルター'}
              >
                <Dropdown.Label>
                  表示
                </Dropdown.Label>
                <Dropdown.Item
                  icon={<FiZap/>}
                >
                  最近の表
                </Dropdown.Item>
                <Dropdown.Item
                  icon={<FiUsers/>}
                >
                  共有中
                </Dropdown.Item>
                <Dropdown.Item
                  icon={<FiArchive/>}
                >
                  アーカイブ済
                </Dropdown.Item>
                <Dropdown.Item
                  icon={<FiFolder/>}
                >
                  全ての表
                </Dropdown.Item>
              </Dropdown>
              <Dropdown
                icon={<FiFilter/>}
                align={'center'}
                name={'フィルター'}
              >
                <Dropdown.Label>
                  表示
                </Dropdown.Label>
                <Dropdown.Item
                  icon={<FiZap/>}
                >
                  最近の表
                </Dropdown.Item>
                <Dropdown.Item
                  icon={<FiUsers/>}
                >
                  共有中
                </Dropdown.Item>
                <Dropdown.Item
                  icon={<FiArchive/>}
                >
                  アーカイブ済
                </Dropdown.Item>
                <Dropdown.Item
                  icon={<FiFolder/>}
                >
                  全ての表
                </Dropdown.Item>
              </Dropdown>
              <Dropdown
                icon={<FiShuffle/>}
                align={'right'}
                name={'フィルター'}
              >
                <Dropdown.Label>
                  順番
                </Dropdown.Label>
                <Dropdown.SubMenu
                  name={'最終変更時'}
                  icon={<FiClock/>}
                >
                  <Dropdown.Item
                    icon={<FiShuffle/>}
                  >
                    古い順
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={<FiShuffle/>}
                  >
                    新しい順
                  </Dropdown.Item>
                </Dropdown.SubMenu>
                <Dropdown.SubMenu
                  name={'タイトル名'}
                  icon={<FiType/>}
                >
                  <Dropdown.Item
                    icon={<FiShuffle/>}
                  >
                    AからZ
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={<FiShuffle/>}
                  >
                    ZからA
                  </Dropdown.Item>
                </Dropdown.SubMenu>
              </Dropdown>
            </AlignItems> */}

          </AlignItems>
          {sheetDataArray?.docs.map((sheetDoc:SheetDocTypes) =>
            <SheetButton
              key={sheetDoc.id}
              sheetId={sheetDoc.id}
              imageSource={sheetDoc.data().bannerImageUrl}
              onClick={() =>{
                // setLoadSheet(true);
                router.push(`/user/${props.user?.uid}/sheet/${sheetDoc.id}`);
              }}
              sharing={sheetDoc.data().sharing}
              archived={sheetDoc.data().archived}
              date={sheetDoc.data().date?.toDate().toDateString()}
              user={props.user}
            >
              {sheetDoc.data().title}
            </SheetButton>
          )}
          {sheetDataArray && 
            <>
              {
                sheetDataArray.docs.length === 0 &&
                <Container styleType={'gradient'}>
                  <AlignItems
                    justifyContent={'center'}
                  >
                    <FiCalendar/>
                    <h4>
                      時間割表なし
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
