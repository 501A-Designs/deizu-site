import { styled } from '@stitches/react';
import React from 'react'

export default function Button(props) {
    let width = 'fit-content';
    if (props.width === 'full') width = '100%';

    let IconButton = styled('button', {
        width: width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        gap: '5px',
        borderRadius: 'var(--borderRadius1)',
        padding: '7px',
        fontSize: '15px',
        outline: 'none',
        cursor: 'pointer',
        border: 'none',
        transition: '0.25s',
        color: `${props.fill ? 'var(--txtColor1)':'var(--system3)'}`,
        backgroundColor: `${props.fill ? 'var(--system3)':'var(--system0)'}`,
        border: `${props.fill ? '1px solid var(--system3)' :'1px solid var(--system2)'}`,
        '&:hover':{
            transform: 'scale(1.05)'
        }
    })
    return (
        <IconButton
            onClick={props.onClick}
            title={props.children}
        >
            {props.icon}
        </IconButton>
    )
}
