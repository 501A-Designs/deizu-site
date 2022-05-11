import React,{useState,useEffect} from 'react'
import Button from '../../../lib/component/Button'
import IconButton from '../../../lib/component/IconButton'

import Banner from '../../../lib/component/Banner'

import { MdAddCircle,MdPalette,MdOutlineExitToApp,MdOutlineSearch,MdClose,MdCloudOff } from "react-icons/md";
import AlignItems from '../../../lib/style/AlignItems';
import Container from '../../../lib/component/Container';
import BodyMargin from '../../../lib/style/BodyMargin';
import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';

import { signOut } from 'firebase/auth'
import { auth,db,root } from "../../../src/service/firebase"
import { doc, getDoc,　setDoc } from "firebase/firestore";

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

function IndivisualUser() {
  const router = useRouter();
  const userId = router.query.userId;
  // const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [user, loading] = useAuthState(auth);
  const [loadSheet, setLoadSheet] = useState(false);
  const [theme, setTheme] = useState([]);
  const [themeColor, setThemeColor] = useState([]);
  const [userImageUrl, setUserImageUrl] = useState('');
  const [sheetTitle, setSheetTitle] = useState();
  const [sheetMetaData, setSheetMetaData] = useState([]);
  
  useEffect(() => {
    if (user) {      
      const docRef = doc(db, "users", user.uid);
      getDoc(docRef).then((doc) => {
        setUserImageUrl(doc.data().url ? doc.data().url:'');
        setThemeColor(doc.data().themeColor ? doc.data().themeColor:themeColorData[0].value);
        setTheme(doc.data().theme ? doc.data().theme:themeData[0].value);
        setSheetTitle(Object.keys(doc.data().sheets));

        let sheetMetaDataArray = [];
        // const convertArrayToObject = (array) => {
        //   const initialValue = {};
        //   return array.reduce((obj, cellId) => {
        //       return {
        //       ...obj,
        //       [cellId]: {
        //           [cellId]: '',
        //           [cellId + 'Link']: '',
        //           [cellId + 'Dscrp']: '',
        //           [cellId + 'Color']: ''
        //       }
        //       };
        //   }, initialValue);
        // }

        const sheetObject = doc.data().sheets
        if (Object.keys(doc.data().sheets).length > 0) {
          Object.keys(sheetObject).map(sheetName => {
            sheetMetaDataArray.push({
              sheetName: sheetName,
              imageUrl:doc.data().sheets[sheetName].imageUrl,
              sharing:doc.data().sheets[sheetName].sharing,
              date:doc.data().sheets[sheetName].date,
            })
          })
          setSheetMetaData(sheetMetaDataArray)
        }
      })
    }
  },[user])

  useEffect(() => {
    if (theme) {
      root?.style.setProperty("--r5", theme[0]);
      root?.style.setProperty("--r10", theme[1]);
    }
    if (themeColor) {        
      root?.style.setProperty("--system0", themeColor[0]);
      root?.style.setProperty("--system1", themeColor[1]);
      root?.style.setProperty("--system2", themeColor[2]);
      root?.style.setProperty("--system3", themeColor[3]);
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

  return (
    <>
      {user &&
        <>
          {user.uid == userId &&
            <>
              <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={modalStyle}
              >
                <Stack>
                  <AlignItems style={{justifyContent: 'space-between'}}>
                    <h2>見た目の設定</h2>
                    <IconButton icon={<MdClose/>} onClick={() =>closeModal()}>閉じる</IconButton>
                  </AlignItems>
                  <h3>背景画像</h3>
                  <Stack>
                    <Input
                      value={userImageUrl}
                      onChange={(e)=>setUserImageUrl(e.target.value)}
                      placeholder={'画像URL'}
                    />
                  </Stack>
                  <h3>テーマ</h3>
                  <Stack grid={'1fr 1fr 1fr'}>
                    {themeData.map((prop)=>{
                      return <ImageButton key={prop} onClick={()=>setTheme(prop.value)}>{prop.name}</ImageButton>
                    })}
                  </Stack>
                  <h3>色</h3>
                  <Stack grid={isMobile ? '1fr 1fr':'1fr 1fr 1fr 1fr'}>
                    {themeColorData.map((prop)=>{
                      return <ImageButton key={prop} onClick={()=>setThemeColor(prop.value)}>{prop.name}</ImageButton>
                    })}
                  </Stack>
                  <Button
                    width="full"
                    onClick={(e)=>saveThemeData(e)}
                  >
                    保存
                  </Button>
                </Stack>
              </Modal>
              {!loadSheet &&
                <BodyMargin>
                  <section className="grid-1fr-2fr">
                    <Stack>
                      <ImageContainer src={userImageUrl && userImageUrl}>
                        <AlignItems style={{justifyContent: 'space-between'}}>
                          <AlignItems style={{gap: '1.5em'}}>
                            <img style={{width: '3.5em', height: '3.5em', borderRadius:50}} src={user.photoURL} />
                            <Stack gap={'0'}>
                              <h1 style={{ margin: 0, padding: 0, fontSize: '1.5em'}}>{user.displayName.split(' ')[0]}</h1>
                              <p style={{ margin: 0, padding: 0 }}>{moment().format("MMM Do dddd")}</p>
                            </Stack>
                          </AlignItems>
                          <IconButton
                            onClick={() => openModal()}
                            icon={<MdPalette/>}
                          >
                            見た目の変更
                          </IconButton>
                        </AlignItems>
                      </ImageContainer>
                      {/* <Button
                        onClick={() => router.push(`/datasheet`)}
                        icon={<MdOutlineSearch/>}
                        >
                        データシートを閲覧
                      </Button> */}
                          {/* <Button
                            icon={<MdOutlineExitToApp/>}
                            onClick={()=> {
                              signOut(auth);
                              router.push('/app')
                            }}
                          >
                            ログアウト
                          </Button> */}
                    </Stack>
                      <Container>
                        {sheetTitle && 
                          <>
                            {sheetTitle.length > 0 && 
                              <AlignItems style={{justifyContent: 'space-between'}}>
                                <h1>Dashboard</h1>
                                <Button
                                  onClick={() => router.push(`/user/${user.uid}/sheet`)}
                                  icon={<MdAddCircle/>}
                                  >
                                  時間割作成
                                </Button>
                              </AlignItems>
                            }
                          </>
                        }
                        {sheetTitle && 
                          <Stack style={{marginTop:'1em'}}>
                            {sheetMetaData.map((prop) =>
                              <SheetButton
                                key={prop.sheetName}
                                imageSource={prop.imageUrl}
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
                                  <span style={{fontSize: '2em',color: 'var(--system3)'}}><MdCloudOff/></span>
                                  <h3 style={{color: 'var(--system3)'}}>時間割表が作成されていません</h3>
                                  <AlignItems>
                                    <Button
                                      onClick={() => router.push(`/user/${user.uid}/sheet`)}
                                      icon={<MdAddCircle/>}
                                    >
                                      時間割作成
                                    </Button>
                                  </AlignItems>
                                </AlignItems>
                              </AlignItems>
                              </>:
                              <p style={{textAlign:'center',color: 'var(--system3)'}}>時間表合計：{sheetTitle.length}枚</p>
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

// export async function getServerSideProps({ params }) {
//     let userId = params.id;
//     // let userId = params;

//     return {
//       props: { userId }
//     }
//   }
  
export default IndivisualUser