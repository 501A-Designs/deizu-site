import { styled } from "../../../stitches.config"
import MediaQuery from "../../style/MediaQuery"
import Container from "../../component/Container"

const FrameContentStyled = styled('div',{
  borderRadius:'$1',
})

export default function MockUp() {
  return (
    <>
      <MediaQuery hide={'mobile'}>
        <Container
          index={'inner'}
          xDegree={'2deg'}
          styleType={'gradient'}
        >
          <FrameContentStyled
            css={{
              objectFit:'cover',
              width:'600px',
              height:'400px',
              backgroundSize: '600px',
              backgroundImage:`url('/deizu-screenshot.png')`,
              boxShadow:'$heavy'
            }}
          >
          </FrameContentStyled>
        </Container>
      </MediaQuery>
      <MediaQuery hide={'desktop'}>
        <Container
          index={'inner'}
          xDegree={'2deg'}
          styleType={'gradient'}
        >
          <FrameContentStyled
            css={{
              objectFit:'cover',
              width:'300px',
              height:'460px',
              backgroundSize: '300px',
              backgroundImage:`url('/deizu-mobile-screenshot.png')`,
              boxShadow:'$heavy'
            }}
          >
          </FrameContentStyled>
        </Container>
      </MediaQuery>
    </>
  )
}
