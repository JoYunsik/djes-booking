import './bookings.css'
import React, { useCallback, useState } from 'react';
import { notification } from 'antd';
import { useDispatch, useSelector} from 'react-redux';
import {insert,remove,removeDefault,clearEvents,insertBulk,clearEventsBulk,removeDefaultBulk} from "../modules/events";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DateBox from './dateBox';
import ModalInputs from './modalInputs';

const Bookings = ({defaultsetting})=>{

    const {currDate, currYear, currMonth, currDay} = useSelector(({dateinfo})=>({
      currDate: dateinfo.currDate,
      currYear: dateinfo.currYear, 
      currMonth: dateinfo.currMonth, 
      currDay: dateinfo.currDay,
    }))
    const weekdata = useSelector(({weekdata})=>weekdata);
    const {currRoom, rooms} = useSelector(({rooms})=>({
      currRoom:rooms.currRoom,
      rooms: rooms.rooms
    }));
    const {events} = useSelector(({events})=>({
      events:events
    }))
    const dispatch = useDispatch();
    const eventInsert = useCallback((event)=>dispatch(insert(event)),[dispatch]);
    const eventRemove = useCallback((id)=>dispatch(remove(id)),[dispatch]);
    const eventRemoveDefault = useCallback((event)=>dispatch(removeDefault(event)),[dispatch]);
    const handleClearEvents = useCallback((event)=>dispatch(clearEvents(event)),[dispatch]);
    const handleInsertBulk = useCallback((eventsArr)=>dispatch(insertBulk(eventsArr)),[dispatch]);
    const handleClearEventsBulk = useCallback((event)=>dispatch(clearEventsBulk(event)),[dispatch]);
    const handleRemoveDefaultBulk = useCallback((payload)=>dispatch(removeDefaultBulk(payload)),[dispatch]);
    const [open, setOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [gradeText, setGradeText] = useState('');
    const [classText, setClassText] = useState('');
    const [exclusiveText, setExclusiveText] = useState('');
    const [kindergardenText, setKindergardenText] = useState('');
    const [eventSample, setEventSample] = useState({
      date:'',
      year:'',
      month:'',
      time:'',
      room:1,
      event:'',
    });
    // 방에 예약할 수 있는 max값을 가져옴.
    const getMaxRoom = ()=>{
      return rooms.filter(room=>room.id===currRoom)[0].max;
    }
    // 예약이 비었는지 check
    const fullCheck = (bookingDate,bookingYear,bookingMonth,bookingIndex,currRoom) =>{
      const eventCheck = events.filter(event => 
        event.date === bookingDate &&
        event.year === bookingYear &&
        event.month === bookingMonth &&
        event.time === bookingIndex &&
        event.room === currRoom 
      );
      return getMaxRoom() > eventCheck.length;
    }
    // 박스 눌렀을때
    const onBoxClick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      notification.destroy();
      let bookingDate =''
      let bookingMonth=''
      let bookingYear =''
      let target=''
      let bookingIndex=''
      if(e.target.classList.contains('event-title')){
        target = e.target.parentElement.parentElement.parentElement
      } else{
        target = e.target.parentElement
      }
      const parentNodes = [...target.children];
      if(e.target.classList.contains('event-title')){
        bookingIndex = parentNodes.indexOf(e.target.parentElement.parentElement)
      } else{
        bookingIndex = parentNodes.indexOf(e.target)
      }
      if(target.classList.contains('0')){
        bookingDate = new Date(currYear, currMonth, currDate+(1-currDay)).getDate();
        bookingMonth =new Date(currYear, currMonth, currDate+(1-currDay)).getMonth();
        bookingYear = new Date(currYear, currMonth, currDate+(1-currDay)).getFullYear();
      }
      if(target.classList.contains('1')){
        bookingDate = new Date(currYear, currMonth, currDate+(2-currDay)).getDate();
        bookingMonth =new Date(currYear, currMonth, currDate+(2-currDay)).getMonth();
        bookingYear = new Date(currYear, currMonth, currDate+(2-currDay)).getFullYear();
      }
      if(target.classList.contains('2')){
        bookingDate = new Date(currYear, currMonth, currDate+(3-currDay)).getDate();
        bookingMonth =new Date(currYear, currMonth, currDate+(3-currDay)).getMonth();
        bookingYear = new Date(currYear, currMonth, currDate+(3-currDay)).getFullYear();
      }
      if(target.classList.contains('3')){
        bookingDate = new Date(currYear, currMonth, currDate+(4-currDay)).getDate();
        bookingMonth =new Date(currYear, currMonth, currDate+(4-currDay)).getMonth();
        bookingYear = new Date(currYear, currMonth, currDate+(4-currDay)).getFullYear();
      }
      if(target.classList.contains('4')){
        bookingDate = new Date(currYear, currMonth, currDate+(5-currDay)).getDate();
        bookingMonth =new Date(currYear, currMonth, currDate+(5-currDay)).getMonth();
        bookingYear = new Date(currYear, currMonth, currDate+(5-currDay)).getFullYear();
      }
      if(defaultsetting || fullCheck(bookingDate,bookingYear,bookingMonth,bookingIndex,currRoom)){
        setOpen(true);
        setEventSample(()=>({
          event:'',
          date:bookingDate,
          year:bookingYear,
          month:bookingMonth,
          time:bookingIndex,
          room:currRoom,
          defaultevent: defaultsetting
        }))
      } else {
        console.log('fail');
        openFullNotification();
      }
      
    };
    // 삭제 버튼을 클릭
    const onDeleteClick = async (e,event,defaultsetting)=>{
      e.stopPropagation();
      if(!defaultsetting){
        await eventRemove(event.id);
      }else {
        const currYear = event.year;
        let date = event.date;
        let year = event.year;
        let month = event.month;
        const room = event.room;
        const eventName = event.event;
        const time = event.time;

        // 삭제할 날짜 목록 생성
        const dates = [];
        while(year === currYear){
          dates.push({ date, month, year });
          const next = new Date(year, month, date + 7);
          year = next.getFullYear();
          month = next.getMonth();
          date = next.getDate();
        }
        // 한 번에 bulk 삭제
        await handleRemoveDefaultBulk({ time, room, event: eventName, dates });
      }
    }
    // 알림창 생성 함수
    const openInputNotification = (input) => {
      notification.info({
        message: '오류 알림',
        description:
          `${input}을 입력하세요.`,
        placement: 'top',
        icon: <ExclamationCircleOutlined style={{color:'#FFC300', fontSize:'1.5rem'}} />
      });
    };
    const openFullNotification = () => {
      notification.info({
        message: '오류 알림',
        description:
          '더 이상 예약할 수 없습니다.',
        placement: 'top',
        icon: <ExclamationCircleOutlined style={{color:'#FFC300', fontSize:'1.5rem'}} />,
      });
    };

    const resetInputs = ()=>{
      setGradeText('');
      setClassText('');
      setExclusiveText('');
      setKindergardenText('');
    }
    // 전체화면 오버레이 토글
    const setCover = (on) => {
      const id = 'global-cover-overlay';
      if(on) {
        if(document.getElementById(id)) return;
        const div = document.createElement('div');
        div.id = id;
        div.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:#373c4f6a;z-index:1001;';
        document.body.appendChild(div);
      } else {
        const div = document.getElementById(id);
        if(div) document.body.removeChild(div);
      }
    };

    // 이벤트 추가 과정 함수
    const addEventProcess = async (newEvent, defaultsetting)=>{
      setConfirmLoading(true);
      if(defaultsetting) setCover(true);

      if(!defaultsetting){
        await eventInsert(newEvent);
      } else if(defaultsetting){
        const currYear = newEvent.year;
        let date = newEvent.date;
        let year = newEvent.year;
        let month = newEvent.month;
        const room = newEvent.room;
        const event = newEvent.event;
        const time = newEvent.time;

        // 등록할 전담 데이터를 배열로 생성 (원래 로직과 동일)
        const bulkEvents = [];
        while(year === currYear){
          bulkEvents.push({ date, year, month, time, room, event, defaultevent: true });
          const next = new Date(year, month, date + 7);
          year = next.getFullYear();
          month = next.getMonth();
          date = next.getDate();
        }
        console.log('bulkEvents count:', bulkEvents.length);

        // 해당 날짜들의 일반예약만 한 번에 삭제
        const dates = bulkEvents.map(e => ({ date: e.date, month: e.month, year: e.year }));
        console.log('calling handleClearEventsBulk...');
        await handleClearEventsBulk({ time, room, dates });

        // 한 번에 bulk insert
        console.log('calling handleInsertBulk...');
        await handleInsertBulk(bulkEvents);
        console.log('handleInsertBulk done');
      }

      resetInputs();
      notification.destroy();
      setCover(false);
      setConfirmLoading(false);
      setOpen(false);
    }
    // 모달 ok버튼 눌렀을때
    const handleOk = () => {
      if(gradeText==="" && classText==="" && exclusiveText==="" && kindergardenText==="" ){
        openInputNotification('예약할 내용')
        return;
      }
      if(gradeText!=="" && classText===""){
        openInputNotification('반');
        return;
      }
      if(gradeText==="" && classText!==""){
        openInputNotification('학년')
        return;
      }
      if(gradeText!=="" && classText!==""){
        const newEvent = {
          ...eventSample,
          event: `${gradeText}-${classText}`,
        };
        addEventProcess(newEvent,defaultsetting);
      }
      else if(exclusiveText!==""){
        const newEvent = {
          ...eventSample,
          event: exclusiveText,
        };
        addEventProcess(newEvent,defaultsetting);
      }
      else if(kindergardenText!==""){
        const newEvent = {
          ...eventSample,
          event: kindergardenText,
        };
        addEventProcess(newEvent,defaultsetting);
      }
      else {
        console.log('fail');
      }
    };
    // 모달 닫았을때
    const handleCancel = () => {
        resetInputs();
        notification.destroy();
        setOpen(false);
    };
    // 모달 입력창 관리
    const onChangeGradeText = (e) =>{
      if (e.target.value.length > 1) {
        e.target.value = e.target.value.slice(0, 1);
        setGradeText(e.target.value);
      }
      else{
        setGradeText(e.target.value);
      }
      setExclusiveText('');
      setKindergardenText('');
    };
    const onChangeClassText = (e) =>{
      if (e.target.value.length > 1) {
        e.target.value = e.target.value.slice(0, 1);
        setClassText(e.target.value);
      }
      else{
        setClassText(e.target.value);
      }
      setExclusiveText('');
      setKindergardenText('');
    };
    const onChangeKindergardenText = (e)=>{
      if (e.target.value.length > 6) {
        e.target.value = e.target.value.slice(0, 6);
        setKindergardenText(e.target.value);
      }
      else{
        setKindergardenText(e.target.value);
      }
      setGradeText('');
      setClassText('');
      setExclusiveText('');
    };
    const onChangeExclusiveText = (e)=>{
      if (e.target.value.length > 6) {
        e.target.value = e.target.value.slice(0, 6);
        setExclusiveText(e.target.value);
      }
      else{
        setExclusiveText(e.target.value);
      }
      setGradeText('');
      setClassText('');
      setKindergardenText('');
    };
    return(
        <div className="bookings">
          {weekdata.map((data, idx) => (
            <div className={`day-wrapper ${idx}`} key={idx}>
              <DateBox id='0' idx={idx + 1} onBoxClick={onBoxClick} onDeleteClick={onDeleteClick}weekdata={data} events={events} currRoom={currRoom} defaultsetting={defaultsetting}></DateBox>
              <DateBox id='1' idx={idx + 1} onBoxClick={onBoxClick} onDeleteClick={onDeleteClick}weekdata={data} events={events} currRoom={currRoom} defaultsetting={defaultsetting}></DateBox>
              <DateBox id='2' idx={idx + 1} onBoxClick={onBoxClick} onDeleteClick={onDeleteClick}weekdata={data} events={events} currRoom={currRoom} defaultsetting={defaultsetting}></DateBox>
              <DateBox id='3' idx={idx + 1} onBoxClick={onBoxClick} onDeleteClick={onDeleteClick}weekdata={data} events={events} currRoom={currRoom} defaultsetting={defaultsetting}></DateBox>
              <DateBox id='4' idx={idx + 1} onBoxClick={onBoxClick} onDeleteClick={onDeleteClick}weekdata={data} events={events} currRoom={currRoom} defaultsetting={defaultsetting}></DateBox>
              <DateBox id='5' idx={idx + 1} onBoxClick={onBoxClick} onDeleteClick={onDeleteClick}weekdata={data} events={events} currRoom={currRoom} defaultsetting={defaultsetting}></DateBox>
              <DateBox id='6' idx={idx + 1} onBoxClick={onBoxClick} onDeleteClick={onDeleteClick}weekdata={data} events={events} currRoom={currRoom} defaultsetting={defaultsetting}></DateBox>
            </div>
          ))}
          <ModalInputs
            open={open}
            handleOk={handleOk}
            confirmLoading={confirmLoading}
            handleCancel={handleCancel}
            gradeText={gradeText}
            classText={classText}
            exclusiveText={exclusiveText}
            kindergardenText={kindergardenText}
            onChangeGradeText={onChangeGradeText}
            onChangeClassText={onChangeClassText}
            onChangeExclusiveText={onChangeExclusiveText}
            onChangeKindergardenText={onChangeKindergardenText}
            eventSample={eventSample}
            rooms={rooms}
          />
        </div>
    )
}

export default Bookings;