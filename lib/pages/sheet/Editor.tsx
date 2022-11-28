import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {  FiArrowLeft, FiEye, FiAlertTriangle, FiChevronRight, FiCopy, FiDatabase, FiExternalLink, FiGrid, FiHome, FiImage, FiInfo, FiLayout, FiLink, FiLock, FiLogIn, FiPlus, FiSettings, FiTrash2, FiUsers, FiGitBranch, FiEdit3, FiArchive } from 'react-icons/fi';

// Components
import Stack from "../../style/Stack";
import AlignItems from "../../style/AlignItems"
import BodyMargin from "../../style/BodyMargin"
import ImageContainer from "./ImageContainer";
import SheetGrid from "./SheetGrid";
import Dialog from "../../component/Dialog";
import Button from "../../button/Button";
import SectionButton from "../../button/SectionButton";

// Moment
import 'moment/locale/ja';
import moment from 'moment';

// Firebase
import { doc, updateDoc, deleteField,collection, getDocs, DocumentData, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../../src/service/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import DataSheetButton from "../../button/DataSheetButton";
import Input from "../../component/Input";
import TextPreview from "../../component/TextPreview";
import Heading from "../../component/Heading";
import { styled } from "../../../stitches.config";
import Toggle from "../../component/Toggle";
import { ItemStyled } from "../../component/Menu";
import { DataSheetDataTypes } from "../../../pages/user/[userId]";
import StatusBar from "../../component/StatusBar";
// import { SheetDataTypes } from "../../../pages/user/[userId]/sheet/[id]";

export interface SheetDataTypes {
  title:string,
  cells:any,
  date:any,
  sharing:boolean,
  archived:boolean,
  location:string,
  bannerImageUrl?:string,
  backgroundImageUrl?:string,
  dataSheetId?:string
}

export interface EditorProps {
  user?:any,
  viewOnly:boolean,
  sheetData:SheetDataTypes | any,
}

export default function Editor(props:EditorProps) {
  const router = useRouter();
  const sheetId:string = `${router.query.id}`;
  let user = props.user;
  let viewOnly = props.viewOnly;
  let sheetData = props.sheetData;

  const [modalSection, setModalSection] = useState(0);
  const [sheetTitle, setSheetTitle] = useState<string>(sheetData.title);
  const [sheetBannerImageUrl, setSheetBannerImageUrl] = useState<string>(sheetData && sheetData.bannerImageUrl);
  const [shareSheetState, setShareSheetState] = useState<boolean>(sheetData.sharing);
  
  const LargeHeading = styled('h1',{
    fontSize:'2em',
    margin:'0 0 15px 5%',
    color:'$gray12',
    fontWeight:'500',
    $$textShadowColor:'#989898',
    textShadow:'0px 0px 30px $$textShadowColor'
  })

  const ScrollY = styled('div',{
    overflowY:'scroll',
    height:'250px',
    padding:'0.5em'
  })

  // Functions
  const sheetDocRef = doc(db, `users/${user.uid}/scheduleGrid/${sheetId}/`);
  
  // Datasheet fetching
  const [dataSheetData] = useCollection<DocumentData>(collection(db, "sheets"));
  const [dataSheetId, setDataSheetId] = useState(
    sheetData?.dataSheetId ? sheetData?.dataSheetId:''
  );

  const saveDataSheetId = async() =>{
    await setDoc(sheetDocRef, {dataSheetId:dataSheetId}, { merge: true });
  }

  const saveSheetImageUrl = async () => {
    let url = prompt('バナー画像URL')
    if (url) {
      await setDoc(sheetDocRef, {bannerImageUrl:url}, { merge: true });
      setSheetBannerImageUrl(url)
    }
  }

  const shareSheet = async(shareBoolean:boolean) => {
    setShareSheetState(shareBoolean)
    await setDoc(sheetDocRef, {sharing:shareBoolean}, { merge: true });
  }
  
  const updateTitle = async () => {
    let newTitleValue = prompt('新しいタイトル')
    if (newTitleValue) {
      await updateDoc(sheetDocRef, {
        title:newTitleValue
      })
      setSheetTitle(newTitleValue);
    }
  }

  return (
    <>
      {sheetData?.sharing &&
        <StatusBar
          icon={<FiUsers/>}
          status={'sharing'}
        />
      }
      {sheetData?.archived &&
        <StatusBar
          icon={<FiArchive/>}
          status={'archived'}
        />
      }
      <ImageContainer
        id={sheetId}
        src={sheetBannerImageUrl}
        menuChildren={
          <>
            <ItemStyled
              onSelect={()=>saveSheetImageUrl()}
            >
              <AlignItems>
                <FiImage/>
                バナー画像を追加
              </AlignItems>
            </ItemStyled>
            <ItemStyled
              // asChild
              onSelect={()=>updateTitle()}
            >
              <AlignItems>
                <FiEdit3/>
                名前を変更
              </AlignItems>
            </ItemStyled>
          </>
        }
      >
        <LargeHeading>
          {sheetTitle}
        </LargeHeading>
        <AlignItems
          marginBottom={'medium'}
        >
          {viewOnly ?
            <>
              <Button
                size={'small'}
                icon={<FiLogIn/>}
                styleType={'outline'}
                onClick={() => router.push('/app')}
              >
                アカウント作成
              </Button>
              <Button
                icon={<FiEye/>}
                size={'small'}
              >
                閲覧中
              </Button>
            </>:
            <>
              <Button
                size={'icon'}
                icon={<FiHome/>}
                onClick={() => router.push(`/user/${user.uid}/`)}
              >
                ダッシュボード
              </Button>
              <Dialog
                title={'設定'}
                trigger={
                  <Button
                    size={'icon'}
                    icon={<FiSettings/>}
                  >
                    設定
                  </Button>
                }
              >
                {modalSection === 0 && <>
                  <SectionButton
                    onClick={()=>{
                      setModalSection(1);
                    }}
                    leftIcon={<FiDatabase/>}
                    rightIcon={<FiChevronRight/>}
                  >
                    データシートを繋げる
                  </SectionButton>
                  <SectionButton
                    onClick={()=>setModalSection(2)}
                    leftIcon={<FiUsers/>}
                    rightIcon={<FiChevronRight/>}
                  >
                    共有設定
                  </SectionButton>
                  <SectionButton
                    onClick={()=>setModalSection(3)}
                    leftIcon={<FiAlertTriangle/>}
                    rightIcon={<FiChevronRight/>}
                  >
                    デインジャーゾーン
                  </SectionButton>
                  <SectionButton
                    onClick={()=>router.push('/about')}
                    leftIcon={<FiInfo/>}
                    rightIcon={<FiExternalLink/>}
                  >
                    Deizuについて
                  </SectionButton></>
                }
                {modalSection !== 0 &&
                  <Stack>
                    <SectionButton
                      onClick={()=>setModalSection(0)}
                      leftIcon={<FiArrowLeft/>}
                    >
                      戻る
                    </SectionButton>
                    {modalSection === 1 && 
                      <Stack>
                        {sheetData?.dataSheetId && 
                          <TextPreview justifyContent={'center'}>
                            データシートに繋がっています
                          </TextPreview>
                        }
                        <ScrollY>
                          <Stack>
                            {
                              dataSheetData?.docs.map((datasheet:DataSheetDataTypes) =>{
                                return (
                                  <DataSheetButton
                                    key={datasheet.id}
                                    displayAddButton={true}
                                    dataSheetId={datasheet.id}
                                    currentDataSheetId={dataSheetId}
                                    imageSource={datasheet.data().dataSheetImageUrl}
                                    subtitle={datasheet.data().dataSheetDescription}
                                    onClick={()=>
                                      setDataSheetId(datasheet.id)
                                    }
                                  >
                                    {datasheet.data().dataSheetName}
                                  </DataSheetButton>
                                )
                              })
                            }
                          </Stack>
                        </ScrollY>
                        <Stack>
                          <Input
                            fullWidth
                            placeholder={'データシートID'}
                            value={dataSheetId}
                            onChange={(e)=>setDataSheetId(e.target.value)}
                          />
                          <Button
                            disabled={dataSheetId ? false:true}
                            icon={<FiGitBranch/>}
                            onClick={()=>saveDataSheetId()}
                          >
                            データシートを繋げる
                          </Button>
                        </Stack>
                      </Stack>
                    }
                    {modalSection === 2 &&         
                      <>
                        <AlignItems justifyContent={'spaceBetween'}>
                          <p>{shareSheetState ? '現在共有中':'自分のみアクセス可能'}</p>
                          <Toggle
                            defaultChecked={shareSheetState}
                            onClick={()=>shareSheet(!shareSheetState)}
                          />
                        </AlignItems>
                        {shareSheetState &&
                          <Stack>
                            <p>
                              URLをコピーし他の人に送信することで時間割表を共有することができます。
                            </p>
                            <Button
                              icon={<FiCopy/>}
                              // onClick={() => copyAlert(`deizu.vercel.app/user/${user.uid}/sheet/${sheetData.title}`,'時間割表のリンク')}
                            >
                              時間割表のリンクをコピー
                            </Button>
                          </Stack>
                        }
                      </>
                    }
                    {modalSection === 3 &&         
                      <>
                        <h3>デインジャーゾーン</h3>
                        <AlignItems justifyContent={'spaceBetween'}>
                          <p>「{sheetTitle}」を消去</p>
                          <Button
                            styleType={'red'}
                            icon={<FiTrash2 />}
                            onClick={async() => {
                                if (window.confirm("今開いている時間割表を消去したいですか？一度消去すると復旧することはできません。")) {
                                  router.push('/app');
                                  await deleteDoc(sheetDocRef);
                                }
                              }
                            }
                          >
                            時間割表を消去
                          </Button>
                        </AlignItems>
                      </>
                    }
                  </Stack>
                }
              </Dialog>
            </>
          }
        </AlignItems>
      </ImageContainer>
      <BodyMargin>
        <Stack gap={'0.5em'}>
          <SheetGrid
            sheetData={sheetData}
            viewOnly={viewOnly}
            user={user}
          />
          <AlignItems
            justifyContent={'center'}
            flexDirection={'column'}
            gap={'small'}
            marginTop={'extraLarge'}
          >
            {!viewOnly ?
              <>
                <h5>
                  最終変更時：{sheetData?.date?.toDate().toDateString()}
                </h5>
                <Heading type={'h5'}>
                  {moment().format('LT')}｜
                  {moment().format('dddd')}｜
                  {moment().format('MMMM Do YYYY')}
                </Heading>
              </>:
              <>
                <Heading type={'h3'}>Deizu</Heading>
                <Heading type={'h5'}>Designed & Developed By 501A</Heading>
              </>
            }
          </AlignItems>
        </Stack>
      </BodyMargin>
    </>
  )
}