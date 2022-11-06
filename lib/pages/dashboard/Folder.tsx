import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { styled } from '../../../stitches.config'
import AlignItems from '../../style/AlignItems'


const FolderStyled = styled('div',{
  fontSize:'$xm',
  padding: '$2 $3',
  borderRadius:'$2',
  cursor:'pointer',
  color:'$textColor1',
  border:'1px solid $system1',
  transition:'$speed1',
  variants:{
    selected:{
      true:{
        backgroundColor:'$system4',
        color:'$system1',
      },
      false:{
        '&:hover':{
          background:'$system2',
        }
      }
    }
  },
  defaultVariants:{
    selected:'false'
  }
})

interface FolderProps extends React.ComponentProps<typeof FolderStyled>{
  leftIcon:JSX.Element,
  rightIcon?:JSX.Element,
}

export default function Folder(props:FolderProps) {
  return (
    <FolderStyled
      onClick={props.onClick}
      selected={props.selected}
    >
      <AlignItems justifyContent={'spaceBetween'}>
        <AlignItems>
          {props.leftIcon}
          {props.children}
        </AlignItems>
        {props.rightIcon}
      </AlignItems>
    </FolderStyled>
  )
}
