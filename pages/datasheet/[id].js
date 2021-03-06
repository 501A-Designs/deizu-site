import React,{useEffect, useState} from 'react'
import { MdArrowBack,MdOutlineViewList,MdOutlineViewModule,MdContentCopy } from "react-icons/md";
import { NextSeo } from 'next-seo';

import IconButton from '../../lib/component/IconButton'
import AlignItems from '../../lib/style/AlignItems';
import Container from '../../lib/component/Container';
import BodyMargin from '../../lib/style/BodyMargin';
import StaticScene from '../../lib/style/StaticScene';
import MockupCell from '../../lib/component/MockupCell';

import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from "../../src/service/firebase"
import { doc, getDoc,setDoc,arrayUnion } from "firebase/firestore";

import { buttonColor } from '../../lib/data/buttonColor'

import Button from '../../lib/component/Button';
import Input from '../../lib/component/Input';
import Stack from '../../lib/style/Stack';

import DataGrid from 'react-data-grid';
import ColorButton from '../../lib/component/ColorButton';

import {isMobile} from 'react-device-detect';
import { toast } from 'react-toastify';

function IndivisualSheet() {
  const router = useRouter();
  const dataSheetId = router.query.id;

  const [dataSheetData, setDataSheetData] = useState()
  const [rowState, setRowState] = useState([])
  
  const fetchData = () => {
    const docRef = doc(db, "sheets", dataSheetId);
    getDoc(docRef).then((doc) => {
      setDataSheetData(doc.data());
      setRowState(doc.data().dataSheet);
    })
    console.log('test')
  }
  // fetchData()
  useEffect(() => {
    fetchData()
  }, []);

  const [user] = useAuthState(auth);

  const columns = [
    { key: 'subjectName', name: '科目名', editable: true },
    { key: 'subjectDescription', name: '科目概要', editable: true },
    { key: 'subjectLink', name: 'URLリンク', editable: true },
    { key: 'subjectColor', name: '科目の色', editable: true },
  ];

  const [subjectNameInput, setSubjectNameInput] = useState('')
  const [subjectLinkInput, setSubjectLinkInput] = useState('')
  const [subjectDescriptionInput, setSubjectDescriptionInput] = useState('')
  const [subjectColorInput, setSubjectColorInput] = useState('')
  const [dataSheetCellView, setDataSheetCellView] = useState(true)

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

  const copySheetId = () =>{
    navigator.clipboard.writeText(`${dataSheetId}`);
    toast(`${dataSheetData.dataSheetName}のIDがコピーされました。`);
  }

  return (
    <>
      <NextSeo
        title={dataSheetData && dataSheetData.dataSheetName}
        description="DEIZU上のデータシート"
      />
      {!dataSheetData ?
        <StaticScene type="loading"/>:
        <>
          {user ? 
            <BodyMargin>
              <AlignItems
                style={{
                  marginBottom:'2em',
                  justifyContent: 'space-between'
                }}
              >
                <AlignItems>
                  <IconButton
                    icon={<MdArrowBack/>}
                    onClick={()=>router.push('/datasheet')}
                  >
                    戻る
                  </IconButton>
                </AlignItems>
                <AlignItems style={{flexDirection:'column', justifyContent: 'center'}}>
                  <h1 style={{margin:0,padding:0,textAlign: 'center'}}>{dataSheetData.dataSheetName}</h1>
                  <p style={{margin:0,padding:0,textAlign: 'center'}}>{dataSheetData.dataSheetDescription}</p>
                </AlignItems>
                <IconButton
                  icon={dataSheetCellView ? <MdOutlineViewList/>:<MdOutlineViewModule/>}
                  onClick={()=>{dataSheetCellView ? setDataSheetCellView(false):setDataSheetCellView(true)}}
                >
                  表示
                </IconButton>
              </AlignItems>
              <div className="grid-1fr-2fr">
                <Container>
                  {user ?               
                    <Stack gap={'1em'}>
                      <AlignItems style={{justifyContent: 'space-between'}}>
                        <h3>データを追加</h3>
                        <IconButton
                          onClick={() => copySheetId()}
                          icon={<MdContentCopy/>}
                        >
                          IDをコピー
                        </IconButton>
                      </AlignItems>
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
                        <Button onClick={(e) => insertNewSubjectData(e)} width="full">追加</Button>
                      }
                    </Stack>:
                    <Stack>
                      <h3>
                        閲覧のみ
                      </h3>
                      <p>データを追加するにはログインをする必要がございます。</p>
                      <Button onClick={()=> router.push('/app')}>ログイン・新規登録へ</Button>
                    </Stack>
                  }
                </Container>
                {dataSheetCellView ?
                  <div style={{display: 'grid', gridTemplateColumns:`${isMobile ? '1fr 1fr':'1fr 1fr 1fr'}`, height: 'fit-content',gap: '0.5em'}}>
                    {rowState && 
                      rowState.map(props =>{
                        return <MockupCell
                          key={props}
                          margin={0}
                          width={'100%'}
                          padding={'none'}
                          subjectCellName = {props.subjectName}
                          subjectCellLink = {props.subjectLink}
                          subjectCellColor = {props.subjectColor}
                          subjectCellDescription = {props.subjectDescription}
                        />
                      })
                    }
                  </div>:
                  <>            
                    {rowState && <DataGrid
                      columns={columns}
                      rows={rowState}
                      style={{
                        userSelect:'text',
                        borderRadius:'var(--r10)',
                      }}
                    />}
                  </>
                }
              </div>
            </BodyMargin>:
            <StaticScene type="notLoggedIn"/>
          }
        </>
      }
    </>
  )
}
  
export default IndivisualSheet