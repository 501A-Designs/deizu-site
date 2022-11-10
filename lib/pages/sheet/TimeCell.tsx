import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React,{useState} from 'react'
import { FiSave } from 'react-icons/fi';
import { db } from '../../../src/service/firebase';
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
  alignItems:'center',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: '5px',
  cursor: 'pointer',
  minHeight: '85px',
  width:'100%',
  borderRadius:'$1',
  backgroundColor: '$gray2',
  border:'1px solid $gray3',
  transition: '$speed1',
  '&:hover':{
    transform:'scale(0.95)',
    backgroundColor: '$gray3',
    border:'1px solid $gray5',
    boxShadow:'$light'
  }
})

const TimePeriodStyled = styled('div',{
  backgroundColor:'$gray5',
  border:'1px solid $gray6',
  borderRadius:'$rounded',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  '@bp1':{
    width:'15px',
    height:'15px',
  },
  '@bp2_':{
    width:'25px',
    height:'25px',
  },
  'h3':{
    textAlign:'center',
    fontWeight:'normal',
    margin:0,
    padding:0,
    color:'$gray10',
    '@bp1':{
      fontSize:'$s',
    },
    '@bp2_':{
      fontSize:'$l',
    }
  },
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
    padding: '$1 0',
    writingMode: 'vertical-rl',
    textOrientation: 'mixed'
  }
})

// TIME MODAL
  // const openTimeModal = (prop) => {
  //   if (!viewOnly) {
  //     if (timeData) {
  //       if (timeData[prop]) {
  //         setTimeStart(timeData[prop].start);
  //         setTimeEnd(timeData[prop].end)
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
  //   let newObject = Object.assign({ ...timeData, 
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

interface TimeCellProps{
  displayPeriod:number,
  viewOnly:boolean,
  timeData:any,
  user?:any
}

export default function TimeCell(props:TimeCellProps) {
  const router = useRouter();
  const sheetId:string = `${router.query.id}`;
  let displayPeriod = props.displayPeriod;

  let viewOnly = props.viewOnly
  let timeData = props.timeData;
  let user = props.user;

  const [timeStart, setTimeStart] = useState<string>(
    timeData === undefined ||
    timeData[displayPeriod] === undefined ? '':
    timeData[displayPeriod].start
  );
  const [timeEnd, setTimeEnd] = useState<string>(
    timeData === undefined ||
    timeData[displayPeriod] === undefined ? '':
    timeData[displayPeriod].end
  );
  
  const timeContainerDynamicBorderRadius = () =>{
    if (displayPeriod == 1) {
      return '$3 $1 $1 $1';
    }if (displayPeriod == 7) {
      return '$1 $1 $1 $3';
    }
  }

  const saveTimeData = async (e:any) => {
    e.preventDefault();
    await setDoc(doc(db, `users/${user && user.uid}/scheduleGrid/${sheetId}`),
      {
        time:{
          [displayPeriod]: {
            start: timeStart,
            end: timeEnd,
          }
        },
        date: serverTimestamp(),
      }, { merge: true },
    );
  }

  return (
    <Dialog
      title={viewOnly ? '編集不可能':displayPeriod+'限目の時間'}
      trigger={
        <TimeContainerStyled css={{borderRadius:`${timeContainerDynamicBorderRadius()}`}}>
          {timeStart ? 
            <TimeStyled>
              {timeStart}
            </TimeStyled>:
            <br/>
          }
          <TimePeriodStyled>
            <h3>{props.displayPeriod}</h3>
          </TimePeriodStyled>
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
