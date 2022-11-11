import React from 'react'
import * as ContextMenu from '@radix-ui/react-context-menu';
import { styled } from '../../stitches.config';
import { keyframes } from '@stitches/react';

const popOutLeftTop = keyframes({
  '0%': {
    transform: 'scale(0.5) translateX(-40%) translateY(-40%)',
    opacity: 0,
    borderRadius:'$3',
  },
  '50%':{
    transform: 'scale(1.03)'
  }
});

const MenuTitleStyled = styled(ContextMenu.Label,{
  margin:'$1',
  color:'$gray9',
  fontSize:'$m',
  userSelect:'none'
})

const ContentStyled = styled(ContextMenu.Content, {
  padding:'$2',
  borderRadius:'$2',
  backgroundColor:'$gray1',
  border:'1px solid $gray4',
  width:'250px',
  boxShadow:'$heavy',
  animation: `${popOutLeftTop} 0.3s ease-out`,
});

export const ItemStyled = styled(ContextMenu.Item, {
  padding:'$1 $2',
  borderRadius:'$1',
  width:'100%',
  boxShadow:'none',
  outline:'none',
  cursor:'pointer',
  fontSize:'$xm',
  transition:'$speed1',
  border:'1px solid $gray1',
  variants:{
    color:{
      standard:{
        color:'$gray12',
        '&:hover':{
          backgroundColor:'$gray4',
          border:'1px solid $gray4',
          transform: 'scale(1.02)'
        }
      },
      red:{
        color:'$red11',
        '&:hover':{
          backgroundColor:'$red3',
          border:'1px solid $red3',
          transform: 'scale(1.02)'
        }
      }
    }
  },
  defaultVariants:{
    color:'standard'
  }
});

export default function Menu(props:any) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        {props.trigger}
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContentStyled>
          {props.title &&
            <MenuTitleStyled>
              {props.title}
            </MenuTitleStyled>
          }
          <ContextMenu.Group>
            {props.children}
          </ContextMenu.Group>
          {/* <ContextMenu.Separator /> */}
        </ContentStyled>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
