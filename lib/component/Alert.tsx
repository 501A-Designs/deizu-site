import React, { useState } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { styled } from '../../stitches.config';
import { fadeIn, slideInBottom } from '../ux/keyframes';
import AlignItems from '../style/AlignItems';
import { MoonLoader } from 'react-spinners';

const StyledOverlay = styled(AlertDialog.Overlay, {
  background: `radial-gradient(
    86.36% 107.55% at 6.49% 12.32%,
    transparent 0%,
    $gray1 100%
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

const StyledContent = styled(AlertDialog.Content, {
  backgroundColor: '$gray1',
  borderRadius: '$3',
  border: '1px solid $gray4',
  color:'$textColor2',
  boxShadow: '$heavy',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: '$3',
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${slideInBottom} 300ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  '&:focus': { outline: 'none' },
});

function Content({children}:{children:any}) {
  return (
    <AlertDialog.Portal>
      <StyledOverlay>
        <StyledContent>
          {children}
        </StyledContent>
      </StyledOverlay>
    </AlertDialog.Portal>
  )
}

const StyledTitle = styled(AlertDialog.Title, {
  color: '$gray12',
  margin: 0,
  fontWeight: 500,
  fontSize: 17,
});

const StyledDescription = styled(AlertDialog.Description, {
  margin: '10px 0 20px',
  color: '$gray12',
  fontSize: 15,
  lineHeight: 1.5,
});

// const mockPromise = async () => await new Promise((resolve) => setTimeout(resolve, 1000));

interface AlertProps{
  open:boolean,
  title:string,
  closeButton?:JSX.Element,
  description?:string,
  children?:any,
  // loading:boolean
}

export default function Alert(props:AlertProps) {
  return (
    <AlertDialog.Root
      defaultOpen={props.open}
    >
      <Content>
        <AlignItems justifyContent={'center'}>
          <StyledTitle>
            {/* {props.loading ? '変換中': */}
            {props.title}
            {/* // } */}
          </StyledTitle>
        </AlignItems>
        {/* {
          props.loading ?
          <AlignItems justifyContent={'center'} marginTop={'medium'}>
            <MoonLoader
              size={'30'}
              color={'white'}
            />
          </AlignItems>:
          <> */}
            {props.description &&
              <StyledDescription>
                {props.description}
              </StyledDescription>
            }
            {props.children}
            <AlertDialog.Trigger asChild>
              {props.closeButton}
            </AlertDialog.Trigger>
          {/* </>
        } */}
      </Content>
    </AlertDialog.Root>
  );
};