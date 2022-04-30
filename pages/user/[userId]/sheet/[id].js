import React,{useEffect, useState} from 'react'
import { MdHomeFilled, MdSettings,MdClose,MdLink,MdLinkOff,MdDelete,MdPerson } from "react-icons/md";

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
import { auth,db } from "../../../../src/service/firebase"
import { doc, getDoc,setDoc,serverTimestamp, updateDoc, deleteField } from "firebase/firestore";

import Modal from 'react-modal';
import moment from 'moment';
import { toast } from 'react-toastify';

// Data
import { modalStyle } from '../../../../lib/style/modalStyle'
import { scheduleCellId } from '../../../../lib/data/scheduleCellId'
import { buttonColor } from '../../../../lib/data/buttonColor'

import Head from 'next/head';

// Modal.setAppElement('#yourAppElement');
function IndivisualSheet({ sheetName }) {
  const router = useRouter();
  const [sheetData, setSheetData] = useState()
  const [sheetCellsData, setSheetCellsData] = useState()

  const [modalIsOpen, setModalIsOpen] = useState(false);

  moment.locale("ja");

  const sheetOwnerId = router.query.userId;
  
  const fetchData = () => {
    const docRef = doc(db, "users", sheetOwnerId);
    getDoc(docRef).then((doc) => {
      if (!doc.data().sheets[sheetName]) {
        router.push('/app') 
      }
      setSheetData(doc.data().sheets[sheetName]);
      setSheetCellsData(doc.data().sheets[sheetName].cells);
    })
  }
  
  useEffect(() => {
    fetchData()
    console.log('test')
  }, []);

  const [user] = useAuthState(auth);

  function ScheduleGrid() {
    let scheduleGridStyle ={
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
        // console.log(newObject)

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
        // fetchData()
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
            <AlignItems style={{justifyContent: 'center'}}>
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
        <div 
          style = {{
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
        </div>
        <p
          style = {{
            textAlign:'center',
            fontSize:'0.6em',
            color:'grey'
          }}
        >
          最終変更時：{sheetData.date.toDate().toDateString()}
        </p>
      </>
    )
  }


  const [shareSheetState, setShareSheetState] = useState(sheetData && sheetData.sharing)
  // Modal related
  const closeModal = () => setModalIsOpen(false);
  const openModal = () => {
    if (shareSheetState == undefined) {
      setShareSheetState(false);
    }
    setModalIsOpen(true)
  };

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
        <AlignItems style={{justifyContent: 'space-between', marginBottom:'1.5em'}}>
          {user ?
            <IconButton
              onClick={() => router.push(`/user/${user.uid}/`)}
              icon={<MdHomeFilled/>}
            >
              ダッシュボード
            </IconButton>:
            <IconButton
              onClick={() => router.push('/app')}
              icon={<MdPerson/>}
            >
              アカウント作成
            </IconButton>
          }
          <h1>{sheetName}</h1>
          {user ? 
            <IconButton
              onClick={()=>openModal()}
              icon={<MdSettings/>}
            >
              設定
            </IconButton>:
            <p>現在閲覧中</p>
          }
        </AlignItems>
        <ScheduleGrid/>
      </BodyMargin>
    )
  }
  
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
        <h3>共有設定</h3>
        <p>
          リンク共有を有効するとこのリンクにアクセスできる人は全て時間割を閲覧することができますのでご了承下さい。
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
        <hr/>
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