import React from 'react'

export default function MockupCell(props) {
    let subjectCellStyle ={
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'var(--txtColor0)',
        borderRadius:'var(--r5)',
        fontWeight: 'bold',
        padding: `${props.padding ? props.padding :'0 5em'}`,
        height: `${props.height ? props.height :'85px'}`,
        width: `${props.width ? props.width:'fit-content'}`,
        margin: `${props.margin ? props.margin :'auto'}`,
        backgroundColor: `${props.subjectCellColor ? props.subjectCellColor:'var(--system1)'}`,
        border:`1px solid ${props.subjectCellColor ? props.subjectCellColor:'var(--system1)'}`,
        transition: '0.06s',
        cursor: 'pointer'
    }
    let subjectCellNameStyle = {
        textDecoration: `${props.subjectCellLink && 'underline dotted'}`,
        textAlign: 'center',
        width:'150px',
        // text-decoration-style: wavy;
    }
    let subjectCellDescriptionStyle ={
        fontWeight: 'normal',
        backgroundColor: 'var(--system3)',
        fontSize: '0.7em',
        color: 'var(--txtColor1)',
        borderRadius:'var(--r5)',
        padding: '5px 10px',
        width: 'fit-content',
        margin: '5px'
    }

    return (
        <div key={props.key} style={Object.assign(subjectCellStyle,props.style)} className={'scaleUp'} onClick={props.onClick}>
            <h4 
                style={subjectCellNameStyle}
                onClick={() => {
                    props.subjectCellLink && window.open(props.subjectCellLink, "_blank")
                }}
            >
                {props.subjectCellName ? props.subjectCellName : '科目名'}
            </h4>
            <a style={{fontSize: '10px', fontWeight: 'normal'}}>{props.subjectCellLink}</a>
            {props.subjectCellDescription && <p style={subjectCellDescriptionStyle}>
                {props.subjectCellDescription}
            </p>}
        </div>
    )
}
