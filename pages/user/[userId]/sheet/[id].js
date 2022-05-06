import React,{useEffect, useState} from 'react'
import {MdHomeFilled,MdAddCircle, MdSettings,MdClose,MdLink,MdLinkOff,MdDelete,MdPerson,MdCalendarViewMonth,MdCalendarViewWeek,MdOutlineMediation,MdArrowForwardIos,MdPeopleAlt,MdImage,MdDangerous,MdInfo,MdArrowBack } from "react-icons/md";

import IconButton from '../../../../lib/component/IconButton'
import AlignItems from '../../../../lib/style/AlignItems';
import BodyMargin from '../../../../lib/style/BodyMargin';
import StaticScene from '../../../../lib/style/StaticScene';
import Stack from '../../../../lib/style/Stack';

import SubjectCell from '../../../../lib/schedule/SubjectCell'
import TimeCell from '../../../../lib/schedule/TimeCell'
import Input from '../../../../lib/component/Input';
import MockupCell from '../../../../lib/component/MockupCell';
import Button from '../../../../lib/component/Button';
import ColorButton from '../../../../lib/component/ColorButton';

import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db,root } from "../../../../src/service/firebase"
import { doc, getDoc,setDoc,serverTimestamp, updateDoc, deleteField } from "firebase/firestore";

import Modal from 'react-modal';
import moment from 'moment';
import { toast } from 'react-toastify';
import { modalStyle } from '../../../../lib/style/modalStyle'

// Data
import { scheduleCellId } from '../../../../lib/data/scheduleCellId'
import { buttonColor } from '../../../../lib/data/buttonColor'

import Head from 'next/head';
import Container from '../../../../lib/component/Container';
import ImageContainer from '../../../../lib/component/ImageContainer';
import SectionButton from '../../../../lib/component/SectionButton';
import ModalSection from '../../../../lib/style/ModalSection';
import TextPreview from '../../../../lib/component/TextPreview';

