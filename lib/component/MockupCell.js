import React from 'react'

export default function MockupCell(props) {
    let subjectCellStyle ={
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 5,
        fontWeight: 'bold',
        height: '85px',
        width: 'fit-content',
        padding: '0 5em',
        margin: 'auto',
        backgroundColor: `${props.subjectCellColor ? props.subjectCellColor:'#f0f0f0'}`,
        border:'1px solid #f0f0f0',
        transition: '0.06s',
        cursor: 'pointer'
    }
    let subjectCellNameStyle = {
        textDecoration: `${props.subjectCellLink && 'underline dotted'}`
        // text-decoration-style: wavy;
    }
    let subjectCellDescriptionStyle ={
        color: 'white',
        fontWeight: 'normal',
        backgroundColor: 'black',
        fontSize: '0.7em',
        borderRadius:5,
        padding: '5px 10px',
        width: 'fit-content',
        margin: '5px'
    }

    return (
        <div style={subjectCellStyle}>
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
