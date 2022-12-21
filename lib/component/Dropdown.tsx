import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { styled } from '../../stitches.config';
import { keyframes } from '@stitches/react';
import AlignItems from '../style/AlignItems';
import { FiChevronRight } from 'react-icons/fi';
import Button from '../button/Button';
import Tag from './Tag';
import { popOut } from '../ux/keyframes';
import { TooltipLabel } from './TooltipLabel';

const slideUpAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideRightAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(-2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const slideDownAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateY(-2px)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

const slideLeftAndFade = keyframes({
  '0%': { opacity: 0, transform: 'translateX(2px)' },
  '100%': { opacity: 1, transform: 'translateX(0)' },
});

const contentStyles = {
  width:'200px',
  padding:'$2',
  borderRadius:'$2',
  backgroundColor:'$gray1',
  border:'1px solid $gray4',
  boxShadow:'$heavy',
  animationDuration: '$speed1',
  animationTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  willChange: 'transform, opacity',
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
};

const DropdownMenuContentStyled = styled(DropdownMenu.Content, contentStyles);
const DropdownMenuSubContentStyled = styled(DropdownMenu.SubContent, contentStyles);

const DropdownMenuTriggerStyled = styled('div',{
  userSelect: 'none',
  outlineColor:'$gray12',
  fontSize:'$m',
  padding:'$2',
  cursor: 'pointer',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  transition: '$speed1',
  color: '$gray11',
  backgroundColor: '$gray4',
  border: '1px solid $gray5',
  '&:hover': {
    color: '$gray12',
    backgroundColor: '$gray5',
    border: '1px solid $gray6',
    boxShadow: '0 8px 10px $gray1',
    transform:'scale(1.02)'
  },
  variants:{
    align:{
      left:{
        borderRadius:'$2 0 0 $2',
      },
      center:{
        borderRadius:'0',
      },
      right:{
        borderRadius:'0 $2 $2 0',
      },
      single:{
        borderRadius:'$2'
      }
    }
  }
})

const itemStyles = {
  all: 'unset',
  color: '$gray12',
  display: 'flex',
  alignItems: 'center',
  padding: '$1 $2',
  borderRadius:'$1',
  boxShadow:'none',
  outline:'none',
  userSelect: 'none',
  cursor:'pointer',
  fontSize:'$xm',
  border:'1px solid transparent',
  transition:'$speed1',
  '&[data-disabled]': {
    color: '$gray1',
    pointerEvents: 'none',
  },
  '&[data-highlighted]': {
    backgroundColor:'$gray4',
    border:'1px solid $gray4',
    transform: 'scale(1.02)',
  },
};

const DropdownMenuItemStyled = styled(DropdownMenu.Item, itemStyles);
Dropdown.Item = (menuItemProps:any) => {
  return (
    <DropdownMenuItemStyled>
      <AlignItems>
        {menuItemProps.icon}
        <span>{menuItemProps.children}</span>
      </AlignItems>
    </DropdownMenuItemStyled>
  )
}

const DropdownMenuSubTriggerStyled = styled(DropdownMenu.SubTrigger, {
  '&[data-state="open"]': {
    backgroundColor: '$gray4',
    color: '$gray11',
  },
  ...itemStyles,
});

Dropdown.Label = styled(DropdownMenu.Label, {
  margin:'$1',
  color:'$gray9',
  fontSize:'$m',
  userSelect:'none'
});
Dropdown.Separator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: '$gray4',
  margin: 5,
});

Dropdown.SubMenu =(subMenuProp:any)=>{
  return(
    <>
      <DropdownMenu.Sub>
        <DropdownMenuSubTriggerStyled>
          <AlignItems>
            {subMenuProp.icon}
            <span>{subMenuProp.name}</span>
          </AlignItems>
        </DropdownMenuSubTriggerStyled>
        <DropdownMenu.Portal>
          <DropdownMenuSubContentStyled
            sideOffset={2}
            alignOffset={-5}
          >
            <Dropdown.Label>
              {subMenuProp.name}
            </Dropdown.Label>
            {subMenuProp.children}
          </DropdownMenuSubContentStyled>
        </DropdownMenu.Portal>
      </DropdownMenu.Sub>
    </>
  )
}

export default function Dropdown(props:any){
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {props.trigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenuContentStyled sideOffset={5}>
          {props.children}
        </DropdownMenuContentStyled>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};