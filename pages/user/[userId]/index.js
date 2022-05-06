import React,{useState,useEffect} from 'react'
import Button from '../../../lib/component/Button'
import IconButton from '../../../lib/component/IconButton'

import { MdAddCircle,MdPalette,MdOutlineExitToApp,MdOutlineSearch } from "react-icons/md";
import AlignItems from '../../../lib/style/AlignItems';
import Container from '../../../lib/component/Container';
import BodyMargin from '../../../lib/style/BodyMargin';
import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db,root } from "../../../src/service/firebase"
import { doc, getDoc,setDoc } from "firebase/firestore";

import Modal from 'react-modal';
import { modalStyle } from '../../../lib/style/modalStyle'
import { themeData, themeColorData } from '../../../lib/data/themeData'

import StaticScene from '../../../lib/style/StaticScene';

import moment from 'moment';
import Stack from '../../../lib/style/Stack';
import ImageButton from '../../../lib/component/ImageButton';
import ImageContainer from '../../../lib/component/ImageContainer';
import Input from '../../../lib/component/Input';

function IndivisualUser() {
  const router = useRouter();
  const userId = router.query.userId;
  moment.locale("ja");
  console.log(userId);
  // const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [user, loading] = useAuthState(auth);
  const [theme, setTheme] = useState();
  const [themeColor, setThemeColor] = useState();
  const [userImageUrl, setUserImageUrl] = useState();
  const [sheetTitle, setSheetTitle] = useState();
  
  useEffect(() => {
    if (user) {      
      const docRef = doc(db, "users", user.uid);
      getDoc(docRef).then((doc) => {
        setUserImageUrl(doc.data().url);
        setThemeColor(doc.data().themeColor);
        setTheme(doc.data().theme);
        setSheetTitle(Object.keys(doc.data().sheets));
      })
      console.log('test')
    }
    console.log(userImageUrl)
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
                  <h2>見た目の設定</h2>
                  <h3>背景画像</h3>
                  <Stack>
                    <Input placeholder={'画像URL'}/>
                  </Stack>
                  <h3>テーマ</h3>
                  <Stack grid={'1fr 1fr 1fr'}>
                    {themeData.map((prop)=>{
                      return <ImageButton onClick={()=>setTheme(prop.value)}>{prop.name}</ImageButton>
                    })}
                  </Stack>
                  <h3>色</h3>
                  <Stack grid={'1fr 1fr 1fr 1fr'}>
                    {themeColorData.map((prop)=>{
                      return <ImageButton onClick={()=>setThemeColor(prop.value)}>{prop.name}</ImageButton>
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
              <BodyMargin>
                <section className="grid-1fr-2fr">
                  <Stack>
                    <ImageContainer src={userImageUrl && userImageUrl}>
                      <AlignItems style={{justifyContent: 'space-between'}}>
                        <AlignItems style={{gap: '1em'}}>
                          <img style={{width: '3em', height: '3em', borderRadius:50}} src={user.photoURL} />
                          <h1 style={{ fontSize: '2em'}}>{user.displayName.split(' ')[0]}</h1>
                        </AlignItems>
                        <IconButton
                          onClick={() => openModal()}
                          icon={<MdPalette/>}
                        >
                          見た目の変更
                        </IconButton>
                      </AlignItems>
                    </ImageContainer>
                    <Container style={{display: 'grid',gridTemplateColumns:'1fr'}}>
                      <p>{user.email}</p>
                      <h2 style={{ fontSize: '1em',marginBottom: '1.5em'}}>本日は：{moment().format("MMM Do dddd")}</h2>
                      <AlignItems>
                        <Button icon={<MdOutlineExitToApp/>}>ログアウト</Button>
                      </AlignItems>
                    </Container>
                  </Stack>
                  <AlignItems style={{justifyContent: 'center'}}>
                    <section>
                      <h1 style={{ fontSize: '2em'}}>ダッシュボード</h1>
                      <p>
                        DEIZUへようこそ！
                        <br />
                        こちらがDEIZUダッシュボードとなります。下のボタンで新しい時間割表を作成することができます。また、これまで作成した時間割表も閲覧し更新することができます！
                      </p>
                      <AlignItems>
                        <Button
                          onClick={() => router.push(`/user/${user.uid}/sheet`)}
                          icon={<MdAddCircle/>}
                        >
                          時間割表を作成
                        </Button>
                        <Button
                          onClick={() => router.push(`/datasheet`)}
                          icon={<MdOutlineSearch/>}
                        >
                          データシートを閲覧
                        </Button>
                      </AlignItems>
                      {sheetTitle && sheetTitle.map((title) =>
                        <p
                          style={{
                            backgroundColor:'var(--system1)',
                            color:'var(--txtColor0)',
                            borderRadius:'var(--r5)',
                            padding:'0.5em 1em',
                            margin:'0.5em 0',
                            cursor: 'pointer'
                          }}
                          onClick={() =>router.push(`/user/${user.uid}/sheet/${title}`)}
                        >
                          {title}
                        </p>
                      )}
                    </section>
                  </AlignItems>
                </section>
              </BodyMargin>
            </>
          }
        </>
      }
      {loading ? <StaticScene type="loading"/>:
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