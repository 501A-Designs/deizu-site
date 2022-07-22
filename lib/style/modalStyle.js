import {isMobile} from 'react-device-detect';
export const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        maxWidth: '500px',
        width: '100%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'var(--system0)',
        border: '1px solid var(--system1)',
        borderRadius: 'var(--r10)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        overflowY: 'auto',
        height: `${isMobile ? '100%':'fit-content'}`,
        padding: '1em',
    },
    overlay: {
        background: `radial-gradient(
            86.36% 107.55% at 6.49% 12.32%,
            var(--system0) 0%,
            rgba(255, 255, 255, 0.5) 100%
        )`,
        cursor: 'pointer',
        backdropFilter: `blur(3px)`
    }
};