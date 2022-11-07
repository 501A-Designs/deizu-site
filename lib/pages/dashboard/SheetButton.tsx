import React from 'react'
import * as ContextMenu from '@radix-ui/react-context-menu';

import gradient from 'random-gradient'
import { FiArchive, FiEdit3, FiHeart, FiLink, FiUsers } from 'react-icons/fi'
import { fadeIn, popOut, popOutLeftTop } from '../../ux/keyframes';
import { FiTrash } from 'react-icons/fi';
import { styled } from '../../../stitches.config';
import AlignItems from '../../style/AlignItems';
import { TooltipLabel } from '../../component/TooltipLabel';
import Tag from '../../component/Tag';
import Stack from '../../style/Stack';
import moment from 'moment';
import Heading from '../../component/Heading';

const SheetButtonStyled = styled(ContextMenu.Trigger, {
  fontSize:'$l',
  padding: '$2',
  cursor: 'pointer',
  height: 'fit-content',
  backgroundColor: '$system1',
  width:'100%',
  borderBottom: '1px solid transparent',
  borderImage: 'linear-gradient(90deg, $system1 0%, $system2 50%, $system1 100%)',
  borderImageSlice: 1,
  transition: '$speed1',
  'time':{
    color:'$system4',
    fontSize:'0.8em',
    '@bp1':{
      display:'none'
    },
    '@bp2_':{
      display:'block'
    },
  },
  '&:hover':{
    borderRadius:'$2',
    borderImage:'none',
    backgroundColor:'$system2',
    transform: 'scale(1.01)'
  },
});
const GradientPlaceholderStyled = styled('div', {
  borderRadius:'$1',
  width:'5.2em',
  height:'5.2em',
  border:'1px solid $system1',
  boxShadow:'$light',
});
const ButtonImageStyled = styled('img', {
  borderRadius:'$1',
  width:'5.2em',
  height:'5.2em',
  objectFit:'cover',
  backgroundColor:'$system2',
  border:'1px solid $system1',
  boxShadow:'$light',
});

const ContentStyled = styled(ContextMenu.Content, {
  padding:'$2',
  borderRadius:'$2',
  backgroundColor:'$system1',
  border:'1px solid $system2',
  width:'250px',
  boxShadow:'$heavy',
  animation: `${popOutLeftTop} 0.3s ease-out`,
});

const ItemStyled = styled(ContextMenu.Item, {
  padding:'$1 $2',
  borderRadius:'$1',
  width:'100%',
  border:'1px solid $system1',
  boxShadow:'none',
  outline:'none',
  cursor:'pointer',
  fontSize:'$xm',
  transition:'$speed1',
  color:'$system4',
  '&:hover':{
    backgroundColor:'$system2',
    border:'1px solid $system2',
    transform: 'scale(1.02)'
  },
  variants:{
    color:{
      red:{
        color:'red'
      }
    }
  }
});

export default function SheetButton(props:any) {
  return (
    <ContextMenu.Root>
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
                css={{background:gradient(props.children)}}
              />
            }
            <Stack>
              <Heading type={'h2'}>{props.children}</Heading>
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

      <ContextMenu.Portal>
        <ContentStyled>
          <ContextMenu.Label>
            {props.title}
          </ContextMenu.Label>
          <ContextMenu.Item />
          <ContextMenu.Group>
            <ItemStyled>
              <AlignItems>
                <FiLink/>
                URLをコピー
              </AlignItems>
            </ItemStyled>
            <ItemStyled>
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
            <ItemStyled color={'red'}>
              <AlignItems>
                <FiTrash/>
                削除
              </AlignItems>
            </ItemStyled>
          </ContextMenu.Group>
          <ContextMenu.Separator />
        </ContentStyled>
      </ContextMenu.Portal>
    </ContextMenu.Root>
  )
}
