import React,{useState} from 'react'
import Button from '../../../../lib/component/Button'
import Container from '../../../../lib/component/Container'
import Input from '../../../../lib/component/Input'
import Switch from '../../../../lib/component/Switch'
import AlignItems from '../../../../lib/style/AlignItems'
import Stack from '../../../../lib/style/Stack'



export default function index() {
    const [switchStatus, setSwitchStatus] = useState(false)

    const switchOn = () =>{
        setSwitchStatus(true);
    }
    const switchOff = () =>{
        setSwitchStatus(false);
    }

    return (
        <AlignItems style={{justifyContent: 'center', height: '100vh'}}>
            <Container>
                <h1>新しい時間割表を作成</h1>
                <h3>素早く</h3>
                <p>
                    新しい時間割表のタイトルは一度指定すると変更することはできないのでご了承ください。
                </p>
                <Stack>
                    <Input placeholder={'時間割タイトル'}/>
                    <Input placeholder={'壁紙（画像URL）※任意'}/>
                    <Switch
                        disabled={true}
                    />
                    <Button width={'full'}>新規作成</Button>
                </Stack>
            </Container>
        </AlignItems>            
    )
}
