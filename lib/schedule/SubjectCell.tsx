import moment from 'moment';
import React from 'react'
import { styled } from '../../stitches.config';

const SubjectCellStyled= styled('div', {
  userSelect: 'none',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontWeight: 'bold',
  height: '85px',
  transition: '$speed1',
  cursor: 'pointer',
  '&:hover':{
    transform:'scale(0.95)',
    borderRadius: '$2',
  },

  // Media Query
  '@bp1':{
    justifyContent: 'space-between',
  },
  '@bp2_':{
    justifyContent: 'center',
  },
})

const SubjectCellNameStyled = styled('h4', {
  // textDecoration: `${subjectCellLink && 'underline dotted'}`,
  color: '$textColor1',
  textAlign: 'center',
  '@bp1':{
    justifyContent: 'space-between',
  },
  '@bp2_':{
    justifyContent: 'center',
  },
})
let SubjectCellDescriptionStyled = styled('p', {
  fontWeight: 'normal',
  textAlign: 'center',
  // fontSize: `${!isMobile && '0.8em'}`,
  width: 'fit-content',
  margin: '5px',
  color: '$textColor2',
  backgroundColor: '$system4',
  borderRadius: '$1',
  '@bp1_2':{
    fontSize: '0.5em',
    padding:'2.5px $1'
  },
  '@bp3':{
    fontSize: '0.65em',
    padding:'3px $1'
  },
  '@bp4':{
    fontSize: '0.8em',
    padding:'$1 $2'
  },
})

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

  const dynamicBorderRadius = () =>{
    if (cellId == 'f1') {
      if (moment().format('d') == '6') {
        return '$1';
      }
      return '$1 $3 $1 $1';
    }if (cellId == 'f7') {
      return '$1 $1 $3 $1';
    }else{
      return '$1'
    }
  }

  return (
    <SubjectCellStyled
      onClick={props.onClick}
      css={{
        '@bp1':{
          borderRadius: '$1',
        },
        '@bp2_':{
          borderRadius: `${dynamicBorderRadius()}`,
        },
        border: `1px solid ${subjectCellColor ? subjectCellColor:'$system2'}`,
        backgroundColor: `${subjectCellColor ? subjectCellColor:'$system2'}`,
      }}
    >
      <SubjectCellNameStyled
        onClick={() => {
          subjectCellLink && window.open(subjectCellLink, "_blank")
        }}
      >
        {subjectCellName}
      </SubjectCellNameStyled>
      {subjectCellDescription && 
        <SubjectCellDescriptionStyled>
          {subjectCellDescription}
        </SubjectCellDescriptionStyled>
      }
    </SubjectCellStyled>
  )
}