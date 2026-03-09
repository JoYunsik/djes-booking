import { useDispatch } from 'react-redux';
import './Calendardate.css';
import { useCallback, useEffect, useState } from 'react';
import { add } from "../modules/weekdata";


const CalendarDate = ({currDate,currYear,currMonth,currDay,currRoom}) =>{
    const dispatch = useDispatch();
    const weekdatainsert = useCallback((data)=>dispatch(add(data)),[dispatch]); 
    const lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate() // getting last date of month
    const lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    const [dates, setDates] = useState([]);

    useEffect(()=>{
        const newdates=[];
        const newweekdata=[];
        for(let i= currDate-currDay; i<currDate;i+=1){
            let renderdate = i>0 ? i : i+lastDateofLastMonth;
            if(renderdate===1){
                newdates.push(<li key={renderdate} className="">{currMonth+1}/{renderdate}</li>);
            }
            else{
                newdates.push(<li key={renderdate} className="">{renderdate}</li>);
            }
            let date = new Date(currYear,currMonth, i).getDate();
            let year = new Date(currYear,currMonth, i).getFullYear();
            let month = new Date(currYear,currMonth, i).getMonth(); 
            newweekdata.push({date,year,month,currRoom});        
        }
        for (let i = currDate; i<currDate+(7-currDay); i+=1){
            let isToday = i === new Date().getDate() && currMonth === new Date().getMonth() 
                            && currYear === new Date().getFullYear() ? "active" : "";
            
            let renderdate = i>lastDateofMonth ? i-lastDateofMonth : i;
            if(i===1&& currDate===1){
                newdates.push(<li key={renderdate} className={isToday}>{currMonth+1}/{renderdate}</li>);
            }
            else if(isToday){
                newdates.push(<li key={renderdate} className={isToday}>{currMonth+1}/{renderdate}</li>);
            }
            
            else if(renderdate===1){
                newdates.push(<li key={renderdate} className={isToday}>{currMonth+2<=12? currMonth+2:1}/{renderdate}</li>);
            }
            else{
                newdates.push(<li key={renderdate} className={isToday}>{renderdate}</li>);
            }
            let date = new Date(currYear,currMonth, i).getDate();
            let year = new Date(currYear,currMonth, i).getFullYear();
            let month = new Date(currYear,currMonth, i).getMonth(); 
            newweekdata.push({date,year,month,currRoom});    
        }
        newweekdata.slice(1,6).map(data=>weekdatainsert(data));
        setDates(newdates);
    }, [currDate, currYear, currMonth, currDay, currRoom, weekdatainsert, lastDateofMonth, lastDateofLastMonth])
    return(
        <ul className='days'> 
            {dates}
        </ul>
    )
}

export default CalendarDate;