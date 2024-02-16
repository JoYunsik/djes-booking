import RoomSelectContainer from '../containers/RoomSelectContainer';
import './header.css';
import {goToday} from '../modules/dateinfo';
import { useCallback, useEffect, useState } from 'react';
import { Button, ConfigProvider,notification } from 'antd';
import { useDispatch, useSelector} from 'react-redux';
import CurrentDate from '../components/currentDate';
import { QuestionCircleTwoTone } from '@ant-design/icons';

const Header = ({defaultsetting}) => {
    const [disabled, setDisabled] = useState(true);
    const dispatch = useDispatch();
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (placement) => {
      api.info({
        message: '전담 시간표 작성 요령',
        description:(
            <div>
                <div>
                    1. 이 페이지에서 등록한 전담시간표는 주황색 박스로 생성됨.
                </div>
                <div>
                    2. 전담 시간표를 등록할 시 해당일자 부터 매주 같은 요일(해당년도까지)에 같은 예약 내용이 추가됨. 
                </div>
                <div>
                    3. 전담시간표를 등록할 때 그 자리에 이미 등록되어 있던 파란색 예약박스들은 모두 삭제됨.
                </div>
                <div>
                    4. 전담 시간표를 삭제할 시 해당 날짜 이후 같은 요일의 같은 예약 내용을 모두 삭제함.
                </div>
            </div>
        ),
        placement,
        duration: 0,
      });
    };
    
    const { currDate, currYear, currMonth, currDay, currRoom } = useSelector(({ dateinfo, rooms }) => ({
        currDate: dateinfo.currDate,
        currYear: dateinfo.currYear,
        currMonth: dateinfo.currMonth,
        currDay: dateinfo.currDay,
        currRoom: rooms.currRoom,
    }));

    const handleGoToday = useCallback(() => dispatch(goToday()), [dispatch]);

    useEffect(() => {
        const today = new Date();
        const todayDate = today.getDate();
        const todayMonth = today.getMonth();
        const todayYear = today.getFullYear();
        const newweekdata = [];

        for (let i = currDate - currDay; i < currDate; i += 1) {
            let date = new Date(currYear, currMonth, i).getDate();
            let year = new Date(currYear, currMonth, i).getFullYear();
            let month = new Date(currYear, currMonth, i).getMonth();
            newweekdata.push({ date, year, month, currRoom });
        }

        for (let i = currDate; i < currDate + (7 - currDay); i += 1) {
            let date = new Date(currYear, currMonth, i).getDate();
            let year = new Date(currYear, currMonth, i).getFullYear();
            let month = new Date(currYear, currMonth, i).getMonth();
            newweekdata.push({ date, year, month, currRoom });
        }

        if (
            newweekdata.some(
                item =>
                    item.date === todayDate && item.year === todayYear && item.month === todayMonth && item.currRoom === currRoom
            )
        ) {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [currDate, currMonth, currYear, currDay, currRoom]);

    const onClick = () => {
        
        handleGoToday();
    };

    return (
        <div className="header">
            {contextHolder}
            {defaultsetting?<QuestionCircleTwoTone className='help' onClick={() => openNotification('top')} />:null}
            <div className='headerInfo'>
                <CurrentDate
                    currYear={currYear}
                    currMonth={currMonth}
                    defaultsetting={defaultsetting}
                />
                <RoomSelectContainer />
            </div>
            <ConfigProvider
                theme={{
                    components: {
                    Button: {
                        fontWeight:600,
                    },
                    },
                }}
            >
                <Button  disabled={disabled} size="large" onClick={onClick}>
                    Today
                </Button>
            </ConfigProvider>

        </div>
    );
};

export default Header;