import React,{useState} from 'react'

export default function SubjectCell(props) {
    const [focus, setFocus] = useState(false)

    let sheetData = props.sheetData;
    let sheetCellsData = props.sheetCellsData;
    let cellId = props.cellId;

    let subjectCellName,subjectCellDescription,subjectCellColor,subjectCellLink;

    if (sheetCellsData[cellId] === undefined){
        subjectCellName = '';
        subjectCellDescription = '';
    }else{
        subjectCellName = sheetCellsData[cellId][cellId];
        subjectCellDescription = sheetCellsData[cellId][cellId+'Dscrp'];
        subjectCellColor = sheetCellsData[cellId][cellId+'Color'];
        subjectCellLink = sheetCellsData[cellId][cellId+'Link'];
    }
    // console.log(subjectCellColor)

    let subjectCellStyle ={
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: 'bold',
        height: '85px',
        borderRadius: 'var(--r5)',
        backgroundColor: `${subjectCellColor ? subjectCellColor:'var(--system1)'}`,
        border:'1px solid var(--system1)',
        transition: '0.06s',
        cursor: 'pointer'
    }
    let subjectCellNameStyle = {
        textDecoration: `${subjectCellLink && 'underline dotted'}`,
        color: 'black',
        textAlign: 'center',
        // text-decoration-style: wavy;
    }
    let subjectCellDescriptionStyle ={
        fontWeight: 'normal',
        fontSize: '0.7em',
        padding: '5px 10px',
        width: 'fit-content',
        margin: '5px',
        color: 'var(--txtColor1)',
        backgroundColor: 'var(--system3)',
        borderRadius: 'var(--r5)',
    }

    return (
        <>
        <div
            onClick={props.onClick}
            style={subjectCellStyle}
        >
            <h4 
                style={subjectCellNameStyle}
                onClick={() => {
                    subjectCellLink && window.open(subjectCellLink, "_blank")
                }}
            >
                {subjectCellName}
            </h4>
            {subjectCellDescription && <p style={subjectCellDescriptionStyle}>
                {subjectCellDescription}
            </p>}
        </div>
        </>
    )
}
