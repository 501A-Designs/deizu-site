import React,{useState} from 'react'
import AlignItems from '../style/AlignItems'
import Stack from '../style/Stack'
import IconButton from '../../lib/component/IconButton'
import { MdContentCopy } from "react-icons/md";
import { toast } from 'react-toastify';

export default function LargeImageButton(props) {
    const [hovered, setHovered] = useState(false)
    let largeImageButtonStyle ={
        backgroundColor: `${hovered ? 'var(--system0)':'var(--system1)'}`,
        boxShadow: `${hovered ? '0 8px 30px rgba(0, 0, 0, 0.12)':''}`,
        border:'1px solid var(--system1)',
        borderRadius:'var(--r5)',
        padding: '1em',
        transition:'0.2s',
        cursor: 'pointer'
    }
    let largeImageButtonImageStyle ={
        borderRadius:'var(--r5)',
        width:'3.5em',
        height:'3.5em',
        backgroundColor:'var(--system0)',
        border: '1px solid var(--system1)',
        objectFit: 'cover',
    }
    const copySheetId = () =>{
        navigator.clipboard.writeText(`${props.dataSheetId}`);
        toast(`${props.dataSheetName}のIDがコピーされました。`);
    }

    return (
        <div
            onMouseEnter={()=>setHovered(true)}
            onMouseLeave={()=>setHovered(false)}
            style={largeImageButtonStyle}
        >
            <AlignItems style={{justifyContent: 'space-between'}}>
                <AlignItems gap={'1em'}>
                    {props.component && props.component}
                    {props.imageSource && <img alt="no img found" style={largeImageButtonImageStyle} src={props.imageSource} onClick={props.onClick}/>}
                    <Stack gap={'0'}>
                        <h3 style={{padding: 0,margin: 0, height: 'fit-content', textDecoration: 'underline'}} onClick={props.onClick}>{props.children}</h3>
                        <p style={{padding: 0,margin: 0, height: 'fit-content'}}>{props.subtitle}</p>
                    </Stack>
                </AlignItems>
                {hovered &&
                    <IconButton onClick={() => copySheetId()} icon={<MdContentCopy/>}>
                        IDをコピー
                    </IconButton>
                }
            </AlignItems>
        </div>
    )
}
