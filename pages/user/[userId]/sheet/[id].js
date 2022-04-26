import React,{useEffect, useState} from 'react'
import { MdHomeFilled, MdSettings,MdClose } from "react-icons/md";

import IconButton from '../../../../lib/component/IconButton'
import AlignItems from '../../../../lib/style/AlignItems';
import Container from '../../../../lib/component/Container';
import BodyMargin from '../../../../lib/style/BodyMargin';
import StaticScene from '../../../../lib/style/StaticScene';


import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from "../../../../firebase"
import { doc, getDoc } from "firebase/firestore";

import Modal from 'react-modal';
import moment from 'moment';
import Button from '../../../../lib/component/Button';

import { modalStyle } from '../../../../lib/style/modalStyle'
import Head from 'next/head';
import LinkPreview from '../../../../lib/component/LinkPreview';
// Modal.setAppElement('#yourAppElement');

function IndivisualSheet({ sheetName }) {
  const router = useRouter();
  const [sheetData, setSheetData] = useState()
  const [modalIsOpen, setModalIsOpen] = useState(false);

  moment.locale("ja");
  
  const sheetOwnerId = router.query.userId;
  
  const fetchData = () => {
    const docRef = doc(db, "users", sheetOwnerId);
    getDoc(docRef).then((doc) => {
      if (!doc.data().sheets[sheetName]) {
        router.push('/app') 
      }
      setSheetData(doc.data().sheets[sheetName]);
      console.log(doc.data().sheets[sheetName]);
      // console.log(doc.data().sheets)
    })
  }
  // fetchData()
  useEffect(() => {
    fetchData()
    console.log('test')
  }, []);



  // const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [user, loading, error] = useAuthState(auth);
  console.log(user, loading, error)


  const closeModal = () => setModalIsOpen(false);
  const openModal = () => setModalIsOpen(true);

  return (
    <>
      <Head>
        <title>{sheetName}</title>
      </Head>
      <Modal
        isOpen={modalIsOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        <AlignItems style={{justifyContent: 'space-between'}}>
          <h2>設定</h2>
          <IconButton
            onClick={()=>closeModal()}
            icon={<MdClose/>}
          >
            閉じる
          </IconButton>
        </AlignItems>
        <p>DEIZUについては詳しくはこちらの</p>
        <h3>共有設定</h3>
        <p>
          リンクをアクセスできる人全てに時間割の閲覧権限を与える
        </p>
        <AlignItems>
          <Button>リンク共有を有効</Button>
          <Button>共有リンクをコピー</Button>
          {/* <LinkPreview>{`https://prattle.vercel.app/user/${user.uid}/sheet/${sheetName}`}</LinkPreview> */}
        </AlignItems>
        <hr/>
        <h3>デインジャーゾーン</h3>
        <AlignItems style={{justifyContent: 'space-between'}}>
          <p>「{sheetName}」を消去</p>
          <Button>時間割表を消去</Button>
        </AlignItems>
      </Modal>
      {sheetData &&
        <BodyMargin>
          <AlignItems style={{justifyContent: 'space-between'}}>
            <IconButton
              onClick={() => router.push('/app')}
              icon={<MdHomeFilled/>}
            >
              戻る
            </IconButton>
            <h1>{sheetName}</h1>
            <IconButton
              onClick={()=>openModal()}
              icon={<MdSettings/>}
            >
              設定
            </IconButton>
          </AlignItems>
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
    let sheetName = params.id;

    return {
      props: { sheetName }
    }
  }
  
export default IndivisualSheet