import { styled } from '../../stitches.config';
import AlignItems from '../style/AlignItems'

const SectionButtonStyled = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 'fit-content',
  backgroundColor:'$system1',
  borderRadius:'$2',
  padding: '0.7em 0.8em',
  cursor: 'pointer',
  transition: '$speed1',
  '&:hover':{
    backgroundColor:'$system2',
    transform: 'scale(1.01)'
  }
});
const LeftIcon = styled('span', {
  border: '1px solid $system1',
  color: '$textColor2',
  backgroundColor: '$system4',
  borderRadius: '$3',
  width:'40px',
  height:'40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const RightIcon = styled('span', {
  color: '$system4',
  marginLeft: 'auto',
  fontSize: 'small',
  paddingRight: '15px'
})

export default function SectionButton(props) {

  return (
    <SectionButtonStyled onClick={props.onClick}>
      <AlignItems gap={'medium'}>
        <LeftIcon>{props.leftIcon}</LeftIcon>
        {props.children}
      </AlignItems>
      <RightIcon>{props.rightIcon}</RightIcon>
    </SectionButtonStyled>
  )
}