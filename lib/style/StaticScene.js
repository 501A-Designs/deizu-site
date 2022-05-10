import { useRouter } from 'next/router';
import React from 'react'
import Button from '../component/Button'
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
              <Button onClick={()=> router.push('/app')}>ログイン・新規登録へ</Button>
            </div>
          }
          {props.type === 'loading' &&
            <div>
              <h1>更新中...</h1>
              <p>現在データを取得しています</p>
            </div>
          }
          {props.type === 'accessDenied' &&
            <div>
              <h1>:P</h1>
              <p>本ページはアクセスすることはできません</p>
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
