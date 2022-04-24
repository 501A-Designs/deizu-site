import React from 'react'
import { MdOutlineOpenInBrowser } from "react-icons/md";
import AlignItems from '../style/AlignItems';
import { useRouter } from 'next/router'
import Button from './Button';

export default function Header() {
    const router = useRouter()

    let footerStyle = {
        position: 'sticky',
        bottom: 0,
        backgroundColor: 'white',
        background: 'radial-gradient(86.36% 107.55% at 6.49% 12.32%,rgba(255, 255, 255, 0.5) 0%,rgba(255, 255, 255, 0.5) 100%)',
        backdropFilter: 'blur(16px)',
        zIndex: 100,
        height: '100px',
        borderTop: '1px solid rgba(238, 238, 238, 0.651)',
        borderRight: '1px solid rgba(238, 238, 238, 0.651)',
        borderLeft: '1px solid rgba(238, 238, 238, 0.651)',
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
            <a href="usage">使用法</a>
            <a href="about">DEIZUについて</a>
            <a
                href="https://501a.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
            >
            501A
            </a>
            <Button
                onClick={() => router.push('/app')}
                icon={<MdOutlineOpenInBrowser/>}
            >
                Webアプリを開く
            </Button>
        </footer>
    )
}
