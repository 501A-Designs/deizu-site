import { styled } from '@stitches/react';
import React,{useState} from 'react'

export default function Button(props) {
    let width = 'fit-content';
    if (props.width === 'full') width = '100%';

    const Button = styled('button', {
        width: width,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        gap: '5px',
        padding: '10px 25px',
        outline: 'none',
        transition: '0.25s',
        borderRadius: 'var(--borderRadius1)',
        color: 'var(--txtColor1)',
        backgroundColor: 'var(--system3)',
        border: '1px solid var(--system0)',
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': {
            boxShadow: '0 8px 10px var(--system1)',
            transform:'scale(1.02)'
        }    
    })

    return (
        <Button onClick={props.onClick}>
            {props.icon}
            {props.children}
        </Button>
    )
}
