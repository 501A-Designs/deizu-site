import React from 'react';
import { styled } from '@stitches/react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import Button from '../button/Button';
import { FiX } from 'react-icons/fi';
import { fadeIn, slideInButton } from '../ux/keyframes';

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  background: `radial-gradient(
    86.36% 107.55% at 6.49% 12.32%,
    var(--system0) 0%,
    rgba(255, 255, 255, 0.5) 100%
  )`,
  cursor: 'pointer',
  backdropFilter: `blur(3px)`,
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${fadeIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: '$system1',
  borderRadius: '$3',
  border: '1px solid $system2',
  boxShadow: '$heavy',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${slideInButton} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
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
  margin: 0,
  fontWeight: 500,
  color: 'black',
  fontSize: 17,
});

const StyledDescription = styled(DialogPrimitive.Description, {
  margin: '10px 0 20px',
  color: 'black',
  fontSize: 15,
  lineHeight: 1.5,
});

interface DialogProps{
  openButton:JSX.Element,
  children:JSX.Element | JSX.Element[]
}

export default function Dialog(props:DialogProps){
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>
        {props.openButton}
      </DialogPrimitive.Trigger>
      <Content>
        <DialogPrimitive.Close asChild>
          <Button
            size={'small'}
            aria-label="Close"
            icon={<FiX/>}
          >
            閉じる
          </Button>
        </DialogPrimitive.Close>

        <StyledTitle>Edit profile</StyledTitle>
        <StyledDescription>
          Make changes to your profile here. Click save when you're done.
        </StyledDescription>
        {props.children}
      </Content>
    </DialogPrimitive.Root>
  )
};