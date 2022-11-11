import React,{useEffect, useState} from 'react'
import SectionButton from '../../button/SectionButton';
import Stack from '../../style/Stack';

import {FiChevronLeft, FiChevronRight, FiImage, FiSave, FiSmile} from 'react-icons/fi'
import Container from '../../component/Container';
import AlignItems from '../../style/AlignItems';
import Heading from '../../component/Heading';
import Toggle from '../../component/Toggle';
import Button from '../../button/Button';
import { useTheme } from 'next-themes';
import Notify from '../../component/Notify';

export default function SettingDialogContent() {
  const [modalSection, setModalSection] = useState(0);
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  };

  return (
    <Stack>
      {modalSection === 0 && 
        <Stack>
          <SectionButton
            leftIcon={<FiImage/>}
            rightIcon={<FiChevronRight/>}
            onClick={()=>setModalSection(1)}
          >
            背景画像の設定
          </SectionButton>
          <SectionButton
            leftIcon={<FiSmile/>}
            rightIcon={<FiChevronRight/>}
            onClick={()=>setModalSection(2)}
          >
            配色
          </SectionButton>
        </Stack>
      }
      <Stack>
        {modalSection !== 0 &&
          <SectionButton
            leftIcon={<FiChevronLeft/>}
            onClick={()=>setModalSection(0)}
          >
            戻る
          </SectionButton>
        }
        {modalSection === 2 &&
          <Container index={'inner'}>
            <Heading type={'h3'}>
              ダークモード
            </Heading>
            <AlignItems justifyContent={'spaceBetween'}>
              <p>UI全体が暗く表示されます。</p>
              <Toggle
                defaultChecked={theme === "dark"}
                onClick={()=>toggleTheme()}
              />
            </AlignItems>
          </Container>
        }
      </Stack>
    </Stack>
  )
}
