import React,{useEffect, useState} from 'react'
import { MdArrowBack,MdOutlineViewList,MdOutlineViewModule,MdContentCopy } from "react-icons/md";
import { NextSeo } from 'next-seo';

import Button from '../../lib/button/Button';
import ColorButton from '../../lib/button/ColorButton';

import AlignItems from '../../lib/style/AlignItems';
import Container from '../../lib/component/Container';
import BodyMargin from '../../lib/style/BodyMargin';
import StaticScene from '../../lib/style/StaticScene';
import MockupCell from '../../lib/component/MockupCell';

import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,copyAlert,db } from "../../src/service/firebase"
import { doc, getDoc,setDoc,arrayUnion, DocumentData } from "firebase/firestore";

import { buttonColor } from '../../lib/data/buttonColor'

import Input from '../../lib/component/Input';
import Stack from '../../lib/style/Stack';

import {isMobile} from 'react-device-detect';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiLink2 } from 'react-icons/fi';
import { useDocument } from 'react-firebase-hooks/firestore';
import Heading from '../../lib/component/Heading';
import { TooltipLabel } from '../../lib/component/TooltipLabel';
import Footer from '../../lib/component/Footer';
import Dialog from '../../lib/component/Dialog';
import CreateNewButton from '../../lib/component/CreateNewButton';
import { styled } from '../../stitches.config';

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

  const [subjectNameInput, setSubjectNameInput] = useState('')
  const [subjectLinkInput, setSubjectLinkInput] = useState('')
  const [subjectDescriptionInput, setSubjectDescriptionInput] = useState('')
  const [subjectColorInput, setSubjectColorInput] = useState('')

  const insertNewSubjectData = async (e) => {
    e.preventDefault();
    const docRef = doc(db, "sheets", dataSheetId);
    await getDoc(docRef).then((doc) => {
      console.log('inserting')
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
    })
    setRowState([...rowState, 
      {
        subjectName: subjectNameInput,
        subjectDescription: subjectDescriptionInput,
        subjectLink: subjectLinkInput,
        subjectColor: subjectColorInput,
      }
    ])
    setSubjectNameInput('');
    setSubjectLinkInput('');
    setSubjectDescriptionInput('');
    setSubjectColorInput('');
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
            <BodyMargin>
              <AlignItems
                justifyContent={'spaceBetween'}
              >
                <AlignItems
                  gap={'medium'}
                >
                  <Button
                    size={'icon'}
                    icon={<FiArrowLeft/>}
                    onClick={()=>router.push('/datasheet')}
                  >
                    戻る
                  </Button>
                  <Heading type={'h1'}>{dataSheetData?.data()?.dataSheetName}</Heading>
                </AlignItems>
                <Button
                  size={'small'}
                  onClick={() => copyAlert(dataSheetId)}
                  icon={<FiLink2/>}
                >
                  IDをコピー
                </Button>
              </AlignItems>
              <p>
                {dataSheetData?.data()?.dataSheetDescription}
              </p>
              <HexGrid>
                {dataSheetData?.data()?.dataSheet.map(props =>{
                    return <MockupCell
                      key={props}
                      subjectName = {props.subjectName}
                      subjectLink = {props.subjectLink}
                      subjectColor = {props.subjectColor}
                      subjectDescription = {props.subjectDescription}
                    />
                  })
                }
              </HexGrid>
              {user &&
                <Footer shadow>
                  <AlignItems justifyContent={'center'}>
                    <Dialog
                      title={'データを追加'}
                      trigger={<CreateNewButton/>}
                    >
                      <p>
                        データを一度追加すると消去することができませんのでご了承下さい。
                      </p>
                      <Stack>
                        <Input
                          value={subjectNameInput}
                          onChange={(e)=>setSubjectNameInput(e.target.value)}
                          placeholder={'科目名'}
                        />
                        <Input
                          value={subjectDescriptionInput}
                          onChange={(e)=>setSubjectDescriptionInput(e.target.value)}
                          placeholder={'科目の概要'}
                        />
                        <Input
                          value={subjectLinkInput}
                          onChange={(e)=>setSubjectLinkInput(e.target.value)}
                          placeholder={'URLリンク'}
                        />
                        {subjectColorInput && <p>科目の色：{subjectColorInput}</p>}
                        <Stack grid={'1fr 1fr 1fr 1fr 1fr 1fr'}>
                          {buttonColor.map((props)=>
                            <ColorButton
                              key={props}
                              width={'100%'}
                              color={props}
                              onClick={() => {
                                setSubjectColorInput(props);
                              }}
                            />
                          )}
                        </Stack>
                      </Stack>
                      {subjectNameInput && 
                        <Button
                          onClick={(e) => insertNewSubjectData(e)} width="full"
                        >
                          追加
                        </Button>
                      }
                    </Dialog>
                  </AlignItems>
                </Footer>
              }
            </BodyMargin>:
            <StaticScene type="notLoggedIn"/>
          }
        </>
      }
    </>
  )
}
  
export default IndivisualSheet