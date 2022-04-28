import React,{useState,useEffect} from 'react'
import Button from '../../../lib/component/Button'
import { MdAddCircle } from "react-icons/md";
import AlignItems from '../../../lib/style/AlignItems';
import Container from '../../../lib/component/Container';
import BodyMargin from '../../../lib/style/BodyMargin';
import { useRouter } from 'next/router'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db } from "../../../firebase"
import { doc, getDoc } from "firebase/firestore";

import StaticScene from '../../../lib/style/StaticScene';

import moment from 'moment';

function IndivisualUser() {
  const router = useRouter();
  const userId = router.query.userId;
  moment.locale("ja");
  console.log(userId);
  // const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [user, loading, error] = useAuthState(auth);
  console.log(user, loading, error)
  
  function OtherSheets() {
    const [sheetTitle, setSheetTitle] = useState();
    const fetchData = () => {
      const docRef = doc(db, "users", user.uid);
      getDoc(docRef).then((doc) => {
        // setSheetData(doc.data().sheets);
        setSheetTitle(Object.keys(doc.data().sheets));
        console.log(sheetTitle);
      })
    }

    useEffect(() => {
      fetchData()
      console.log('test')
    }, []);

    return (
      <>
        {sheetTitle && sheetTitle.map((title) =>
          <p
            style={{
              backgroundColor:'#F0F0F0',
              padding:'0.5em 1em',
              margin:'0.5em 0',
              borderRadius:5,
              cursor: 'pointer'
            }}
            onClick={() =>router.push(`/user/${user.uid}/sheet/${title}`)}
          >
            {title}
          </p>
        )}
      </>
    )
  }

  return (
    <>
      {user &&
        <>
          {user.uid == userId &&
            <>
              <BodyMargin>
                <section className="grid-1fr-2fr">
                  <Container style={{display: 'grid',gridTemplateColumns:'1fr'}}>
                      <AlignItems style={{gap: '1em'}}>
                      <img style={{width: '3em', height: '3em', borderRadius:50}} src={user.photoURL} />
                      <h1 style={{ fontSize: '2em'}}>{user.displayName.split(' ')[0]}</h1>
                      </AlignItems>
                      <p>{user.email}</p>
                      <h2 style={{ fontSize: '1em'}}>本日は：{moment().format("MMM Do dddd")}</h2>
                  </Container>
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
                          新しい表を作成
                        </Button>
                      </AlignItems>
                      <OtherSheets />
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