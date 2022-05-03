import React,{useState} from 'react'
import AlignItems from '../style/AlignItems'
import Stack from '../style/Stack'

export default function LargeImageButton(props) {
    const [hovered, setHovered] = useState(false)
    let largeImageButtonStyle ={
        backgroundColor: `${hovered ? 'var(--system0)':'var(--system1)'}`,
        boxShadow: `${hovered ? '0 8px 30px rgba(0, 0, 0, 0.12)':''}`,
        border:'1px solid var(--system1)',
        borderRadius:'var(--r5)',
        padding: '1em',
        transition:'0.2s',
        cursor: 'pointer'
    }
    let largeImageButtonImageStyle ={
        borderRadius:'var(--r5)',
        width:'3.5em',
        height:'3.5em',
        backgroundColor:'var(--system0)',
        border: '1px solid var(--system1)',
    }
    return (
        <div
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
            style={largeImageButtonStyle}
            onClick={props.onClick}
        >
            <AlignItems gap={'1em'}>
                {props.component && props.component}
                {props.imageSource && <img alt="no img found" style={largeImageButtonImageStyle} src={props.imageSource} />}
                <Stack gap={'0'}>
                    <h3 style={{padding: 0,margin: 0, height: 'fit-content'}}>{props.children}</h3>
                    <p style={{padding: 0,margin: 0, height: 'fit-content'}}>{props.subtitle}</p>
                </Stack>
            </AlignItems>
        </div>
    )
}
