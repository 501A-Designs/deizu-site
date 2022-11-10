import React,{useState} from 'react'
import { FiSave } from 'react-icons/fi';
import { styled } from '../../../stitches.config';
import Button from '../../button/Button';
import Dialog from '../../component/Dialog';
import Input from '../../component/Input';
import TextPreview from '../../component/TextPreview';
import AlignItems from '../../style/AlignItems';
import Stack from '../../style/Stack';

const TimeContainerStyled = styled('div', {
  userSelect: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: '5px',
  cursor: 'pointer',
  minHeight: '85px',
  width:'100%',
  borderRadius:'$1',
  backgroundColor: '$gray3',
  border:'1px solid $gray3',
  transition: '$speed1',
  'h3':{
    textAlign:'center',
    fontWeight:'normal',
    margin:0,
    padding:0,
    color:'$gray10',
    '@bp1':{
      fontSize:'$s'
    },
    '@bp2_':{
      fontSize:'$l'
    }
  },
  '&:hover':{
    transform:'scale(0.95)',
    border:'1px solid $gray5',
    boxShadow:'$light'
  }
})

const TimeStyled = styled('div',{
  color: '$gray12',
  fontSize: '$s',
  fontWeight:'bold',
  float: 'right',
  padding: '$1',
  textAlign: 'center',
  width: '100%',
  height: 'fit-content',
  '@bp1':{
    display:'none'
  }
})

// TIME MODAL
  // const openTimeModal = (prop) => {
  //   if (!viewOnly) {
  //     if (sheetTimeData) {
  //       if (sheetTimeData[prop]) {
  //         setTimeStart(sheetTimeData[prop].start);
  //         setTimeEnd(sheetTimeData[prop].end)
  //       }
  //     }else{
  //       setTimeStart('');
  //       setTimeEnd('');
  //     }
  //     setTimeModalIsOpen(true);
  //   }
  // }
  // const saveTimeData = async (e) => {
  //   e.preventDefault();
  //   let newObject = Object.assign({ ...sheetTimeData, 
  //     [modalTimeNumber]: {
  //       start: timeStart,
  //       end: timeEnd,
  //     } 
  //   })
  //   setSheetTimeData(newObject);
  //   const docRef = doc(db, "users", user.uid);
  //   await setDoc(docRef,
  //       {
  //         sheets:{
  //           [sheetName]: {
  //             date: serverTimestamp(),
  //             time:{
  //               [modalTimeNumber]: {
  //                 start: timeStart,
  //                 end: timeEnd,
  //               }
  //             }
  //           }
  //         },
  //       }, { merge: true }
  //   );
  //   closeTimeModal();
  // }

export default function TimeCell(props) {
  let viewOnly = props.viewOnly
  let sheetTimeData = props.sheetTimeData;
  let displayPeriod = props.displayPeriod;

  const [timeStart, setTimeStart] = useState<string>(
    sheetTimeData === undefined ||
    sheetTimeData[displayPeriod] === undefined ? '':
    sheetTimeData[displayPeriod].start
  );
  const [timeEnd, setTimeEnd] = useState<string>(
    sheetTimeData === undefined ||
    sheetTimeData[displayPeriod] === undefined ? '':
    sheetTimeData[displayPeriod].end
  );
  

  const timeContainerDynamicBorderRadius = () =>{
    if (displayPeriod == 1) {
      return '$3 $1 $1 $1';
    }if (displayPeriod == 7) {
      return '$1 $1 $1 $3';
    }
  }

  return (
    <Dialog
      title={viewOnly ? '編集不可能':displayPeriod+'限目の時間'}
      openButton={
        <TimeContainerStyled css={{borderRadius:`${timeContainerDynamicBorderRadius()}`}}>
          {timeStart ? 
            <TimeStyled>
              {timeStart}
            </TimeStyled>:
            <br/>
          }
          <h3>{props.displayPeriod}</h3>
          {timeEnd ? 
            <TimeStyled>
              {timeEnd}
            </TimeStyled>:
            <br/>
          }
        </TimeContainerStyled>
      }
    >
      {viewOnly ?
        <p>編集するにはオーナーにDeizuのユーザーIDを共有する必要があります。</p>:
        <Stack gap={'1em'}>
          <AlignItems justifyContent={'center'}>
            <TextPreview>
              {timeStart ? timeStart:'開始時'}
            </TextPreview>
            <span>〜</span>
            <TextPreview>
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
            icon={<FiSave/>}
            onClick={(e)=>saveTimeData(e)}
          >
            時間を保存
          </Button>
        </Stack>
      }
    </Dialog>
  )
}
