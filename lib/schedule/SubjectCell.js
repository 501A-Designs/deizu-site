import React,{useState} from 'react'

export default function SubjectCell(props) {
    const [focus, setFocus] = useState(false)

    let sheetData = props.sheetData;
    let cellId = props.cellId;

    let subjectCellName,subjectCellDescription,subjectCellColor,subjectCellLink;

    if (sheetData.cells[cellId] === undefined){
        subjectCellName = '';
        subjectCellDescription = '';
    }else{
        subjectCellName = sheetData.cells[cellId][cellId];
        subjectCellDescription = sheetData.cells[cellId][cellId+'Dscrp'];
        subjectCellColor = sheetData.cells[cellId][cellId+'Color'];
        subjectCellLink = sheetData.cells[cellId][cellId+'Link'];
    }
    console.log(subjectCellColor)

    let subjectCellStyle ={
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: 5,
        fontWeight: 'bold',
        // height: '100%',
        height: '85px',
        backgroundColor: `${subjectCellColor ? subjectCellColor:'#f0f0f0'}`,
        border:'1px solid #f0f0f0',
        transition: '0.06s',
        cursor: 'pointer'
    }
    let subjectCellNameStyle = {
        fontWeight: 'normal',
        textDecoration: `${subjectCellLink && 'underline dotted'}`
        // text-decoration-style: wavy;
    }
    let subjectCellLinkStyle ={
        color: 'black',
        fontWeight: 'normal',
        textDecoration: 'underline',
        fontSize: '0.5em',
        padding: 0,
        width: 'fit-content',
        margin: 0,
        boxShadow: `${focus && '0 8px 30px rgba(0, 0, 0, 0.12)'}`,
    }
    let subjectCellDescriptionStyle ={
        color: 'white',
        // backgroundColor: '#ececec',
        fontWeight: 'normal',
        backgroundColor: 'black',
        fontSize: '0.7em',
        borderRadius:5,
        padding: '5px 10px',
        width: 'fit-content',
        margin: '5px'
    }

    return (
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
    )
}
