import { useRouter } from "next/router";
import { FiHome, FiLogIn, FiPlus, FiSettings } from "react-icons/fi";
import Button from "../../button/Button";
import ImageContainer from "../../component/ImageContainer";
import AlignItems from "../../style/AlignItems"
import BodyMargin from "../../style/BodyMargin"
import MediaQuery from "../../style/MediaQuery";

export default function Editor(props) {
  const router = useRouter();
  let user = props.user;
  let sheetBannerImageUrl = props.sheetBannerImageUrl;


  return (
    <BodyMargin>
      <ImageContainer
        style={{marginBottom:'1.5em'}}
        src={sheetBannerImageUrl}
      >
        <AlignItems justifyContent={'spaceBetween'}>
          {!viewOnly ?
            <AlignItems>
              <Button
                onClick={() => router.push(`/user/${user.uid}/`)}
                icon={<FiHome/>}
              >
                ダッシュボード
              </Button>
              {!isMobile &&                
                <Button
                  onClick={() => router.push(`/user/${user.uid}/sheet`)}
                  icon={<FiPlus/>}
                >
                  新規作成
                </Button>
              }
            </AlignItems>:
            <Button
              onClick={() => router.push('/app')}
              icon={<FiLogIn/>}
            >
              アカウント作成
            </Button>
          }
          <h1
            className={'scaleFontLarge'}
            style={{
              color: 'var(--txtColor0)',
              textShadow: '0px 0px 15px var(--system1)',
            }}
          >
            {sheetName}
          </h1>
          {!viewOnly ?
            <AlignItems>
              <MediaQuery hide={'mobile'}>
                <Button
                  icon={!listViewState ? <FiLayout/>:<FiGrid/>}
                  onClick={()=>{
                    listViewState ? setListViewState(false):setListViewState(true)}
                  }
                >
                  {!listViewState ? 'リスト表示':'グリッド表示'}
                </Button>
                <h1>bruh</h1>
              </MediaQuery>
              <Button
                onClick={()=>openModal()}
                icon={<FiSettings/>}
              >
                設定
              </Button>
            </AlignItems>:
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                userSelect: 'none',
                gap: '5px',
                borderRadius: 'var(--borderRadius2)',
                padding: '7px 10px',
                fontSize: '12px',
                outline: 'none',
                cursor: 'pointer',
                border: 'none',
                transition: '0.25s',
                color: 'var(--txtColor1)',
                backgroundColor: 'var(--system3)',
                border: '1px solid var(--system3)',
              }}
            >
              閲覧中
            </div>
          }
        </AlignItems>
      </ImageContainer>
      <ScheduleGrid/>
    </BodyMargin>
  )
}