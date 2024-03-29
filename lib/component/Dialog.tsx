import React from 'react';
import { styled } from '@stitches/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import Button from '../button/Button';
import { FiX } from 'react-icons/fi';
import { fadeIn, slideInBottom } from '../ux/keyframes';
import AlignItems from '../style/AlignItems';

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  background: `radial-gradient(
    86.36% 107.55% at 6.49% 12.32%,
    transparent 0%, $gray1 100%
  )`,
  cursor: 'pointer',
  backdropFilter: `blur(3px)`,
  position: 'fixed',
  inset: 0,
  zIndex:1,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${fadeIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: '$gray1',
  borderRadius: '$3',
  border: '1px solid $gray4',
  boxShadow: '$heavy',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: '$3',
  overflowY:'scroll',
  overflowX:'hidden',
  zIndex:2,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${slideInBottom} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },
});

function Content({ children, ...props }:{children:any}) {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay  />
      <StyledContent {...props}>{children}</StyledContent>
    </DialogPrimitive.Portal>
  );
}

const StyledTitle = styled(DialogPrimitive.Title, {
  color: '$gray12',
  margin: 0,
  fontWeight: 500,
  fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: '10px 0 20px',
  color: '$gray12',
  fontSize: 15,
  lineHeight: 1.5,
});

interface DialogProps{
  title:string,
  trigger:JSX.Element,
  description?:string,
  children:any
}

export default function Dialog(props:DialogProps){
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        {props.trigger}
      </DialogPrimitive.Trigger>
      <Content>
        <AlignItems
          justifyContent={'spaceBetween'}
          marginBottom={'medium'}
        >
          <StyledTitle>{props.title}</StyledTitle>
          <DialogPrimitive.Close asChild>
            <Button
              size={'icon'}
              styleType={'noFill'}
              aria-label="Close"
              icon={<FiX/>}
            >
              閉じる
            </Button>
          </DialogPrimitive.Close>
        </AlignItems>
        {props.description &&
          <StyledDescription>
            {props.description}
          </StyledDescription>
        }
        {props.children}
      </Content>
    </DialogPrimitive.Root>
  )
};