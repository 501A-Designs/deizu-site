import React,{useState} from 'react'
import {isMobile} from 'react-device-detect';

export default function SubjectCell(props) {
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
        justifyContent: `${isMobile ? 'space-between' : 'center'}`,
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: 'bold',
        height: '85px',
        borderRadius: 'var(--r5)',
        backgroundColor: `${subjectCellColor ? subjectCellColor:'var(--system1)'}`,
        border: `1px solid ${subjectCellColor ? subjectCellColor:'var(--system1)'}`,
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
        textAlign: 'center',
        fontSize: `${!isMobile && '0.4em'}`,
        padding: `${isMobile ? '2px 5px':'5px 10px'}`,
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
                className={'scaleFont'}
                style={subjectCellNameStyle}
                onClick={() => {
                    subjectCellLink && window.open(subjectCellLink, "_blank")
                }}
            >
                {subjectCellName}
            </h4>
            {subjectCellDescription && 
                <p 
                    style={subjectCellDescriptionStyle}
                    className={isMobile && 'scaleFont'}
                >
                    {subjectCellDescription}
                </p>
            }
        </div>
        </>
    )
}
