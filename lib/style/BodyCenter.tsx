import Container from '../component/Container'
import AlignItems from './AlignItems'

export default function BodyCenter({children}:JSX.Element | JSX.Element[] | any) {
  return (
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
  )
}
