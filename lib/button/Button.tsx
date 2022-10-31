
import React from 'react';
import { styled } from '../../stitches.config';
import AlignItems from '../style/AlignItems';

const ButtonStyled = styled('button', {
  borderRadius: '$2',
  userSelect: 'none',
  outline: 'none',
  cursor: 'pointer',
  transition: '$speed1',
  '&:hover': {
    boxShadow: '0 8px 10px var(--system1)',
    transform:'scale(1.02)'
  },

  variants:{
    styleType:{
      fill:{
        color: '$textColor2',
        backgroundColor: '$system4',
        border: '1px solid $system1',
      },
      noFill:{
        color: '$textColor2',
        backgroundColor: '$system3',
        border: '1px solid $system2',
      },
      outline:{
        color: '$textColor1',
        backgroundColor: '$system1',
        border: '1px solid $system3',              
        boxShadow: '0 0 2px $system2',
      },
    },
    size:{
      medium:{
        fontSize:'small',
        padding: '10px 25px',
        '@bp1':{
          padding: '5px 10px',
        },
        '@bp2':{
          padding: '7px 15px',
        },
      },
      small:{
        fontSize:'medium',
        padding: '8px',
        'span':{
          display:'none'
        },
        '@bp1':{
          padding: '5px',
          fontSize: '15px',
        },
        '@bp2':{
          padding: '7px',
          fontSize: '14px',
        },
      }
    }
  },
  defaultVariants:{
    styleType:'fill',
    size:'medium'
  }
})

interface ButtonProps extends React.ComponentProps<typeof ButtonStyled>{
  icon: any,
  children: string,
}

export default function Button(props:ButtonProps) {
  return (
    <ButtonStyled
      styleType={props.styleType}
      size={props.size}
      title={props.children}
      onClick={props.onClick}
    >
      <AlignItems
        gap={'small'}
        justifyContent={'center'}
      >
        {props.icon}
        <span>
          {props.children}
        </span>
      </AlignItems>
    </ButtonStyled>
  )
}
