import React,{useState} from 'react'
import AlignItems from '../style/AlignItems'
import Stack from '../style/Stack'

export default function TabIconButton(props) {
    const [hovered, setHovered] = useState(false)
    const tabIconButtonStyle = {
        borderRadius:'var(--r5)',
        padding:'1em',
        cursor:'pointer',
        backgroundColor: `${props.tabId === props.sectionState ? 'var(--system1)':''}`,
        border: `${hovered ? '1px solid var(--system1)':'1px solid transparent'}`,
    }
    const largeIcon = {
        fontSize: '1em',
        borderRadius:'var(--r5)',
        color: 'var(--txtColor1)',
        backgroundColor:'var(--system3)',
        padding:'0.5em'
    }
    return (
        <div        
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
            onClick={props.onClick}
            style={tabIconButtonStyle}
        >
            <AlignItems
                style={{
                    justifyContent: 'center',
                }}
                gap={'1em'}
            >
                <div style={largeIcon}>
                    <AlignItems>
                        {props.children}
                    </AlignItems>
                </div>
                <h4 style={{fontWeight: 'normal'}}>{props.name}</h4>
            </AlignItems>
        </div>
    )
}
