import { styled } from '../../stitches.config'
import Container from '../component/Container'
import AlignItems from './AlignItems'

const BodyCenterStyled = styled('div',{
  backgroundColor:'$gray1'
})

export default function BodyCenter({children}:JSX.Element | JSX.Element[] | any) {
  return (
    <BodyCenterStyled>
      <AlignItems
        justifyContent={'center'}
        minHeight={'100vh'}
      >
        <Container
          maxWidth={'600px'}
        >
          {children}
        </Container>
      </AlignItems>
    </BodyCenterStyled>
  )
}
