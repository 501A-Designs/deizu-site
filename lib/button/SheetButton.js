import React,{useEffect, useState} from 'react'
import AlignItems from '../style/AlignItems'
import {MdPeople} from 'react-icons/md'
import gradient from 'random-gradient'
import { FiUsers } from 'react-icons/fi'
import { styled } from '@stitches/react';


export default function SheetButton(props) {
    const [hovered, setHovered] = useState(false);

    const SheetButton = styled('div', {
        borderRadius:'var(--borderRadius1)',
        transition: 'backgroundColor 0.5s',
        padding: '0.8em',
        cursor: 'pointer',
        height: 'fit-content',
        backgroundColor:`${hovered ? 'var(--system1)':'var(--system0)'}`,
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
        }
    });
    const GradientPlaceholder = styled('div', {
        borderRadius:'var(--borderRadius0)',
        width:'2.5em',
        height:'2.5em',
        background:gradient(props.children),
        border: `${hovered ? '1px solid var(--system0)':'1px solid var(--system0)'}`,
        boxShadow: `${hovered ? '0 8px 30px rgba(0, 0, 0, 0.12)':'none'}`,
    });
    const ButtonImage = styled('img', {
        borderRadius:'var(--borderRadius0)',
        width:'2.5em',
        height:'2.5em',
        backgroundColor:'var(--system1)',
        objectFit: 'cover',
        border: `${hovered ? '1px solid var(--system0)':'1px solid var(--system0)'}`,
        boxShadow: `${hovered ? '0 8px 30px rgba(0, 0, 0, 0.12)':'none'}`,
    });

    return (
        <SheetButton
            key={props.key}
            onClick={props.onClick}
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
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
