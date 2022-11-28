import React, { useEffect, useRef, useState } from 'react'
import { styled } from '../../stitches.config'
import AlignItems from '../style/AlignItems'

const StatusBarContainerStyled = styled('div',{
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  top:'0',
  position:'sticky',
  zIndex:'1'
})

const StatusBarStyled = styled('div',{
  fontSize:'$m',
  transition:'$speed1',
  cursor:'pointer',
  userSelect:'none',
  variants:{
    status:{
      standard:{
        backgroundColor:'$gray3',
        border:'1px solid $gray6',
        color:'$gray9'
      },
      sharing:{
        backgroundColor:'$blue3',
        border:'1px solid $blue6',
        color:'$blue9'
      },
      archived:{
        backgroundColor:'$orange3',
        border:'1px solid $orange6',
        color:'$orange9'
      },
    },
    compact:{
      true:{
        width:'150px',
        marginTop:'10px',
        borderRadius:'$rounded',
        padding:'calc($1*1.5)',
        boxShadow:'$heavy'
      },
      false:{
        width:'100%',
        padding:'$2'
      }
    }
  },
  defaultVariants:{
    status:'sharing'
  }
})

export default function StatusBar(props:any) {
  const [compact, setCompact] = useState(false)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      currentScrollY !== 0 ? setCompact(true):setCompact(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [compact]);

  return (
    <StatusBarContainerStyled>
      <StatusBarStyled
        status={props.status}
        compact={window.scrollY !== 0}
      >
        <AlignItems justifyContent={'center'}>
          {props.icon}
          {props.status == 'sharing' && '現在共有中'}
          {props.status == 'archived' && 'アーカイブ済み'}
        </AlignItems>
      </StatusBarStyled>
    </StatusBarContainerStyled>
  )
}
