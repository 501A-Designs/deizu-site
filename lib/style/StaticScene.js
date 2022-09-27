import { useRouter } from 'next/router';
import React from 'react'
// import { MoonLoader } from 'react-spinners';
import Button from '../button/Button'
import AlignItems from './AlignItems'

export default function StaticScene(props) {
  const router = useRouter();

  return (
      <AlignItems
        style={{height: '100vh', justifyContent: 'center'}}
      >
          {props.type === 'notLoggedIn' &&
            <div>
              <h1>:(</h1>
              <p>ログインする必要があります</p>
              <Button onClick={()=> router.push('/app')}>
                ログイン・新規登録へ
              </Button>
            </div>
          }
          {props.type === 'loading' &&
            // <MoonLoader
            //   size={40}
            //   loading={props.type === 'loading'}
            //   color="var(--system3)"
            // />
            <h3>更新中・・・</h3>
          }
          {props.type === 'accessDenied' &&
            <div>
              <h1>:P</h1>
              <p>本ページはアクセスすることができません</p>
            </div>
          }
          {props.type === 'noMobile' &&
            <div>
              <h1>:0</h1>
              <p>
                DEIZUはまだスマートフォン・パソコン以外のデバイスには対応しておりません。
                <br/>
                現在、モバイル対応のバージョンも開発中です。
              </p>
            </div>
          }
      </AlignItems>
  )
}
