import './timesLeft.css';

const TimesLeft = ()=> {
    return(
        <div className="times-left">
          <div className="time top">1교시</div>
          <div className="time">2교시</div>
          <div className="time">3교시</div>
          <div className="time">4교시</div>
          <div className="time time-with-label">
            <div>5교시</div>
            <div className="time-sub">(12:20~13:00)</div>
          </div>
          <div className="time time-with-label">
            <div>5교시</div>
            <div className="time-sub">(13:00~13:40)</div>
          </div>
          <div className="time">6교시</div>
          <div className="time time-afterschool">방과후</div>
        </div>
    )
}

export default TimesLeft;