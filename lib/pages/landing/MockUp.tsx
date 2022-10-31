import { styled } from "../../../stitches.config"
import {BrowserMockup, MobileMockup} from 'react-mockup'
import 'react-mockup/dist/index.css'

const BrowserMockUpContainer = styled('div',{
  marginBottom:'$2',
  '@bp1':{
    display:'none'
  },
  '@bp2':{
    width:'90%',
    display:'block'
  },
	'@bp3':{
    width:'85%',
    display:'block'
  },
	'@bp4':{
    width:'85%',
    display:'block'
  },
})

const MobileMockUpContainer = styled('div',{
  marginBottom:'$2',
  '@bp1':{
    display:'block'
  },
  '@bp2':{
    display:'none'
  },
	'@bp3':{
    display:'none'
  },
	'@bp4':{
    display:'none'
  },
})


export default function MockUp() {
  const frameStyle={
    backdropFilter: 'blur(16px)',
    background:'radial-gradient(86.36% 107.55% at 6.49% 12.32%,rgba(255, 255, 255, 0.5) 0%,rgba(255, 255, 255, 0.5) 100%)',
    border:'1px solid rgba(228, 228, 228, 0.3)',
    padding:'15px',
    borderRadius:'20px',
  }

  return (
    <>
      <BrowserMockUpContainer>
        <BrowserMockup
          src='deizu-screenshot.png'
          type="mac"
          windowControlPosition="left"
          angleX="1deg"
          angleY="0deg"
          accentColor="white"
          urlValue="deizu.vercel.app"
          color="black"
          frameStyle={frameStyle}
        />
      </BrowserMockUpContainer>
      <MobileMockUpContainer>
        <MobileMockup
          size="1"
          src="deizu-mobile-screenshot.png"
          angleX="4deg"
          angleY="0deg"
          border="none"
        />
      </MobileMockUpContainer>
    </>
  )
}
