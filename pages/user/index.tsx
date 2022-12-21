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
import { FiArrowLeft, FiLogOut } from 'react-icons/fi';
import ProfileImage from '../../lib/pages/dashboard/ProfileImage';
import BodyCenter from '../../lib/style/BodyCenter';
import Heading from '../../lib/component/Heading';

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
                justifyContent={'center'}
                flexDirection={'column'}
              >                
                <ProfileImage
                  src={user.photoURL}
                  width={'80'}
                  height={'80'}
                  marginBottom={'small'}
                />
                <Heading type={'h1'}>
                  {user.displayName}
                </Heading>
                <Heading type={'h4'}>{
                  user.email}
                </Heading>
                <br/>
                <AlignItems>
                  <Button
                    icon={<FiArrowLeft/>}
                    onClick={()=>router.push(`/user/${user.uid}`)}
                  >
                    戻る
                  </Button>
                  <Button
                    icon={<FiLogOut/>}
                    styleType={'fill'}
                    onClick={()=> {
                      signOut(auth);
                      router.push('/app')
                    }}
                  >
                    ログアウト
                  </Button>
                </AlignItems>
              </AlignItems>
          </BodyCenter>
        </>:<StaticScene type={'notLoggedIn'}/>
      }
    </>
  )
}
