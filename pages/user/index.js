import { NextSeo } from 'next-seo'
import React from 'react'
import BodyMargin from '../../lib/style/BodyMargin'

import Button from '../../lib/button/Button';

import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, } from "../../src/service/firebase"
import StaticScene from '../../lib/style/StaticScene';
import AlignItems from '../../lib/style/AlignItems';

import { signOut } from 'firebase/auth'
import { useRouter } from 'next/router';
import { FiLogOut } from 'react-icons/fi';

export default function Index() {
  const [user] = useAuthState(auth);
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
            <AlignItems
              style={{
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
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
                icon={<FiLogOut/>}
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
