
import React from 'react';
import { styled } from '../../stitches.config';
import AlignItems from '../style/AlignItems';

const ButtonStyled = styled('button', {
  userSelect: 'none',
  outlineColor:'$gray12',
  // $gray7
  cursor: 'pointer',
  fontWeight:'bold',
  transition: '$speed1',
  '&[disabled]':{
    // filter:'brightness(40%)',
    opacity:'0.4',
    cursor:'not-allowed'
  },
  variants:{
    styleType:{
      noFill:{
        color: '$gray11',
        backgroundColor: '$gray4',
        border: '1px solid $gray5',
        '&[!disabled]':{
          '&:hover': {
            color: '$gray12',
            backgroundColor: '$gray5',
            border: '1px solid $gray6',
            boxShadow: '0 8px 10px $gray1',
            transform:'scale(1.02)'
          }
        }
      },
      fill:{
        color: '$gray1',
        backgroundColor: '$gray12',
        border: '1px solid $gray12',
        '&[!disabled]':{
          '&:hover': {
            boxShadow: '0 8px 10px $gray1',
            transform:'scale(1.02)'
          },
        }
      },
      outline:{
        color: '$gray11',
        backgroundColor: '$gray1',
        border: '1px solid $gray3',
        boxShadow: '0 0 2px $system2',
        '&[!disabled]':{
          '&:hover': {
            color: '$gray12',
            backgroundColor: '$gray2',
            transform:'scale(1.02)'
          },
        }
      },
      red:{
        color: '$red1',
        backgroundColor: '$red10',
        border: '1px solid $red9',
        // '&[!disabled]':{
          '&:hover': {
            backgroundColor: '$red9',
            transform:'scale(1.02)'
          },
        // }
      }
    },
    size:{
      medium:{
        fontSize:'$m',
        padding: '$2 $3',
      },
      small:{
        fontSize:'$s',
        padding: 'calc($1*1.3) calc($2*1.3)',
      },
      icon:{
        fontSize:'$m',
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
    styleType:'noFill',
    size:'medium',
    shape:'standard'
  },
})

interface ButtonProps extends React.ComponentProps<typeof ButtonStyled>{
  icon: any,
  children?: string,
}

export default function Button(props:ButtonProps) {
  return (
    <ButtonStyled
      disabled={props.disabled}
      styleType={props.styleType}
      size={props.size}
      shape={props.shape}
      fullWidth={props.fullWidth}
      title={props.children}
      onClick={props.onClick}
      css={props.css}
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
