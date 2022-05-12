import { NextSeo } from 'next-seo'
import React from 'react'
import BodyMargin from '../../lib/style/BodyMargin'

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth,db,root } from "../../src/service/firebase"
import StaticScene from '../../lib/style/StaticScene';
import Button from '../../lib/component/Button';
import AlignItems from '../../lib/style/AlignItems';
import Stack from '../../lib/style/Stack';

import { MdOutlineExitToApp } from "react-icons/md";
import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router';

export default function Index() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  return (
    <>
      {user ?
        <>
          <NextSeo
            title={`ダッシュボード`}
            description={`${user.displayName.split(' ')[0]}さんのDEIZUダッシュボード`}
          />
          <BodyMargin>
            <AlignItems style={{flexDirection: 'column', justifyContent: 'center'}}>
              <img
                src={user.photoURL}
                style={{
                  borderRadius: 'var(--r10)',
                  border:'1px solid var(--system1',
                  boxShadow:'0 8px 30px rgba(0, 0, 0, 0.12)',
                  borderRadius:50,
                }}
              />
              <h1>{user.displayName}</h1>
              <p style={{marginTop:0}}>{user.email}</p>
              <Button
                icon={<MdOutlineExitToApp/>}
                onClick={()=> {
                  signOut(auth);
                  router.push('/app')
                }}
              >
                ログアウト
              </Button>
            </AlignItems>
          </BodyMargin>
        </>:<StaticScene type={'notLoggedIn'}/>
      }
    </>
  )
}
