import React,{useState,useEffect} from 'react'
import Button from '../../../lib/component/Button'
import IconButton from '../../../lib/component/IconButton'

import Banner from '../../../lib/component/Banner'

import AlignItems from '../../../lib/style/AlignItems';
import Container from '../../../lib/component/Container';
import BodyMargin from '../../../lib/style/BodyMargin';
import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth,db,root } from "../../../src/service/firebase"
import { doc,　setDoc } from "firebase/firestore";

Modal.setAppElement('#__next');
import Modal from 'react-modal';
import { modalStyle } from '../../../lib/style/modalStyle'
import { themeData, themeColorData } from '../../../lib/data/themeData'

import StaticScene from '../../../lib/style/StaticScene';

import moment from 'moment';
import 'moment/locale/ja';

import Stack from '../../../lib/style/Stack';
import ImageButton from '../../../lib/component/ImageButton';
import SheetButton from '../../../lib/component/SheetButton';

import ImageContainer from '../../../lib/component/ImageContainer';
import Input from '../../../lib/component/Input';

import {isMobile} from 'react-device-detect';
import { NextSeo } from 'next-seo';
import TabIconButton from '../../../lib/component/TabIconButton';
import { useDocument } from 'react-firebase-hooks/firestore';
import { FiCalendar, FiEdit2, FiImage, FiPlus, FiSmile } from 'react-icons/fi';
import ModalHeader from '../../../lib/component/ModalHeader';

