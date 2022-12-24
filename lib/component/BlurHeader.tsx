import { styled } from '../../stitches.config';

export const BlurHeader = styled('div',{
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  marginBottom:'-30px',
  height: '50px',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  maskImage: 'linear-gradient(to top, transparent, black 60%)',
  WebkitMasKImage: 'linear-gradient(to top, #000 25%,transparent)',
  padding: '1em',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})
