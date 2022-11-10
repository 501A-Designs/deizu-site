import { styled } from '../../stitches.config';
import AlignItems from '../style/AlignItems'

const SectionButtonStyled = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: 'fit-content',
  borderRadius:'$2',
  padding: '0.7em 0.8em',
  cursor: 'pointer',
  color:'$gray12',
  backgroundColor:'$gray1',
  transition: '$speed1',
  '&:hover':{
    backgroundColor:'$gray3',
    transform: 'scale(1.01)'
  }
});
const LeftIcon = styled('span', {
  border: '1px solid $gray6',
  background: 'linear-gradient(45deg,$gray3,$gray7)',
  borderRadius: '$3',
  // boxShadow:'$light',
  width:'40px',
  height:'40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});
const RightIcon = styled('span', {
  color: '$gray8',
  marginLeft: 'auto',
  fontSize: 'small',
  paddingRight: '15px'
})

interface SectionButtonProps extends React.ComponentProps<typeof SectionButtonStyled>{
  leftIcon:JSX.Element,
  rightIcon?:JSX.Element,
}

export default function SectionButton(props:SectionButtonProps) {
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