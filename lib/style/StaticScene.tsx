import { useRouter } from 'next/router';
import React from 'react'
import { FiLogIn } from 'react-icons/fi';
import { MoonLoader } from 'react-spinners';
import { styled } from '../../stitches.config';
// import { MoonLoader } from 'react-spinners';
import Button from '../button/Button'
import Container from '../component/Container';
import Heading from '../component/Heading';
import AlignItems from './AlignItems'

const StaticSceneStyled = styled('div',{
  backgroundColor:'$system1'
})

interface StaticSceneProps{
  type: 'notLoggedIn'|'loading'|'accessDenied'|'noMobile'
}

export default function StaticScene({type}:StaticSceneProps) {
  const router = useRouter();
  return (
    <StaticSceneStyled>
      <AlignItems
        minHeight={'100vh'}
        justifyContent={'center'}
      >
        {type == 'notLoggedIn' &&
          <Container styleType={'transparent'}>
            <Heading type={'h1'}>:(</Heading>
            <p>ログインする必要があります</p>
            <Button
              icon={<FiLogIn/>}
              onClick={()=> router.push('/app')}
            >
              ログイン・新規登録へ
            </Button>
          </Container>
        }
        {type == 'loading' &&
          <MoonLoader
            size={30}
            loading={type === 'loading'}
            // color="var(--system3)"
          />
        }
        {type == 'accessDenied' &&
          <Container styleType={'transparent'}>
            <Heading type={'h1'}>:P</Heading>
            <p>本ページはアクセスすることができません</p>
          </Container>
        }
        {type == 'noMobile' &&
          <Container styleType={'transparent'}>
            <Heading type={'h1'}>:0</Heading>
            <p>
              DEIZUはまだスマートフォン・パソコン以外のデバイスには対応しておりません。
              <br/>
              現在、モバイル対応のバージョンも開発中です。
            </p>
          </Container>
        }
      </AlignItems>
    </StaticSceneStyled>
  )
}
