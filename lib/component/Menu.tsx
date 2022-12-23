import React from 'react'
import * as ContextMenu from '@radix-ui/react-context-menu';
import { styled } from '../../stitches.config';
import { keyframes } from '@stitches/react';
import AlignItems from '../style/AlignItems';

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

const ContextMenuLabelStyled = styled(ContextMenu.Label,{
  margin:'$1',
  color:'$gray9',
  fontSize:'$m',
  userSelect:'none'
})

const ContextMenuContentStyled = styled(ContextMenu.Content, {
  padding:'$2',
  borderRadius:'$2',
  backgroundColor:'$gray1',
  border:'1px solid $gray4',
  width:'250px',
  boxShadow:'$heavy',
  animation: `${popOutLeftTop} 0.3s ease-out`,
});

const ContextMenuItemStyled = styled(ContextMenu.Item, {
  padding:'$1 $2',
  borderRadius:'$1',
  width:'100%',
  boxShadow:'none',
  outline:'none',
  cursor:'pointer',
  fontSize:'$xm',
  transition:'$speed1',
  border:'1px solid transparent',
  variants:{
    color:{
      standard:{
        color:'$gray12',
        '&:hover':{
          backgroundColor:'$gray3',
          border:'1px solid $gray4',
          transform: 'scale(1.02)'
        }
      },
      red:{
        color:'$red11',
        '&:hover':{
          backgroundColor:'$red3',
          border:'1px solid $red4',
          transform: 'scale(1.02)'
        }
      }
    }
  },
  defaultVariants:{
    color:'standard'
  }
});

const MenuItem = (menuItemProps:any) => {
  return(
    <ContextMenuItemStyled
      color={menuItemProps.color}
      onSelect={menuItemProps.onSelect}
    >
      <AlignItems>
        {menuItemProps.icon}
        <span>{menuItemProps.children}</span>
      </AlignItems>
    </ContextMenuItemStyled>
  )
};

Menu.Item = MenuItem;
export default function Menu(props:any) {
  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger asChild>
        {props.trigger}
      </ContextMenu.Trigger>

      <ContextMenu.Portal>
        <ContextMenuContentStyled>
          {props.title &&
            <ContextMenuLabelStyled>
              {props.title}
            </ContextMenuLabelStyled>
          }
          <ContextMenu.Group>
            {props.children}
          </ContextMenu.Group>
          {/* <ContextMenu.Separator /> */}
        </ContextMenuContentStyled>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
