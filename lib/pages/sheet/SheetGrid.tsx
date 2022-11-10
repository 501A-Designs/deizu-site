import { useState } from "react";
import { styled } from "../../../stitches.config";
import Stack from "../../style/Stack";
import SubjectCell from "./SubjectCell";
import TimeCell from "./TimeCell";
import { scheduleCellId } from "../../data/scheduleCellId";
import moment from 'moment';
import { EditorProps } from "./Editor";


const SheetGridStyled = styled('div',{
  display:'grid',
  gap: '0.2em',
  gridTemplateColumns:'0.5fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr 1.5fr'
})

const DayOfWeekStyled = styled('div',{
  userSelect: 'none',
  textAlign: 'center',
  padding: '0.5em',
  color: '$gray1',
  borderRadius: '$2 $2 $1 $1',
  '@bp1':{
    fontSize:'$s',
  },
  '@bp2_':{
    fontSize:'$m',
  },
  variants:{
    today:{
      true:{
        border: '1px solid $gray3',
        backgroundColor: '$gray3',
        fontWeight: 'bold',
        color: '$gray12',
      },
      false:{
        border: '1px solid transparent',
      }
    },
  }
})

const rows:number[] = [1,2,3,4,5,6,7]; // Or something else

function Row(rowProps:any){
  return(
    <>
      <TimeCell
        key={rowProps.rowId}
        viewOnly={rowProps.viewOnly}
        displayPeriod={rowProps.rowId}
        timeData={rowProps.sheetData?.time}
        user={rowProps.user}
      />
      {scheduleCellId[rowProps.rowId-1].map(cellId =>
        <SubjectCell
          key={cellId}
          viewOnly={rowProps.viewOnly}
          cellData={rowProps.sheetData?.cells[cellId]}
          cellId={cellId}
          user={rowProps.user}
        />
      )}
    </>
  )
}

export default function SheetGrid(props:EditorProps) {
  let sheetData = props.sheetData;
  let viewOnly = props.viewOnly;
  let user = props.user
  const cellVerticalLocation:string[] =['a', 'b', 'c', 'd', 'e', 'f'];
  const dayOfWeek:string[] = ['月','火','水','木','金','土']

  return (
    <Stack>
      <SheetGridStyled>
        <br/>
        {dayOfWeek.map(day =>{
          return (
            <DayOfWeekStyled
              key={day}
              today={moment().format('d') == `${dayOfWeek.indexOf(day)+1}`}
            >
              {day}
            </DayOfWeekStyled>
          )
        })}
        {
          rows.map(rowId => {
            return(
              <Row
                key={rowId}
                viewOnly={viewOnly}
                rowId={rowId}
                sheetData={sheetData}
                user={user}
              />
            )
          })
        }
      </SheetGridStyled>
    </Stack>
  )
}