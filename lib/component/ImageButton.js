import React from 'react'
import AlignItems from '../style/AlignItems'

export default function ImageButton(props) {
    let imageButtonStyle ={
        borderRadius:'var(--r5)',
        backgroundColor:'var(--system1)',
        padding: `${props.imageSource ? '0.5em':'1em'}`,
        cursor: 'pointer'
    }
    let imageButtonImageStyle ={
        borderRadius:'var(--r5)',
        width:'2.5em',
        height:'2.5em',
        backgroundColor:'var(--system0)',
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
                {props.imageSource && <img alt="no img found" style={imageButtonImageStyle} src={props.imageSource} />}
                <p style={{padding: 0,margin: 0, height: 'fit-content'}}>{props.children}</p>
            </AlignItems>
        </div>
    )
}
