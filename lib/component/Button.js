import React,{useState} from 'react'

export default function Button(props) {
    const [hovered, setHovered] = useState(false)
    let width = 'fit-content';
    if (props.width === 'full') width = '100%';

    let buttonStyle = {
        width: width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        gap: '5px',
        padding: '10px 25px',
        outline: 'none',
        cursor: 'pointer',
        transition: '0.25s',
        borderRadius: 'var(--r5)',
        color: 'var(--txtColor1)',
        backgroundColor: 'var(--system3)',
        border: '1px solid var(--system0)',
        boxShadow: `${hovered ? '0 8px 10px var(--system1)':''}`,
    }
    return (
        <button
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
            disabled={props.disabled}
            onClick={props.onClick}
            style={Object.assign(
                buttonStyle,
                props.style
            )}
        >
            {props.icon}
            {props.children}
        </button>
    )
}
