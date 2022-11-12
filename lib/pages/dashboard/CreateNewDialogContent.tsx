import React,{useEffect, useState} from 'react'
import SectionButton from '../../button/SectionButton';
import Stack from '../../style/Stack';

import {FiChevronLeft, FiChevronRight, FiImage, FiPlus, FiSave, FiSmile} from 'react-icons/fi'
import Container from '../../component/Container';
import AlignItems from '../../style/AlignItems';
import Heading from '../../component/Heading';
import Toggle from '../../component/Toggle';
import Button from '../../button/Button';
import { useTheme } from 'next-themes';
import Notify from '../../component/Notify';
import Input from '../../component/Input';
import { db } from '../../../src/service/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { styled } from '../../../stitches.config';


const SelectBackdropContainerStyled = styled('section',{
  display:'flex',
  alignItems:'center',
  backgroundColor:'$gray1',
})

// const SelectBackdropStyled = styled('div',{
//   backgroundColor:'$gray11',
//   color:'$gray1'
// })

// function SelectBackdrop() {
//   return (
//     <SelectBackdropContainerStyled>
//       <SelectBackdropStyled
//         onClick={()=>setContainerStyle('')}
//       >
//         Bruh
//       </SelectBackdropStyled>
//     </SelectBackdropContainerStyled>
//   )
// }

interface CreateNewDialogContentProps{
  user:any,
}

export default function CreateNewDialogContent(props:CreateNewDialogContentProps) {
  const router = useRouter();
  let user = props.user;
  const [sheetName, setSheetName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)

  const createScheduleGridSheet = async (e:any) =>{
    e.preventDefault();
    setLoading(true);
    const scheduleGridCollection:any = collection(db, `users/${user?.uid}/scheduleGrid/`)
    const createdDoc = await addDoc(scheduleGridCollection, {
      title:sheetName,
      sharing: false,
      cells:{},
      date: serverTimestamp(),
      bannerImageUrl: '',
      archived:false
    });
    router.push(`/user/${user?.uid}/sheet/${createdDoc.id}`);
  }

  return (
    <Stack>
      {!loading ?
        <>
          <AlignItems
            justifyContent={'center'}
            marginTop={'large'}
            marginBottom={'large'}
          >
            <Input
              fullWidth
              size={'extraLarge'}
              value={sheetName}
              onChange={(e) => setSheetName(e.target.value)}
              placeholder={'時間割タイトル'}
              subText={
                <p>クリックして入力</p>
              }
            />
          </AlignItems>
          {/* <SelectBackdrop/> */}
          <Button
            disabled={sheetName ? false:true}
            icon={<FiPlus/>}
            onClick={(e)=> createScheduleGridSheet(e)}
          >
            作成
          </Button>
        </>:
        <AlignItems justifyContent={'center'}>
          <h3>更新中・・・</h3>
        </AlignItems>
      }
    </Stack>
  )
}
