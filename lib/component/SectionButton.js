import React,{useState} from 'react'
import AlignItems from '../style/AlignItems'

export default function SectionButton(props) {
    const [hovered, setHovered] = useState(false)
    let sectionButton = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor:`${hovered ? 'var(--system1)':'var(--system0)'}`,
        // border:'var(--system2)',
        borderRadius:'var(--r5)',
        height: 'fit-content',
        padding: '0.7em 0.8em',
        cursor: 'pointer',
        transition: '0.3s'
    }
    let leftIcon = {
        border: '1px solid var(--system0)',
        color: 'var(--txtColor1)',
        backgroundColor: 'var(--system3)',
        borderRadius: 'var(--r5)',
        fontSize: 'large',
        padding: '5px 10px',
    }
    let rightIcon = {
        color: 'var(--system3)',
        marginLeft: 'auto',
        paddingRight: '15px'
    }
    return (
        <div
            style={sectionButton}
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
            onClick={props.onClick}
        >
            <AlignItems gap={'1em'}>
                <span style={leftIcon}>{props.leftIcon}</span>
                {props.children}
            </AlignItems>
            <span style={rightIcon}>{props.rightIcon}</span>
        </div>
    )
}