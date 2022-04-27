import React,{useState} from 'react'
import SubjectCell from './SubjectCell'
import TimeCell from './TimeCell'
import Modal from 'react-modal';

import { modalStyle } from '../style/modalStyle'

import moment from 'moment';


export default function ScheduleGrid(props) {
  moment.locale("ja");

    let scheduleGridStyle ={
        display: 'grid',
        gridTemplateColumns:'1fr 1fr 1fr 1fr 1fr 1fr',
        gap: '0.2em'
    }
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalCellId, setModalCellId] = useState('');

    let scheduleCellId = [
        'a1',
        'b1',
        'c1',
        'd1',
        'e1',
        'f1',
        'a2',
        'b2',
        'c2',
        'd2',
        'e2',
        'f2',
        'a3',
        'b3',
        'c3',
        'd3',
        'e3',
        'f3',
        'a4',
        'b4',
        'c4',
        'd4',
        'e4',
        'f4',
        'a5',
        'b5',
        'c5',
        'd5',
        'e5',
        'f5',
        'a6',
        'b6',
        'c6',
        'd6',
        'e6',
        'f6',
    ]

    let sheetName = props.sheetName;
    let sheetOwnerId = props.sheetOwnerId;
    let sheetData = props.sheetData;

    const closeModal = () => setModalIsOpen(false);
    const openModal = () => setModalIsOpen(true);

    return (
        <>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={modalStyle}
        >
            <h1>bruh</h1>
        </Modal>
        <div style={{
                display:'grid',gridTemplateColumns:'0.5fr 9fr',
                gap: '0.5em'            
            }}
        >
            <div style={{
                    display:'grid',gridTemplateColumns:'1fr',
                    gap: '0.2em'
                }}
            >
                <TimeCell displayPeriod={1}/>
                <TimeCell displayPeriod={1}/>
                <TimeCell displayPeriod={1}/>
                <TimeCell displayPeriod={1}/>
                <TimeCell displayPeriod={1}/>
                <TimeCell displayPeriod={1}/>
            </div>
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
        <p style={{textAlign:'center', fontSize:'0.6em',color:'grey'}}>最終変更時：{sheetData.date.toDate().toDateString()}</p>
        </>
    )
}
