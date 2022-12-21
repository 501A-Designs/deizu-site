import React,{useEffect, useState} from 'react'
import { NextSeo } from 'next-seo';

import Button from '../../lib/button/Button';
import ColorButton from '../../lib/button/ColorButton';

import AlignItems from '../../lib/style/AlignItems';
import BodyMargin from '../../lib/style/BodyMargin';
import StaticScene from '../../lib/style/StaticScene';
import MockupCell from '../../lib/component/MockupCell';

import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,copyAlert,db } from "../../src/service/firebase"
import { doc, setDoc,arrayUnion, DocumentData } from "firebase/firestore";

import Input from '../../lib/component/Input';
import Stack from '../../lib/style/Stack';

import { FiLink2, FiLock, FiPlus, FiSave, FiSettings, FiTrash } from 'react-icons/fi';
import { useDocument } from 'react-firebase-hooks/firestore';
import Heading from '../../lib/component/Heading';
import Footer from '../../lib/component/Footer';
import Dialog from '../../lib/component/Dialog';
import CreateNewButton from '../../lib/component/CreateNewButton';
import { styled } from '../../stitches.config';
import ImageContainer from '../../lib/pages/sheet/ImageContainer';
import StatusBar from '../../lib/component/StatusBar';
import Toggle from '../../lib/component/Toggle';

import { buttonColor } from '../../lib/data/buttonColor';
import DataSheetSubjectCell from '../../lib/pages/datasheet/DataSheetSubjectCell';
import Container from '../../lib/component/Container';
import Key from '../../lib/component/Key';

const HexGrid = styled('div',{
  display:'grid',
  gap:'$1',
  '@bp1':{
    gridTemplateColumns:'1fr 1fr'
  },
  '@bp2':{
    gridTemplateColumns:'1fr 1fr 1fr 1fr'
  },
  '@bp3':{
    gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr'
  },
  '@bp4':{
    gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr 1fr'
  }
})

