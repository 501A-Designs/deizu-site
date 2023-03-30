import Stack from '../../style/Stack';

import Container from '../../component/Container';
import AlignItems from '../../style/AlignItems';
import Heading from '../../component/Heading';
import Toggle from '../../component/Toggle';
import { useTheme } from 'next-themes';

export default function SettingDialogContent() {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  };

  return (
    <Stack>
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
    </Stack>
  )
}
