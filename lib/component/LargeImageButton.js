import React,{useState} from 'react'
import AlignItems from '../style/AlignItems'
import IconButton from '../../lib/component/IconButton'
import { FiPlus, FiCheck } from "react-icons/fi";
import gradient from 'random-gradient'

export default function LargeImageButton(props) {
    const [hovered, setHovered] = useState(false)
    let largeImageButtonStyle ={
        minWidth: '200px',
        backgroundColor: `${hovered ? 'var(--system0)':'var(--system1)'}`,
        border:'1px solid var(--system1)',
        borderRadius:'var(--borderRadius1)',
        padding: '1em',
        transition:'0.2s',
        cursor: 'pointer'
    }
    let largeImageButtonImageStyle ={
        borderRadius:'var(--borderRadius0)',
        width:'3.5em',
        height:'3.5em',
        background:'var(--system0)',
        border: '1px solid var(--system1)',
        objectFit: 'cover',
    }
    let largeImageButtonGradientStyle = {
        borderRadius:'var(--borderRadius0)',
        width:'3.5em',
        height:'3.5em',
        background:gradient(props.dataSheetId),
        border: '1px solid var(--system1)',
    }

    return (
        <div
            key={props.key}
            style={largeImageButtonStyle}
        >
            <AlignItems style={{justifyContent: 'space-between'}}>
                <AlignItems
                    gap={'1em'}
                    onClick={props.onClick}
                    onMouseEnter={()=>setHovered(true)}
                    onMouseLeave={()=>setHovered(false)}
                >
                    {props.imageSource !== '' ? 
                        <img
                            style={largeImageButtonImageStyle}
                            src={props.imageSource}
                            alt={'Banner image'}
                        />:
                        <div
                            style={largeImageButtonGradientStyle}
                        />
                    }
                    <h3
                        style={{
                            padding: 0,
                            margin: 0,
                        }}
                    >
                        {props.children}
                    </h3>
                </AlignItems>
                {props.displayAddButton && 
                    <>
                        {props.dataSheetId === props.currentDataSheetId ?
                            <IconButton
                                icon={<FiCheck/>}
                                fill
                            >
                                選択済み
                            </IconButton>:
                            <IconButton
                                onClick={props.addDataSheetOnClick}
                                icon={<FiPlus/>}
                            >
                                IDをコピー
                            </IconButton>
                        }
                    </>
                }
            </AlignItems>
            {/* <p style={{padding: 0,margin: 0, height: 'fit-content'}}>{props.subtitle}</p> */}
        </div>
    )
}
