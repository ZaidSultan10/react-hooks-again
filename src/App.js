import './App.css';
import React, { useEffect, useMemo, useState } from 'react';

function App() {
  // const counterFunc = () => {
  //   console.log('function ran ---')
  //   return 0
  // }
  // const [count, setCount] = useState(counterFunc())
  // const [pureObj, setPureObj] = useState({counter : 0, color : 'blue'})
  // const handleClick = (operation) => {
  //   // operation === '+' ? setCount(prevCount => prevCount + 1) : setCount(prevCount => prevCount - 1)
  //   if(operation === '+'){
  //     setPureObj(prevState => {
  //       return {
  //         ...pureObj, 
  //         counter: prevState.counter + 1,
  //         color: 'green'
  //       }
  //     })
  //   } else {
  //     setPureObj(prevState => {
  //       return {
  //         ...pureObj, 
  //         counter: prevState.counter - 1,
  //         color: 'red'
  //       }
  //     })
  //   }
  // }

  const [resourceType, setresourceType] = useState('posts')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState(null)
  const [pureWidth, setPureWidth] = useState(window.innerWidth)
  const [isDark, setIsDark] = useState(false)
  const [counterPure, setCounterPure] = useState(0)

  const themeStyles = useMemo(() => {
    console.log('i am memo running ----')

    return {
      backgroundColor : isDark ? 'black' : 'white',
      color: isDark ? 'white' : 'black'
    }
  }, [isDark])

  const counterMemo = useMemo(() => {
    console.log(`i am running counter memo -----`)
    return {
      counter: counterPure
    }
  }, [counterPure > 3])

  const handleResize = () => {
    setPureWidth(window.innerWidth)
  }

  useEffect(() => {
    window.addEventListener('resize',handleResize)

    return () => {
      window.removeEventListener('resize',handleResize)
    }
  },[pureWidth])

  useEffect(() => {
    try{
      setLoading(true)
      fetch(`https://jsonplaceholder.typicode.com/${resourceType}`).then(resp => {
        return resp.json()
      }).then(data => {
        setData(data)
        setLoading(false)
      })
    }catch(err){
      console.log('err ->',err)
      setLoading(false)
      setError(err.message)
    }
  }, [resourceType])
  return (
    <div className="App">
      {/* <button onClick={() => handleClick('+')}>
        {`+`}
      </button>
      <h2 style={{color:pureObj.color}}>{`${pureObj.counter} ${pureObj.color}`}</h2>
      <button disabled={!pureObj.counter} onClick={() => handleClick('-')}>
        {`-`}
      </button> */}
      <h4>{pureWidth}</h4>
      <button onClick={() => setresourceType('posts')}>{`Posts`}</button>
      <button onClick={() => setresourceType('users')}>{`Users`}</button>
      <button onClick={() => setresourceType('comments')}>{`Comments`}</button>
      <button onClick={() => setIsDark(!isDark)}>{`Change Theme`}</button>
      <button onClick={() => setCounterPure(counterPure + 1)}>{`Counter`}</button>
      {loading && (<h2 style={{color:'blue'}}>{`Loading...`}</h2>)}
      {error && (<p style={{color:'red'}}>{error}</p>)}
      <h3 style={themeStyles}>{`${resourceType} -> memo counter -> ${counterMemo.counter} -> state counter -> ${counterPure}`}</h3>
      {data && data.length > 0 && data.map((item, i) => (
        <div>
          <p>{item?.body}</p>
          <p>{item?.name}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
