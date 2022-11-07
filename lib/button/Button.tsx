
import React from 'react';
import { styled } from '../../stitches.config';
import AlignItems from '../style/AlignItems';

const ButtonStyled = styled('button', {
  // fontSize:'$xm',
  userSelect: 'none',
  outline: 'none',
  cursor: 'pointer',
  transition: '$speed1',

  variants:{
    styleType:{
      fill:{
        color: '$system1',
        backgroundColor: '$system4',
        border: '1px solid $system1',
        '&:hover': {
          boxShadow: '0 8px 10px var(--system1)',
          transform:'scale(1.02)'
        },
      },
      noFill:{
        color: '$system4',
        backgroundColor: '$system2',
        border: '1px solid $system1',
        '&:hover': {
          boxShadow: '0 8px 10px var(--system1)',
          transform:'scale(1.02)'
        },
      },
      outline:{
        color: '$system4',
        backgroundColor: '$system1',
        border: '1px solid $system3',
        // boxShadow: '0 0 2px $system2',
        '&:hover': {
          color: '$system1',
          backgroundColor: '$system4',
          transform:'scale(1.02)'
        },
      },
      primary:{
        color: '$system1',
        backgroundColor: '$system4',
        border: '1px solid $system1',
        '&:hover': {
          boxShadow: '$heavy',
          transform:'scale(1.06) rotate(180deg)'
        },
      }
    },
    size:{
      extraLarge:{
        padding: '$3',
        fontSize:'$xxl',
        'span':{
          display:'none'
        },
      },
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
        width:'100%'
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
