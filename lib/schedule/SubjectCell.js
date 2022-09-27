import moment from 'moment';
import React from 'react'
import {isBrowser, isMobile} from 'react-device-detect';

export default function SubjectCell(props) {
    let sheetCellsData = props.sheetCellsData;
    let cellId = props.cellId;
    let subjectCellName,subjectCellDescription,subjectCellColor,subjectCellLink;

    if (sheetCellsData === undefined || sheetCellsData[cellId] === undefined){
        subjectCellName = '';
        subjectCellDescription = '';
    }else{
        subjectCellName = sheetCellsData[cellId][cellId];
        subjectCellDescription = sheetCellsData[cellId][cellId+'Dscrp'];
        subjectCellColor = sheetCellsData[cellId][cellId+'Color'];
        subjectCellLink = sheetCellsData[cellId][cellId+'Link'];
    }

    // Conditional Border Radius
    let borderRadius = 'var(--borderRadius0)';
    if (isBrowser) {        
        if (cellId == 'f1') {
            borderRadius = 'var(--borderRadius0) var(--borderRadius2) var(--borderRadius0) var(--borderRadius0)';
            if (moment().format('d') == 6) {
                borderRadius = 'var(--borderRadius0)';
            }
        }if (cellId == 'f7') {
            borderRadius = 'var(--borderRadius0) var(--borderRadius0) var(--borderRadius2) var(--borderRadius0)';
        }
    }

    let subjectCellStyle ={
        userSelect: 'none',
        display: 'flex',
        justifyContent: `${isMobile ? 'space-between' : 'center'}`,
        flexDirection: 'column',
        alignItems: 'center',
        fontWeight: 'bold',
        height: '85px',
        borderRadius: `${borderRadius}`,
        backgroundColor: `${subjectCellColor ? subjectCellColor:'var(--system1)'}`,
        border: `1px solid ${subjectCellColor ? subjectCellColor:'var(--system1)'}`,
        transition: '0.06s',
        cursor: 'pointer'
    }
    let subjectCellNameStyle = {
        textDecoration: `${subjectCellLink && 'underline dotted'}`,
        color: 'var(--textColor0)',
        textAlign: 'center',
    }
    let subjectCellDescriptionStyle ={
        fontWeight: 'normal',
        textAlign: 'center',
        fontSize: `${!isMobile && '0.8em'}`,
        padding: `${isMobile ? '2px 5px':'5px 10px'}`,
        width: 'fit-content',
        margin: '5px',
        color: 'var(--txtColor1)',
        backgroundColor: 'var(--system3)',
        borderRadius: 'var(--borderRadius0)',
    }

    return (
        <div
            key={props.key}
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
    )
}