import React,{useEffect, useState} from 'react'
import LoadingBar from 'react-top-loading-bar'

import {MdHomeFilled,MdAddCircle, MdSettings,MdClose,MdLink,MdLinkOff,MdDelete,MdPerson,MdCalendarViewMonth,MdCalendarViewWeek,MdOutlineMediation,MdArrowForwardIos,MdPeopleAlt,MdImage,MdDangerous,MdInfo,MdArrowBack } from "react-icons/md";

import { NextSeo } from 'next-seo';

import {isMobile} from 'react-device-detect';

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
import { useDocument } from 'react-firebase-hooks/firestore';

import { auth,db,root } from "../../../../src/service/firebase"
import { doc, getDoc,setDoc,serverTimestamp, updateDoc, deleteField,collection, getDocs } from "firebase/firestore";

Modal.setAppElement('#__next');
import Modal from 'react-modal';
import moment from 'moment';
import 'moment/locale/ja';

import { toast } from 'react-toastify';
import { modalStyle } from '../../../../lib/style/modalStyle'

// Data
import { scheduleCellId } from '../../../../lib/data/scheduleCellId'
import { buttonColor } from '../../../../lib/data/buttonColor'

import Container from '../../../../lib/component/Container';
import ImageContainer from '../../../../lib/component/ImageContainer';
import SectionButton from '../../../../lib/component/SectionButton';
import TextPreview from '../../../../lib/component/TextPreview';
import DayOfWeek from '../../../../lib/schedule/DayOfWeek';
import LargeImageButton from '../../../../lib/component/LargeImageButton';


