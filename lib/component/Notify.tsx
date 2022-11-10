import * as Toast from '@radix-ui/react-toast';
import { keyframes } from '@stitches/react';
import { styled } from '../../stitches.config';
import { slideInBottom } from '../ux/keyframes';

const VIEWPORT_PADDING = 25;

const hide = keyframes({
  '0%': { opacity: 1 },
  '100%': { opacity: 0 },
});

const slideIn = keyframes({
  from: { transform: `translateY(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: 'translateY(0)' },
});

const swipeOut = keyframes({
  from: { transform: 'translateY(var(--radix-toast-swipe-end-x))' },
  to: { transform: `translateY(calc(100% + ${VIEWPORT_PADDING}px))` },
});

const ToasterStyled = styled(Toast.Root,{
  borderRadius:'9999px',
  boxShadow:'$light',
  padding: '$2',
  fontSize:'15px',
  backgroundColor: '$gray3',
  border:'1px solid $gray5',
  color:'$gray1',
  textAlign:'center',

  '@media (prefers-reduced-motion: no-preference)': {
    '&[data-state="open"]': {
      animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${hide} 100ms ease-in`,
    },
    '&[data-swipe="move"]': {
      transform: 'translateX(var(--radix-toast-swipe-move-x))',
    },
    '&[data-swipe="cancel"]': {
      transform: 'translateX(0)',
      transition: 'transform 200ms ease-out',
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 100ms ease-out`,
    },
  },  
})

const TitleStyled = styled(Toast.Title, {
  color: '$gray12',
  margin: 0,
  fontWeight: 500,
  fontSize: 17,
});

const DescriptionStyled = styled(Toast.Description, {
  margin: '0',
  color: '$gray12',
  fontSize: 15,
  lineHeight: 1.5,
});

const ToastViewportStyled = styled(Toast.Viewport,{
  position: 'fixed',
  bottom: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  padding: '$1',
  gap: '10px',
  width: '390px',
  maxWidth: '100vw',
  margin: 0,
  listStyle: 'none',
  zIndex: 2147483647,
  outline: 'none',
})

export default function Notify(props:any){
  return(
    <>
      <ToasterStyled
        open={props.open}
        onOpenChange={props.onOpenChange}
      >
        <TitleStyled>{props.title}</TitleStyled>
        {props.description &&
          <DescriptionStyled>
            {props.description}
          </DescriptionStyled>
        }
        <Toast.Action
          altText={'クリック'}
          asChild
        >
          {props.close}
        </Toast.Action>
      </ToasterStyled>
      <ToastViewportStyled/>
    </>
  )
};