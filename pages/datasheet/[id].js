import React,{useEffect, useState} from 'react'
import { MdArrowBack,MdOutlineViewList,MdOutlineViewModule } from "react-icons/md";

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

import Modal from 'react-modal';
import moment from 'moment';
import Button from '../../lib/component/Button';
import Input from '../../lib/component/Input';

import Head from 'next/head';
import Stack from '../../lib/style/Stack';
import Image from 'next/image';

import DataGrid from 'react-data-grid';
import ColorButton from '../../lib/component/ColorButton';
// Modal.setAppElement('#yourAppElement');

function IndivisualSheet({ dataSheetId }) {
  const router = useRouter();
  const [dataSheetData, setDataSheetData] = useState()

  moment.locale("ja");

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

  // const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [user, loading, error] = useAuthState(auth);

  const columns = [
    { key: 'subjectName', name: '科目名', editable: true },
    { key: 'subjectDescription', name: '科目概要', editable: true },
    { key: 'subjectLink', name: 'URLリンク', editable: true },
    { key: 'subjectColor', name: '科目の色', editable: true },
  ];
  
  const rows = [
    {
      subjectName: 0,
      subjectDescription: 'Example',
      subjectLink: 'this is the subject link',
      subjectColor: '#hexcode'
    },
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

  return (
    <>
      <Head>
        <title>{dataSheetData && dataSheetData.dataSheetName}</title>
      </Head>
      {dataSheetData &&
        <BodyMargin>
          <AlignItems style={{marginBottom:'2em', justifyContent: 'space-between'}}>
            <AlignItems>
              <IconButton icon={<MdArrowBack/>} onClick={()=>router.push('/datasheet')}>戻る</IconButton>
            </AlignItems>
            <AlignItems style={{flexDirection:'column', justifyContent: 'center'}}>
              <h1 style={{margin:0,padding:0}}>{dataSheetData.dataSheetName}</h1>
              <p style={{margin:0,padding:0}}>{dataSheetData.dataSheetDescription}</p>
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
              <Stack gap={'1em'}>
                <h3>データを追加</h3>
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
                        width={'100%'}
                        color={props}
                        onClick={() => {
                          setSubjectColorInput(props);
                        }}
                      />
                    )}
                  </Stack>
                </Stack>
                <Button onClick={(e) => insertNewSubjectData(e)} width="full">追加</Button>
              </Stack>
            </Container>
            {dataSheetCellView ?
              <div style={{display: 'grid', gridTemplateColumns:'1fr 1fr 1fr', height: 'fit-content',gap: '0.5em'}}>
                {rowState && 
                  rowState.map(props =>{
                    return <MockupCell
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
                    border:'none',
                    borderRadius:'var(--r10)',
                  }}
                />}
              </>
            }
          </div>
        </BodyMargin>
      }
      {/* <Button onClick={docSnap}>bruh</Button> */}
      {loading ? <StaticScene type="loading"/>:
        <>
          {!user && <StaticScene type="accessDenied"/>}
        </>
      }
    </>
  )
}

export async function getServerSideProps({ params }) {
    let dataSheetId = params.id;

    return {
      props: { dataSheetId }
    }
  }
  
export default IndivisualSheet