function IndivisualSheet() {
  const router = useRouter();
  const dataSheetId:string = `${router.query.id}`;
  const [dataSheetData] = useDocument<DocumentData>(doc(db, `sheets/${dataSheetId}`))
  const [user] = useAuthState(auth);

  const [deleteMode, setDeleteMode] = useState(false)

  const [subjectNameInput, setSubjectNameInput] = useState('')
  const [subjectLinkInput, setSubjectLinkInput] = useState('')
  const [subjectDescriptionInput, setSubjectDescriptionInput] = useState('')
  const [subjectColorInput, setSubjectColorInput] = useState('');

  const [isPublic, setIsPublic] = useState(!dataSheetData?.data()?.public)
  const togglePublicView = () =>{
    const docRef = doc(db, "sheets", dataSheetId);
    setDoc(docRef,{public:!isPublic}, { merge: true });
    setIsPublic(!isPublic);
  }

  const toggleDeleteMode = () => {
    setDeleteMode(deleteMode ? false:true);
  }

  useEffect(() => {
    const down = (e:any) => {
      if (e.key === 'x' && e.metaKey) {
        if (confirm('消去モード有効しますか？')) { 
          setDeleteMode(true);
        }
      }
      if (e.key === 'z' && e.metaKey) {
        setDeleteMode(false);
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])
  

  let isOwner:boolean = false;
  if (dataSheetData?.data()?.ownerId == user?.uid) {
    isOwner = true;
  }

  const insertNewSubjectData = async (e:any) => {
    e.preventDefault();
    const docRef = doc(db, "sheets", dataSheetId);
    setDoc(docRef,
      {
        dataSheet:
          arrayUnion({
            subjectName: subjectNameInput,
            subjectDescription: subjectDescriptionInput,
            subjectLink: subjectLinkInput,
            subjectColor: subjectColorInput,
          })
      }, { merge: true }
    );
    setSubjectNameInput('');
    setSubjectLinkInput('');
    setSubjectDescriptionInput('');
    setSubjectColorInput('');
  }

  interface DataSheetSubjectCellProps {
    subjectName:string,
    subjectLink?:string,
    subjectColor?:string,
    subjectDescription?:string,
  }

  return (
    <>
      <NextSeo
        title={dataSheetData?.data()?.dataSheetName}
        description="Deizu上のデータシート"
      />
      {!dataSheetData ?
        <StaticScene type="loading"/>:
        <>
          {user ? 
            <>
              {!dataSheetData?.data()?.public &&
                <Dialog
                  title={'権限を切り替える'}
                  trigger={
                    <StatusBar
                      status={'private'}
                      icon={<FiLock/>}
                    />
                  }
                >
                  <AlignItems justifyContent={'spaceBetween'}>
                    <p>一般公開</p>
                    <Toggle
                      defaultChecked={isPublic}
                      onClick={()=>togglePublicView()}
                    />
                  </AlignItems>
                </Dialog>
              }
              <ImageContainer
                id={dataSheetId}
                title={dataSheetData?.data()?.dataSheetName}
              >
                <AlignItems
                  marginBottom={'medium'}
                >
                  <Button
                    size={'small'}
                    onClick={() => copyAlert(dataSheetId)}
                    icon={<FiLink2/>}
                  >
                    IDをコピー
                  </Button>
                  <Dialog
                    title={'データシートの設定'}
                    trigger={
                      <Button
                        size={'icon'}
                        icon={<FiSettings/>}
                      >
                        設定
                      </Button>
                    }
                  >
                    <AlignItems justifyContent={'spaceBetween'}>
                      <p>一般公開</p>
                      <Toggle
                        defaultChecked={isPublic}
                        onClick={()=>togglePublicView()}
                      />
                    </AlignItems>
                    <AlignItems justifyContent={'spaceBetween'}>
                      <p>削除モード</p>
                      <Toggle
                        defaultChecked={deleteMode}
                        onClick={()=>toggleDeleteMode()}
                      />
                    </AlignItems>
                    <p>
                      ※消去モードは<Key>Cmd</Key>と<Key>X</Key>ですぐ切り替えることができ、<Key>Cmd</Key>と<Key>Z</Key>を押すと元に戻ることができます。
                    </p>
                  </Dialog>
                </AlignItems>
              </ImageContainer>
              <BodyMargin minHeight={'100vh'}>
                <p>
                  {dataSheetData?.data()?.dataSheetDescription}
                </p>
                <HexGrid>
                  {isOwner ?
                    <>
                      {dataSheetData?.data()?.dataSheet.map((props:DataSheetSubjectCellProps) =>{
                        return (
                          <DataSheetSubjectCell
                            enableDeleteMode={deleteMode}
                            data={props}
                            key={props.subjectName}
                            subjectName={props.subjectName}
                            subjectLink={props.subjectLink}
                            subjectColor={props.subjectColor}
                            subjectDescription={props.subjectDescription}
                          />
                        )
                      })}
                    </>:
                    <>
                      {/* {dataSheetData?.data()?.dataSheet.map(props =>{
                        return <MockupCell
                          key={props}
                          subjectName = {props.subjectName}
                          subjectLink = {props.subjectLink}
                          subjectColor = {props.subjectColor}
                          subjectDescription = {props.subjectDescription}
                        />
                      })} */}
                    </>
                  }
                </HexGrid>
              </BodyMargin>
              {user &&
                <Footer shadow>
                  <AlignItems justifyContent={'center'}>
                    <Dialog
                      title={'データを追加'}
                      trigger={<CreateNewButton/>}
                    >
                      <Stack>
                        <AlignItems justifyContent={'center'}>
                          <MockupCell
                            styleType={'display'}
                            subjectName = {subjectNameInput}
                            subjectLink = {subjectLinkInput}
                            subjectColor = {subjectColorInput}
                            subjectDescription = {subjectDescriptionInput}
                          />
                        </AlignItems>
                        <AlignItems
                          marginTop={'medium'}
                          marginBottom={'medium'}
                          justifyContent={'center'}
                        >
                          {buttonColor.map((props)=>
                            <ColorButton
                              key={props}
                              color={props}
                              onClick={() => {
                                setSubjectColorInput(props);
                              }}
                            />
                          )}
                        </AlignItems>
                        <Input
                          fullWidth
                          value={subjectNameInput}
                          onChange={(e)=>setSubjectNameInput(e.target.value)}
                          placeholder={'科目名'}
                        />
                        <Input
                          fullWidth
                          value={subjectDescriptionInput}
                          onChange={(e)=>setSubjectDescriptionInput(e.target.value)}
                          placeholder={'科目の概要'}
                        />
                        <Input
                          fullWidth
                          value={subjectLinkInput}
                          onChange={(e)=>setSubjectLinkInput(e.target.value)}
                          placeholder={'URLリンク'}
                        />
                        <Button
                          disabled={subjectNameInput ? false:true}
                          onClick={(e) => insertNewSubjectData(e)}
                          icon={<FiPlus/>}
                        >
                          追加
                        </Button>
                      </Stack>
                    </Dialog>
                  </AlignItems>
                </Footer>
              }
            </>:
            <StaticScene type="notLoggedIn"/>
          }
        </>
      }
    </>
  )
}
  
export default IndivisualSheet