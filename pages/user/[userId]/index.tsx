import React,{useState,useEffect} from 'react'

// Button Component
import Button from '../../../lib/button/Button'
import SheetButton from '../../../lib/button/SheetButton';

import AlignItems from '../../../lib/style/AlignItems';
import BodyMargin from '../../../lib/style/BodyMargin';
import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth,db,root } from "../../../src/service/firebase"
import { doc,　getDoc,　setDoc } from "firebase/firestore";

import { themeColorData } from '../../../lib/data/themeData'

import StaticScene from '../../../lib/style/StaticScene';

import moment from 'moment';
import 'moment/locale/ja';

import Stack from '../../../lib/style/Stack';

import ImageContainer from '../../../lib/pages/sheet/ImageContainer';
import Input from '../../../lib/component/Input';

import { NextSeo } from 'next-seo';
import { FiChevronLeft, FiChevronRight, FiEdit2, FiImage, FiSave, FiSmile } from 'react-icons/fi';

import SectionButton from '../../../lib/button/SectionButton';
import ThemeButton from '../../../lib/button/ThemeButton';
import Image from 'next/image';
import { toast } from 'react-toastify';
import SheetContainer from '../../../lib/pages/dashboard/SheetContainer';
import Dialog from '../../../lib/component/Dialog';

function IndivisualUser() {
  const router = useRouter();
  const userId = router.query.userId;

  const [user, loading] = useAuthState(auth);
  const [loadSheet, setLoadSheet] = useState(false);
  const [themeColor, setThemeColor] = useState(themeColorData[0].value);
  const [userImageUrl, setUserImageUrl] = useState('');

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

  const saveThemeData = async(e:any) => {
    e.preventDefault();
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef,
      {
        themeColor: themeColor,
        url:userImageUrl
      }, { merge: true }
    );
    toast('テーマ保存完了！');
  }

  const [modalSection, setModalSection] = useState(0);

  return (
    <>
      {user &&
        <>
          <NextSeo
            title={`ダッシュボード`}
            description={`${user.displayName.split(' ')[0]}さんのDeizuダッシュボード`}
          />
          {user.uid == userId &&
            <>
              {!loadSheet &&
                <BodyMargin>
                  <section className="grid-1fr-2fr">
                    <Stack>
                      <ImageContainer
                        src={userImageUrl && userImageUrl}
                      >
                        <AlignItems justifyContent={'spaceBetween'}>
                          <AlignItems gap={'medium'}>
                            <Image
                              width='60px'
                              height='60px'
                              style={{
                                borderRadius:50,
                                cursor: 'pointer',
                                border:'1px solid var(--system1)',
                              }}
                              className={'profileImage'}
                              src={`${user.photoURL}`}
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
                          <Dialog
                            title={'見た目の設定'}
                            openButton={
                              <Button
                                size={'small'}
                                icon={<FiEdit2/>}
                              >
                                見た目の設定
                              </Button>
                            }
                          >
                            <Stack>
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
                                      fullWidth
                                      value={userImageUrl}
                                      onChange={(e:any)=>setUserImageUrl(e.target.value)}
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
                                    icon={<FiSave/>}
                                    onClick={(e)=>saveThemeData(e)}
                                  >
                                    保存
                                  </Button>
                                }
                              </Stack>
                            </Stack>
                          </Dialog>
                        </AlignItems>
                      </ImageContainer>
                    </Stack>
                    
                    <SheetContainer user={user}/>
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