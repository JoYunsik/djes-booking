import {useEffect, useState } from "react";
import './dateBox.css'
import { CloseOutlined } from "@ant-design/icons";
import { Popconfirm } from 'antd';
const DateBox =({onBoxClick,onDeleteClick,id,weekdata,events,currRoom,defaultsetting})=>{
    const [eventChildren, setEventChildren] = useState([]);
    const onCancel =(e)=>{
        e.stopPropagation();
    }
    useEffect(()=>{
        const filtered = defaultsetting
            ? events.filter(event =>
                event.date === weekdata.date &&
                event.month === weekdata.month &&
                event.year === weekdata.year &&
                event.room === weekdata.currRoom &&
                event.time === parseInt(id) &&
                event.defaultevent === true
            )
            : events.filter(event =>
                event.date === weekdata.date &&
                event.month === weekdata.month &&
                event.year === weekdata.year &&
                event.room === weekdata.currRoom &&
                event.time === parseInt(id)
            );

        const newEventchildren = filtered.map((event, idx) => (
            <div key={idx} className={event.defaultevent? "event default":"event"}>
                <div className={`event-title${event.event.length >= 5 ? ' long' : ''}`}>{event.event}</div>
                <Popconfirm
                    title="삭제하시겠습니까?"
                    okText="네"
                    cancelText={defaultsetting ? "아니요" : "아니오"}
                    onCancel={onCancel}
                    onConfirm={(e)=>onDeleteClick(e,event, defaultsetting)}
                >
                    <CloseOutlined className="close-icon" onClick={(e)=>e.stopPropagation()}/>
                </Popconfirm>
            </div>
        ));
        setEventChildren(newEventchildren);
    },[weekdata,events,id,currRoom,defaultsetting,onDeleteClick])
    return (
        <div className="booking empty" onClick={onBoxClick}>
            {eventChildren}
        </div>
    )
}
export default DateBox;
