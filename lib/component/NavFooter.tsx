import React from 'react'

import Button from '../button/Button';

import AlignItems from '../style/AlignItems';
import { useRouter } from 'next/router'
import { FiArrowUpCircle, FiBook, FiInfo } from 'react-icons/fi';
import { styled } from '../../stitches.config';
import Footer from './Footer';

let NavFooterStyled = styled('div',{
  position: 'sticky',
  bottom: 0,
  zIndex: 1000,
  height: '70px',
  backdropFilter: 'blur(5px)',
  WebkitBackdropFilter: 'blur(5px)',
  maskImage: 'linear-gradient(transparent, black 60%)',
  WebkitMasKImage: 'linear-gradient(to bottom,#000 25%,transparent)',
  // margin: '0 5%',
  padding: '1em',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})

export default function NavFooter() {
  const router = useRouter()
  
  return (
    <Footer>
      <NavFooterStyled>
        {/* <AlignItems>
          <Button
            size={'small'}
            styleType={'outline'}
            icon={<FiBook/>}
            onClick={()=>router.push('/about')}
          >
            Deizuについて
          </Button>
          <Button
            size={'small'}
            styleType={'outline'}
            icon={<FiInfo/>}
            onClick={()=>router.push('/usage')}
          >
            使用法
          </Button>
        </AlignItems>
        <Button
          onClick={() => router.push('/app')}
          icon={<FiArrowUpCircle/>}
        >
          Webアプリを開く
        </Button> */}
      </NavFooterStyled>
    </Footer>
  )
}
