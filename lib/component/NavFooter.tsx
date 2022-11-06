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
    backgroundColor: 'white',
    background: 'radial-gradient(86.36% 107.55% at 6.49% 12.32%,$system1 0%,rgba(255, 255, 255, 0.5) 100%)',
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
    zIndex: 1000,
    height: '70px',
    borderTop: '1px solid $system2',
    borderRight: '1px solid $system2',
    borderLeft: '1px solid $system2',
    borderRadius:'$3 $3 0px 0px',
    margin: '0 5%',
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
        <AlignItems>
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
        </Button>
      </NavFooterStyled>
    </Footer>
  )
}
