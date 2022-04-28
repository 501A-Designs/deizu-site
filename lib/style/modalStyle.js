export const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        maxWidth: '500px',
        width: '100%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'white',
        border: '1px solid #f0f0f0',
        borderRadius: 10,
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
        padding: '1em',
    },
    overlay: {
        background: `radial-gradient(
            86.36% 107.55% at 6.49% 12.32%,
            rgba(255, 255, 255, 0.5) 0%,
            rgba(255, 255, 255, 0.5) 100%
        )`,
        backdropFilter: `blur(3px)`
    }
};