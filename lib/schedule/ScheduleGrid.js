import React,{useState} from 'react'
import SubjectCell from './SubjectCell'
import TimeCell from './TimeCell'
import Modal from 'react-modal';
import Input from '../component/Input';
import Stack from '../style/Stack';

import { modalStyle } from '../style/modalStyle'
import { scheduleCellId } from '../data/scheduleCellId'
import { buttonColor } from '../data/buttonColor'



import moment from 'moment';
import AlignItems from '../style/AlignItems';
import ColorButton from '../component/ColorButton';
import MockupCell from '../component/MockupCell';
import Button from '../component/Button';


export default function ScheduleGrid(props) {
    moment.locale("ja");

    let scheduleGridStyle ={
        display: 'grid',
        gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr 1fr',
        gap: '0.2em'
    }
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalCellId, setModalCellId] = useState('');

    let sheetName = props.sheetName;
    let sheetOwnerId = props.sheetOwnerId;
    let sheetData = props.sheetData;

    const closeModal = () => setModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);

    let subjectCellName,subjectCellDescription,subjectCellColor,subjectCellLink;
    if (sheetData.cells[modalCellId] !== undefined){
        subjectCellName = sheetData.cells[modalCellId][modalCellId];
        subjectCellDescription = sheetData.cells[modalCellId][modalCellId+'Dscrp'];
        subjectCellColor = sheetData.cells[modalCellId][modalCellId+'Color'];
        subjectCellLink = sheetData.cells[modalCellId][modalCellId+'Link'];
    }

    return (
        <>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={modalStyle}
        >
            <Stack gap={'1em'}>
                {/* <h1>{modalCellId}</h1> */}
                <MockupCell
                    subjectCellName = {subjectCellName}
                    subjectCellLink = {subjectCellLink}
                    subjectCellColor = {subjectCellColor}
                    subjectCellDescription = {subjectCellDescription}
                />
                <AlignItems style={{justifyContent: 'center'}}>
                    {buttonColor.map((props)=>
                        <ColorButton color={props}/>
                    )}
                </AlignItems>
                <Stack>
                    <Input placeholder={'科目名'}/>
                    <Input placeholder={'URLリンク'}/>
                    <Input placeholder={'概要・教室名等'}/>
                </Stack>
                <Button width="full">保存</Button>
            </Stack>
        </Modal>
        <div 
            style = {{
                display:'grid',
                gridTemplateColumns:'0.5fr 9fr',
                gap: '0.5em'            
            }}
        >
            <Stack gap = {'0.2em'}>
                <TimeCell displayPeriod={1}/>
                <TimeCell displayPeriod={2}/>
                <TimeCell displayPeriod={3}/>
                <TimeCell displayPeriod={4}/>
                <TimeCell displayPeriod={5}/>
                <TimeCell displayPeriod={6}/>
            </Stack>
            <div style={scheduleGridStyle}>
                {/* {sheetData.cells} */}
                {scheduleCellId.map(cellId =>                
                    <SubjectCell
                        sheetData={sheetData}
                        onClick={()=>{
                            openModal()
                            setModalCellId(cellId)
                        }}
                        cellId={cellId}
                    />
                )}
            </div>
        </div>
        <p
            style = {{
                textAlign:'center',
                fontSize:'0.6em',
                color:'grey'
            }}
        >
            最終変更時：{sheetData.date.toDate().toDateString()}
        </p>
        </>
    )
}
