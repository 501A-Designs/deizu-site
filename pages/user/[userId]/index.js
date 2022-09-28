import React,{useState,useEffect} from 'react'

// Button Component
import Button from '../../../lib/button/Button'
import IconButton from '../../../lib/button/IconButton'
import SheetButton from '../../../lib/button/SheetButton';

import Banner from '../../../lib/component/Banner'

import AlignItems from '../../../lib/style/AlignItems';
import Container from '../../../lib/component/Container';
import BodyMargin from '../../../lib/style/BodyMargin';
import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth,db,root } from "../../../src/service/firebase"
import { doc,　getDoc,　setDoc } from "firebase/firestore";

Modal.setAppElement('#__next');
import Modal from 'react-modal';
import { modalStyle } from '../../../lib/style/modalStyle'
import { themeColorData } from '../../../lib/data/themeData'

import StaticScene from '../../../lib/style/StaticScene';

import moment from 'moment';
import 'moment/locale/ja';

import Stack from '../../../lib/style/Stack';

import ImageContainer from '../../../lib/component/ImageContainer';
import Input from '../../../lib/component/Input';

import {isBrowser, isMobile} from 'react-device-detect';
import { NextSeo } from 'next-seo';
import { useDocument } from 'react-firebase-hooks/firestore';
import { FiCalendar, FiChevronLeft, FiChevronRight, FiEdit2, FiImage, FiPlus, FiSmile } from 'react-icons/fi';
import ModalHeader from '../../../lib/component/ModalHeader';

import SectionButton from '../../../lib/button/SectionButton';
import ThemeButton from '../../../lib/button/ThemeButton';
import Image from 'next/image';
import { toast } from 'react-toastify';

function IndivisualUser() {
  const router = useRouter();
  const userId = router.query.userId;

  const [user, loading] = useAuthState(auth);
  const [loadSheet, setLoadSheet] = useState(false);
  const [themeColor, setThemeColor] = useState(themeColorData[0].value);
  const [userImageUrl, setUserImageUrl] = useState('');
  const [sheetTitle, setSheetTitle] = useState([]);
  const [sheetMetaData, setSheetMetaData] = useState([]);
  const [hovered, setHovered] = useState(false);
  
  // const [dashboardData] = useDocument(doc(db, `users/${user && user.uid}/`));
  const fetchData = async () => {
    const docRef = doc(db, "users", user.uid);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists()) {
      let doc = docSnapshot;
      setUserImageUrl(doc.data().url ? doc.data().url:'');
      setThemeColor(doc.data().themeColor ? doc.data().themeColor:themeColorData[0].value);
      setSheetTitle(Object.keys(doc.data().sheets));

      let sheetMetaDataArray = [];
      const sheetObject = doc.data().sheets;

      if (Object.keys(doc.data().sheets).length > 0) {
        Object.keys(sheetObject).map(sheetName => {
          sheetMetaDataArray.push({
            sheetName: sheetName,
            bannerImageUrl:doc.data().sheets[sheetName].bannerImageUrl,
            sharing:doc.data().sheets[sheetName].sharing,
            date:doc.data().sheets[sheetName].date,
          })
        })
        setSheetMetaData(sheetMetaDataArray)
      }
    }
  }


  useEffect(() => {user && fetchData()},[user]);

  useEffect(() => {
    if (themeColor) {
      console.log(themeColor)
      for (let index = 0; index < 4; index++) {
        root?.style.setProperty(`--system${index}`, themeColor[index]);
      }
      root?.style.setProperty("--txtColor0", themeColor[4]);
      root?.style.setProperty("--txtColor1", themeColor[5]);
    }
  },[themeColor])

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const saveThemeData = async(e) => {
    e.preventDefault();
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef,
      {
        themeColor: themeColor,
        url:userImageUrl
      }, { merge: true }
    );
    closeModal();
    toast('テーマ保存完了！');
  }

  const [modalSection, setModalSection] = useState(0);

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
                  {modalSection === 0 && 
                    <Stack>
                      <SectionButton
                        leftIcon={<FiImage/>}
                        rightIcon={<FiChevronRight/>}
                        onClick={()=>setModalSection(1)}
                      >
                        背景画像の設定
                      </SectionButton>
                      <SectionButton
                        leftIcon={<FiSmile/>}
                        rightIcon={<FiChevronRight/>}
                        onClick={()=>setModalSection(2)}
                      >
                        配色
                      </SectionButton>
                    </Stack>
                  }
                  <Stack>
                    {modalSection !== 0 &&
                      <SectionButton
                        leftIcon={<FiChevronLeft/>}
                        onClick={()=>setModalSection(0)}
                      >
                        戻る
                      </SectionButton>
                    }
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
                      <Stack grid={'1fr 1fr'}>
                        {themeColorData.map((prop)=>{
                          return (
                            <ThemeButton
                              key={prop.name}
                              data={prop.value}
                              currentTheme={themeColor}
                              onClick={()=>setThemeColor(prop.value)}
                            >
                              {prop.name}
                            </ThemeButton>
                          )
                        })}
                      </Stack>
                    }
                    {modalSection !== 0 &&
                      <Button
                        width="full"
                        onClick={(e)=>saveThemeData(e)}
                      >
                        保存
                      </Button>
                    }
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
                            <Image
                              width='60px'
                              height='60px'
                              style={{
                                borderRadius:50,
                                cursor: 'pointer',
                                border:'1px solid var(--system1)',
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
                    </Stack>
                    <Container>
                      {sheetTitle && 
                        <>
                          {sheetTitle.length > 0 && 
                            <AlignItems
                              style={{
                                justifyContent: `${isBrowser ? 'space-between':'center'}`,
                                marginBottom: '1em'
                              }}
                            >
                              {isBrowser && <h1>Dashboard</h1>}
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