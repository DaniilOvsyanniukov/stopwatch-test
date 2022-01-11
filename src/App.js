
import './App.css';
import { Observable } from 'rxjs';
import { useState } from "react";


function App() {
  const [time, setTime] = useState(0)
  const [subscription, setSubscription] = useState()
  const [buttonClick, setButtonClick] = useState(true)
  const [clickTimer, setClickTimer]= useState(false)

  const source = Observable.create((observer) => {
    let count = 0;
    const timer = setInterval(() => {
        observer.next(count);
        count++;
    }, 1000);
    return () => {
        clearInterval(timer);
    }
  });

  const startTimer = () => {
    setSubscription(source.subscribe(
    val => setTime((state) => state + 1000),
    err => console.error('error:', err),
    () => console.log('completed')
    ));
    setButtonClick(false)
  }
  const stopTimer = () => {
    subscription.unsubscribe()
    setButtonClick(true)
    setTime(0)
  }

  const waitTimer = () => {
    subscription.unsubscribe()
    setButtonClick(true)
  }

  const onClickTimerCheck = () => {
    setTimeout(() => {
      if (clickTimer) { waitTimer()}
      setClickTimer(false);
      return;
    }, 300)
    setClickTimer(true)
  }

  const resetTimer = () => {
    subscription.unsubscribe()
    setTime(0)
    startTimer()
  }
  
  return (
    <div className="App">
      <div className="timeBox">
        <span>{new Date(time).toISOString().slice(11, 19)}</span>
      </div>
      <ul className='buttonBox'>
        <li className='buttonBoxItem'>{buttonClick ? 
          <button
          type="button"
          className="button"
          onClick={startTimer}>Start</button> : 
          <button
          type="button"
          className="button"
          onClick={stopTimer}>Stop</button>}
        </li>
        <li className='buttonBoxItem'>
          <button
          type="button"
          className="button"
          onClick={onClickTimerCheck}>Wait</button>
        </li>
        <li className='buttonBoxItem'>
          <button
          type="button"
          className="button"
          onClick={resetTimer}>Reset</button>
        </li>
      </ul>
    </div>
  );
}

export default App;
