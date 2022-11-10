import React,{useState} from 'react'

// Button Component
import Button from '../../../lib/button/Button'

import AlignItems from '../../../lib/style/AlignItems';
import BodyMargin from '../../../lib/style/BodyMargin';
import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth,db,root } from "../../../src/service/firebase"
import { collection, doc,　DocumentData,　getDoc,　query,　setDoc, where } from "firebase/firestore";

import { themeColorData } from '../../../lib/data/themeData'

import StaticScene from '../../../lib/style/StaticScene';

import moment from 'moment';
import 'moment/locale/ja';

import Stack from '../../../lib/style/Stack';

import ImageContainer from '../../../lib/pages/sheet/ImageContainer';
import Input from '../../../lib/component/Input';

import { NextSeo } from 'next-seo';
import { FiChevronLeft, FiChevronRight, FiEdit2, FiImage, FiPlus, FiSave, FiSmile,FiArchive, FiCircle, FiExternalLink, FiFolder, FiFolderPlus, FiHeart, FiMoreHorizontal, FiDatabase, FiUsers, FiSettings } from 'react-icons/fi';



import SectionButton from '../../../lib/button/SectionButton';
import ThemeButton from '../../../lib/button/ThemeButton';
import Image from 'next/image';
import { toast } from 'react-toastify';
import SheetContainer from '../../../lib/pages/dashboard/SheetContainer';
import Dialog from '../../../lib/component/Dialog';
import { useCollection } from 'react-firebase-hooks/firestore';
import { SheetDataTypes } from '../../../lib/pages/sheet/Editor';
import Container from '../../../lib/component/Container';
import Footer from '../../../lib/component/Footer';
import { styled } from '../../../stitches.config';
import SideButton from '../../../lib/pages/dashboard/SideButton';
import ProfileImage from '../../../lib/pages/dashboard/ProfileImage';
import { TooltipLabel } from '../../../lib/component/TooltipLabel';
import Toggle from '../../../lib/component/Toggle';
import Heading from '../../../lib/component/Heading';
import SettingDialogContent from '../../../lib/pages/dashboard/SettingDialogContent';

export interface SheetDocTypes{
  id:string,
  data():SheetDataTypes
}

function IndivisualUser() {
  const router = useRouter();
  const userId:string = `${router.query.userId}`;
  const [user, loadingUser] = useAuthState(auth);


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
    minHeight:'100vh',
    '@bp1':{
      gap:'1em',
    },
    '@bp2_':{
      display:'grid',
      gridTemplateColumns:'1fr 6fr',
      gap:'2em',
    }
  })


  const SideBarContainerStyled = styled('div',{
    display:'flex',
    gap:'$1',
    alignItems:'center',
    '@bp1':{
      justifyContent:'space-between',
      flexDirection:'row',
      width:'100%',
      marginBottom:'$4'
    },
    '@bp2_':{
      flexDirection:'column',
      marginTop:'$2'
    }
  })
  const SideBarStyled = styled('div',{
    display:'flex',
    alignItems:'center',
    gap:'$1',
    '@bp1':{
      flexDirection:'row',
    },
    '@bp2_':{
      flexDirection:'column',
      marginTop:'$2'
    }
  })

  const CreateNewButton = styled('button',{
    cursor:'pointer',
    padding: '$3',
    fontSize:'$xxl',
    display:'flex',
    alignItems:'center',
    borderRadius:'$rounded',
    color: '$gray12',
    background: 'linear-gradient($gray2,$gray5)',
    border: '1px solid $gray5',
    transition:'$speed1',
    '&:hover': {
      boxShadow: '$small',
      color: '$gray1',
      background: '$gray12',
      transform:'scale(1.06) rotate(360deg)'
    },
  })


  const [modalSection, setModalSection] = useState(0);
  const [currentView, setCurrentView] = useState('main');
  const sheetCollectionRef = collection(db, `users/${user?.uid}/scheduleGrid/`);
  const [allSheetDataArray, allSheetDataArrayLoading] = useCollection<DocumentData>(query(sheetCollectionRef, where('archived', '==', false)));
  const [allSharedSheetDataArray, allSharedSheetDataArrayLoading] = useCollection<DocumentData>(query(sheetCollectionRef, where('sharing', '==', true)));
  const [allArchivedSheetDataArray, allArchivedSheetDataArrayLoading] = useCollection<DocumentData>(query(sheetCollectionRef,where('archived', '==', true)));

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
                <SideBarContainerStyled>
                  {/* <Image
                    width='31.33px'
                    height='31.33px'
                    style={{
                      borderRadius:50,
                      cursor: 'pointer',
                    }}
                    className={'profileImage'}
                    /> */}
                  <TooltipLabel
                    trigger={                     
                      <ProfileImage
                        width='45px'
                        height='45px'
                        src={user.photoURL}
                        onClick={() => router.push('/user')}
                      />
                    }
                    side={'right'}
                  >
                    プロフィールを開く
                  </TooltipLabel>
                  <SideBarStyled>
                    <SideButton
                      icon={<FiFolder/>}
                      selected={currentView == 'main'}
                      onClick={()=> setCurrentView('main')}
                    >
                      時間割表を開く
                    </SideButton>
                    <SideButton
                      icon={<FiUsers/>}
                      selected={currentView == 'shared'}
                      onClick={()=> setCurrentView('shared')}
                    >
                      時間割表を開く
                    </SideButton>
                    <SideButton
                      icon={<FiArchive/>}
                      selected={currentView == 'archive'}
                      onClick={()=> setCurrentView('archive')}
                    >
                      アーカイブを開く
                    </SideButton>
                    <SideButton
                      icon={<FiDatabase/>}
                      selected={currentView == 'datasheet'}
                      onClick={()=> setCurrentView('datasheet')}
                    >
                      作成したデータシートを見る
                    </SideButton>
                    <Dialog
                      title={'設定'}
                      openButton={
                        <SideButton
                          icon={<FiSettings/>}
                        >
                          設定
                        </SideButton>
                      }
                    >
                      <SettingDialogContent/>
                    </Dialog>
                  </SideBarStyled>
                </SideBarContainerStyled>
                {currentView == 'main' &&
                  <SheetContainer
                    title={'Main'}
                    user={user}
                    sheetDataArray={allSheetDataArray}
                    currentView={currentView}
                  />
                }
                {currentView == 'shared' &&
                  <SheetContainer
                    title={'Sharing'}
                    user={user}
                    sheetDataArray={allSharedSheetDataArray}
                    currentView={currentView}
                  />
                }
                {currentView == 'archive' &&
                  <SheetContainer
                    title={'Archive'}
                    user={user}
                    sheetDataArray={allArchivedSheetDataArray}
                    currentView={currentView}
                  />
                }
              </DashBoardAlignStyled>
              <Footer
                css={{
                  background: 'radial-gradient(at bottom, $gray2,transparent 50%)',
                  backgroundPosition:'bottom',
                  paddingBottom:'2em'
                }}
              >
                <AlignItems
                  justifyContent={'center'}
                >
                  <CreateNewButton
                    onClick={() => 
                      router.push(`/user/${user.uid}/sheet`)
                    }
                  >
                    <FiPlus/>
                  </CreateNewButton>
                </AlignItems>
              </Footer>
            </BodyMargin>
            </>
          }
        </>
      }
      {loadingUser && <StaticScene type="loading"/>}
    </>
  )
}

export default IndivisualUser