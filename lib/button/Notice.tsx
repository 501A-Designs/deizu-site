import { styled } from '../../stitches.config'
import AlignItems from '../style/AlignItems'

const NoticeStyled = styled('div',{
  backgroundColor: '$system4',
  color: '$textColor2',
  borderRadius: '$4',
  padding: '2.5px 7px',
  'span': {
    
  }
})

export default function Notice(props) {
  return (
    <AlignItems justifyContent={'center'}>
      <NoticeStyled>
        <div>{props.icon}</div>
        <span>{props.children}</span>
      </NoticeStyled>
    </AlignItems>
  )
}
