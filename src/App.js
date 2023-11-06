import './App.css';
import React, { useState } from 'react';

function App() {
  const counterFunc = () => {
    console.log('function ran ---')
    return 0
  }
  const [count, setCount] = useState(counterFunc())
  const [pureObj, setPureObj] = useState({counter : 0, color : 'blue'})
  const handleClick = (operation) => {
    // operation === '+' ? setCount(prevCount => prevCount + 1) : setCount(prevCount => prevCount - 1)
    if(operation === '+'){
      setPureObj(prevState => {
        return {
          ...pureObj, 
          counter: prevState.counter + 1,
          color: 'green'
        }
      })
    } else {
      setPureObj(prevState => {
        return {
          ...pureObj, 
          counter: prevState.counter - 1,
          color: 'red'
        }
      })
    }
  }
  return (
    <div className="App">
      <button onClick={() => handleClick('+')}>
        {`+`}
      </button>
      <h2 style={{color:pureObj.color}}>{`${pureObj.counter} ${pureObj.color}`}</h2>
      <button disabled={!pureObj.counter} onClick={() => handleClick('-')}>
        {`-`}
      </button>
    </div>
  );
}

export default App;