// Modal.setAppElement('#yourAppElement');
function IndivisualSheet({ sheetName }) {
  const router = useRouter();
  const [sheetData, setSheetData] = useState()
  const [sheetCellsData, setSheetCellsData] = useState()
  const [sheetImageUrl, setSheetImageUrl] = useState()
  const [shareSheetState, setShareSheetState] = useState()
  
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [dataSheetId, setDataSheetId] = useState()
  const [dataSheet, setDataSheet] = useState()
  const [dataSheetName, setDataSheetName] = useState()
  
  const [theme, setTheme] = useState();
  const [themeColor, setThemeColor] = useState();

  moment.locale("ja");

  const sheetOwnerId = router.query.userId;
  
  const fetchDataSheet = (prop) =>{
    if (prop) {
      console.log(prop)
      getDoc(doc(db, "sheets", prop)).then((doc) => {
        if(doc.data()){
          setDataSheet(doc.data().dataSheet);
          setDataSheetName(doc.data().dataSheetName);
        }else{
          alert("データシートが見つかりません")
        }
      })
    }else{
      console.log("removed");
    }
  }

  const fetchData = () => {
    const docRef = doc(db, "users", sheetOwnerId);
    getDoc(docRef).then((doc) => {
      if (!doc.data().sheets[sheetName]) {
        router.push('/app')
      }
      setThemeColor(doc.data().themeColor);
      setTheme(doc.data().theme);

      const thisSheet = doc.data().sheets[sheetName];
      setSheetData(thisSheet);
      setSheetCellsData(thisSheet.cells);
      setSheetImageUrl(thisSheet.imageUrl);
      setShareSheetState(thisSheet.sharing);
      setDataSheetId(thisSheet.dataSheetId);
      fetchDataSheet(thisSheet.dataSheetId);
    })
  }

  useEffect(() => {
    if (theme) {
      root?.style.setProperty("--r5", theme[0]);
      root?.style.setProperty("--r10", theme[1]);
    }
    if (themeColor) {        
      root?.style.setProperty("--system0", themeColor[0]);
      root?.style.setProperty("--system1", themeColor[1]);
      root?.style.setProperty("--system2", themeColor[2]);
      root?.style.setProperty("--system3", themeColor[3]);
      root?.style.setProperty("--txtColor0", themeColor[4]);
      root?.style.setProperty("--txtColor1", themeColor[5]);
    }
    console.log('bruh')
  },[themeColor, theme])
  
  useEffect(() => {
    fetchData()
    console.log('test')
  }, []);


  const [user] = useAuthState(auth);

  const [listViewState, setListViewState] = useState(false)
  const listView = (prop) => {
    setListViewState(prop);
  }

  function ScheduleGrid() {
    let scheduleGridStyle = {
      display: 'grid',
      gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr 1fr',
      gap: '0.2em'
    }
    const [cellModalIsOpen, setCellModalIsOpen] = useState(false);
    const [modalCellId, setModalCellId] = useState('');
    const [subjectCellName, setSubjectCellName] = useState('');
    const [subjectCellDescription, setSubjectCellDescription] = useState('')
    const [subjectCellColor, setSubjectCellColor] = useState('')
    const [subjectCellLink, setSubjectCellLink] = useState('')

    const closeCellModal = () => {
      setSubjectCellName('')
      setSubjectCellDescription('');
      setSubjectCellColor('');
      setSubjectCellLink('');
      setCellModalIsOpen(false);
    };
    const openCellModal = (prop) => {
      if (user) {        
        if (sheetCellsData[prop]) {  
          setSubjectCellName(sheetCellsData[prop][prop])
          setSubjectCellDescription(sheetCellsData[prop][prop+'Dscrp']);
          setSubjectCellColor(sheetCellsData[prop][prop+'Color']);
          setSubjectCellLink(sheetCellsData[prop][prop+'Link']);
        }else{
          setSubjectCellName('')
          setSubjectCellDescription('');
          setSubjectCellColor('');
          setSubjectCellLink('');
        }
        setCellModalIsOpen(true);
      }
    };
    const saveSubjectData = async (e) => {
        e.preventDefault();
        let newObject = Object.assign({ ...sheetCellsData, 
          [modalCellId]: {
            [modalCellId]: subjectCellName,
            [modalCellId + 'Link']: subjectCellLink,
            [modalCellId + 'Dscrp']: subjectCellDescription,
            [modalCellId + 'Color']: subjectCellColor
          } 
        })
        setSheetCellsData(newObject);

        const docRef = doc(db, "users", user.uid);
        await setDoc(docRef,
            {
              sheets:{
                [sheetName]: {
                  date: serverTimestamp(),
                  cells:{
                    [modalCellId]: {
                      [modalCellId]: subjectCellName,
                      [modalCellId + 'Link']: subjectCellLink,
                      [modalCellId + 'Dscrp']: subjectCellDescription,
                      [modalCellId + 'Color']: subjectCellColor
                    }
                  }
                }
              },
            }, { merge: true }
        );
    }

    return (
      <>
        <Modal
          isOpen={cellModalIsOpen}
          onRequestClose={closeCellModal}
          style={modalStyle}
        >
          <Stack gap={'1em'}>
            <MockupCell
              subjectCellName = {subjectCellName}
              subjectCellLink = {subjectCellLink}
              subjectCellColor = {subjectCellColor}
              subjectCellDescription = {subjectCellDescription}
            />

            {dataSheetName &&             
              <>
                <h4 style={{textAlign: 'center', marginBottom:'0'}}>「{dataSheetName}」データシートより</h4>
                <AlignItems style={{overflowX:'scroll', padding:'1em'}}>
                  {dataSheet.map(prop => {
                    return <MockupCell
                      onClick={() => {
                        setSubjectCellName(prop.subjectName);
                        setSubjectCellLink(prop.subjectLink)
                        setSubjectCellColor(prop.subjectColor);
                        setSubjectCellDescription(prop.subjectDescription)
                      }}
                      padding={'0 0.5em'}
                      subjectCellName = {prop.subjectName}
                      subjectCellLink = {prop.subjectLink}
                      subjectCellColor = {prop.subjectColor}
                      subjectCellDescription = {prop.subjectDescription}
                    />})
                  }
                </AlignItems>
              </>
            }
            <AlignItems style={{justifyContent: 'center'}}>
              <ColorButton
                color={'var(--system1'}
                onClick={() => {
                    setSubjectCellColor('');
                }}
              />
              {buttonColor.map((props)=>
                <ColorButton
                  color={props}
                  onClick={() => {
                      setSubjectCellColor(props);
                  }}
                />
              )}
            </AlignItems>
            <Stack>
              <Input
                value={subjectCellName}
                onChange={(e)=>setSubjectCellName(e.target.value)}
                placeholder={'科目名'}
              />
              <Input
                value={subjectCellLink}
                onChange={(e)=>setSubjectCellLink(e.target.value)}
                placeholder={'URLリンク'}
              />
              <Input
                value={subjectCellDescription}
                onChange={(e)=>setSubjectCellDescription(e.target.value)}
                placeholder={'概要・教室名等'}
              />
            </Stack>
            <Button
              width="full"
              onClick={(e)=>saveSubjectData(e)}
            >
              保存
            </Button>
          </Stack>
        </Modal>
        <div className={listViewState && 'grid-1fr-3fr'}>
          {listViewState &&
            <Container>
              <h1>{moment().format('LT')}</h1>
              <h3>{moment().format('dddd')}</h3>
              <h4>日程：{moment().format('MMMM Do YYYY')}</h4>
            </Container>
          }
          <div 
            style={{
              display:'grid',
              gridTemplateColumns:'0.5fr 9fr',
              gap: '0.5em'
            }}
          >
            <Stack gap = {'0.2em'}>
              <TimeCell displayPeriod={1}/>
              <TimeCell displayPeriod={2}/>
              <TimeCell displayPeriod={3}/>
              <TimeCell displayPeriod={4}/>
              <TimeCell displayPeriod={5}/>
              <TimeCell displayPeriod={6}/>
            </Stack>
            {listViewState ? 
              <Stack gap={'0.2em'}>
                {scheduleCellId.filter(word => word.split('')[0] === 'a').map(cellId =>
                  <SubjectCell
                    sheetData={sheetData}
                    sheetCellsData = {sheetCellsData}
                    onClick={()=>{
                      openCellModal(cellId);
                      setModalCellId(cellId);
                    }}
                    cellId={cellId}
                  />
                )}
              </Stack>:
              <div style={scheduleGridStyle}>
                {scheduleCellId.map(cellId =>                
                  <SubjectCell
                    sheetData={sheetData}
                    sheetCellsData = {sheetCellsData}
                    onClick={()=>{
                      openCellModal(cellId);
                      setModalCellId(cellId);
                    }}
                    cellId={cellId}
                  />
                )}
              </div>
            }
          </div>
        </div>
        <p
          style = {{
            textAlign:'center',
            fontSize:'0.6em',
            color:'var(--txtColor0)'
          }}
        >
          最終変更時：{sheetData.date.toDate().toDateString()}
        </p>
      </>
    )
  }

  // Modal related
  const closeModal = () => setModalIsOpen(false);
  const openModal = () => {
    if (shareSheetState == undefined) {
      setShareSheetState(false);
    }
    setModalIsOpen(true)
  };

  const saveDataSheetId = async() =>{
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, {sheets:{[sheetName]:{dataSheetId:dataSheetId}}}, { merge: true });
    fetchDataSheet(dataSheetId)
  }

  const saveSheetImageUrl = async() =>{
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, {sheets:{[sheetName]:{imageUrl:sheetImageUrl}}}, { merge: true });    
  }

  const shareSheet = async(prop) => {
    setShareSheetState(prop)
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, {sheets:{[sheetName]:{sharing:prop}}}, { merge: true });
  }

  const copyAlert = (prop, message) => {
    navigator.clipboard.writeText(`${prop} `);
    toast(`${message}がコピーされました。`);
  }
  
  function Editor() {
    return (
      <BodyMargin>
        <ImageContainer style={{marginBottom:'1.5em'}} src={sheetImageUrl}>
          <AlignItems style={{justifyContent: 'space-between'}}>
            {user ?
              <AlignItems>
                <IconButton
                  onClick={() => router.push(`/user/${user.uid}/`)}
                  icon={<MdHomeFilled/>}
                >
                  ダッシュボード
                </IconButton>
                <IconButton
                  onClick={() => router.push(`/user/${user.uid}/sheet`)}
                  icon={<MdAddCircle/>}
                >
                  新規作成
                </IconButton>
              </AlignItems>:
              <IconButton
                onClick={() => router.push('/app')}
                icon={<MdPerson/>}
              >
                アカウント作成
              </IconButton>
            }
            <h1>{sheetName}</h1>
            {user ?
              <AlignItems>
                <IconButton
                  onClick={()=>{listViewState ? listView(false):listView(true)}}
                  icon={!listViewState ? <MdCalendarViewWeek/>:<MdCalendarViewMonth/>}
                >
                  {!listViewState ? 'リスト表示':'グリッド表示'}
                </IconButton>
                <IconButton
                  onClick={()=>openModal()}
                  icon={<MdSettings/>}
                >
                  設定
                </IconButton>
              </AlignItems>:
              <p>現在閲覧中</p>
            }
          </AlignItems>
        </ImageContainer>
        <ScheduleGrid/>
      </BodyMargin>
    )
  }
  
  const [modalSection, setModalSection] = useState(0);
  return (
    <>
      <Head>
        <title>{sheetName}</title>
      </Head>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        <AlignItems style={{justifyContent: 'space-between'}}>
          <h2>設定</h2>
          <IconButton
            onClick={()=>closeModal()}
            icon={<MdClose/>}
          >
            閉じる
          </IconButton>
        </AlignItems>
        {modalSection === 0 && <>
          <SectionButton
            onClick={()=>setModalSection(1)}
            leftIcon={<MdOutlineMediation/>}
            rightIcon={<MdArrowForwardIos/>}
          >
            データシートを繋げる
          </SectionButton>
          <SectionButton
            onClick={()=>setModalSection(2)}
            leftIcon={<MdImage/>}
            rightIcon={<MdArrowForwardIos/>}
          >
            バナー画像を追加
          </SectionButton>
          <SectionButton
            onClick={()=>setModalSection(3)}
            leftIcon={<MdPeopleAlt/>}
            rightIcon={<MdArrowForwardIos/>}
          >
            共有設定
          </SectionButton>
          <SectionButton
            onClick={()=>setModalSection(4)}
            leftIcon={<MdDangerous/>}
            rightIcon={<MdArrowForwardIos/>}
          >
            デインジャーゾーン
          </SectionButton>
          <SectionButton
            onClick={()=>setModalSection(1)}
            leftIcon={<MdInfo/>}
          >
            DEIZUについて
          </SectionButton>
        </>}

        {modalSection !== 0 &&
        <Stack>
          <SectionButton
            onClick={()=>setModalSection(0)}
            leftIcon={<MdArrowBack/>}
          >
            戻る
          </SectionButton>
          {modalSection === 1 && 
            <>
              <AlignItems style={{justifyContent: 'space-between'}}>
                <h3>データシートを繋げる</h3>
                <Button onClick={()=>router.push(`/datasheet`)}>データシートを探す</Button>
              </AlignItems>
              <p>データシートを繋げることで科目を時間割表に入力する作業がより早まります。</p>
              <Stack>
                {dataSheetName && <TextPreview style={{textAlign: 'center'}}>「{dataSheetName}」のデータシートに繋がっています</TextPreview>}
                <Input
                  placeholder={'データシートID'}
                  value={dataSheetId}
                  onChange={(e)=>setDataSheetId(e.target.value)}
                />
                <Button
                  onClick={()=>saveDataSheetId()}
                  width={"full"}
                >
                  データシートを繋げる
                </Button>
              </Stack>
            </>
          }
          {modalSection === 2 && 
            <>
              <h3>バナー画像</h3>
              <p>インターネット上にある画像URLを追加するとバナー画像として追加されます。</p>
              <Stack>
                <Input
                  placeholder={'画像URL'}
                  value={sheetImageUrl}
                  onChange={(e)=>setSheetImageUrl(e.target.value)}
                />
                <Button onClick={()=>saveSheetImageUrl()} width={"full"}>保存</Button>
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
                    icon={<MdLinkOff/>}
                    onClick={()=>shareSheet(false)}
                  >
                    ロック
                  </Button>:
                  <Button
                    icon={<MdLink/>}
                    onClick={()=>shareSheet(true)}
                  >
                    共有
                  </Button>}
                </AlignItems>
              </AlignItems>
              {shareSheetState &&
                <Stack>
                  <p>URLをコピーし他の人に送信することで時間割表を共有することができます。</p>
                  <Button
                    width={'full'}
                    onClick={() => copyAlert(`deizu.vercel.app/user/${user.uid}/sheet/${sheetName}`,'時間割表のリンク')}
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
                <p>「{sheetName}」を消去</p>
                <Button
                  icon={<MdDelete />}
                  onClick={async() => {
                      if (window.confirm("今開いている時間割表を消去したいですか？一度消去すると復旧することはできません。")) {
                        const docRef = doc(db, "users", user.uid);
                        await updateDoc(docRef, {[`sheets.${sheetName}`]: deleteField()});
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
      </Modal>

      {!sheetData ? <StaticScene type="loading"/>:
        <>
          {user ? 
            <>{sheetOwnerId === user.uid ? <Editor/>:<StaticScene type="accessDenied"/>}</>:
            <>{sheetData.sharing ? <Editor/>:<StaticScene type="accessDenied"/>}</>
          }
        </>
      }
    </>
  )
}

export async function getServerSideProps({ params }) {
    let sheetName = params.id;

    return {
      props: { sheetName }
    }
  }
  
export default IndivisualSheet