import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {  FiArrowLeft, FiEye, FiAlertTriangle, FiChevronRight, FiCopy, FiDatabase, FiExternalLink, FiGrid, FiHome, FiImage, FiInfo, FiLayout, FiLink, FiLock, FiLogIn, FiPlus, FiSettings, FiTrash2, FiUsers } from 'react-icons/fi';

// Components
import Stack from "../../style/Stack";
import AlignItems from "../../style/AlignItems"
import MediaQuery from "../../style/MediaQuery";
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
import { doc, getDoc,setDoc,serverTimestamp, updateDoc, deleteField,collection, getDocs } from "firebase/firestore";
import { db } from "../../../src/service/firebase";
import { EditorProps } from "../../data/types/types";

export default function Editor(props:EditorProps) {
  const router = useRouter();
  const [listViewState, setListViewState] = useState(false)

  const [modalSection, setModalSection] = useState(0);
  const [selectCustomize, setSelectCustomize] = useState('banner');

  const [sheetBannerImageUrl, setSheetBannerImageUrl] = useState<string>();

  // Props
  let user = props.user;
  let viewOnly = props.viewOnly;
  let sheetData = props.sheetData;
  useEffect(() => {
    setSheetBannerImageUrl(sheetData && sheetData.bannerImageUrl);
  }, [sheetData])
  

  // Functions

  // const saveDataSheetId = async() =>{
  //   const docRef = doc(db, "users", user.uid);
  //   await setDoc(docRef, {sheets:{[sheetName]:{dataSheetId:dataSheetId}}}, { merge: true });
  //   fetchDataSheet(dataSheetId)
  // }
  // const saveSheetImageUrl = async() =>{
  //   const docRef = doc(db, "users", user.uid);
  //   await setDoc(docRef, {
  //     sheets:{[sheetName]:
  //       {
  //         bannerImageUrl:sheetBannerImageUrl,
  //         backgroundImageUrl:sheetBackgroundImageUrl,
  //       }
  //     }}, { merge: true });    
  // }
  // const shareSheet = async(prop) => {
  //   setShareSheetState(prop)
  //   const docRef = doc(db, "users", user.uid);
  //   await setDoc(docRef, {sheets:{[sheetName]:{sharing:prop}}}, { merge: true });
  // }
  // const copyAlert = (prop, message) => {
  //   navigator.clipboard.writeText(`${prop} `);
  //   toast(`${message}がコピーされました。`);
  // }

  // Datasheet fetching
  const [allDataSheetData, setAllDataSheetData] = useState();
  const fetchDataSheetData = async () => {
    const collectionRef = collection(db, "sheets");
    const querySnapshot = await getDocs(collectionRef);
    let sheetDataArray:Object[] = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id)
      sheetDataArray.push({
        dataSheetId: doc.id,
        dataSheetData: doc.data(),
      });
    })
    setAllDataSheetData(sheetDataArray);
    console.log(allDataSheetData)
  }

  return (
    <BodyMargin>
      <Stack gap={'0.5em'}>
        <ImageContainer src={sheetBannerImageUrl}>
          <AlignItems justifyContent={'spaceBetween'}>
            {viewOnly ?
              <Button
                size={'small'}
                icon={<FiLogIn/>}
                styleType={'outline'}
                onClick={() => router.push('/app')}
              >
                アカウント作成
              </Button>:
              <AlignItems>
                <Button
                  size={'small'}
                  icon={<FiHome/>}
                  onClick={() => router.push(`/user/${user.uid}/`)}
                >
                  ダッシュボード
                </Button>
                <MediaQuery hide={'mobile'}>
                  <Button
                    size={'small'}
                    icon={<FiPlus/>}
                    onClick={() => router.push(`/user/${user.uid}/sheet`)}
                  >
                    新規作成
                  </Button>
                </MediaQuery>
              </AlignItems>
            }
            <h1
              className={'scaleFontLarge'}
              style={{
                color: '$textColor1',
                textShadow: '0px 0px 15px $system2',
              }}
            >
              {sheetData.title}
            </h1>
            {viewOnly ?
              <Button
                icon={<FiEye/>}
                size={'small'}
              >
                閲覧中
              </Button>:
              <AlignItems>
                <MediaQuery hide={'mobile'}>
                  <Button
                    size={'small'}
                    icon={!listViewState ? <FiLayout/>:<FiGrid/>}
                    onClick={()=>{
                      listViewState ? 
                      setListViewState(false):
                      setListViewState(true)
                    }}
                  >
                    {!listViewState ? 'リスト表示':'グリッド表示'}
                  </Button>
                </MediaQuery>

                <Dialog
                  title={'設定'}
                  openButton={
                    <Button
                      size={'small'}
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
                        fetchDataSheetData();
                      }}
                      leftIcon={<FiDatabase/>}
                      rightIcon={<FiChevronRight/>}
                    >
                      データシートを繋げる
                    </SectionButton>
                    <SectionButton
                      onClick={()=>setModalSection(2)}
                      leftIcon={<FiImage/>}
                      rightIcon={<FiChevronRight/>}
                    >
                      画像を編集・追加
                    </SectionButton>
                    <SectionButton
                      onClick={()=>setModalSection(3)}
                      leftIcon={<FiUsers/>}
                      rightIcon={<FiChevronRight/>}
                    >
                      共有設定
                    </SectionButton>
                    <SectionButton
                      onClick={()=>setModalSection(4)}
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
                        <>
                          <div style={{overflowY:'scroll',height:'250px', padding:'0.5em'}}>
                            <Stack>
                              {
                                allDataSheetData && allDataSheetData.map((prop) =>{
                                  return (
                                    <LargeImageButton
                                      key={prop}
                                      displayAddButton={true}
                                      dataSheetId={prop.dataSheetId}
                                      currentDataSheetId={dataSheetId}
                                      imageSource={prop.dataSheetData.dataSheetImageUrl}
                                      subtitle={prop.dataSheetData.dataSheetDescription}
                                      onClick={()=>setDataSheetId(prop.dataSheetId)}
                                    >
                                      {prop.dataSheetData.dataSheetName}
                                    </LargeImageButton>
                                  )
                                })
                              }
                            </Stack>
                          </div>
                          <p>
                            データシートを繋げることで科目を時間割表に入力する作業がより早まります。
                          </p>
                          <Stack>
                            {dataSheetName && 
                              <TextPreview style={{textAlign: 'center'}}>
                                「{dataSheetName}」のデータシートに繋がっています
                              </TextPreview>
                            }
                            <Input
                              placeholder={'データシートID'}
                              value={dataSheetId}
                              onChange={(e)=>setDataSheetId(e.target.value)}
                            />
                            <Button
                              onClick={()=>saveDataSheetId()}
                            >
                              データシートを繋げる
                            </Button>
                          </Stack>
                        </>
                      }
                      {modalSection === 2 && 
                        <>
                          <h3>画像を追加・編集</h3>
                          <p>インターネット上にある画像URLを追加するとバナー画像・背景画像として追加されます。</p>
                          <Stack grid={isMobile ? '1fr':'1fr 1fr'} gap={'0.2em'}>
                            <ImageSelect
                              src="/banner.png"
                              alt="Banner image"
                              selected={selectCustomize === 'banner'}
                              onClick={()=>{
                                setSelectCustomize('banner');
                              }}
                            />
                            <ImageSelect
                              src="/background.png"
                              alt="Background image"
                              selected={selectCustomize === 'background'}
                              onClick={()=>{
                                setSelectCustomize('background');
                              }}
                            />
                          </Stack>
                          <Stack style={{marginTop: '10px'}}>
                            {selectCustomize === 'banner' &&
                              <Input
                                placeholder={'バナー画像URL'}
                                value={sheetBannerImageUrl}
                                onChange={(e)=>setSheetBannerImageUrl(e.target.value)}
                              />
                            }
                            {selectCustomize === 'background' &&
                              <Input
                                placeholder={'背景画像URL'}
                                value={sheetBackgroundImageUrl}
                                onChange={(e)=>setSheetBackgroundImageUrl(e.target.value)}
                              />
                            }
                            <Button
                              onClick={()=>{
                                saveSheetImageUrl();
                                closeModal();
                                toast('保存完了！');
                              }}
                            >
                              保存
                            </Button>
                          </Stack>
                        </>
                      }
                      {modalSection === 3 &&         
                        <>
                          <h3>共有設定</h3>
                          <p>
                            リンク共有を有効するとこのリンクにアクセスできる人は全て時間割を閲覧することができます。なお共有するとユーザー様がご指定しているテーマ・バナー画像等も共有されるのでご了承下さい。
                          </p>
                          <AlignItems style={{justifyContent: 'space-between'}}>
                            <p>{shareSheetState ? ' 自分しか見えないようにする':'時間割の閲覧権限を与える'}</p>
                            <AlignItems>
                              {shareSheetState ? <Button
                                icon={<FiLock/>}
                                onClick={()=>shareSheet(false)}
                              >
                                ロック
                              </Button>:
                              <Button
                                icon={<FiLink/>}
                                onClick={()=>shareSheet(true)}
                              >
                                共有
                              </Button>}
                            </AlignItems>
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
                      {modalSection === 4 &&         
                        <>
                          <h3>デインジャーゾーン</h3>
                          <AlignItems style={{justifyContent: 'space-between'}}>
                            <p>「{sheetData.title}」を消去</p>
                            <Button
                              icon={<FiTrash2 />}
                              onClick={async() => {
                                  if (window.confirm("今開いている時間割表を消去したいですか？一度消去すると復旧することはできません。")) {
                                    const docRef = doc(db, "users", user.uid);
                                    await updateDoc(docRef, {[`sheets.${sheetData.title}`]: deleteField()});
                                    router.push('/app');
                                  }
                                }
                              }
                            >時間割表を消去</Button>
                          </AlignItems>
                        </>
                      }
                    </Stack>
                  }
                </Dialog>
              </AlignItems>
            }
          </AlignItems>
        </ImageContainer>
        <SheetGrid
          sheetData={sheetData}
          viewOnly={viewOnly}
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
                最終変更時：{sheetData.date.toDate().toDateString()}
              </h5>
              <h4>
                {moment().format('LT')}｜
                {moment().format('dddd')}｜
                {moment().format('MMMM Do YYYY')}
              </h4>
            </>:
            <>
              <h2>Deizu</h2>
              <p>Designed & Developed By 501A</p>
            </>
          }
        </AlignItems>
      </Stack>
    </BodyMargin>
  )
}