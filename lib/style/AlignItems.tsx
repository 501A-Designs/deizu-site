import React from 'react'
import { styled } from '../../stitches.config'

const AlignItemsStyled = styled('div',{
  display:'flex',
  alignItems:'center',

  variants:{
    flexDirection:{
      row:{flexDirection:'row'},
      column:{flexDirection:'column'}
    },
    justifyContent:{
      center:{justifyContent:'center'},
      spaceBetween:{justifyContent:'space-between'},
      right:{justifyContent:'flex-end'}
    },
    gap:{
      small:{gap:'0.5em'},
      medium:{gap:'1em'},
      large:{gap:'2em'},
    },
    marginTop:{
      small:{marginTop:'0.5em'},
      medium:{marginTop:'1em'},
      large:{marginTop:'2em'},
      extraLarge:{marginTop:'3em'},
    },
    marginBottom:{
      small:{marginBottom:'0.5em'},
      medium:{marginBottom:'1em'},
      large:{marginBottom:'2em'},
      extraLarge:{marginBottom:'3em'},
    }
  },
  defaultVariants:{
    flexDirection: 'row',
    justifyContent:'left',
    gap:'small',
  }
})

interface AlignItemsProps extends React.ComponentProps<typeof AlignItemsStyled> {
  minHeight?:string,
  maxHeight?:string,
  // children:JSX.Element | JSX.Element[]
}

export default function AlignItems(props:AlignItemsProps) {
  return (
    <AlignItemsStyled
      // Styling
      flexDirection={props.flexDirection}
      justifyContent={props.justifyContent}
      gap={props.gap}
      marginTop={props.marginTop}
      marginBottom={props.marginBottom}
      css={{
        minHeight:props.minHeight,
        maxHeight:props.maxHeight,
      }}
    >
      {props.children}
    </AlignItemsStyled>
  )
}
