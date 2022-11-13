import React from 'react'
import { styled } from '../../stitches.config'
import AlignItems from '../style/AlignItems'

const TagStyled = styled('div',{
  fontSize:'$s',
  padding:'$1 $2',
  borderRadius:'$rounded',
  'span':{
    '@bp1':{
      display:'none'
    }
  },
  variants:{
    color:{
      none:{
        border:'1px solid $system3',
        backgroundColor:'$system1',
        color:'$system4'
      },
      blue:{
        backgroundColor:'$blue3',
        border:'1px solid $blue7',
        color:'$blue10'
      },
      orange:{
        backgroundColor:'$orange3',
        border:'1px solid $orange7',
        color:'$orange10'
      },
      red:{
        backgroundColor:'$red3',
        border:'1px solid $red7',
        color:'$red10'
      },
    }
  },
  defaultVariants:{
    color:'none'
  }
})

interface TagProps extends React.ComponentProps<typeof TagStyled>{
  icon?:JSX.Element
}

export default function Tag(props:TagProps) {
  return (
    <TagStyled color={props.color}>
      <AlignItems>
        {props.icon}
        <span>{props.children}</span>
      </AlignItems>
    </TagStyled>
  )
}
