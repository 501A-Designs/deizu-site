import React,{useState} from 'react'

// Button Component
import Button from '../../../lib/button/Button'

import AlignItems from '../../../lib/style/AlignItems';
import BodyMargin from '../../../lib/style/BodyMargin';
import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';

import { auth,db,root } from "../../../src/service/firebase"
import { collection, doc,　DocumentData,　getDoc,　query,　setDoc, where } from "firebase/firestore";

import StaticScene from '../../../lib/style/StaticScene';

import moment from 'moment';
import 'moment/locale/ja';

import Stack from '../../../lib/style/Stack';

import { NextSeo } from 'next-seo';
import { FiChevronLeft, FiChevronRight, FiEdit2, FiImage, FiPlus, FiSave, FiSmile,FiArchive, FiCircle, FiExternalLink, FiFolder, FiFolderPlus, FiHeart, FiMoreHorizontal, FiDatabase, FiUsers, FiSettings, FiGrid, FiCalendar } from 'react-icons/fi';

import SheetContainer from '../../../lib/pages/dashboard/SheetContainer';
import Dialog from '../../../lib/component/Dialog';
import { useCollection } from 'react-firebase-hooks/firestore';
import { SheetDataTypes } from '../../../lib/pages/sheet/Editor';
import Footer from '../../../lib/component/Footer';
import { styled } from '../../../stitches.config';
import SideButton from '../../../lib/pages/dashboard/SideButton';
import ProfileImage from '../../../lib/pages/dashboard/ProfileImage';
import { TooltipLabel } from '../../../lib/component/TooltipLabel';
import Heading from '../../../lib/component/Heading';
import SettingDialogContent from '../../../lib/pages/dashboard/SettingDialogContent';
import CreateNewDialogContent from '../../../lib/pages/dashboard/CreateNewDialogContent';
import DataSheetButton from '../../../lib/button/DataSheetButton';
import CreateNewButton from '../../../lib/component/CreateNewButton';
import Container from '../../../lib/component/Container';

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

export interface SheetDocTypes{
  id:string,
  data():SheetDataTypes
}

export interface DataSheetDataTypes{
  id:string,
  data():{
    dataSheetName:string,
    dataSheetDescription:string,
    dataSheetImageUrl:string,
  }
}

function IndivisualUser() {
  const router = useRouter();
  const userId:string = `${router.query.userId}`;
  const [user, loadingUser] = useAuthState(auth);

  const [currentView, setCurrentView] = useState('main');
  const sheetCollectionRef = collection(db, `users/${user?.uid}/scheduleGrid/`);
  const [allSheetDataArray, allSheetDataArrayLoading] = useCollection<DocumentData>(query(sheetCollectionRef, where('archived', '==', false)));
  const [allSharedSheetDataArray, allSharedSheetDataArrayLoading] = useCollection<DocumentData>(query(sheetCollectionRef, where('sharing', '==', true)));
  const [allArchivedSheetDataArray, allArchivedSheetDataArrayLoading] = useCollection<DocumentData>(query(sheetCollectionRef,where('archived', '==', true)));
  const [dataSheetData] = useCollection<DocumentData>(query(collection(db, "sheets"),where('ownerId', '==', `${user?.uid}`)))

  return (
    <>
      {user &&
        <>
          <NextSeo
            title={`ダッシュボード`}
            description={`${user.displayName?.split(' ')[0]}さんのDeizuダッシュボード`}
          />
          {user.uid == userId &&
            <BodyMargin>
              <DashBoardAlignStyled>
                <SideBarContainerStyled>
                  <TooltipLabel
                    trigger={                
                      <ProfileImage
                        width='45'
                        height='45'
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
                      trigger={
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
                {currentView === 'datasheet' &&
                  <Stack>
                    <AlignItems justifyContent={'spaceBetween'}>
                      <Heading
                        type={'h1'}
                        margin={'0 0 0.5em 0.5em'} 
                      >
                        Datasheets
                      </Heading>
                      <Button
                       icon={<FiGrid/>}
                       size={'small'}
                       onClick={()=>router.push('/datasheet/')}
                      >
                        他のデータシートを見る
                      </Button>
                    </AlignItems>
                    <Stack gap={'0'}>
                      {
                        dataSheetData?.docs.map((datasheet) =>{
                          return (
                            <DataSheetButton
                              key={datasheet.id}
                              size={'large'}
                              public={datasheet.data().public}
                              dataSheetId={datasheet.id}
                              imageSource={datasheet.data().dataSheetImageUrl}
                              subtitle={datasheet.data().dataSheetDescription}
                              onClick={()=>router.push(`/datasheet/${datasheet.id}/`)}
                            >
                              {datasheet.data().dataSheetName}
                            </DataSheetButton>
                          )
                        })
                      }
                      {dataSheetData?.docs.length == 0 &&
                        <Container styleType={'gradient'}>
                          <AlignItems
                            justifyContent={'center'}
                          >
                            <FiDatabase/>
                            <h4>
                              データシートなし
                            </h4>
                          </AlignItems>
                        </Container>
                      }
                    </Stack>
                  </Stack>
                }
              </DashBoardAlignStyled>
              <Footer shadow>
                <AlignItems justifyContent={'center'}>
                  <Dialog
                    title={'新規作成'}
                    trigger={<CreateNewButton/>}
                  >
                    <CreateNewDialogContent
                      user={user}
                    />
                  </Dialog>
                </AlignItems>
              </Footer>
            </BodyMargin>
          }
        </>
      }
      {loadingUser && <StaticScene type="loading"/>}
    </>
  )
}

export default IndivisualUser