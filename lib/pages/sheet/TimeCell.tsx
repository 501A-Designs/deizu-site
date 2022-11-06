import { styled } from '@stitches/react';
import React from 'react'

const TimeContainerStyled = styled('div', {
  userSelect: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: '5px',
  cursor: 'pointer',
  height: '85px',
  width:'100%',
  backgroundColor: '$system2',
  borderRadius:'$1',
  transition: '$speed1',
  'h3':{
    textAlign:'center',
    fontWeight:'normal',
    margin:0,
    padding:0,
    color:'$system4'
  },
  '&:hover':{
    transform:'scale(0.95)',
    
  }
})

const TimeStyled = styled('div',{
  color: '$textColor2',
  fontSize: '12px',
  float: 'right',
  borderRadius: '$1',
  backgroundColor: '$system4',
  padding: '0.1em 0.5em',
  textAlign: 'center',
  width: '100%',
  height: 'fit-content',

  // variants:{
  //   position:{
  //     start:{

  //     }
  //   }
  // }
})

export default function TimeCell(props) {
  let sheetTimeData = props.sheetTimeData;
  let displayPeriod = props.displayPeriod;

  let timeStart,timeEnd;
  
  if (sheetTimeData === undefined || sheetTimeData[displayPeriod] === undefined){
    timeStart = '';
    timeEnd = '';
  }else{
    timeStart = sheetTimeData[displayPeriod].start;
    timeEnd = sheetTimeData[displayPeriod].end;
  }

  let timeContainerBorderRadius = 'var(--borderRadius0)';
  let timeBorderRadiusStart = 'var(--borderRadius0)';
  let timeBorderRadiusEnd = 'var(--borderRadius0)';

  let timeStyleStart = {
    borderRadius: timeBorderRadiusStart
  }

  let timeStyleEnd = {
    borderRadius: timeBorderRadiusEnd
  }

  const timeContainerDynamicBorderRadius = () =>{
    if (displayPeriod == 1) {
      return '$3 $1 $1 $1';
    }if (displayPeriod == 7) {
      return '$1 $1 $1 $3';
    }
  }

  const timeDynamicBorderRadius = () =>{
    if (displayPeriod == 1) {
      return '$3 $1 $1 $1';
    }if (displayPeriod == 7) {
      return '$1 $1 $1 $3';
    }
  }

  return (
    <TimeContainerStyled
      onClick={props.onClick}
      css={{
        borderRadius:`${timeContainerDynamicBorderRadius()}`
      }}
    >
      {timeStart ? 
        <TimeStyled
          css={{
            borderRadius:`${timeDynamicBorderRadius()}`
          }}
          // style={{
          //   ...timeStyle,
          //   ...timeStyleStart
          // }}
        >
          {timeStart}
        </TimeStyled>:
        <br/>
      }
      <h3>{props.displayPeriod}</h3>
      {timeEnd ? 
        <TimeStyled
          css={{
            borderRadius:`${timeDynamicBorderRadius()}`
          }}
        >
          {timeEnd}
        </TimeStyled>:
        <br/>
      }
    </TimeContainerStyled>
  )
}
