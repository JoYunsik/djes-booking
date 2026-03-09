import { Modal } from "antd";

const ModalInputs = ({
    open, 
    handleOk,
    confirmLoading,
    handleCancel,
    gradeText,
    classText,
    exclusiveText,
    kindergardenText,
    onChangeGradeText,
    onChangeClassText,
    onChangeExclusiveText,
    onChangeKindergardenText,
    eventSample,
    rooms,
}) => {
    const {date,month,year,room} = eventSample;
    const roomname = rooms.length===0? '...' : rooms.filter((roomitem)=>roomitem.id===room)[0].room
    const title = `${year}. ${month+1}. ${date}. ${roomname}`;
    return(
        <Modal
            centered
            title={title}
            open={open}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
            className='modal'
        >
            <div className='add-event-wrapper'>
                <div className="add-event-body">
                    <div className="add-event-left">
                        <div className="add-event-input">
                        <input type="number" placeholder="학년" value={gradeText}className="grade" onChange={onChangeGradeText} />
                        <label style={{fontSize:'1rem'}}> 학년</label>
                        </div>
                        <div className="add-event-input">
                        <input type="number" placeholder="반" value={classText} className="class" onChange={onChangeClassText}/>
                        <label style={{fontSize:'1rem'}}>반</label>
                        </div>
                    </div>
                    <div className="add-event-right">
                        <div className="add-event-input">
                        <input type="text" placeholder="전담명" value={exclusiveText} className="exclusive" onChange={onChangeExclusiveText} />
                        <label style={{fontSize:'1rem'}}>전담</label>
                        </div>
                        <div className="add-event-input">
                        <input type="text" placeholder="특수" value={kindergardenText} className="kindergarden" onChange={onChangeKindergardenText} />
                        <label style={{fontSize:'1rem'}}>반</label>
                    </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default ModalInputs;