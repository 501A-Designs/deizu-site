import React from 'react'
import AlignItems from '../style/AlignItems'
import gradient from 'random-gradient'
import { FiUsers } from 'react-icons/fi'
import { styled } from '@stitches/react';


export default function SheetButton(props) {
    const SheetButton = styled('div', {
        borderRadius:'var(--borderRadius1)',
        transition: 'backgroundColor 0.5s',
        padding: '0.8em',
        cursor: 'pointer',
        height: 'fit-content',
        backgroundColor: 'var(--system0)',
        transition: '0.3s',
        'p':{
            padding: 0,
            margin: 0,
            height: 'fit-content',
        },
        'span':{
            color:'var(--txtColor0)',
            fontSize:'0.9em',
        },
        'time':{
            color:'var(--system3)',
            fontSize:'0.8em',
        },
        '&:hover':{
            backgroundColor:'var(--system1)',
            transform: 'scale(1.01)'
        },
    });
    const GradientPlaceholder = styled('div', {
        borderRadius:'var(--borderRadius0)',
        width:'2.5em',
        height:'2.5em',
        background:gradient(props.children),
        border: '1px solid var(--system0)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
    });
    const ButtonImage = styled('img', {
        borderRadius:'var(--borderRadius0)',
        width:'2.5em',
        height:'2.5em',
        backgroundColor:'var(--system1)',
        objectFit: 'cover',
        border: '1px solid var(--system0)',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
    });

    return (
        <SheetButton
            key={props.key}
            onClick={props.onClick}
        >
            <AlignItems style={{justifyContent: 'space-between'}}>
                <AlignItems gap={'1em'}>
                    {props.imageSource ? 
                        <ButtonImage
                            alt="no img found"
                            src={props.imageSource}
                        />:
                        <GradientPlaceholder/>
                    }
                    <AlignItems>
                        <p>{props.children}</p>
                        {props.sharing && <span title="リンク共有が有効されています"><FiUsers/></span>}
                    </AlignItems>
                </AlignItems>
                {props.date && <time>{props.date}</time>}
            </AlignItems>
        </SheetButton>
    )
}
