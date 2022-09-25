import React from 'react'

// Button Component
import Button from '../button/Button';
import IconButton from '../button/IconButton';

import AlignItems from '../style/AlignItems';
import { useRouter } from 'next/router'
import { FiArrowUpCircle, FiBook, FiInfo } from 'react-icons/fi';

export default function Header() {
    const router = useRouter()

    let footerStyle = {
        position: 'sticky',
        bottom: 0,
        backgroundColor: 'white',
        background: 'radial-gradient(86.36% 107.55% at 6.49% 12.32%,var(--system0) 0%,rgba(255, 255, 255, 0.5) 100%)',
        backdropFilter: 'blur(16px)',
        webkitBackdropFilter:'blur(16px)',
        zIndex: 100,
        height: '70px',
        borderTop: '1px solid var(--system1)',
        borderRight: '1px solid var(--system1)',
        borderLeft: '1px solid var(--system1)',
        borderRadius:'var(--borderRadius2) var(--borderRadius2) 0px 0px',
        margin: '0 5%',
        padding: '1em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }

    return (
        <footer style={footerStyle}>
            {/* <AlignItems style={{justifyContent: 'space-between'}}>
                <a href="/">
                    <img src="/deizuAppIconUpdated.png" />
                </a>
            </AlignItems> */}
            <AlignItems>
                <IconButton
                    icon={<FiBook/>}
                    onClick={()=>router.push('/about')}
                >
                    DEIZUについて
                </IconButton>
                <IconButton
                    icon={<FiInfo/>}
                    onClick={()=>router.push('/usage')}
                >
                    使用法
                </IconButton>
            </AlignItems>
            <Button
                onClick={() => router.push('/app')}
                icon={<FiArrowUpCircle/>}
            >
                Webアプリを開く
            </Button>
        </footer>
    )
}
