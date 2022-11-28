import React from 'react'
import { styled } from '../../stitches.config'
import AlignItems from '../style/AlignItems'

const TagStyled = styled('div',{
  fontSize:'$s',
  padding:'$1 $2',
  borderRadius:'$rounded',
  'p':{
    padding:'0',
    margin:'0',
    '@bp1':{
      display:'none'
    }
  },
  variants:{
    status:{
      // none:{
      //   border:'1px solid $system3',
      //   backgroundColor:'$system1',
      //   color:'$system4'
      // },
      sharing:{
        backgroundColor:'$blue3',
        border:'1px solid $blue6',
        color:'$blue9'
      },
      archived:{
        backgroundColor:'$orange3',
        border:'1px solid $orange6',
        color:'$orange9'
      },
      red:{
        backgroundColor:'$red3',
        border:'1px solid $red6',
        color:'$red9'
      },
    }
  },
  // defaultVariants:{
  //   color:'none'
  // }
})

interface TagProps extends React.ComponentProps<typeof TagStyled>{
  icon?:JSX.Element
}

export default function Tag(props:TagProps) {
  return (
    <TagStyled status={props.status}>
      <AlignItems>
        {props.icon}
        <p>{props.children}</p>
      </AlignItems>
    </TagStyled>
  )
}
