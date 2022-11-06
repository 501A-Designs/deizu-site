import React,{useState,useEffect} from 'react'

// Button Component
import Button from '../../../lib/button/Button'

import AlignItems from '../../../lib/style/AlignItems';
import BodyMargin from '../../../lib/style/BodyMargin';
import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth,db,root } from "../../../src/service/firebase"
import { collection, doc,　DocumentData,　getDoc,　setDoc } from "firebase/firestore";

import { themeColorData } from '../../../lib/data/themeData'

import StaticScene from '../../../lib/style/StaticScene';

import moment from 'moment';
import 'moment/locale/ja';

import Stack from '../../../lib/style/Stack';

import ImageContainer from '../../../lib/pages/sheet/ImageContainer';
import Input from '../../../lib/component/Input';

import { NextSeo } from 'next-seo';
import { FiChevronLeft, FiChevronRight, FiEdit2, FiImage, FiPlus, FiSave, FiSmile,FiArchive, FiCircle, FiExternalLink, FiFolder, FiFolderPlus, FiHeart, FiMoreHorizontal, FiDatabase } from 'react-icons/fi';



import SectionButton from '../../../lib/button/SectionButton';
import ThemeButton from '../../../lib/button/ThemeButton';
import Image from 'next/image';
import { toast } from 'react-toastify';
import SheetContainer from '../../../lib/pages/dashboard/SheetContainer';
import Dialog from '../../../lib/component/Dialog';
import { useCollection } from 'react-firebase-hooks/firestore';
import { SheetDataTypes } from '../../../lib/pages/sheet/Editor';
import Container from '../../../lib/component/Container';
import Folder from '../../../lib/pages/dashboard/Folder';
import Footer from '../../../lib/component/Footer';
import { styled } from '../../../stitches.config';

export interface SheetDocTypes{
  id:string,
  data():SheetDataTypes
}

function IndivisualUser() {
  const router = useRouter();
  const userId:string = `${router.query.userId}`;
  const [user, loadingUser] = useAuthState(auth);

  const [sheetDataArray, sheetDataArrayLoading] = useCollection<DocumentData>(collection(db, `users/${user?.uid}/scheduleGrid/`));

  // const [themeColor, setThemeColor] = useState(themeColorData[0].value);
  // const [userImageUrl, setUserImageUrl] = useState('');

  // useEffect(() => {
  //   if (themeColor) {
  //     console.log(themeColor)
  //     for (let index = 0; index < 4; index++) {
  //       root?.style.setProperty(`--system${index}`, themeColor[index]);
  //     }
  //     root?.style.setProperty("--txtColor0", themeColor[4]);
  //     root?.style.setProperty("--txtColor1", themeColor[5]);
  //   }
  // },[themeColor])

  // const saveThemeData = async(e:any) => {
  //   e.preventDefault();
  //   const docRef = doc(db, "users", user.uid);
  //   await setDoc(docRef,
  //     {
  //       themeColor: themeColor,
  //       url:userImageUrl
  //     }, { merge: true }
  //   );
  //   toast('テーマ保存完了！');
  // }


  const DashBoardAlignStyled = styled('div',{
    display:'grid',
    gap:'2.3em',
    '@bp1_2':{
		  gridTemplateColumns: '1fr'
    },
    '@bp3_':{
		  gridTemplateColumns: '1fr 3.5fr'
    }
  })

  const [modalSection, setModalSection] = useState(0);

  return (
    <>
      {user &&
        <>
          <NextSeo
            title={`ダッシュボード`}
            description={`${user.displayName?.split(' ')[0]}さんのDeizuダッシュボード`}
          />
          {user.uid == userId &&
            <>
            <BodyMargin>
              <DashBoardAlignStyled>
                <Stack gap={'0.25em'}>
                  <Folder
                    selected
                    leftIcon={<FiFolder/>}
                  >
                    メイン
                  </Folder>
                  <Folder
                    leftIcon={<FiArchive/>}
                  >
                    アーカイブ
                  </Folder>
                  <Folder
                    leftIcon={<FiDatabase/>}
                    rightIcon={<FiExternalLink/>}
                  >
                    データシート
                  </Folder>
                </Stack>
                <SheetContainer
                  user={user}
                  sheetDataArray={sheetDataArray}
                />
              </DashBoardAlignStyled>
            </BodyMargin>
            <Footer
              css={{
                background: 'linear-gradient(transparent, $system2)',
                paddingBottom:'2em'
              }}
            >
              <AlignItems
                justifyContent={'center'}
              >
                <Image
                  width='31.33px'
                  height='31.33px'
                  style={{
                    borderRadius:50,
                    cursor: 'pointer',
                  }}
                  className={'profileImage'}
                  src={`${user.photoURL}`}
                  onClick={() => router.push('/user')}
                />
                <Button
                  size={'extraLarge'}
                  styleType={'primary'}
                  shape={'round'}
                  icon={<FiPlus/>}
                  onClick={() => 
                    router.push(`/user/${user.uid}/sheet`)
                  }
                >
                  新規作成
                </Button>
                <Dialog
                  title={'見た目の設定'}
                  openButton={
                    <Button
                      size={'small'}
                      styleType={'outline'}
                      shape={'round'}
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
                      {/* {modalSection === 1 &&
                        <Stack>
                          <ImageContainer src={userImageUrl?}>
                            <h2>あいうえお</h2>
                            <p>テキストが見えやすい背景画像を選ぶと良いです。</p>
                          </ImageContainer>
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
                      } */}
                    </Stack>
                  </Stack>
                </Dialog>

              </AlignItems>
            </Footer>
            </>
          }
        </>
      }
      {loadingUser && <StaticScene type="loading"/>}
    </>
  )
}

export default IndivisualUser