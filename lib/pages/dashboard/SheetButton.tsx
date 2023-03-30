import React from 'react'

import { FiArchive, FiCornerUpLeft, FiEdit3, FiLink, FiUsers } from 'react-icons/fi'
import { FiTrash } from 'react-icons/fi';
import { styled } from '../../../stitches.config';
import AlignItems from '../../style/AlignItems';
import Tag from '../../component/Tag';
import Stack from '../../style/Stack';
import moment from 'moment';
import Heading from '../../component/Heading';
import Menu from '../../component/Menu';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { copyAlert, db } from '../../../src/service/firebase';
import randomGradient from 'random-gradient';

const SheetButtonStyled = styled('button', {
  cursor: 'pointer',
  padding: '$2',
  userSelect: 'none',
  outlineColor:'$gray12',
  textAlign:'left',
  fontSize:'$l',
  height: 'fit-content',
  width:'100%',
  border:'none',
  borderRadius:'$3',
  backgroundColor:'transparent',
  borderBottom: '1px solid transparent',
  borderImage: 'linear-gradient(90deg, $gray1 0%, $gray6 50%, $gray1 100%)',
  transition: '$speed1',
  borderImageSlice: 1,
  'time':{
    color:'$gray11',
    fontSize:'$m',
  },
  '&:hover':{
    borderImage:'none',
    backgroundColor: '$gray4',
    transform: 'scale(1.01)'
  },
});
const GradientPlaceholderStyled = styled('div', {
  borderRadius:'$2',
  border:'1px solid $gray2',
  boxShadow:'$light',
  '@bp1':{
    width:'4.2em',
    height:'4.2em',
  },
  '@bp2_':{
    width:'5.2em',
    height:'5.2em',
  }
});
const ButtonImageStyled = styled('img', {
  borderRadius:'$2',
  objectFit:'cover',
  backgroundColor:'$gray4',
  border:'1px solid $gray2',
  boxShadow:'$light',
  '@bp1':{
    width:'4.2em',
    height:'4.2em',    
  },
  '@bp2_':{
    width:'5.2em',
    height:'5.2em',
  }
});

// interface
export default function SheetButton(props:any) {
  let user = props.user;
  let sheetTitle:string = props.children;
  const sheetId:string = props.sheetId;
  const sheetDocRef = doc(db, `users/${user.uid}/scheduleGrid/${sheetId}/`);
  
  const updateTitle = async () => {
    let newTitleValue = prompt('新しいタイトル')
    if (newTitleValue) {
      await updateDoc(sheetDocRef, {
        title:newTitleValue
      })
      sheetTitle = newTitleValue;
    }
  }

  const moveToArchive = async() =>{
    await updateDoc(sheetDocRef, {
      archived:true,
      sharing:false,
    })
  }
  const moveOutOfArchive = async() =>{
    await updateDoc(sheetDocRef, {
      archived:false
    })
  }

  const deleteSheet = async() =>{
    let confirmDelete = confirm('一度消去すると復元することができないのです。')
    if (confirmDelete) { 
      await deleteDoc(sheetDocRef);
    }
  }

  return (
    <Menu
      title={'表の編集'}
      trigger={
        <SheetButtonStyled
          key={props.key}
          onClick={props.onClick}
        >
          <AlignItems justifyContent={'spaceBetween'}>
            <AlignItems gap={'medium'}>
              {props.imageSource ? 
                <ButtonImageStyled
                  alt="no img found"
                  src={props.imageSource}
                />:
                <GradientPlaceholderStyled
                  css={{background:randomGradient(sheetId)}}
                />
              }
              <Stack>
                <Heading type={'h2'}>{sheetTitle}</Heading>
                <time>{moment(props.date).format("MMM Do dddd")}</time>
              </Stack>
            </AlignItems>
            <AlignItems>
              {props.sharing && 
                <Tag
                  icon={<FiUsers/>}
                  status={'sharing'}
                >
                  共有中
                </Tag>
              }
              {props.archived &&
                <Tag
                  icon={<FiArchive/>}
                  status={'archived'}
                >
                  アーカイブ済み
                </Tag>
              }
            </AlignItems>
          </AlignItems>
        </SheetButtonStyled>
      }
    >
      {!props.archived &&      
        <>
          {props.sharing &&          
            <Menu.Item
              onSelect={()=>copyAlert(`deizu.vercel.app/user/${user?.uid}/sheet/${sheetId}`)}
              icon={<FiLink/>}
            >
              URLをコピー
            </Menu.Item>
          }
          <Menu.Item
            onSelect={()=>updateTitle()}
            icon={<FiEdit3/>}
          >
            名前を変更
          </Menu.Item>
        </>
      }
      {props.archived ?
        <Menu.Item
          onSelect={()=>moveOutOfArchive()}
          icon={<FiCornerUpLeft/>}
        >
          アーカイブから出す
        </Menu.Item>:
        <Menu.Item
          onSelect={()=> moveToArchive()}
          icon={<FiArchive/>}
        >   
          アーカイブする
        </Menu.Item>
      }
      <Menu.Item
        color={'red'}
        onSelect={()=> deleteSheet()}
        icon={<FiTrash/>}
      >
        削除
      </Menu.Item>
    </Menu>
  )
}
