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
import { FiArrowLeft, FiEdit, FiLink2, FiLock, FiPlus } from 'react-icons/fi';
import { useDocument } from 'react-firebase-hooks/firestore';
import Heading from '../../lib/component/Heading';
import { TooltipLabel } from '../../lib/component/TooltipLabel';
import Footer from '../../lib/component/Footer';
import Dialog from '../../lib/component/Dialog';
import CreateNewButton from '../../lib/component/CreateNewButton';
import { styled } from '../../stitches.config';
import ImageContainer from '../../lib/pages/sheet/ImageContainer';
import StatusBar from '../../lib/component/StatusBar';
import Menu, { ItemStyled } from '../../lib/component/Menu';
import Toggle from '../../lib/component/Toggle';

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

  const insertNewSubjectData = async (e:any) => {
    e.preventDefault();
    const docRef = doc(db, "sheets", dataSheetId);
    // await getDoc(docRef).then((doc) => {
    //   console.log('inserting')
    // })
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

  const updatePublicView = () =>{

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
                  <Container index={'inner'}>
                    <Heading type={'h3'}>
                      公開設定
                    </Heading>
                    <AlignItems justifyContent={'spaceBetween'}>
                      <p>一般公開</p>
                      <Toggle
                        defaultChecked={false}
                        onClick={()=>updatePublicView()}
                      />
                    </AlignItems>
                  </Container>
                </Dialog>
              }
              <ImageContainer
                id={dataSheetId}
              >
                <AlignItems
                  gap={'medium'}
                  marginBottom={'small'}
                >
                  <Heading type={'h1'}>
                    {dataSheetData?.data()?.dataSheetName}
                  </Heading>
                </AlignItems>
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
                </AlignItems>
              </ImageContainer>
              <BodyMargin minHeight={'100vh'}>
                <p>
                  {dataSheetData?.data()?.dataSheetDescription}
                </p>
                <HexGrid>
                  {dataSheetData?.data()?.ownerId == user.uid ?
                    <>
                      <>
                        {dataSheetData?.data()?.dataSheet.map(props =>{
                          return <Dialog
                            title={'科目を編集'}
                            trigger={
                              <MockupCell
                                styleType={'button'}
                                key={props}
                                subjectName = {props.subjectName}
                                subjectLink = {props.subjectLink}
                                subjectColor = {props.subjectColor}
                                subjectDescription = {props.subjectDescription}
                              />
                            }
                          >
                            <Stack>
                              <AlignItems justifyContent={'center'}>
                                <MockupCell
                                  key={props}
                                  subjectName = {props.subjectName}
                                  subjectLink = {props.subjectLink}
                                  subjectColor = {props.subjectColor}
                                  subjectDescription = {props.subjectDescription}
                                />
                              </AlignItems>
                              <AlignItems
                                marginTop={'medium'}
                                marginBottom={'medium'}
                                justifyContent={'center'}
                              >
                                {buttonColor.map((colorProps)=>
                                  <ColorButton
                                    key={colorProps}
                                    color={colorProps}
                                    onClick={() => {
                                      setSubjectColorInput(colorProps);
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
                        })}
                      </>
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