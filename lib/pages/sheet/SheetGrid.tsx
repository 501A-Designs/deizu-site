import { useState } from "react";
import { styled } from "../../../stitches.config";
import Stack from "../../style/Stack";
import SubjectCell from "./SubjectCell";
import TimeCell from "./TimeCell";
import { scheduleCellId } from "../../data/scheduleCellId";
import moment from 'moment';
import { EditorProps } from "./Editor";
import { db } from "../../../src/service/firebase";
import { doc, DocumentData } from "firebase/firestore";
import { useDocument } from "react-firebase-hooks/firestore";


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
  '@bp1':{
    fontSize:'$s',
  },
  '@bp2_':{
    fontSize:'$m',
  },
  variants:{
    today:{
      true:{
        color: '$gray12',
      },
      false:{
        color: '$gray8',
      }
    },
  },
})

export default function SheetGrid(props:EditorProps) {
  let sheetData = props.sheetData;
  let viewOnly = props.viewOnly;
  let user = props.user;

  const rows:number[] = [1,2,3,4,5,6,7]; // Or something else
  const dayOfWeek:string[] = ['月','火','水','木','金','土']

  const [dataSheetData, loadingDataSheetData] = useDocument<DocumentData>(doc(db, `sheets/${props?.sheetData?.dataSheetId}/`));
  console.log(dataSheetData?.data())

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
              <>
                <TimeCell
                  key={rowId}
                  viewOnly={viewOnly}
                  displayPeriod={rowId}
                  timeData={sheetData?.time}
                  user={user}
                />
                {scheduleCellId[rowId-1].map(cellId =>
                  <SubjectCell
                    key={cellId}
                    viewOnly={viewOnly}
                    cellData={sheetData?.cells[cellId]}
                    cellId={cellId}
                    dataSheetData={dataSheetData?.data()}
                    user={user}
                  />
                )}
              </>
            )
          })
        }
      </SheetGridStyled>
    </Stack>
  )
}