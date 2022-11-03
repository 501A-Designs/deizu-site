import React from 'react'
import AlignItems from '../style/AlignItems'
import gradient from 'random-gradient'
import { FiUsers } from 'react-icons/fi'
import { styled } from '../../stitches.config'

const SheetButtonStyled = styled('div', {
  borderRadius:'$2',
  padding: '0.8em',
  cursor: 'pointer',
  height: 'fit-content',
  backgroundColor: '$system1',
  transition: '$speed1',
  'p':{
    padding: 0,
    margin: 0,
    height: 'fit-content',
  },
  'span':{
    color:'$textColor1',
    fontSize:'0.9em',
  },
  'time':{
    color:'$system4',
    fontSize:'0.8em',
    '@bp1':{
      display:'none'
    },
    '@bp2_':{
      display:'block'
    },
  },
  '&:hover':{
    backgroundColor:'$system2',
    transform: 'scale(1.01)'
  },
});
const GradientPlaceholderStyled = styled('div', {
  borderRadius:'$1',
  width:'2.5em',
  height:'2.5em',
  border:'1px solid $system1',
  boxShadow:'$medium',
});
const ButtonImageStyled = styled('img', {
  borderRadius:'$1',
  width:'2.5em',
  height:'2.5em',
  objectFit:'cover',
  backgroundColor:'$system2',
  border:'1px solid $system1',
  boxShadow:'$medium',
});

export default function SheetButton(props) {
  return (
    <SheetButtonStyled
      key={props.key}
      onClick={props.onClick}
    >
      <AlignItems justifyContent={'spaceBetween'}>
        <AlignItems gap={'medium'}>
          {props.imageSource ? 
            <ButtonImageStyled
              alt="no img found"
              src={props.imageSource}
            />:
            <GradientPlaceholderStyled
              css={{background:gradient(props.children)}}
            />
          }
          <AlignItems>
            <p>{props.children}</p>
            {props.sharing && <span title="リンク共有が有効されています"><FiUsers/></span>}
          </AlignItems>
        </AlignItems>
        <time>{props.date}</time>
      </AlignItems>
    </SheetButtonStyled>
  )
}
