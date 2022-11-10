
import React from 'react';
import { styled } from '../../stitches.config';
import AlignItems from '../style/AlignItems';

const ButtonStyled = styled('button', {
  userSelect: 'none',
  outline: 'none',
  cursor: 'pointer',
  fontWeight:'bold',
  transition: '$speed1',

  variants:{
    styleType:{
      fill:{
        color: '$gray12',
        backgroundColor: '$gray4',
        border: '1px solid $gray5',
        '&:hover': {
          color: '$gray1',
          backgroundColor: '$gray12',
          border: '1px solid $gray12',
          boxShadow: '0 8px 10px $gray1',
          transform:'scale(1.02)'
        },
      },
      noFill:{
        color: '$gray12',
        backgroundColor: '$gray3',
        border: '1px solid $gray3',
        '&:hover': {
          boxShadow: '0 8px 10px $gray1',
          transform:'scale(1.02)'
        },
      },
      outline:{
        color: '$gray1',
        backgroundColor: '$system1',
        border: '1px solid $system3',
        // boxShadow: '0 0 2px $system2',
        '&:hover': {
          color: '$system1',
          backgroundColor: '$system4',
          transform:'scale(1.02)'
        },
      }
    },
    size:{
      medium:{
        padding: '$2 $3',
      },
      small:{
        padding: '8px',
        'span':{
          display:'none'
        },
      },
    },
    shape:{
      round:{
        borderRadius: '$rounded',
      },
      standard:{
        borderRadius: '$2',
      }
    },
    fullWidth:{
      true:{
        width:'auto'
      },
    }
  },
  defaultVariants:{
    styleType:'fill',
    size:'medium',
    shape:'standard'
  }
})

interface ButtonProps extends React.ComponentProps<typeof ButtonStyled>{
  icon: any,
  children?: string,
}

export default function Button(props:ButtonProps) {
  return (
    <ButtonStyled
      styleType={props.styleType}
      size={props.size}
      shape={props.shape}
      fullWidth={props.fullWidth}
      title={props.children}
      onClick={props.onClick}
    >
      <AlignItems
        gap={'small'}
        justifyContent={'center'}
      >
        {props.icon}
        {props.children &&
          <span>{props.children}</span>
        }
      </AlignItems>
    </ButtonStyled>
  )
}
