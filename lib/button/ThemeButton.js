import React from 'react'
import AlignItems from '../style/AlignItems'
import { styled } from '@stitches/react';

export default function ThemeButton(props) {
    const ThemeButton = styled('div', {
        borderRadius:'var(--borderRadius1)',
        padding: '0.5em',
        cursor: 'pointer',
        backgroundColor:`${props.currentTheme == props.data ? 'var(--system1)':'var(--system0)'}`,
        transition: '0.3s',
        'p':{
            padding: 0,
            margin: 0,
            height: 'fit-content',
            color:'var(--txtColor0)',
        },
        '&:hover':{
            backgroundColor:'var(--system1)',
            transform: 'scale(1.03)'
        }
    });
    let ThemePreview = styled('div', {
        borderRadius:'var(--borderRadius0)',
        width:'2.5em',
        height:'2.5em',
        background: `linear-gradient(${props.data[1]}, ${props.data[3]})`,
        border: '1px solid var(--system0)',
        objectFit: 'cover',
    })

    return (
        <ThemeButton
            key={props.key}
            onClick={props.onClick}
        >
            <AlignItems>
                <ThemePreview />
                <p>{props.children}</p>
            </AlignItems>
        </ThemeButton>
    )
}
