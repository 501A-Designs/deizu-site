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
import ProfileImage from '../../lib/pages/dashboard/ProfileImage';
import BodyCenter from '../../lib/style/BodyCenter';

export default function Index() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  return (
    <>
      {user ?
        <>
          <NextSeo
            title={`ダッシュボード`}
            description={`${user?.displayName?.split(' ')[0]}さんのDEIZUダッシュボード`}
          />
          <BodyCenter>
            <AlignItems
              flexDirection={'column'}
              justifyContent={'center'}
            >
              <ProfileImage
                src={user.photoURL}
                width={'80px'}
                height={'80px'}
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
          </BodyCenter>
        </>:<StaticScene type={'notLoggedIn'}/>
      }
    </>
  )
}