function IndivisualUser() {
  const router = useRouter();
  const userId = router.query.userId;

  const [user, loading] = useAuthState(auth);
  const [loadSheet, setLoadSheet] = useState(false);
  const [theme, setTheme] = useState(themeData[0].value);
  const [themeColor, setThemeColor] = useState(themeColorData[0].value);
  const [userImageUrl, setUserImageUrl] = useState('');
  const [sheetTitle, setSheetTitle] = useState([]);
  const [sheetMetaData, setSheetMetaData] = useState([]);
  const [hovered, setHovered] = useState(false);
  
  const [dashboardData] = useDocument(doc(db, `users/${user && user.uid}/`));

  useEffect(() => {
    if (dashboardData) {      
      setUserImageUrl(dashboardData.data().url ? dashboardData.data().url:'');
      setThemeColor(dashboardData.data().themeColor ? dashboardData.data().themeColor:themeColorData[0].value);
      setTheme(dashboardData.data().theme ? dashboardData.data().theme:themeData[0].value);
      setSheetTitle(Object.keys(dashboardData.data().sheets));
      let sheetMetaDataArray = [];
      const sheetObject = dashboardData.data().sheets;
      if (Object.keys(dashboardData.data().sheets).length > 0) {
        Object.keys(sheetObject).map(sheetName => {
          sheetMetaDataArray.push({
            sheetName: sheetName,
            bannerImageUrl:dashboardData.data().sheets[sheetName].bannerImageUrl,
            sharing:dashboardData.data().sheets[sheetName].sharing,
            date:dashboardData.data().sheets[sheetName].date,
          })
        })
        setSheetMetaData(sheetMetaDataArray)
      }
    }
  },[user,dashboardData])

  useEffect(() => {
    // if (theme) {
    //   root?.style.setProperty("--r5", theme[0]);
    //   root?.style.setProperty("--r10", theme[1]);
    // }
    if (themeColor) {
      for (let index = 0; index < 4; index++) {
        root?.style.setProperty(`--system${index}`, themeColor[index]);
      }
      root?.style.setProperty("--txtColor0", themeColor[4]);
      root?.style.setProperty("--txtColor1", themeColor[5]);
    }
  },[themeColor, theme])

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const saveThemeData = async(e) => {
    e.preventDefault();
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef,
        {
          theme: theme,
          themeColor: themeColor,
          url:userImageUrl
        }, { merge: true }
    );
    closeModal()
  }

  const [modalSection, setModalSection] = useState(1);

  return (
    <>
      {user &&
        <>
          <NextSeo
            title={`ダッシュボード`}
            description={`${user.displayName.split(' ')[0]}さんのDEIZUダッシュボード`}
          />
          {user.uid == userId &&
            <>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyle}
              >
                <Stack>
                  <ModalHeader
                    header="見た目の設定"
                    onClick={() =>closeModal()}
                  />
                  <Stack grid={'1fr 1fr 1fr'}>
                    <TabIconButton
                      tabId={1}
                      sectionState={modalSection}
                      name="背景画像"
                      type="icon"
                      onClick={()=>setModalSection(1)}
                    >
                      <FiImage/>
                    </TabIconButton>
                    {/* <TabIconButton
                      tabId={2}
                      sectionState={modalSection}
                      name="テーマ"
                      type="icon"
                      onClick={()=>setModalSection(2)}
                    >
                      </>
                    </TabIconButton> */}
                    <TabIconButton
                      tabId={3}
                      sectionState={modalSection}
                      name="色"
                      type="icon"
                      onClick={()=>setModalSection(3)}
                    >
                      <FiSmile/>
                    </TabIconButton>
                  </Stack>
                  <Stack>
                    {modalSection === 1 &&
                      <Stack>
                        {userImageUrl && 
                          <ImageContainer src={userImageUrl && userImageUrl}>
                            <h2 style={{marginBottom:'0em'}}>あいうえお</h2>
                            <p style={{marginTop:'0em'}}>テキストが見えやすい背景画像を選ぶと良いです。</p>
                          </ImageContainer>
                        }
                        <Input
                          value={userImageUrl}
                          onChange={(e)=>setUserImageUrl(e.target.value)}
                          placeholder={'画像URL'}
                        />
                      </Stack>
                    }
                    {modalSection === 2 &&
                      <Stack grid={'1fr 1fr 1fr'}>
                        {themeData.map((prop)=>{
                          return <ImageButton key={prop} onClick={()=>setTheme(prop.value)}>{prop.name}</ImageButton>
                        })}
                      </Stack>
                    }

                    {modalSection === 3 &&
                      <Stack grid={isMobile ? '1fr 1fr':'1fr 1fr 1fr 1fr'}>
                        {themeColorData.map((prop)=>{
                          return <ImageButton key={prop} onClick={()=>setThemeColor(prop.value)}>{prop.name}</ImageButton>
                        })}
                      </Stack>
                    }
                    <Button
                      width="full"
                      onClick={(e)=>saveThemeData(e)}
                    >
                      保存
                    </Button>
                  </Stack>
                </Stack>
              </Modal>
              {!loadSheet &&
                <BodyMargin>
                  <section className="grid-1fr-2fr">
                    <Stack>
                      <ImageContainer
                        src={userImageUrl && userImageUrl}
                        onMouseEnter={()=>setHovered(true)}
                        onMouseLeave={()=>setHovered(false)}
                      >
                        <AlignItems style={{justifyContent: 'space-between'}}>
                          <AlignItems style={{gap: '1.5em'}}>
                            <img
                              style={{
                                width: '3.5em',
                                height: '3.5em',
                                borderRadius:50,
                                cursor: 'pointer',
                                border:'1px solid var(--system1)'
                              }}
                              className={'profileImage'}
                              src={user.photoURL}
                              onClick={() => router.push('/user')}
                            />
                            <Stack gap={'0'}>
                              <h1
                                style={{
                                  margin: 0,
                                  padding: 0,
                                  fontSize: '1.5em',
                                }}
                              >
                                {user.displayName.split(' ')[0]}
                              </h1>
                              <p
                                style={{
                                  margin: 0,
                                  padding: 0,
                                }}
                              >
                                {moment().format("MMM Do dddd")}
                              </p>
                            </Stack>
                          </AlignItems>
                          {
                            hovered && 
                            <div ref={parent}>
                              <IconButton
                                fill
                                onClick={() => openModal()}
                                icon={<FiEdit2/>}
                              >
                                見た目の変更
                              </IconButton>
                            </div>
                          }
                        </AlignItems>
                      </ImageContainer>
                      {/* <Button
                        onClick={() => router.push(`/datasheet`)}
                        icon={<MdOutlineSearch/>}
                        >
                        データシートを閲覧
                      </Button> */}
                    </Stack>
                    <Container>
                      {sheetTitle && 
                        <>
                          {sheetTitle.length > 0 && 
                            <AlignItems
                              style={{
                                justifyContent: 'space-between', marginBottom: '1em'
                              }}
                            >
                              <h1>Dashboard</h1>
                              <Button
                                onClick={() => router.push(`/user/${user.uid}/sheet`)}
                                icon={<FiPlus/>}
                                >
                                時間割作成
                              </Button>
                            </AlignItems>
                          }
                        </>
                      }
                      {sheetTitle && 
                        <Stack>
                          {sheetMetaData.map((prop) =>
                            <SheetButton
                              key={prop.sheetName}
                              imageSource={prop.bannerImageUrl}
                              onClick={() =>{
                                setLoadSheet(true);
                                router.push(`/user/${user.uid}/sheet/${prop.sheetName}`);
                              }}
                              sharing={prop.sharing}
                              date={prop.date.toDate().toDateString()}
                            >
                              {prop.sheetName}
                            </SheetButton>
                          )}
                        </Stack>
                      }


                      {
                        sheetTitle &&
                        <>
                          {sheetTitle.length <= 0 ?
                            <>
                            <Banner type="tutorial">
                              <ol>
                                <li>時間割表を作成</li>
                                <li>科目や時間を入力する</li>
                                <li>友達や家族と共有！</li>
                              </ol>
                            </Banner>
                            <AlignItems style={{height: '30vh', justifyContent: 'center'}}>
                              <AlignItems style={{justifyContent: 'center', flexDirection: 'column'}}>
                                <span
                                  style={{
                                    fontSize: '2em',
                                    color: 'var(--system3)'
                                  }}
                                >
                                  <FiCalendar/>
                                </span>
                                <h3 style={{color: 'var(--system3)'}}>時間割表が作成されていません</h3>
                                <AlignItems>
                                  <Button
                                    onClick={() => router.push(`/user/${user.uid}/sheet`)}
                                    icon={<FiPlus/>}
                                  >
                                    時間割作成
                                  </Button>
                                </AlignItems>
                              </AlignItems>
                            </AlignItems>
                            </>:
                            <p
                              style={{
                                textAlign:'center',
                                color: 'var(--system3)'
                              }}
                            >
                              時間表合計：{sheetTitle.length}枚
                            </p>
                          }
                        </>
                      }
                    </Container>
                  </section>
                </BodyMargin>
              }
            </>
          }
        </>
      }
      {loading || loadSheet ? <StaticScene type="loading"/>:
        <>
          {!user && <StaticScene type="accessDenied"/>}
        </>
      }
    </>
  )
}

export default IndivisualUser