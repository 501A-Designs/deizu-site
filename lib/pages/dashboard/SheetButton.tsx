import React from 'react'
import * as ContextMenu from '@radix-ui/react-context-menu';

import gradient from 'random-gradient'
import { FiArchive, FiEdit3, FiLink, FiUsers } from 'react-icons/fi'
import { FiTrash } from 'react-icons/fi';
import { styled } from '../../../stitches.config';
import AlignItems from '../../style/AlignItems';
import { TooltipLabel } from '../../component/TooltipLabel';
import Tag from '../../component/Tag';
import Stack from '../../style/Stack';
import moment from 'moment';
import Heading from '../../component/Heading';
import Menu, { ItemStyled } from '../../component/Menu';
import { doc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { db } from '../../../src/service/firebase';

const SheetButtonStyled = styled('div', {
  fontSize:'$l',
  padding: '$2',
  cursor: 'pointer',
  height: 'fit-content',
  width:'100%',
  borderBottom: '1px solid transparent',
  borderImage: 'linear-gradient(90deg, $gray1 0%, $gray4 50%, $gray1 100%)',
  borderImageSlice: 1,
  transition: '$speed1',
  'time':{
    color:'$gray11',
    fontSize:'$m',
  },
  '&:hover':{
    borderRadius:'$3',
    borderImage:'none',
    backgroundColor: '$gray3',
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
  const router = useRouter();
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

  const deleteSheet = () =>{
    alert('delete')
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
                  css={{background:gradient(sheetTitle)}}
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
                  color={'blue'}
                >
                  共有中
                </Tag>
              }
              {props.archived &&
                <Tag
                  icon={<FiArchive/>}
                  color={'orange'}
                >
                  アーカイブ済み
                </Tag>
              }
            </AlignItems>
          </AlignItems>
        </SheetButtonStyled>
      }
    >
      <ItemStyled>
        <AlignItems>
          <FiLink/>
          URLをコピー
        </AlignItems>
      </ItemStyled>
      <ItemStyled
        onSelect={()=>updateTitle()}
      >
        <AlignItems>
          <FiEdit3/>
          名前を変更
        </AlignItems>
      </ItemStyled>
      <ItemStyled>
        <AlignItems>
          <FiArchive/>
          アーカイブする
        </AlignItems>
      </ItemStyled>
      <ItemStyled
        color={'red'}
        onSelect={()=> deleteSheet()} 
      >
        <AlignItems>
          <FiTrash/>
          削除
        </AlignItems>
      </ItemStyled>
    </Menu>
    // <ContextMenu.Root>


    //   <ContextMenu.Portal>
    //     <ContentStyled>
    //       <ContextMenu.Label>
    //         {props.title}
    //       </ContextMenu.Label>
    //       <ContextMenu.Item />
    //       <ContextMenu.Group>
    //         <ItemStyled>
    //           <AlignItems>
    //             <FiLink/>
    //             URLをコピー
    //           </AlignItems>
    //         </ItemStyled>
    //         <ItemStyled>
    //           <AlignItems>
    //             <FiEdit3/>
    //             名前を変更
    //           </AlignItems>
    //         </ItemStyled>
    //         <ItemStyled>
    //           <AlignItems>
    //             <FiArchive/>
    //             アーカイブする
    //           </AlignItems>
    //         </ItemStyled>
    //         <ItemStyled color={'red'}>
    //           <AlignItems>
    //             <FiTrash/>
    //             削除
    //           </AlignItems>
    //         </ItemStyled>
    //       </ContextMenu.Group>
    //       <ContextMenu.Separator />
    //     </ContentStyled>
    //   </ContextMenu.Portal>
    // </ContextMenu.Root>
  )
}
