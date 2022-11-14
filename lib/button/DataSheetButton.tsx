import React from 'react'
import AlignItems from '../style/AlignItems'

import { FiPlus, FiCheck, FiLock } from "react-icons/fi";
import gradient from 'random-gradient'
import Button from './Button';
import { styled } from '../../stitches.config';
import { useRouter } from 'next/router';
import Heading from '../component/Heading';
import Stack from '../style/Stack';
import { TooltipLabel } from '../component/TooltipLabel';
import randomGradient from 'random-gradient';

const DataSheetButtonStyled = styled('div',{
  cursor: 'pointer',
  padding: '$2',
  minWidth: '200px',
  color:'$gray12',
  borderRadius:'$3',
  backgroundColor:'transparent',

  borderBottom: '1px solid transparent',
  borderImage: 'linear-gradient(90deg, $gray1 0%, $gray4 50%, $gray1 100%)',
  borderImageSlice: 1,

  transition:'$speed1',
  variants:{
    size:{
      small:{
  
      },
      large:{
        '&:hover':{
          borderImage:'none',
          backgroundColor: '$gray3',
          transform: 'scale(1.01)'
        },
      }
    }
  },
  defaultVariants:{
    size:'small'
  }
})

// Nested Image
// const DataSheetButtonGradientStyled = styled('div', {
//   borderRadius:'$2',
//   border: '1px solid $gray2',
//   variants:{
//     size:{
//       small:{
//         width:'3.5em',
//         height:'3.5em',
//       },
//       large:{
//         width:'4em',
//         height:'4em',
//       }
//     }
//   },
//   defaultVariants:{
//     size:'small'
//   }
// })

const DataSheetButtonImageStyled = styled('div', {
  borderRadius:'$2',
  border: '1px solid $gray2',
  variants:{
    imageSource:{
      true:{
        objectFit: 'cover',
        backgroundSize: 'cover',
      }
    },
    size:{
      small:{
        width:'3.5em',
        height:'3.5em',
      },
      large:{
        width:'4em',
        height:'4em',
      }
    }
  },
  defaultVariants:{
    size:'small'
  }
})

const DataSheetButtonIconStyled = styled('div',{
  position:'absolute',
  transform:'translateX(45px) translateY(45px)',
  boxShadow:'$heavy',
  color:'$gray11',
  borderRadius:'$1',
  padding:'$1',
  width:'1.5em',
  height:'1.5em',
  background:'linear-gradient(60deg,$gray4,$gray6)',
  border: '1px solid $gray6',
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
  fontSize:'$l'
})

const Subtitle = styled('p',{
  color:'$gray10',
  margin:0,
  fontSize:'$m'
})

interface DataSheetButtonProps extends React.ComponentProps<typeof DataSheetButtonStyled>{
  imageSource?:string,
  dataSheetId:string,
  displayAddButton:boolean,
  currentDataSheetId:string,
  subtitle?:string,
  public:boolean,
  onClick?:any
}

export default function DataSheetButton(props:DataSheetButtonProps) {
  let router = useRouter();
  return (
    <DataSheetButtonStyled
      size={props.size}
      onClick={props.onClick}
    >
      <AlignItems justifyContent={'spaceBetween'}>
        <AlignItems
          gap={'medium'}
          onClick={()=>router.push(`/datasheet/${props.dataSheetId}/`)}
        >
          <DataSheetButtonImageStyled
            size={props.size}
            imageSource={props.imageSource ? true:false}
            css={{
              backgroundImage:props.imageSource ? `url(${props.imageSource})`:'none',
              background:`${!props.imageSource && randomGradient(props.dataSheetId)}`,
            }}
          >
            {!props.public && props.size == 'large' &&
              <DataSheetButtonIconStyled>
                <FiLock/>
              </DataSheetButtonIconStyled>
            }
          </DataSheetButtonImageStyled>

          <Stack>
            <Heading type={'h3'}>
              {props.children}
            </Heading>
            {props.size == 'large' &&
              <Subtitle>
                {props.subtitle}
              </Subtitle>
            }
          </Stack>
        </AlignItems>
        {props.size !== 'large' && 
          <>
            {props.dataSheetId === props.currentDataSheetId ?
              <Button
                styleType={'fill'}
                size={'icon'}
                icon={<FiCheck/>}
              >
                選択済み
              </Button>:
              <Button
                size={'icon'}
                icon={<FiPlus/>}
                onClick={props.onClick}
              >
                IDをコピー
              </Button>
            }
          </>
        }
      </AlignItems>
    </DataSheetButtonStyled>
  )
}
