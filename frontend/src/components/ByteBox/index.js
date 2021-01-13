import React, {useState} from 'react';

import './styles.css'

export default function ByteBox({index,element,array,setMessage}){
  const [number, setNumber] = useState(element);
  const [base, setBase] = useState(10);

  const [showForm, setShowForm] = useState(false);

  function handleSetNumber(e,base){
    let num = e.target.value;
    if(num === '') setNumber(0);
    else {
      num = parseInt(num,base);
      if(!num) num = 0;
      else if(num > 255) num = 255;
      setNumber(num);
    }
  }

  function submitNumber(e){
    e.preventDefault();
    setMessage(old => {
      old[index] = number;
      return [...old];
    });
    setShowForm(false);
  }

  return (
    <>
      <div className="byte-number-container" onClick={() => setShowForm(!showForm)}>
        <p>{base ? element.toString(base) : '+'}</p>
        <p>{
          base && (
            base === 10 ? 'dec' :
            base === 2 ? 'bin' :
            base === 16 ? 'hex' : 'oct'
          )
          }</p>
      </div>
      { showForm && (
        <div className="byte-box-form container">
          <form onSubmit={submitNumber} autoComplete="off">
            <div>
              <label htmlFor="dec">dec</label>
              <input
                type="number"
                name="dec"
                min="0"
                max="255"
                value={number}
                onClick={() => setBase(10)}
                onChange={(e) => handleSetNumber(e,10)}
              />
            </div>
            <div>
              <label htmlFor="oct">oct</label>
              <input
                type="text"
                name="oct"
                min="0"
                value={number.toString(8)}
                onClick={() => setBase(8)}
                onChange={(e) => handleSetNumber(e,8)}
              />
            </div>
            <div>
              <label htmlFor="bin">bin</label>
              <input
                type="text"
                name="bin"
                value={number.toString(2)}
                onClick={() => setBase(2)}
                onChange={(e) => handleSetNumber(e,2)}
              />
            </div>
            <div>
              <label htmlFor="hex">hex</label>
              <input
                type="text"
                name="hex"
                value={number.toString(16)}
                onClick={() => setBase(16)}
                onChange={(e) => handleSetNumber(e,16)}
              />
            </div>
            <button type="submit">Set</button>
          </form>
        </div>
      )}
    </>
  )
}