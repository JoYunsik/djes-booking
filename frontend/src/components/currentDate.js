import './currentDate.css'


const CurrentDate= ({ currYear, currMonth,defaultsetting}) =>{
    return(
        <div className='current-date'>
            {defaultsetting ?  '전담 시간표 작성': `${currYear}년 ${currMonth+1}월`}
        </div>
    )
}

export default CurrentDate;
