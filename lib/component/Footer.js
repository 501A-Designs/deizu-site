import React from 'react'
import { MdInfo,MdMenuBook,MdOutlineOpenInBrowser } from "react-icons/md";
import AlignItems from '../style/AlignItems';
import IconButton from '../component/IconButton';
import { useRouter } from 'next/router'
import Button from './Button';
import Link from 'next/link';

export default function Header() {
    const router = useRouter()

    let footerStyle = {
        position: 'sticky',
        bottom: 0,
        backgroundColor: 'white',
        background: 'radial-gradient(86.36% 107.55% at 6.49% 12.32%,var(--system0) 0%,rgba(255, 255, 255, 0.5) 100%)',
        backdropFilter: 'blur(16px)',
        zIndex: 100,
        height: '100px',
        borderTop: '1px solid var(--system1)',
        borderRight: '1px solid var(--system1)',
        borderLeft: '1px solid var(--system1)',
        borderRadius:'10px 10px 0px 0px',
        padding: '0 5%',
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
                    icon={<MdMenuBook/>}
                    onClick={()=>router.push('/about')}
                >
                    DEIZUについて
                </IconButton>
                <IconButton
                    icon={<MdInfo/>}
                    onClick={()=>router.push('/usage')}
                >
                    使用法
                </IconButton>
            </AlignItems>
            <Button
                onClick={() => router.push('/app')}
                icon={<MdOutlineOpenInBrowser/>}
            >
                Webアプリを開く
            </Button>
        </footer>
    )
}
