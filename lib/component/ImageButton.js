import React from 'react'
import AlignItems from '../style/AlignItems'

export default function ImageButton(props) {
    let imageButtonStyle ={
        borderRadius:'var(--r5)',
        backgroundColor:'var(--system1)',
        padding: '1em'
    }
    return (
        <div
            style={imageButtonStyle}
            onClick={props.onClick}
        >
            <AlignItems>
                {props.component && props.component}
                {props.imageSource && <img alt="no img found" src={props.imageSource} />}
                <p style={{padding: 0,margin: 0}}>{props.children}</p>
            </AlignItems>
        </div>
    )
}