function IndivisualSheet() {
  const [progress, setProgress] = useState(0)
  const router = useRouter();

  // const sheetName = router.query.id;
  const sheetName = router.query.id;
  const sheetOwnerId = router.query.userId;

  const cellVerticalLocation =['a', 'b', 'c', 'd', 'e', 'f'];
  const timeCellLocation = [1,2,3,4,5,6,7]
  const [sheetData, setSheetData] = useState();
  const [sheetCellsData, setSheetCellsData] = useState();
  const [sheetTimeData, setSheetTimeData] = useState();

  const [sheetBannerImageUrl, setSheetBannerImageUrl] = useState();
  const [sheetBackgroundImageUrl, setSheetBackgroundImageUrl] = useState();

  const [shareSheetState, setShareSheetState] = useState()
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [dataSheetId, setDataSheetId] = useState()
  const [dataSheet, setDataSheet] = useState()
  const [dataSheetName, setDataSheetName] = useState();
  
  const [viewOnly, setViewOnly] = useState(true);

  const [user] = useAuthState(auth);      
  const [userSheetObject] = useDocument(doc(db, `users/${sheetOwnerId && sheetOwnerId}`));
  const thisSheet = userSheetObject && userSheetObject.data().sheets[sheetName && sheetName];
      
  useEffect(() => {
    setProgress(30)
    if (userSheetObject) {
      setSheetData(thisSheet);
      setSheetCellsData(thisSheet && thisSheet.cells);
      setSheetTimeData(thisSheet && thisSheet.time);
      setSheetBannerImageUrl(thisSheet && thisSheet.bannerImageUrl);
      setSheetBackgroundImageUrl(thisSheet && thisSheet.backgroundImageUrl);
      setShareSheetState(thisSheet && thisSheet.sharing);
      setDataSheetId(thisSheet && thisSheet.dataSheetId);

      root?.style.setProperty("--r5", userSheetObject && userSheetObject.data().theme[0]);
      root?.style.setProperty("--r10", userSheetObject && userSheetObject.data().theme[1]);
      for (let index = 0; index < 4; index++) {
        root?.style.setProperty(`--system${index}`, userSheetObject && userSheetObject.data().themeColor[index]);
      }
      root?.style.setProperty("--txtColor0", userSheetObject && userSheetObject.data().themeColor[4]);
      root?.style.setProperty("--txtColor1", userSheetObject && userSheetObject.data().themeColor[5]);
    }
    if (user) {
      if(sheetOwnerId === user.uid){
        setViewOnly(false);
      }
    }
    setProgress(100)
  },[sheetOwnerId, userSheetObject])
  
  const fetchDataSheet = (prop) =>{
    if (prop) {
      getDoc(doc(db, "sheets", prop)).then((doc) => {
        if(doc.data()){
          setDataSheet(doc.data().dataSheet);
          setDataSheetName(doc.data().dataSheetName);
        }else{
          alert("??????????????????????????????????????????")
        }
      })
    }else{
      console.log("removed");
    }
  }

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
      if (!viewOnly) {
        if (sheetCellsData) {
          if (sheetCellsData[prop]) {
            setSubjectCellName(sheetCellsData[prop][prop])
            setSubjectCellDescription(sheetCellsData[prop][prop+'Dscrp']);
            setSubjectCellColor(sheetCellsData[prop][prop+'Color']);
            setSubjectCellLink(sheetCellsData[prop][prop+'Link']);
          }
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


    // TIME MODAL
    const [timeModalIsOpen, setTimeModalIsOpen] = useState(false);
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');
    const [modalTimeNumber, setModalTimeNumber] = useState('');

    const closeTimeModal = () => {
      setTimeStart('')
      setTimeEnd('');
      setTimeModalIsOpen(false);
    }
    const openTimeModal = (prop) => {
      if (!viewOnly) {
        if (sheetTimeData) {
          if (sheetTimeData[prop]) {
            setTimeStart(sheetTimeData[prop].start);
            setTimeEnd(sheetTimeData[prop].end)
          }
        }else{
          setTimeStart('');
          setTimeEnd('');
        }
        setTimeModalIsOpen(true);
      }
    }
    const saveTimeData = async (e) => {
      e.preventDefault();
      let newObject = Object.assign({ ...sheetTimeData, 
        [modalTimeNumber]: {
          start: timeStart,
          end: timeEnd,
        } 
      })
      setSheetTimeData(newObject);
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef,
          {
            sheets:{
              [sheetName]: {
                date: serverTimestamp(),
                time:{
                  [modalTimeNumber]: {
                    start: timeStart,
                    end: timeEnd,
                  }
                }
              }
            },
          }, { merge: true }
      );
      closeTimeModal();
    }

    return (
      <>
        <Modal
          isOpen={cellModalIsOpen}
          onRequestClose={closeCellModal}
          style={modalStyle}
        >
          <Stack gap={'1em'}>
            <AlignItems style={{justifyContent: 'right'}}>
              <IconButton icon={<MdClose/>} onClick={() =>closeCellModal()}>?????????</IconButton>
            </AlignItems>
            <MockupCell
              subjectCellName = {subjectCellName}
              subjectCellLink = {subjectCellLink}
              subjectCellColor = {subjectCellColor}
              subjectCellDescription = {subjectCellDescription}
            />
            {dataSheetName &&             
              <>
                <h4 style={{textAlign: 'center', marginBottom:'0'}}>???{dataSheetName}???????????????????????????</h4>
                <AlignItems style={{overflowX:'scroll', padding:'1em'}}>
                  {dataSheet.map(prop => {
                    return <MockupCell
                      onClick={() => {
                        setSubjectCellName(prop.subjectName);
                        setSubjectCellLink(prop.subjectLink)
                        setSubjectCellColor(prop.subjectColor);
                        setSubjectCellDescription(prop.subjectDescription)
                      }}
                      key={prop}
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
                  key={props}
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
                placeholder={'?????????'}
              />
              <Input
                value={subjectCellLink}
                onChange={(e)=>setSubjectCellLink(e.target.value)}
                placeholder={'URL?????????'}
              />
              <Input
                value={subjectCellDescription}
                onChange={(e)=>setSubjectCellDescription(e.target.value)}
                placeholder={'?????????????????????'}
              />
            </Stack>
            <Button
              width="full"
              onClick={(e)=>saveSubjectData(e)}
            >
              ??????
            </Button>
          </Stack>
        </Modal>

        <Modal
          isOpen={timeModalIsOpen}
          onRequestClose={closeTimeModal}
          style={modalStyle}
        >
          <Stack gap={'1em'}>
            <AlignItems style={{justifyContent: 'right'}}>
              <IconButton icon={<MdClose/>} onClick={() =>closeTimeModal()}>?????????</IconButton>
            </AlignItems>
            <AlignItems style={{justifyContent: 'center'}}>
              <TextPreview>{timeStart ? timeStart:'?????????'}</TextPreview>
              <span>???</span>
              <TextPreview>{timeEnd ? timeEnd:'?????????'}</TextPreview>
            </AlignItems>
            <Stack>
              <Input
                type={'time'}
                value={timeStart}
                onChange={(e)=>setTimeStart(e.target.value)}
                placeholder={'?????????'}
              />
              <Input
                type={'time'}
                value={timeEnd}
                onChange={(e)=>setTimeEnd(e.target.value)}
                placeholder={'?????????'}
              />
            </Stack>
            <Button
              width="full"
              onClick={(e)=>saveTimeData(e)}
            >
              ??????
            </Button>
          </Stack>
        </Modal>

        {!listViewState && 
          <Stack
            grid={
              isMobile ? '1fr 1fr 1fr 1fr 1fr 1fr':'0.5fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr'
            }
            style={{
              marginBottom:'0.2em',
              gap: '0.2em'
            }}
          >
            {!isMobile && <div style={{width:'100%',minWidth:'46.47px'}}></div>}
            <DayOfWeek day={1}/>
            <DayOfWeek day={2}/>    
            <DayOfWeek day={3}/>    
            <DayOfWeek day={4}/>    
            <DayOfWeek day={5}/>    
            <DayOfWeek day={6}/>    
          </Stack>
        }
        <div className={listViewState && 'grid-1fr-3fr'}>
          {listViewState &&
            <Container>
              <h1>{moment().format('LT')}</h1>
              <h3>{moment().format('dddd')}</h3>
              <h4>?????????{moment().format('MMMM Do YYYY')}</h4>
            </Container>
          }
          <div 
            style={{
              display:'grid',
              gridTemplateColumns:`${isMobile ? '1fr':'0.5fr 9fr'}`,
              gap: '0.2em'
            }}
          >
            {!isMobile &&
              <Stack gap = {'0.2em'}>
                {
                  timeCellLocation.map(cellNumber => {
                    return <TimeCell
                        onClick={()=>{
                          openTimeModal(cellNumber);
                          setModalTimeNumber(cellNumber);
                        }}
                        key={cellNumber}
                        sheetTimeData={sheetTimeData}
                        displayPeriod={cellNumber}
                      />
                  })
                }
              </Stack>
            }
            {listViewState ? 
              <Stack gap={'0.2em'}>
                {scheduleCellId.filter(word => word.split('')[0] === cellVerticalLocation[moment().format('d')-1]).map(cellId =>
                  <SubjectCell
                    key={cellId}
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
                    key={cellId}
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
            color: 'var(--system3)'
          }}
        >
          {/* ??????????????????{sheetData && sheetData.date.toDate().toDateString()} */}
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
    await setDoc(docRef, {
      sheets:{[sheetName]:
        {
          bannerImageUrl:sheetBannerImageUrl,
          backgroundImageUrl:sheetBackgroundImageUrl,
        }
      }}, { merge: true });    
  }
  const shareSheet = async(prop) => {
    setShareSheetState(prop)
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef, {sheets:{[sheetName]:{sharing:prop}}}, { merge: true });
  }
  const copyAlert = (prop, message) => {
    navigator.clipboard.writeText(`${prop} `);
    toast(`${message}??????????????????????????????`);
  }


    // Datasheet fetching
    const [allDataSheetData, setAllDataSheetData] = useState()

    const fetchDataSheetData = async () => {
      const collectionRef = collection(db, "sheets");
      const querySnapshot = await getDocs(collectionRef);
      let sheetDataArray = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id)
        sheetDataArray.push(
          {
            dataSheetId: doc.id,
            dataSheetData: doc.data(),
          }
          );
        })
        setAllDataSheetData(sheetDataArray);
    }

  
  function Editor() {
    return (
      <BodyMargin>
        <ImageContainer style={{marginBottom:'1.5em'}} src={sheetBannerImageUrl}>
          <AlignItems style={{justifyContent: 'space-between'}}>
            {!viewOnly ?
              <AlignItems>
                <IconButton
                  onClick={() => router.push(`/user/${user.uid}/`)}
                  icon={<MdHomeFilled/>}
                >
                  ?????????????????????
                </IconButton>
                {!isMobile &&                
                  <IconButton
                    onClick={() => router.push(`/user/${user.uid}/sheet`)}
                    icon={<MdAddCircle/>}
                  >
                    ????????????
                  </IconButton>
                }
              </AlignItems>:
              <IconButton
                onClick={() => router.push('/app')}
                icon={<MdPerson/>}
              >
                ?????????????????????
              </IconButton>
            }
            <h1 className={'scaleFontLarge'}>{sheetName}</h1>
            {!viewOnly ?
              <AlignItems>
                {!isMobile &&
                  <IconButton
                    onClick={()=>{listViewState ? listView(false):listView(true)}}
                    icon={!listViewState ? <MdCalendarViewWeek/>:<MdCalendarViewMonth/>}
                  >
                    {!listViewState ? '???????????????':'??????????????????'}
                  </IconButton>
                }
                <IconButton
                  onClick={()=>openModal()}
                  icon={<MdSettings/>}
                >
                  ??????
                </IconButton>
              </AlignItems>:
              <p>?????????</p>
            }
          </AlignItems>
        </ImageContainer>
        <ScheduleGrid/>
      </BodyMargin>
    )
  }
  
  const [modalSection, setModalSection] = useState(0);
  return (
    <div
      style={{
        margin:0,
        padding:0,
        backgroundImage:`url(${sheetBackgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <NextSeo
        title={sheetName}
        description={"DEIZU???????????????????????????"}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        <AlignItems style={{justifyContent: 'space-between',marginBottom: '0.5em'}}>
          <h2>??????</h2>
          <IconButton
            icon={<MdClose/>}
            onClick={() =>???closeModal()}
          >
            ?????????
          </IconButton>
        </AlignItems>
        {modalSection === 0 && <>
          <SectionButton
            onClick={()=>{setModalSection(1);fetchDataSheetData();}}
            leftIcon={<MdOutlineMediation/>}
            rightIcon={<MdArrowForwardIos/>}
          >
            ??????????????????????????????
          </SectionButton>
          <SectionButton
            onClick={()=>setModalSection(2)}
            leftIcon={<MdImage/>}
            rightIcon={<MdArrowForwardIos/>}
          >
            ????????????????????????
          </SectionButton>
          <SectionButton
            onClick={()=>setModalSection(3)}
            leftIcon={<MdPeopleAlt/>}
            rightIcon={<MdArrowForwardIos/>}
          >
            ????????????
          </SectionButton>
          <SectionButton
            onClick={()=>setModalSection(4)}
            leftIcon={<MdDangerous/>}
            rightIcon={<MdArrowForwardIos/>}
          >
            ???????????????????????????
          </SectionButton>
          <SectionButton
            onClick={()=>router.push('/about')}
            leftIcon={<MdInfo/>}
          >
            Deizu????????????
          </SectionButton>
        </>}

        {modalSection !== 0 &&
        <Stack>
          <SectionButton
            onClick={()=>setModalSection(0)}
            leftIcon={<MdArrowBack/>}
          >
            ??????
          </SectionButton>
          {modalSection === 1 && 
            <>
              <AlignItems style={{justifyContent: 'space-between'}}>
                <h3 className={'scaleFontLarge'}>??????????????????????????????</h3>
                <Button onClick={()=>router.push(`/datasheet`)}>???????????????????????????</Button>
              </AlignItems>
              <div style={{overflowY:'scroll',height:'250px', padding:'0.5em'}}>
                <Stack>
                  {
                    allDataSheetData && allDataSheetData.map((prop) =>{
                      return (
                        <LargeImageButton
                          displayAddButton={true}
                          key={prop}
                          dataSheetId={prop.dataSheetId}
                          dataSheetName={prop.dataSheetData.dataSheetName}
                          imageSource={prop.dataSheetData.dataSheetImageUrl}
                          subtitle={prop.dataSheetData.dataSheetDescription}
                          onClick={() => router.push(`/datasheet/${prop.dataSheetId}`)}
                          currentDataSheetId={dataSheetId}
                          addDataSheetOnClick={()=>{
                            setDataSheetId(prop.dataSheetId);
                          }}
                        >
                          {prop.dataSheetData.dataSheetName}
                        </LargeImageButton>
                      )
                    })
                  }
                </Stack>
              </div>
              <p>
                ????????????????????????????????????????????????????????????????????????????????????????????????????????????
              </p>
              <Stack>
                {dataSheetName && 
                  <TextPreview style={{textAlign: 'center'}}>
                    ???{dataSheetName}????????????????????????????????????????????????
                  </TextPreview>
                }
                <Input
                  placeholder={'??????????????????ID'}
                  value={dataSheetId}
                  onChange={(e)=>setDataSheetId(e.target.value)}
                />
                <Button
                  onClick={()=>saveDataSheetId()}
                  width={"full"}
                >
                  ??????????????????????????????
                </Button>
              </Stack>
            </>
          }
          {modalSection === 2 && 
            <>
              <h3>????????????????????????</h3>
              <p>???????????????????????????????????????URL??????????????????????????????????????????????????????????????????????????????</p>
              <Stack>
                <Input
                  placeholder={'???????????????URL'}
                  value={sheetBannerImageUrl}
                  onChange={(e)=>setSheetBannerImageUrl(e.target.value)}
                />
                <Input
                  placeholder={'????????????URL'}
                  value={sheetBackgroundImageUrl}
                  onChange={(e)=>setSheetBackgroundImageUrl(e.target.value)}
                />
                <Button onClick={()=>saveSheetImageUrl()} width={"full"}>??????</Button>
              </Stack>
            </>
          }
          {modalSection === 3 &&         
            <>
              <h3>????????????</h3>
              <p>
                ???????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
              </p>
              <AlignItems style={{justifyContent: 'space-between'}}>
                <p>{shareSheetState ? ' ???????????????????????????????????????':'????????????????????????????????????'}</p>
                <AlignItems>
                  {shareSheetState ? <Button
                    icon={<MdLinkOff/>}
                    onClick={()=>shareSheet(false)}
                  >
                    ?????????
                  </Button>:
                  <Button
                    icon={<MdLink/>}
                    onClick={()=>shareSheet(true)}
                  >
                    ??????
                  </Button>}
                </AlignItems>
              </AlignItems>
              {shareSheetState &&
                <Stack>
                  <p>
                    URL???????????????????????????????????????????????????????????????????????????????????????????????????
                  </p>
                  <Button
                    width={'full'}
                    onClick={() => copyAlert(`deizu.vercel.app/user/${user.uid}/sheet/${sheetName}`,'????????????????????????')}
                  >
                    ????????????????????????????????????
                  </Button>
                </Stack>
              }
            </>
          }
          {modalSection === 4 &&         
            <>
              <h3>???????????????????????????</h3>
              <AlignItems style={{justifyContent: 'space-between'}}>
                <p>???{sheetName}????????????</p>
                <Button
                  icon={<MdDelete />}
                  onClick={async() => {
                      if (window.confirm("????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????")) {
                        const docRef = doc(db, "users", user.uid);
                        await updateDoc(docRef, {[`sheets.${sheetName}`]: deleteField()});
                        router.push('/app');
                      }
                    }
                  }
                >?????????????????????</Button>
              </AlignItems>
            </>
          }
        </Stack>
        }
      </Modal>
      <LoadingBar
        color='var(--system3)'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={300}
      />

      {!sheetData ? <StaticScene type="loading"/>:
        <>
          {user ? 
            <>
              {sheetOwnerId === user.uid ? 
                <Editor/>:
                <>
                  {sheetData.sharing ?
                    <Editor/>:
                    <StaticScene type="accessDenied"/>
                  }
                </>
              }
            </>:
            <>
              {sheetData.sharing ? 
                <Editor/>:
                <StaticScene type="accessDenied"/>
              }
            </>
          }
        </>
      }
    </div>
  )
}

export default IndivisualSheet