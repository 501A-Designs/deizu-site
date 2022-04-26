import React from 'react'
import Button from '../component/Button'
import AlignItems from './AlignItems'

export default function StaticScene(props) {
  return (
      <AlignItems
        style={{height: '100vh', justifyContent: 'center'}}
      >
          {props.type === 'notLoggedIn' &&
            <div>
              <h1>:(</h1>
              <p>ログインする必要があります</p>
              <Button>ログインへ</Button>
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
      </AlignItems>
  )
}
