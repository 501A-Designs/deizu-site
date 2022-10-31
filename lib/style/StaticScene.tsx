import { useRouter } from 'next/router';
import React from 'react'
import { FiLogIn } from 'react-icons/fi';
import { MoonLoader } from 'react-spinners';
// import { MoonLoader } from 'react-spinners';
import Button from '../button/Button'
import Container from '../component/Container';
import AlignItems from './AlignItems'

export default function StaticScene({type}:{type:string}) {
  const router = useRouter();

  return (
      <AlignItems
        minHeight={'100vh'}
        justifyContent={'center'}
      >
        {type === 'notLoggedIn' &&
          <Container styleType={'transparent'}>
            <h1>:(</h1>
            <p>ログインする必要があります</p>
            <Button
              icon={<FiLogIn/>}
              onClick={()=> router.push('/app')}
            >
              ログイン・新規登録へ
            </Button>
          </Container>
        }
        {type === 'loading' &&
          <MoonLoader
            size={30}
            loading={type === 'loading'}
            // color="var(--system3)"
          />
        }
        {type === 'accessDenied' &&
          <Container styleType={'transparent'}>
            <h1>:P</h1>
            <p>本ページはアクセスすることができません</p>
          </Container>
        }
        {type === 'noMobile' &&
          <Container styleType={'transparent'}>
            <h1>:0</h1>
            <p>
              DEIZUはまだスマートフォン・パソコン以外のデバイスには対応しておりません。
              <br/>
              現在、モバイル対応のバージョンも開発中です。
            </p>
          </Container>
        }
      </AlignItems>
  )
}
