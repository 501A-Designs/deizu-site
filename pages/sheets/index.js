import React from 'react'
import Button from '../../lib/component/Button'
import { MdAddCircle } from "react-icons/md";
import AlignItems from '../../lib/style/AlignItems';
import Container from '../../lib/component/Container';
import BodyMargin from '../../lib/style/BodyMargin';

export default function Index() {
  return (
    <BodyMargin>
      {/* <img alt="no" className="profileBackgroundImg" src={auth.currentUser.photoURL} /> */}
      <section className="grid-1fr-2fr">
        <AlignItems style={{justifyContent: 'center'}}>
          <Container style={{display: 'grid',gridTemplateColumns:'1fr'}}>
            <h1 style={{ fontSize: '2em'}}>NAME</h1>
            <h2 style={{ fontSize: '1em'}}>本日は</h2>
          </Container>
        </AlignItems>
        <AlignItems style={{justifyContent: 'center'}}>
          <section className="card">
            <h1 style={{ fontSize: '2em'}}>ダッシュボード</h1>
            <p>
              DEIZUへようこそ！
              <br />
              こちらがDEIZUダッシュボードとなります。下のボタンで新しい時間割表を作成することができます。また、これまで作成した時間割表も閲覧し更新することができます！
            </p>
            <AlignItems>
              <Button
                onClick={() => { setComponent('change') }}
                icon={<MdAddCircle/>}
              >
                新しい表を作成
              </Button>
            </AlignItems>
            {/* <OtherSheet /> */}
          </section>
        </AlignItems>
      </section>
    </BodyMargin>
  )
}
