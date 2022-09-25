import React from 'react'
import AlignItems from '../style/AlignItems'
import gradient from 'random-gradient'

export default function ImageButton(props) {
    let imageButtonStyle ={
        borderRadius:'var(--r5)',
        backgroundColor:'var(--system1)',
        padding: `${props.imageSource ? '0.5em':'1em'}`,
        cursor: 'pointer'
    }
    let imageButtonImageStyle ={
        borderRadius:'var(--borderRadius0)',
        width:'2.5em',
        height:'2.5em',
        background:`${props.imageSource ? props.imageSource:gradient(props.imageSource)}`,
        border: '1px solid var(--system1)',
        objectFit: 'cover',
    }

    return (
        <div
            key={props.key}
            style={imageButtonStyle}
            onClick={props.onClick}
        >
            <AlignItems>
                {props.component && props.component}
                <div style={imageButtonImageStyle}/>
                <p style={{padding: 0,margin: 0, height: 'fit-content'}}>{props.children}</p>
            </AlignItems>
        </div>
    )
}
