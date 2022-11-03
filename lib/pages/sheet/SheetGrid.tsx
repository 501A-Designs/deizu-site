import { useState } from "react";
import { styled } from "../../../stitches.config";
import Stack from "../../style/Stack";
import SubjectCell from "./SubjectCell";
import TimeCell from "./TimeCell";
import { scheduleCellId } from "../../data/scheduleCellId";
import moment from 'moment';


const SheetGridStyled = styled('div',{
  display:'grid',
  gap: '0.2em',
  '@bp1_2':{gridTemplateColumns:'1fr'},
  '@bp3_':{gridTemplateColumns:'0.5fr 9fr'}
})

const DayOfWeekContainerStyled = styled('div',{
  display: 'grid',
  height: 'fit-content',
  gap: '0.2em',
  gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr 1fr',
})

const DayOfWeekStyled = styled('div',{
  userSelect: 'none',
  textAlign: 'center',
  padding: '0.5em',
  color: '$system4',

  // scaleFont
  variants:{
    today:{
      true:{
        border: '1px solid $system2',
        backgroundColor: '$system2',
        fontWeight: 'bold',
        color: '$system4',
      },
      false:{
        border: '1px solid transparent',
      }
    },
    edge:{
      true:{
        borderRadius: '$2 $2 $2 $1',
      },
      false:{
        borderRadius: '$2 $2 $1 $1',
      }
    }
  }
})

const TimeCellGridStyled = styled('div',{
  display: 'grid',
  height: 'fit-content',
  gap:'0.2em',
  '@bp1_2':{
    display:'none'
  }
})

const SubjectCellGridStyled =  styled('div',{
  display: 'grid',
  gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr 1fr',
  gap: '0.2em'
})

export default function SheetGrid(props) {

  let sheetData = props.sheetData;
  let viewOnly = props.viewOnly;
  // let sheetData = props.sheetData;


  const cellVerticalLocation:string[] =['a', 'b', 'c', 'd', 'e', 'f'];
  const dayOfWeek:string[] = ['月','火','水','木','金','土']
  const timeCellLocation:number[] = [1,2,3,4,5,6,7]

  const [modalCellId, setModalCellId] = useState('');

  const openCellModal = (prop) => {
    if (!viewOnly) {
      if (sheetCellsData) {
        if (sheetCellsData[prop]) {
          setSubjectCellName(sheetCellsData[prop][prop])
          setSubjectCellDescription(sheetCellsData[prop][prop+'Dscrp']);
          setSubjectCellColor(sheetCellsData[prop][prop+'Color']);
          setSubjectCellLink(sheetCellsData[prop][prop+'Link']);
        }
      }else{
        setSubjectCellName('')
        setSubjectCellDescription('');
        setSubjectCellColor('');
        setSubjectCellLink('');
      }
    }
  };

  // TIME MODAL
  const [timeModalIsOpen, setTimeModalIsOpen] = useState(false);
  const [timeStart, setTimeStart] = useState('');
  const [timeEnd, setTimeEnd] = useState('');
  const [modalTimeNumber, setModalTimeNumber] = useState('');

  const closeTimeModal = () => {
    setTimeStart('')
    setTimeEnd('');
    setTimeModalIsOpen(false);
  }
  const openTimeModal = (prop) => {
    if (!viewOnly) {
      if (sheetTimeData) {
        if (sheetTimeData[prop]) {
          setTimeStart(sheetTimeData[prop].start);
          setTimeEnd(sheetTimeData[prop].end)
        }
      }else{
        setTimeStart('');
        setTimeEnd('');
      }
      setTimeModalIsOpen(true);
    }
  }
  const saveTimeData = async (e) => {
    e.preventDefault();
    let newObject = Object.assign({ ...sheetTimeData, 
      [modalTimeNumber]: {
        start: timeStart,
        end: timeEnd,
      } 
    })
    setSheetTimeData(newObject);
    const docRef = doc(db, "users", user.uid);
    await setDoc(docRef,
        {
          sheets:{
            [sheetName]: {
              date: serverTimestamp(),
              time:{
                [modalTimeNumber]: {
                  start: timeStart,
                  end: timeEnd,
                }
              }
            }
          },
        }, { merge: true }
    );
    closeTimeModal();
  }

  {/* <Modal
    isOpen={timeModalIsOpen}
    onRequestClose={closeTimeModal}
    style={modalStyle}
  >
    <Stack gap={'1em'} style={{paddingTop:'1em'}}>
      {isMobile && 
        <AlignItems justifyContent={'right'}>
          <CloseButton
            onClick={() =>closeTimeModal()}
          />
        </AlignItems>
      }
      <AlignItems style={{justifyContent: 'center'}}>
        <TextPreview padding={'small'}>
          {timeStart ? timeStart:'開始時'}
        </TextPreview>
        <span>〜</span>
        <TextPreview padding={'small'}>
          {timeEnd ? timeEnd:'終了時'}
        </TextPreview>
      </AlignItems>
      <Stack>
        <Input
          type={'time'}
          value={timeStart}
          onChange={(e)=>setTimeStart(e.target.value)}
          placeholder={'開始時'}
        />
        <Input
          type={'time'}
          value={timeEnd}
          onChange={(e)=>setTimeEnd(e.target.value)}
          placeholder={'終了時'}
        />
      </Stack>
      <Button
        onClick={(e)=>saveTimeData(e)}
      >
        保存
      </Button>
    </Stack>
  </Modal> */}
  return (
    <SheetGridStyled>
      <TimeCellGridStyled/>
      <DayOfWeekContainerStyled>
        {dayOfWeek.map(day =>{
          return (
            <DayOfWeekStyled
              today={moment().format('d') == `${dayOfWeek.indexOf(day)+1}`}
              edge={moment().format('d') == '6'}
            >
              {day}
            </DayOfWeekStyled>
          )
        })}
      </DayOfWeekContainerStyled>
      
      <TimeCellGridStyled gap={'0.2em'}>
        {timeCellLocation.map(cellNumber => {
          return( 
            <TimeCell
              onClick={()=>{
                openTimeModal(cellNumber);
                setModalTimeNumber(cellNumber);
              }}
              key={cellNumber}
              // sheetTimeData={sheetTimeData}
              displayPeriod={cellNumber}
            />
          )
        })}
      </TimeCellGridStyled>
      <SubjectCellGridStyled>
        {scheduleCellId.map(cellId =>
          <SubjectCell
            key={cellId}
            viewOnly={viewOnly}
            // sheetCellsData={sheetCellsData}
            sheetCellsData={sheetData && sheetData.cells}
            // onClick={()=>{
            //   openCellModal(cellId);
            //   setModalCellId(cellId);
            // }}
            cellId={cellId}
          />
        )}
      </SubjectCellGridStyled>
    </SheetGridStyled>
  )
}